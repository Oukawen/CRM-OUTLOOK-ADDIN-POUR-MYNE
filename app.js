// ============================================================
// APP.JS — Logique principale de l'interface CRM Add-in
// ============================================================

// ── ÉTAT GLOBAL ──────────────────────────────────────────────
let currentScreen = "dashboard";
let editMode = false;
let editContactId = null;
let editTemplateId = null;
let editPlanningId = null;
let currentPrefDossier = null;
let selectedEntreprises = new Set();
let currentTemplateId = null;
let currentCategories = [];
let sendMailsQueue = [];
let sendStatusMap = {};

// ── INIT ─────────────────────────────────────────────────────
Office.onReady(function(info) {
  if (info.host === Office.HostType.Outlook) {
    loadFromStorage();
    initDashboard();
    initConfig();
    renderContacts();
  }
});

// ── NAVIGATION ───────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  document.getElementById(`screen-${name}`).classList.add("active");
  document.getElementById(`nav-${name}`).classList.add("active");
  currentScreen = name;
  if (name === "contacts") renderContacts();
  if (name === "config") renderConfig();
  if (name === "dashboard") initDashboard();
}

// ── TOAST ────────────────────────────────────────────────────
function showToast(msg, type = "green") {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.background = type === "red" ? "var(--red-bg)" : "var(--green-bg)";
  t.style.color = type === "red" ? "var(--red)" : "var(--green)";
  t.style.border = type === "red" ? "1px solid var(--red-border)" : "1px solid var(--green-light)";
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}

// ── DASHBOARD ────────────────────────────────────────────────
function initDashboard() {
  const today = new Date();
  document.getElementById("dash-date").textContent = today.toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  const todayItems = getTodayEcheances();
  const upcomingItems = getUpcomingEcheances(7);

  document.getElementById("stat-today").textContent = todayItems.length;
  document.getElementById("stat-week").textContent = upcomingItems.length + todayItems.length;

  // Mode test badge
  document.getElementById("mode-test-badge").style.display =
    CRM_DATA.settings.modeTest ? "inline-block" : "none";

  // Liste aujourd'hui
  const todayList = document.getElementById("today-list");
  if (todayItems.length === 0) {
    todayList.innerHTML = `<p style="font-size:11px;color:var(--text2);padding:6px 0;">Aucune échéance aujourd'hui</p>`;
  } else {
    todayList.innerHTML = todayItems.map(item => `
      <div class="list-item" onclick="prefillStep1('${item.id}')">
        <div class="dot dot-green"></div>
        <div class="item-info">
          <div class="item-title">${item.action}</div>
          <div class="item-sub">${item.categories.join(", ")} · ${item.nbEntreprises} entreprise(s)</div>
        </div>
        <div class="item-date">Auj.</div>
      </div>
    `).join("");
  }

  // Liste à venir
  const upcomingList = document.getElementById("upcoming-list");
  if (upcomingItems.length === 0) {
    upcomingList.innerHTML = `<p style="font-size:11px;color:var(--text2);padding:6px 0;">Aucune échéance dans les 7 prochains jours</p>`;
  } else {
    upcomingList.innerHTML = upcomingItems.slice(0, 5).map(item => `
      <div class="list-item">
        <div class="dot dot-amber"></div>
        <div class="item-info">
          <div class="item-title">${item.action}</div>
          <div class="item-sub">${item.categories.join(", ")} · ${item.nbEntreprises} entreprise(s)</div>
        </div>
        <div class="item-date">+${item.dansXJours}j</div>
      </div>
    `).join("");
  }
}

// ── PROCESSUS D'ENVOI ─────────────────────────────────────────

function startProcess() {
  document.getElementById("echeances-view").classList.add("hidden");
  document.getElementById("process-steps").classList.remove("hidden");
  showStep(1);
  populateCategorySelect();
}

function cancelProcess() {
  document.getElementById("echeances-view").classList.remove("hidden");
  document.getElementById("process-steps").classList.add("hidden");
  currentTemplateId = null;
  currentCategories = [];
  selectedEntreprises.clear();
}

function prefillStep1(planningId) {
  const item = CRM_DATA.planning.find(p => p.id == planningId);
  if (!item) return;
  startProcess();
  setTimeout(() => {
    if (item.templateId) {
      document.getElementById("select-template").value = item.templateId;
      updateTemplatePreview(item.templateId);
    }
  }, 100);
}

function showStep(n) {
  ["step1", "step2", "step3"].forEach((id, i) => {
    document.getElementById(id).classList.toggle("hidden", i + 1 !== n);
  });
}

function populateCategorySelect() {
  const sel = document.getElementById("select-category");
  const cats = ["TVA A", "TVA M", "TVA T", "TVA N/A", "FM SARL", "FM EI", "FM SAS", "FM SCI", "FM LMNP", "S Véhicule", "S Stock", "S Caisse", "S esp", "S C/C", "tous (tous les clients)"];
  sel.innerHTML = `<option value="">— Choisir une catégorie —</option>` +
    cats.map(c => `<option value="${c}">${c}</option>`).join("");
  sel.onchange = () => filterTemplates();

  const tSel = document.getElementById("select-template");
  tSel.innerHTML = `<option value="">— Choisir un modèle —</option>` +
    CRM_DATA.templates.map(t => `<option value="${t.id}">${t.nom}</option>`).join("");
  tSel.onchange = () => updateTemplatePreview(tSel.value);
}

function filterTemplates() {
  const cat = document.getElementById("select-category").value;
  const tSel = document.getElementById("select-template");
  const filtered = cat
    ? CRM_DATA.templates.filter(t =>
        t.categories.includes("tous") ||
        t.categories.includes(cat) ||
        t.categories.some(c => c === cat)
      )
    : CRM_DATA.templates;
  tSel.innerHTML = `<option value="">— Choisir un modèle —</option>` +
    filtered.map(t => `<option value="${t.id}">${t.nom}</option>`).join("");
}

function updateTemplatePreview(tId) {
  const t = CRM_DATA.templates.find(x => x.id === tId);
  const preview = document.getElementById("template-preview");
  if (t) {
    document.getElementById("preview-objet").textContent = t.objet;
    document.getElementById("preview-corps").textContent = t.corps.substring(0, 200) + "...";
    preview.classList.remove("hidden");
  } else {
    preview.classList.add("hidden");
  }
}

function goStep2() {
  const catVal = document.getElementById("select-category").value;
  const tId = document.getElementById("select-template").value;
  if (!tId) { showToast("Choisis un modèle de mail", "red"); return; }

  currentTemplateId = tId;
  currentCategories = catVal ? [catVal.replace(" (tous les clients)", "")] : ["tous"];

  // Résout les entreprises
  const entreprises = resolveEntreprises(currentCategories);
  selectedEntreprises = new Set(entreprises.map(e => e.dossier));

  renderSynthList(entreprises);
  showStep(2);
}

function renderSynthList(entreprises) {
  const list = document.getElementById("synth-list");
  document.getElementById("synth-count").textContent = `${entreprises.length} entreprise(s)`;

  list.innerHTML = entreprises.map(({ dossier, contacts }) => {
    const pref = getPreferences(dossier);
    const contactsA = pref?.a?.map(id => contacts.find(c => c.id === id)).filter(Boolean) || [contacts[0]];
    const contactsCc = pref?.cc?.map(id => contacts.find(c => c.id === id)).filter(Boolean) || contacts.slice(1);
    const colleguesCc = (pref?.colleguesCc || []).map(id => CRM_DATA.collegues.find(c => c.id === id)).filter(c => c?.mail);
    const varianteL = contactsA[0]?.l || contacts[0]?.l || "";

    const toText = contactsA.map(c => `${c.prenom} ${c.nom}`.trim()).join(", ");
    const ccText = [...contactsCc.map(c => `${c.prenom} ${c.nom}`.trim()), ...colleguesCc.map(c => c.prenom)].join(", ");
    const checked = selectedEntreprises.has(dossier);

    return `<div class="synth-item" id="synth-${sanitizeId(dossier)}">
      <div class="synth-top">
        <input type="checkbox" ${checked ? "checked" : ""} onchange="toggleSynthItem('${dossier}', this.checked)" />
        <div class="synth-info">
          <div class="ent">${dossier}</div>
          <div class="dest">À : ${toText}${ccText ? ` · Cc : ${ccText}` : ""}</div>
          <span class="badge badge-l">${varianteL}</span>
        </div>
        <button class="btn btn-sm" onclick="openPrefModal('${dossier}')" style="flex-shrink:0;">⚙</button>
      </div>
      <div class="cc-row">
        ${colleguesCc.map(c => `<span class="cc-chip">${c.prenom}</span>`).join("")}
        <span class="cc-chip add" onclick="openPrefModal('${dossier}')">+ Cc</span>
      </div>
    </div>`;
  }).join("");
}

function sanitizeId(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "_");
}

function toggleSynthItem(dossier, checked) {
  if (checked) selectedEntreprises.add(dossier);
  else selectedEntreprises.delete(dossier);
  document.getElementById("synth-count").textContent = `${selectedEntreprises.size} sélectionnée(s)`;
}

function selectAllSynth() {
  document.querySelectorAll("#synth-list input[type=checkbox]").forEach(cb => {
    cb.checked = true;
    const dossier = cb.closest(".synth-item").querySelector(".ent").textContent;
    selectedEntreprises.add(dossier);
  });
  document.getElementById("synth-count").textContent = `${selectedEntreprises.size} sélectionnée(s)`;
}

function deselectAllSynth() {
  document.querySelectorAll("#synth-list input[type=checkbox]").forEach(cb => { cb.checked = false; });
  selectedEntreprises.clear();
  document.getElementById("synth-count").textContent = "0 sélectionnée(s)";
}

function goStep1() { showStep(1); }

function goStep3() {
  if (selectedEntreprises.size === 0) { showToast("Sélectionne au moins une entreprise", "red"); return; }
  const template = CRM_DATA.templates.find(t => t.id === currentTemplateId);
  document.getElementById("recap-template").textContent = template?.nom || "";
  document.getElementById("recap-entreprises").textContent = `${selectedEntreprises.size} sélectionnée(s)`;
  document.getElementById("recap-cci").textContent = CRM_DATA.settings.monEmail || "Non configuré";
  document.getElementById("mode-test-info").style.display = CRM_DATA.settings.modeTest ? "block" : "none";
  showStep(3);
}

async function confirmAndSend() {
  const template = CRM_DATA.templates.find(t => t.id === currentTemplateId);
  if (!template) return;

  // Construit la liste des entreprises sélectionnées
  const allEntreprises = resolveEntreprises(currentCategories);
  const filtered = allEntreprises.filter(e => selectedEntreprises.has(e.dossier));

  // Prépare la queue d'envoi
  sendMailsQueue = filtered.map(e => ({
    dossier: e.dossier,
    contacts: e.contacts,
    template,
    status: "pending"
  }));

  // Passe à l'écran envoi
  cancelProcess();
  showScreen("send");
  startSendProcess(template);
}

// ── ENVOI ────────────────────────────────────────────────────

async function startSendProcess(template) {
  const total = sendMailsQueue.length;
  document.getElementById("send-subtitle").textContent = `${template.nom} · ${total} mail(s)`;
  document.getElementById("send-done").classList.add("hidden");
  document.getElementById("btn-cancel-send").classList.remove("hidden");

  // Affiche les items
  renderSendList();

  let sentCount = 0;
  let errorCount = 0;

  for (let i = 0; i < sendMailsQueue.length; i++) {
    if (sendCancelled) break;

    const item = sendMailsQueue[i];
    item.status = "sending";
    renderSendList();
    updateProgress(i, total, `Envoi ${i + 1}/${total} — ${item.dossier}`);

    try {
      const mailData = await generateMail(
        item.dossier,
        item.contacts,
        item.template,
        CRM_DATA.settings.modeTest,
        (msg) => updateProgress(i, total, msg)
      );
      await sendMailDirectly(mailData);
      item.status = "sent";
      sentCount++;
    } catch(e) {
      item.status = "error";
      item.error = e.message || "Erreur inconnue";
      errorCount++;
    }

    renderSendList();

    // Attendre 10 secondes entre chaque mail
    if (i < sendMailsQueue.length - 1 && !sendCancelled) {
      for (let s = 10; s > 0; s--) {
        if (sendCancelled) break;
        updateProgress(i + 1, total, `Prochain envoi dans ${s} seconde${s > 1 ? "s" : ""}...`);
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  // Terminé
  document.getElementById("btn-cancel-send").classList.add("hidden");
  updateProgress(total, total, "Envoi terminé");
  document.getElementById("send-done").classList.remove("hidden");
  document.getElementById("send-done-details").textContent =
    `${sentCount} mail(s) envoyé(s)${errorCount > 0 ? ` · ${errorCount} erreur(s)` : ""}`;
}

function updateProgress(current, total, msg) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  document.getElementById("send-progress-bar").style.width = pct + "%";
  document.getElementById("send-progress-title").textContent = msg;
  document.getElementById("send-progress-sub").textContent = `${current} / ${total} mail(s)`;
}

function renderSendList() {
  const list = document.getElementById("send-list");
  list.innerHTML = sendMailsQueue.map(item => {
    let statusClass = "s-pending";
    let statusIcon = "·";
    let rowClass = "";
    if (item.status === "sent") { statusClass = "s-sent"; statusIcon = "✓"; rowClass = "sent"; }
    if (item.status === "sending") { statusClass = "s-sending"; statusIcon = "↑"; rowClass = "sending"; }
    if (item.status === "error") { statusClass = "s-error"; statusIcon = "✕"; }

    return `<div class="send-item ${rowClass}">
      <div class="send-status ${statusClass}" style="font-size:10px;">${statusIcon}</div>
      <div style="flex:1;font-size:11px;font-weight:${item.status === "sending" ? "600" : "400"};color:${item.status === "sending" ? "var(--blue)" : "var(--text)"};">${item.dossier}</div>
      <div style="font-size:9px;color:${item.status === "sent" ? "var(--green)" : item.status === "error" ? "var(--red)" : "var(--text2)"};">
        ${item.status === "sent" ? "Envoyé" : item.status === "sending" ? "En cours..." : item.status === "error" ? "Erreur" : "En attente"}
      </div>
    </div>`;
  }).join("");
}

function cancelSendProcess() {
  sendCancelled = true;
  showToast("Envoi annulé");
}

// ── CONTACTS ─────────────────────────────────────────────────

function renderContacts() {
  const search = (document.getElementById("search-input")?.value || "").toLowerCase();
  const filterTva = document.getElementById("filter-tva")?.value || "";
  const filterFm = document.getElementById("filter-fm")?.value || "";

  const filtered = CRM_DATA.contacts.filter(c => {
    const text = `${c.dossier} ${c.nom} ${c.prenom} ${c.mail} ${c.tel}`.toLowerCase();
    if (search && !text.includes(search)) return false;
    if (filterTva && c.tva !== filterTva) return false;
    if (filterFm && c.fm !== filterFm) return false;
    return true;
  });

  const total = CRM_DATA.contacts.length;
  const ents = new Set(filtered.map(c => c.dossier)).size;
  document.getElementById("contacts-subtitle").textContent = `${filtered.length}/${total} contacts · ${ents} entreprises`;

  const list = document.getElementById("contacts-list");
  if (filtered.length === 0) {
    list.innerHTML = `<p style="font-size:11px;color:var(--text2);padding:8px 0;">Aucun contact trouvé</p>`;
    return;
  }

  list.innerHTML = filtered.map(c => {
    const initials = `${c.prenom?.[0] || ""}${c.nom?.[0] || ""}`.toUpperCase();
    const sArr = c.s ? c.s.split(" ").filter(x => x.startsWith("S")) : [];
    return `<div class="list-item" onclick="${editMode ? `openEditContact(${c.id})` : ""}">
      <div class="avatar">${initials}</div>
      <div class="item-info">
        <div class="item-title">${c.prenom} ${c.nom}</div>
        <div class="item-sub">${c.dossier} · ${c.tel || "—"}</div>
        <div style="margin-top:3px;display:flex;gap:3px;flex-wrap:wrap;">
          <span class="badge badge-fm" style="font-size:9px;">${c.fm}</span>
          <span class="badge badge-tva-${c.tva.replace("TVA ", "").toLowerCase().replace("/","")}" style="font-size:9px;">${c.tva}</span>
          ${sArr.map(s => `<span class="badge badge-s" style="font-size:9px;">${s}</span>`).join("")}
        </div>
      </div>
      ${editMode ? `<div style="display:flex;gap:3px;">
        <button class="btn btn-sm" onclick="event.stopPropagation();openEditContact(${c.id})">✎</button>
        <button class="btn btn-sm" onclick="event.stopPropagation();confirmDelete(${c.id})" style="color:var(--red);">✕</button>
      </div>` : ""}
    </div>`;
  }).join("");
}

function toggleEditMode() {
  editMode = !editMode;
  const screen = document.getElementById("screen-contacts");
  const btn = document.getElementById("btn-edit-contacts");
  const addBtn = document.getElementById("btn-add-contact");

  if (editMode) {
    screen.classList.add("edit-mode");
    btn.textContent = "Éditer ON";
    btn.className = "btn btn-sm edit-badge";
    addBtn.classList.remove("hidden");
  } else {
    screen.classList.remove("edit-mode");
    btn.textContent = "Éditer";
    btn.className = "btn btn-sm";
    addBtn.classList.add("hidden");
  }
  renderContacts();
}

function openAddContact() {
  editContactId = null;
  document.getElementById("modal-contact-title").textContent = "Nouveau contact";
  document.getElementById("btn-delete-contact").style.display = "none";
  ["mc-dossier","mc-nom","mc-prenom","mc-mail","mc-tel"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("mc-statut").value = "Client";
  document.getElementById("mc-fm").value = "FM SAS";
  document.getElementById("mc-tva").value = "TVA A";
  document.getElementById("mc-l").value = "L SEUL - TUTOYER";
  document.querySelectorAll("#mc-specs input").forEach(cb => cb.checked = false);
  document.getElementById("modal-contact").classList.add("open");
}

function openEditContact(id) {
  editContactId = id;
  const c = CRM_DATA.contacts.find(x => x.id === id);
  if (!c) return;
  document.getElementById("modal-contact-title").textContent = "Modifier le contact";
  document.getElementById("btn-delete-contact").style.display = "";
  document.getElementById("mc-dossier").value = c.dossier;
  document.getElementById("mc-nom").value = c.nom;
  document.getElementById("mc-prenom").value = c.prenom;
  document.getElementById("mc-mail").value = c.mail;
  document.getElementById("mc-tel").value = c.tel;
  document.getElementById("mc-statut").value = c.statut;
  document.getElementById("mc-fm").value = c.fm;
  document.getElementById("mc-tva").value = c.tva;
  document.getElementById("mc-l").value = c.l;
  const specs = c.s ? c.s.split(" ") : [];
  document.querySelectorAll("#mc-specs input").forEach(cb => { cb.checked = specs.includes(cb.value); });
  document.getElementById("modal-contact").classList.add("open");
}

function saveContact() {
  const specs = [...document.querySelectorAll("#mc-specs input:checked")].map(cb => cb.value).join(" ");
  const data = {
    dossier: document.getElementById("mc-dossier").value.trim(),
    nom: document.getElementById("mc-nom").value.trim(),
    prenom: document.getElementById("mc-prenom").value.trim(),
    mail: document.getElementById("mc-mail").value.trim(),
    tel: document.getElementById("mc-tel").value.trim(),
    statut: document.getElementById("mc-statut").value,
    fm: document.getElementById("mc-fm").value,
    tva: document.getElementById("mc-tva").value,
    l: document.getElementById("mc-l").value,
    s: specs
  };
  if (!data.dossier) { showToast("Le dossier est obligatoire", "red"); return; }

  if (editContactId !== null) {
    const idx = CRM_DATA.contacts.findIndex(c => c.id === editContactId);
    if (idx >= 0) CRM_DATA.contacts[idx] = { ...CRM_DATA.contacts[idx], ...data };
  } else {
    CRM_DATA.contacts.push({ ...data, id: Date.now() });
  }
  saveContacts();
  closeModal("modal-contact");
  renderContacts();
  showToast("Contact enregistré");
}

function deleteContact() {
  if (!confirm("Supprimer ce contact ?")) return;
  CRM_DATA.contacts = CRM_DATA.contacts.filter(c => c.id !== editContactId);
  saveContacts();
  closeModal("modal-contact");
  renderContacts();
  showToast("Contact supprimé");
}

function confirmDelete(id) {
  editContactId = id;
  deleteContact();
}

// ── PRÉFÉRENCES DESTINATAIRES ─────────────────────────────────

function openPrefModal(dossier) {
  currentPrefDossier = dossier;
  const contacts = getContactsByDossier(dossier);
  const pref = getPreferences(dossier) || { a: [contacts[0]?.id], cc: contacts.slice(1).map(c => c.id), colleguesCc: [] };

  document.getElementById("modal-pref-title").textContent = `Préférences — ${dossier}`;
  document.getElementById("modal-pref-dossier").textContent = `${contacts.length} contact(s) dans ce dossier`;

  const makeList = (containerId, contacts, selectedIds, label) => {
    const el = document.getElementById(containerId);
    el.innerHTML = contacts.map(c => `
      <label class="check-label ${selectedIds.includes(c.id) ? "checked" : ""}" style="margin-bottom:4px;width:100%;">
        <input type="checkbox" value="${c.id}" ${selectedIds.includes(c.id) ? "checked" : ""} />
        ${c.prenom} ${c.nom} &lt;${c.mail}&gt;
      </label>
    `).join("");
  };

  makeList("pref-a-list", contacts, pref.a || [contacts[0]?.id].filter(Boolean), "À");
  makeList("pref-cc-list", contacts, pref.cc || contacts.slice(1).map(c => c.id), "Cc");

  const colleguesEl = document.getElementById("pref-collegues-list");
  const validCollegues = CRM_DATA.collegues.filter(c => c.mail);
  if (validCollegues.length === 0) {
    colleguesEl.innerHTML = `<p style="font-size:11px;color:var(--text2);">Aucun collègue configuré dans l'écran Configuration</p>`;
  } else {
    colleguesEl.innerHTML = validCollegues.map(c => `
      <label class="check-label ${(pref.colleguesCc || []).includes(c.id) ? "checked" : ""}" style="margin-bottom:4px;width:100%;">
        <input type="checkbox" value="${c.id}" ${(pref.colleguesCc || []).includes(c.id) ? "checked" : ""} />
        ${c.prenom} &lt;${c.mail}&gt;
      </label>
    `).join("");
  }

  document.getElementById("modal-pref").classList.add("open");
}

function savePreferencesUI() {
  const a = [...document.querySelectorAll("#pref-a-list input:checked")].map(cb => parseInt(cb.value));
  const cc = [...document.querySelectorAll("#pref-cc-list input:checked")].map(cb => parseInt(cb.value));
  const colleguesCc = [...document.querySelectorAll("#pref-collegues-list input:checked")].map(cb => parseInt(cb.value));
  savePreferences(currentPrefDossier, a, cc, colleguesCc);
  closeModal("modal-pref");
  showToast("Préférences enregistrées");
  // Refresh synth list if on step 2
  if (!document.getElementById("step2").classList.contains("hidden")) {
    const entreprises = resolveEntreprises(currentCategories);
    renderSynthList(entreprises);
  }
}

// ── CONFIGURATION ─────────────────────────────────────────────

function renderConfig() {
  // Settings
  document.getElementById("input-mon-email").value = CRM_DATA.settings.monEmail || "";
  document.getElementById("toggle-mode-test").checked = CRM_DATA.settings.modeTest;

  // Planning
  const pList = document.getElementById("planning-list");
  pList.innerHTML = CRM_DATA.planning.map(item => `
    <div class="list-item">
      <div class="item-info">
        <div class="item-title" style="white-space:normal;">${item.action}</div>
        <div class="item-sub">${item.date} · ${item.categories.join(", ")}</div>
      </div>
      <button class="btn btn-sm" onclick="openEditPlanning(${item.id})">✎</button>
    </div>
  `).join("");

  // Modèles
  const tList = document.getElementById("templates-list");
  tList.innerHTML = CRM_DATA.templates.map(t => `
    <div class="list-item" style="flex-direction:column;align-items:flex-start;gap:5px;">
      <div style="display:flex;align-items:center;gap:6px;width:100%;">
        <div class="item-info">
          <div class="item-title" style="white-space:normal;">${t.nom}</div>
          <div class="item-sub">${t.objet}</div>
        </div>
        <button class="btn btn-sm" onclick="openEditTemplate('${t.id}')">✎</button>
      </div>
    </div>
  `).join("");

  // Collègues
  const cList = document.getElementById("collegues-list");
  cList.innerHTML = CRM_DATA.collegues.map(c => `
    <div class="list-item">
      <div class="avatar avatar-purple">${(c.prenom[0] || "?").toUpperCase()}</div>
      <div class="item-info">
        <div class="item-title">${c.prenom}</div>
        <div class="item-sub">${c.mail || "Email non configuré"}</div>
      </div>
      <button class="btn btn-sm" onclick="openEditCollegue(${c.id})">✎</button>
    </div>
  `).join("");
}

function initConfig() {
  renderConfig();
}

function saveSettingsUI() {
  CRM_DATA.settings.monEmail = document.getElementById("input-mon-email").value.trim();
  CRM_DATA.settings.modeTest = document.getElementById("toggle-mode-test").checked;
  saveSettings();
  showToast("Paramètres enregistrés");
  document.getElementById("mode-test-badge").style.display =
    CRM_DATA.settings.modeTest ? "inline-block" : "none";
}

// Édition planning
function openEditPlanning(id) {
  editPlanningId = id;
  const item = CRM_DATA.planning.find(p => p.id === id);
  if (!item) return;
  document.getElementById("mp-date").value = item.date;
  document.getElementById("mp-action").value = item.action;
  document.getElementById("modal-planning").classList.add("open");
}

function savePlanningUI() {
  const item = CRM_DATA.planning.find(p => p.id === editPlanningId);
  if (!item) return;
  item.date = document.getElementById("mp-date").value.trim();
  item.action = document.getElementById("mp-action").value.trim();
  savePlanning();
  closeModal("modal-planning");
  renderConfig();
  showToast("Échéance mise à jour");
}

// Édition modèle
function openEditTemplate(id) {
  editTemplateId = id;
  const t = CRM_DATA.templates.find(x => x.id === id);
  if (!t) return;
  document.getElementById("modal-template-title").textContent = `Modifier — ${t.nom}`;
  document.getElementById("mt-nom").value = t.nom;
  document.getElementById("mt-objet").value = t.objet;
  document.getElementById("mt-corps").value = t.corps;
  document.getElementById("modal-template").classList.add("open");
}

function saveTemplateUI() {
  const t = CRM_DATA.templates.find(x => x.id === editTemplateId);
  if (!t) return;
  t.nom = document.getElementById("mt-nom").value.trim();
  t.objet = document.getElementById("mt-objet").value.trim();
  t.corps = document.getElementById("mt-corps").value;
  saveTemplates();
  closeModal("modal-template");
  renderConfig();
  showToast("Modèle mis à jour");
}

// Édition collègue (inline dans la liste)
function openEditCollegue(id) {
  const c = CRM_DATA.collegues.find(x => x.id === id);
  if (!c) return;
  const prenom = prompt("Prénom du collègue :", c.prenom);
  if (prenom === null) return;
  const mail = prompt("Email du collègue :", c.mail);
  if (mail === null) return;
  c.prenom = prenom.trim();
  c.mail = mail.trim();
  saveCollegues();
  renderConfig();
  showToast("Collègue mis à jour");
}
