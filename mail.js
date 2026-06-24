// ============================================================
// MAIL.JS — Génération et envoi des mails via Office.js
// ============================================================

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

// ── ADAPTATION LINGUISTIQUE ──────────────────────────────────

async function adaptMailLanguage(corps, varianteL) {
  if (varianteL === "L SEUL - TUTOYER") return corps; // modèle de base

  const prompt = `Tu es un assistant de rédaction professionnelle en français. Adapte ce mail en version "${varianteL}". Règles strictes et non négociables :
- Le "nous" exprimant l'expéditeur au nom de son cabinet ne doit jamais être modifié
- Seuls les pronoms, accords, conjugaisons et formules s'adressant au destinataire sont à adapter
- Tu ne reformules pas, tu ne résumes pas, tu n'ajoutes rien, tu ne supprimes rien
- Tu ne proposes aucune amélioration, aucune innovation, aucune suggestion stylistique
- Tu conserves exactement la mise en forme, les sauts de ligne, la ponctuation et les majuscules
- Le résultat doit être identique au modèle original à l'exception des adaptations grammaticales strictement nécessaires

Variante à produire : ${varianteL}
- L SEUL - VOUVOYER : vouvoiement singulier (vous, votre, vos)
- L GROUPE - TUTOYER : tutoiement pluriel (bonjour à tous, votre équipe peut, vous pouvez déposer...)
- L GROUPE - VOUVOYER : vouvoiement pluriel (bonjour à tous, votre cabinet peut, vous pouvez déposer...)

Mail original (tutoiement singulier) :
${corps}

Réponds uniquement avec le mail adapté, sans commentaire ni explication.`;

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    return data.content?.[0]?.text || corps;
  } catch(e) {
    console.error("Erreur adaptation linguistique:", e);
    return corps;
  }
}

// ── GÉNÉRATION D'UN MAIL ─────────────────────────────────────

async function generateMail(dossier, contacts, template, modeTest, onProgress) {
  const pref = getPreferences(dossier);
  const contactsA = pref?.a?.map(id => contacts.find(c => c.id === id)).filter(Boolean) || [contacts[0]];
  const contactsCc = pref?.cc?.map(id => contacts.find(c => c.id === id)).filter(Boolean) || contacts.slice(1);
  const colleguesCc = (pref?.colleguesCc || []).map(id => CRM_DATA.collegues.find(c => c.id === id)).filter(c => c && c.mail);

  // Détermine la variante L (basée sur le premier contact À)
  const contactPrincipal = contactsA[0] || contacts[0];
  const varianteL = contactPrincipal?.l || "L SEUL - TUTOYER";

  if (onProgress) onProgress(`Adaptation du mail pour ${dossier}...`);

  // Adapte le corps du mail
  let corps = template.corps;
  corps = await adaptMailLanguage(corps, varianteL);

  // Adapte la salutation selon L GROUPE ou L SEUL
  const isGroupe = varianteL.includes("GROUPE");
  const prenomDisplay = isGroupe
    ? "à tous"
    : contactPrincipal?.prenom || "";

  // Remplace les variables
  corps = corps
    .replace(/\[Prénom\]/gi, isGroupe ? "à tous," : `${prenomDisplay},`)
    .replace(/Bonjour \[Prénom\],/gi, isGroupe ? "Bonjour à tous," : `Bonjour ${prenomDisplay},`)
    .replace(/\[Entreprise\]/gi, dossier)
    .replace(/\[ENTREPRISE\]/gi, dossier);

  // Objet du mail
  const objet = template.objet.replace(/\[ENTREPRISE\]/g, dossier);

  // Destinataires
  const toAddresses = modeTest
    ? [CRM_DATA.settings.monEmail]
    : contactsA.map(c => ({ email: c.mail, name: `${c.prenom} ${c.nom}`.trim() }));

  const ccAddresses = modeTest ? [] : [
    ...contactsCc.map(c => ({ email: c.mail, name: `${c.prenom} ${c.nom}`.trim() })),
    ...colleguesCc.map(c => ({ email: c.mail, name: c.prenom }))
  ];

  const bccAddresses = [{ email: CRM_DATA.settings.monEmail, name: "Moi" }];

  // Corps complet avec signature
  const signature = `\nBien cordialement\n\nOukawen Mendes\nResponsable de clientèle\noukawen.mendes@myne.fr\n07.81.28.63.16 | 01.80.21.06.26\n20 rue de Prony, 75017 Paris\nmyne.fr`;

  // Retire "Bien cordialement" du corps si déjà présent (évite doublon)
  const corpsClean = corps.replace(/\nBien cordialement$/i, "").trim();
  const corpsComplet = `${corpsClean}\n\n${signature}`;

  return {
    dossier,
    objet,
    corps: corpsComplet,
    to: toAddresses,
    cc: ccAddresses,
    bcc: bccAddresses,
    modeTest
  };
}

// ── ENVOI VIA OFFICE.JS ──────────────────────────────────────

async function sendMailViaOffice(mailData) {
  return new Promise((resolve, reject) => {
    Office.context.mailbox.displayNewMessageForm({
      toRecipients: mailData.to,
      ccRecipients: mailData.cc,
      bccRecipients: mailData.bcc,
      subject: mailData.objet,
      htmlBody: mailData.corps.replace(/\n/g, "<br>"),
      callback: function(result) {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          resolve(result);
        } else {
          reject(result.error);
        }
      }
    });
  });
}

// Envoi réel via EWS (nécessite ReadWriteMailbox)
async function sendMailDirectly(mailData) {
  return new Promise((resolve, reject) => {
    const item = {
      Subject: mailData.objet,
      Body: { ContentType: "HTML", Content: mailData.corps.replace(/\n/g, "<br>") },
      ToRecipients: mailData.to.map(r => typeof r === "string" ? { EmailAddress: { Address: r } } : { EmailAddress: { Address: r.email, Name: r.name } }),
      CcRecipients: mailData.cc.map(r => ({ EmailAddress: { Address: r.email, Name: r.name } })),
      BccRecipients: mailData.bcc.map(r => ({ EmailAddress: { Address: r.email, Name: r.name } }))
    };

    Office.context.mailbox.makeEwsRequestAsync(
      buildSendItemRequest(item),
      function(result) {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          resolve(result);
        } else {
          reject(result.error);
        }
      }
    );
  });
}

function buildSendItemRequest(item) {
  const toRecips = item.ToRecipients.map(r =>
    `<t:Mailbox><t:EmailAddress>${r.EmailAddress.Address}</t:EmailAddress>${r.EmailAddress.Name ? `<t:Name>${r.EmailAddress.Name}</t:Name>` : ""}</t:Mailbox>`
  ).join("");

  const ccRecips = item.CcRecipients.map(r =>
    `<t:Mailbox><t:EmailAddress>${r.EmailAddress.Address}</t:EmailAddress><t:Name>${r.EmailAddress.Name || ""}</t:Name></t:Mailbox>`
  ).join("");

  const bccRecips = item.BccRecipients.map(r =>
    `<t:Mailbox><t:EmailAddress>${r.EmailAddress.Address}</t:EmailAddress></t:Mailbox>`
  ).join("");

  const htmlBody = item.Body.Content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types"
               xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages">
  <soap:Body>
    <m:CreateItem MessageDisposition="SendAndSaveCopy">
      <m:SavedItemFolderId>
        <t:DistinguishedFolderId Id="sentitems"/>
      </m:SavedItemFolderId>
      <m:Items>
        <t:Message>
          <t:Subject>${item.Subject}</t:Subject>
          <t:Body BodyType="HTML">${htmlBody}</t:Body>
          <t:ToRecipients>${toRecips}</t:ToRecipients>
          ${ccRecips ? `<t:CcRecipients>${ccRecips}</t:CcRecipients>` : ""}
          ${bccRecips ? `<t:BccRecipients>${bccRecips}</t:BccRecipients>` : ""}
        </t:Message>
      </m:Items>
    </m:CreateItem>
  </soap:Body>
</soap:Envelope>`;
}

// ── ENVOI SÉQUENTIEL (10s entre chaque mail) ─────────────────

let sendQueue = [];
let sendCancelled = false;
let currentSendIndex = 0;

async function sendSequential(mailsData, onProgress, onComplete) {
  sendCancelled = false;
  currentSendIndex = 0;
  const total = mailsData.length;

  for (let i = 0; i < mailsData.length; i++) {
    if (sendCancelled) {
      onProgress({ index: i, total, status: "cancelled", dossier: null });
      break;
    }

    const mail = mailsData[i];
    currentSendIndex = i;
    onProgress({ index: i, total, status: "sending", dossier: mail.dossier });

    try {
      await sendMailDirectly(mail);
      onProgress({ index: i, total, status: "sent", dossier: mail.dossier });
    } catch(e) {
      onProgress({ index: i, total, status: "error", dossier: mail.dossier, error: e.message });
    }

    // Attendre 10 secondes avant le prochain (sauf si dernier)
    if (i < mailsData.length - 1 && !sendCancelled) {
      await new Promise(resolve => setTimeout(resolve, CRM_DATA.settings.intervalleEnvoi));
    }
  }

  if (!sendCancelled) onComplete();
}

function cancelSend() {
  sendCancelled = true;
}

// ── CALCUL DES ÉCHÉANCES DU JOUR ─────────────────────────────

function getTodayEcheances() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // 1-12
  const weekday = today.getDay(); // 0=dim, 1=lun...

  const results = [];

  for (const item of CRM_DATA.planning) {
    if (isEcheanceToday(item, day, month, weekday, today)) {
      const entreprises = resolveEntreprises(item.categories);
      results.push({
        ...item,
        nbEntreprises: entreprises.length,
        isToday: true
      });
    }
  }
  return results;
}

function getUpcomingEcheances(days = 7) {
  const results = [];
  for (let d = 1; d <= days; d++) {
    const future = new Date();
    future.setDate(future.getDate() + d);
    const day = future.getDate();
    const month = future.getMonth() + 1;
    const weekday = future.getDay();

    for (const item of CRM_DATA.planning) {
      if (isEcheanceToday(item, day, month, weekday, future)) {
        const entreprises = resolveEntreprises(item.categories);
        results.push({
          ...item,
          nbEntreprises: entreprises.length,
          isToday: false,
          dansXJours: d,
          dateFuture: future.toLocaleDateString("fr-FR")
        });
      }
    }
  }
  return results;
}

function isEcheanceToday(item, day, month, weekday, dateObj) {
  const date = item.date.toLowerCase();

  if (date.includes("1er jour ouvré du mois")) {
    return isFirstWorkingDayOfMonth(dateObj);
  }
  if (date.includes("1er juillet")) return day === 1 && month === 7;
  if (date.includes("1er février")) return day === 1 && month === 2;
  if (date.includes("1er juin")) return day === 1 && month === 6;
  if (date.includes("30 avril")) return day === 30 && month === 4;
  if (date.includes("10 juin")) return day === 10 && month === 6;
  if (date.includes("25 juin")) return day === 25 && month === 6;
  if (date.includes("10 novembre")) return day === 10 && month === 11;
  if (date.includes("25 novembre")) return day === 25 && month === 11;
  if (date.includes("5 décembre")) return day === 5 && month === 12;
  if (date.includes("10 décembre")) return day === 10 && month === 12;
  if (date.includes("15 décembre")) return day === 15 && month === 12;
  if (date.includes("22 décembre")) return day === 22 && month === 12;
  if (date.includes("10 janvier")) return day === 10 && month === 1;
  if (date.includes("25 janvier")) return day === 25 && month === 1;
  if (date.includes("10 février")) return day === 10 && month === 2;
  if (date.includes("11 de chaque mois")) return day === 11;

  // Fin de trimestre
  if (date.includes("10 mars / 10 juin / 10 sept / 10 déc")) {
    return day === 10 && [3, 6, 9, 12].includes(month);
  }
  if (date.includes("25 mars / 25 juin / 25 sept / 25 déc")) {
    return day === 25 && [3, 6, 9, 12].includes(month);
  }

  return false;
}

function isFirstWorkingDayOfMonth(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
  return d.getDate() === date.getDate() && d.getMonth() === date.getMonth();
}
