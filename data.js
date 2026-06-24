// ============================================================
// DATA.JS — Base de données CRM : contacts, modèles, planning
// ============================================================

const CRM_DATA = {

  // ── CONTACTS ────────────────────────────────────────────────
  contacts: [
    { id: 1, dossier: "320hz", nom: "TRIPARD", prenom: "Maxime", mail: "maxime.tripard@gmail.com", tel: "0642614427", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 2, dossier: "320hz", nom: "Pierre", prenom: "Laurence", mail: "laurencepierrelp@free.fr", tel: "0677504171", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 3, dossier: "320hz", nom: "ARCANGELETTI", prenom: "Isïa", mail: "isiaarcangeletti@gmail.com", tel: "0689139340", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 4, dossier: "AOMI STATION", nom: "BEN AROUCH", prenom: "Sonia", mail: "sonia.benarouch@aomistation.com", tel: "0652006336", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 5, dossier: "ATELIER TURRI", nom: "TURRI", prenom: "Michael", mail: "michael.turri@mac.com", tel: "0652793890", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - VOUVOYER", s: "" },
    { id: 6, dossier: "AUTAKE", nom: "FOUCHER", prenom: "Simon", mail: "simonfoucher79@gmail.com", tel: "0607417798", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 7, dossier: "BAB'KY", nom: "ABOULKER", prenom: "Alice", mail: "contact@babky.fr", tel: "0663351837", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 8, dossier: "BATIEXPO 95", nom: "BOUITROUCHENE", prenom: "Samir", mail: "bouitrouchenesamir@yahoo.fr", tel: "0618668901", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L SEUL - TUTOYER", s: "" },
    { id: 9, dossier: "BI CAPITAL", nom: "ITEANU", prenom: "Benjamin", mail: "benjamin.iteanu@gmail.com", tel: "0612844511", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "S C/C" },
    { id: 10, dossier: "BLF MEDIA", nom: "Bacchi", prenom: "Layanne", mail: "blf.mediapro@gmail.com", tel: "0621312064", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 11, dossier: "BNC ALEXANDRE BASSARD", nom: "Bassard", prenom: "Alexandre", mail: "alexandre.bassard63@gmail.com", tel: "0683035240", statut: "Client", fm: "FM EI", tva: "TVA M", l: "L SEUL - TUTOYER", s: "" },
    { id: 12, dossier: "BNC ANNAELLE CHETRIT", nom: "CHETRIT", prenom: "Annaëlle", mail: "annaellechetrit@yahoo.fr", tel: "06 29 89 55 38", statut: "Client", fm: "FM EI", tva: "TVA N/A", l: "L SEUL - TUTOYER", s: "S esp" },
    { id: 13, dossier: "BNC DANIEL COHEN", nom: "COHEN", prenom: "Daniel", mail: "dr.daniel.cohen@outlook.com", tel: "06 62 70 56 01", statut: "Client", fm: "FM EI", tva: "TVA N/A", l: "L SEUL - TUTOYER", s: "S esp" },
    { id: 14, dossier: "BNC FLORA BRAC DE LA PERRIERE", nom: "BRAC DE LA PERRIERE", prenom: "Flora", mail: "flora.bracdelaperriere@gmail.com", tel: "0634360270", statut: "Client", fm: "FM EI", tva: "TVA M", l: "L SEUL - TUTOYER", s: "" },
    { id: 15, dossier: "BNC ILAN FITOUSSI", nom: "Fitoussi", prenom: "Ilan", mail: "i.fitoussi@slidersstudio.com", tel: "0624961678", statut: "Client", fm: "FM EI", tva: "TVA T", l: "L GROUPE - TUTOYER", s: "" },
    { id: 16, dossier: "BNC ILAN FITOUSSI", nom: "Habib", prenom: "Anne-Claire", mail: "admin@slidersstudio.com", tel: "0609161292", statut: "Client", fm: "FM EI", tva: "TVA T", l: "L GROUPE - TUTOYER", s: "" },
    { id: 17, dossier: "BNC INGRID COS FITOUSSI", nom: "FITOUSSI", prenom: "INGRID", mail: "ingridcospsy@gmail.com", tel: "0782866540", statut: "Client", fm: "FM EI", tva: "TVA N/A", l: "L SEUL - TUTOYER", s: "S esp" },
    { id: 18, dossier: "BNC ISÏA ARCANGELETTI", nom: "ARCANGELETTI", prenom: "Isïa", mail: "isiaarcangeletti@gmail.com", tel: "0689139340", statut: "Client", fm: "FM EI", tva: "TVA N/A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 19, dossier: "BNC ISÏA ARCANGELETTI", nom: "Pierre", prenom: "Laurence", mail: "laurencepierrelp@free.fr", tel: "0677504171", statut: "Client", fm: "FM EI", tva: "TVA N/A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 20, dossier: "BNC JENNIFER HEINEGG", nom: "Heinegg", prenom: "Jennifer", mail: "jheinegg.md@proton.me", tel: "06 51 38 88 36", statut: "Client", fm: "FM EI", tva: "TVA N/A", l: "L SEUL - VOUVOYER", s: "S esp" },
    { id: 21, dossier: "BNC NESRINE SAHLI", nom: "SAHLI", prenom: "Nesrine", mail: "nesrine.sahli.law@gmail.com", tel: "0663369772", statut: "Client", fm: "FM EI", tva: "TVA M", l: "L SEUL - TUTOYER", s: "" },
    { id: 22, dossier: "CECI France", nom: "BAZGONEH", prenom: "Marc", mail: "mbazgoneh@gmail.com", tel: "0608584669", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "S Véhicule" },
    { id: 23, dossier: "CECI France", nom: "Badiane", prenom: "Sophie", mail: "comptabilite@cecifrance.com", tel: "0652099376", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "S Véhicule" },
    { id: 24, dossier: "CHEESECAKE AND THE CITY", nom: "Benedetti", prenom: "Clarisse", mail: "clarissebenedetti@hotmail.com", tel: "0643925440", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L SEUL - VOUVOYER", s: "S Caisse" },
    { id: 25, dossier: "CLICFACE", nom: "BELLAICH", prenom: "Jériel", mail: "divers@clicface.fr", tel: "0688887012", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - VOUVOYER", s: "" },
    { id: 26, dossier: "CLICFACE", nom: "BELLAICH", prenom: "Raoul", mail: "raoul.bellaich@clicface.fr", tel: "0688887012", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - VOUVOYER", s: "" },
    { id: 27, dossier: "EURL CHEFITOUSS", nom: "Fitoussi", prenom: "Alexandre", mail: "alexfitou@gmail.com", tel: "0649475494", statut: "Client", fm: "FM SARL", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 28, dossier: "GUILLAUME ALEXANDRE LE MORVAN", nom: "LE MORVAN", prenom: "Guillaume", mail: "guillaumelemorvan@gmail.com", tel: "0649233988", statut: "Client", fm: "FM SARL", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 29, dossier: "HOLVBS", nom: "NOGUEIRA", prenom: "Johnny", mail: "nogueira.johnny@gmail.com", tel: "0627037752", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L SEUL - TUTOYER", s: "S Véhicule" },
    { id: 30, dossier: "IG Ventures", nom: "GOLLUNGBERG", prenom: "Isabella", mail: "isaisabellam@hotmail.com", tel: "0611143774", statut: "Client", fm: "FM SARL", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 31, dossier: "INVENTEETH", nom: "Laplace", prenom: "Clément", mail: "clement@inventeeth.com", tel: "0613571939", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "S Stock" },
    { id: 32, dossier: "JCC ELEC 95", nom: "CRAMETTE", prenom: "Jean christophe", mail: "jccelec95@live.fr", tel: "0635467112", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L SEUL - VOUVOYER", s: "S Stock" },
    { id: 33, dossier: "JULIOR MULTISERVICES", nom: "ANKRY", prenom: "MAHLONE", mail: "juliormultiservices@gmail.com", tel: "0616970044", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L SEUL - TUTOYER", s: "S Véhicule" },
    { id: 34, dossier: "BNC MICHELLE LAHANA", nom: "LAHANA", prenom: "MICHELLE", mail: "michellelahana@icloud.com", tel: "0615063088", statut: "Client", fm: "FM EI", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 35, dossier: "LD IMMOBILIER", nom: "DUFLOS", prenom: "Louis", mail: "skincarebylouisoff@gmail.com", tel: "0786832924", statut: "Client", fm: "FM SCI", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 36, dossier: "LD IMMOBILIER", nom: "HOAREAU", prenom: "Frédérique", mail: "comptabilite.skincarebylouisoff@gmail.com", tel: "0764808242", statut: "Client", fm: "FM SCI", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 37, dossier: "LITTLE WILD SUN", nom: "DAUM", prenom: "NATASHA", mail: "little-wild-sun@hotmail.com", tel: "0759589403", statut: "Client", fm: "FM SARL", tva: "TVA T", l: "L SEUL - TUTOYER", s: "" },
    { id: 38, dossier: "LMNP BRIGITTE GOURBETIAN", nom: "GOURBETIAN", prenom: "BRIGITTE", mail: "bgourbetian@gmail.com", tel: "0685562905", statut: "Client", fm: "FM LMNP", tva: "TVA N/A", l: "L SEUL - VOUVOYER", s: "" },
    { id: 39, dossier: "LOKKA IMMO", nom: "FOUCHER", prenom: "Simon", mail: "simonfoucher79@gmail.com", tel: "0607417798", statut: "Client", fm: "FM SAS", tva: "TVA T", l: "L SEUL - TUTOYER", s: "" },
    { id: 40, dossier: "MA JOIE", nom: "Fazio", prenom: "Ilaria", mail: "ilaria.fazio@ma-joie.com", tel: "+393203314837", statut: "Client", fm: "FM SAS", tva: "TVA T", l: "L SEUL - TUTOYER", s: "S Stock" },
    { id: 41, dossier: "MAIKOM DESIGN STUDIO", nom: "LUTZKER", prenom: "Milena", mail: "lutzkermilena@gmail.com", tel: "06 69 38 40 44", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 42, dossier: "MAPLAD", nom: "CAPPELLI", prenom: "Nicolas", mail: "nicolas.cappelli@maplad.fr", tel: "07 77 69 65 20", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - VOUVOYER", s: "S C/C S Véhicule" },
    { id: 43, dossier: "MAPLAD", nom: "MANUELE", prenom: "Giuseppe", mail: "giuseppe.manuele@maplad.it", tel: "+393358434052", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - VOUVOYER", s: "S C/C S Véhicule" },
    { id: 44, dossier: "MARCHI GROUPE", nom: "TOUBIANA", prenom: "Maxence", mail: "maxence@maisonsarchimed.com", tel: "06 13 74 16 83", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 45, dossier: "MARCHI GROUPE", nom: "TOUBIANA", prenom: "Venceslas", mail: "venceslas@maisonsarchimed.com", tel: "06 46 33 77 11", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 46, dossier: "MARCHI VIE", nom: "TOUBIANA", prenom: "Maxence", mail: "maxence@maisonsarchimed.com", tel: "06 13 74 16 83", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 47, dossier: "MARCHI VIE", nom: "TOUBIANA", prenom: "Venceslas", mail: "venceslas@maisonsarchimed.com", tel: "06 46 33 77 11", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 48, dossier: "MAXIM ANDREE LEONE", nom: "ARMANN", prenom: "Maxim", mail: "maximarmann@gmail.com", tel: "06 69 12 21 14", statut: "Client", fm: "FM SARL", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 49, dossier: "MD CONSULTING", nom: "DERY", prenom: "Michael", mail: "michael.dery@augure.io", tel: "06 46 76 36 21", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "S C/C" },
    { id: 50, dossier: "MOMENTO", nom: "Fitoussi", prenom: "Alexandre", mail: "alexfitou@gmail.com", tel: "0649475494", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "S Caisse S Stock S Véhicule" },
    { id: 51, dossier: "MOMENTO", nom: "CHETRIT", prenom: "Yohan", mail: "yohan.chet@hotmail.fr", tel: "0613490980", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "S Caisse S Stock S Véhicule" },
    { id: 52, dossier: "MRG MLT", nom: "TOUBIANA", prenom: "Maxence", mail: "maxence@maisonsarchimed.com", tel: "06 13 74 16 83", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 53, dossier: "NEPHEA", nom: "Pierre", prenom: "Laurence", mail: "laurencepierrelp@free.fr", tel: "0677504171", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 54, dossier: "NEPHEA", nom: "ARCANGELETTI", prenom: "Isïa", mail: "isiaarcangeletti@gmail.com", tel: "0689139340", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 55, dossier: "NEW BAT", nom: "DRIRA", prenom: "Abdessattar", mail: "newbat_entreprise@yahoo.fr", tel: "06 60 43 67 55", statut: "Client", fm: "FM SARL", tva: "TVA A", l: "L SEUL - TUTOYER", s: "S Véhicule" },
    { id: 56, dossier: "NOGUEIRA FIT", nom: "NOGUEIRA", prenom: "Johnny", mail: "nogueira.johnny@gmail.com", tel: "0627037752", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L SEUL - TUTOYER", s: "S Stock" },
    { id: 57, dossier: "OME", nom: "PITON", prenom: "François", mail: "francois@waivecover.com", tel: "07 85 13 05 87", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L SEUL - TUTOYER", s: "S C/C" },
    { id: 58, dossier: "ONELOGY", nom: "BAZGONEH", prenom: "Marc", mail: "mbazgoneh@gmail.com", tel: "0608584669", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "S Stock" },
    { id: 59, dossier: "ONELOGY", nom: "Badiane", prenom: "Sophie", mail: "comptabilite@cecifrance.com", tel: "0652099376", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "S Stock" },
    { id: 60, dossier: "ONELOGY", nom: "BAZGONEH", prenom: "Roxana", mail: "roxana@onelogy.com", tel: "+16466896819", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "S Stock" },
    { id: 61, dossier: "ROJUMA", nom: "POCHETON", prenom: "Romain", mail: "romain.pocheton@gmail.com", tel: "06 01 47 06 08", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "S C/C" },
    { id: 62, dossier: "ROJUMA", nom: "POCHETON", prenom: "Romain", mail: "pocheton.julien@gmail.com", tel: "06 43 32 10 62", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "S C/C" },
    { id: 63, dossier: "ROMEE PARIS", nom: "Dordet", prenom: "Faustine", mail: "faustine@romee-paris.com", tel: "06 69 06 47 30", statut: "Client", fm: "FM SARL", tva: "TVA A", l: "L SEUL - TUTOYER", s: "S Stock" },
    { id: 64, dossier: "SBL PRODUCTION", nom: "DUFLOS", prenom: "Louis", mail: "skincarebylouisoff@gmail.com", tel: "0786832924", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 65, dossier: "SBL PRODUCTION", nom: "HOAREAU", prenom: "Frédérique", mail: "comptabilite.skincarebylouisoff@gmail.com", tel: "0764808242", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 66, dossier: "Sliders Studio", nom: "Fitoussi", prenom: "Ilan", mail: "i.fitoussi@slidersstudio.com", tel: "0624961678", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 67, dossier: "Sliders Studio", nom: "Habib", prenom: "Anne-Claire", mail: "admin@slidersstudio.com", tel: "0609161292", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "" },
    { id: 68, dossier: "TAKAMI", nom: "AKDIME", prenom: "Toufitri", mail: "toufitri@akdime.com", tel: "06 79 18 93 78", statut: "Client", fm: "FM SARL", tva: "TVA A", l: "L SEUL - TUTOYER", s: "S C/C" },
    { id: 69, dossier: "THE PARIS ELOPEMENT", nom: "TRAN", prenom: "Kieu Khanh Linh", mail: "contact@elopement.paris", tel: "07 82 65 0 89", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 70, dossier: "TOROHANA", nom: "TRAN", prenom: "Kieu Khanh Linh", mail: "contact@elopement.paris", tel: "07 82 65 0 89", statut: "Client", fm: "FM SARL", tva: "TVA T", l: "L GROUPE - TUTOYER", s: "" },
    { id: 71, dossier: "TRUESAFE", nom: "KOZHARSKII", prenom: "Iurii", mail: "truesafeit@gmail.com", tel: "07 83 45 24 52", statut: "Client", fm: "FM SARL", tva: "TVA N/A", l: "L SEUL - VOUVOYER", s: "" },
    { id: 72, dossier: "U.T.S", nom: "FOUCHER", prenom: "Simon", mail: "simonfoucher79@gmail.com", tel: "0607417798", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L SEUL - TUTOYER", s: "" },
    { id: 73, dossier: "VANILLIA", nom: "Gardereau", prenom: "Camille", mail: "gardereaucamille@gmail.com", tel: "06 18 04 12 38", statut: "Client", fm: "FM SARL", tva: "TVA T", l: "L SEUL - TUTOYER", s: "" },
    { id: 74, dossier: "WALEGO", nom: "LE ROY", prenom: "Salomé", mail: "sleroy@exoqua.com", tel: "06 40 12 55 12", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L SEUL - TUTOYER", s: "S C/C" },
    { id: 75, dossier: "WETHODORP", nom: "TRIPARD", prenom: "Maxime", mail: "maxime.tripard@gmail.com", tel: "0642614427", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 76, dossier: "WETHETRACK", nom: "TRIPARD", prenom: "Maxime", mail: "maxime.tripard@gmail.com", tel: "0642614427", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "S C/C" },
    { id: 77, dossier: "WETHETRACK", nom: "", prenom: "Davy", mail: "davy@wethetrack.com", tel: "", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "S C/C" },
    { id: 78, dossier: "YCHETRIT", nom: "CHETRIT", prenom: "Yohan", mail: "yohan.chet@hotmail.fr", tel: "0613490980", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 79, dossier: "YVY TRINIDAD", nom: "TOUBIANA", prenom: "Venceslas", mail: "venceslas@maisonsarchimed.com", tel: "06 46 33 77 11", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 80, dossier: "DELPHINE BARNAVON CONSULTING", nom: "BARNAVON", prenom: "Delphine", mail: "barnavon.delphine@gmail.com", tel: "06 50 09 26 74", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 81, dossier: "DELPHINE BARNAVON CONSULTING", nom: "", prenom: "Caroline", mail: "consulting@delphinebarnavon.com", tel: "", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 82, dossier: "BNC AMANDINE DORGET", nom: "DORGET", prenom: "Amandine", mail: "dramandinedorget@outlook.com", tel: "06 77 04 78 04", statut: "Client", fm: "FM EI", tva: "TVA N/A", l: "L SEUL - TUTOYER", s: "S esp" },
    { id: 83, dossier: "PAPISCO", nom: "LOPES", prenom: "Lou-Anne", mail: "louannelopesad@gmail.com", tel: "06 05 31 04 56", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 84, dossier: "PAPISCO", nom: "GERARD", prenom: "Céline", mail: "celine.gerard90@laposte.net", tel: "", statut: "Client", fm: "FM SARL", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 85, dossier: "OCULUS", nom: "LEMAILE", prenom: "Benjamin", mail: "benjamin@agenceradar.com", tel: "06 26 43 65 74", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L SEUL - TUTOYER", s: "S C/C" },
    { id: 86, dossier: "OBSTINA", nom: "LEMAILE", prenom: "Benjamin", mail: "benjamin@agenceradar.com", tel: "06 26 43 65 74", statut: "Client", fm: "FM SARL", tva: "TVA A", l: "L SEUL - TUTOYER", s: "S C/C" },
    { id: 87, dossier: "BASED OUT", nom: "LE BRIS", prenom: "Pierre", mail: "pierre@basedin.art", tel: "06 95 08 32 75", statut: "Client", fm: "FM SAS", tva: "TVA T", l: "L SEUL - TUTOYER", s: "S C/C" },
    { id: 88, dossier: "TB CREATIONS", nom: "BACCHI", prenom: "Thianne", mail: "tb.creationspro@gmail.com", tel: "06 11 64 74 10", statut: "Client", fm: "FM SAS", tva: "TVA M", l: "L GROUPE - TUTOYER", s: "" },
    { id: 89, dossier: "MOMENTO LAB", nom: "Fitoussi", prenom: "Alexandre", mail: "alexfitou@gmail.com", tel: "0649475494", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "S Stock" },
    { id: 90, dossier: "MOMENTO LAB", nom: "CHETRIT", prenom: "Yohan", mail: "yohan.chet@hotmail.fr", tel: "0613490980", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L GROUPE - TUTOYER", s: "S Stock" },
    { id: 91, dossier: "PREMIERE LIGNE", nom: "DUCOS", prenom: "Ambroise", mail: "ambroiseducos@gmail.com", tel: "06 89 99 78 64", statut: "Client", fm: "FM SAS", tva: "TVA T", l: "L SEUL - TUTOYER", s: "" },
    { id: 92, dossier: "SELARL DU DR VIANNEY ANDZEMBE", nom: "ANDZEMBE", prenom: "Vianney", mail: "vianney_ulrich@hotmail.fr", tel: "07 82 43 84 82", statut: "Client", fm: "FM SARL", tva: "TVA N/A", l: "L SEUL - VOUVOYER", s: "S esp" },
    { id: 93, dossier: "BNC TIMOTHEE LEVY", nom: "LEVY", prenom: "Timothée", mail: "timotheelevy@outlook.fr", tel: "06 85 49 56 09", statut: "Client", fm: "FM EI", tva: "TVA M", l: "L SEUL - TUTOYER", s: "" },
    { id: 94, dossier: "COUNCIL HOME SERVICE", nom: "ANTCHOUE", prenom: "Jean-Pierre", mail: "councilhomeservices@gmail.com", tel: "06 66 71 39 30", statut: "Client", fm: "FM SARL", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 95, dossier: "AUDIOLOGY", nom: "ADDA", prenom: "Cynthia", mail: "cynthia.adda@gmail.com", tel: "06 17 30 66 73", statut: "Client", fm: "FM SARL", tva: "TVA A", l: "L SEUL - VOUVOYER", s: "" },
    { id: 96, dossier: "INGSH", nom: "LUGREZI", prenom: "Maria", mail: "maria.lugrezi@gmail.com", tel: "06 89 76 25 82", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" },
    { id: 97, dossier: "RADAR PRODUCTION", nom: "LEMAILE", prenom: "Benjamin", mail: "benjamin@agenceradar.com", tel: "06 26 43 65 74", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "S C/C" },
    { id: 98, dossier: "INGSH", nom: "LUGREZI", prenom: "Maria", mail: "maria.lugrezi@gmail.com", tel: "06 89 76 25 82", statut: "Client", fm: "FM SAS", tva: "TVA A", l: "L SEUL - TUTOYER", s: "" }
  ],

  // ── MODÈLES DE MAILS ────────────────────────────────────────
  templates: [
    {
      id: "CFE",
      nom: "CLIENT - AVIS CFE",
      objet: "[ENTREPRISE] - AVIS CFE",
      categories: ["tous"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Tu trouveras ci-joint l'avis de CFE de l'année.

Le montant à payer s'élève à [Montant].

Pour rappel, cette taxe est déterminée directement par l'administration fiscale à partir de la valeur locative cadastrale des locaux utilisés dans le cadre de l'activité, avec un taux appliqué selon la commune.

Le paiement de la CFE sera réalisé par prélèvement à la fin du mois de décembre.

Bien cordialement`
    },
    {
      id: "PREVENTION_TRESO",
      nom: "Client - Prévention trésorerie",
      objet: "[ENTREPRISE] - ANTICIPATION DES ECHEANCES A VENIR",
      categories: ["tous"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Avec les différentes échéances fiscales (TVA + IS) à venir sur la période mai / juin / juillet, je souhaitais simplement attirer ton attention sur l'importance d'anticiper leur impact sur ta trésorerie.

N'hésite pas à me faire un retour si tu penses rencontrer une difficulté particulière, afin que nous puissions en échanger.

Bien cordialement`
    },
    {
      id: "DOSSIERS_A_DERNIERES_PIECES",
      nom: "DOSSIERS A - DERNIERES PIECES COMPTABLES POUR BILAN",
      objet: "[ENTREPRISE] - DERNIERES PIECES COMPTABLES DE L'ANNEE",
      categories: ["TVA A", "TVA N/A"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Dans le cadre de la préparation du bilan, tu trouveras sur Pennylane les demandes comptables finales pour sa réalisation.

Peux-tu déposer l'ensemble des dernières pièces comptables de l'année au plus tard pour le 31/01 ?

Je reviendrai ensuite vers toi afin de planifier la présentation du bilan.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "DOSSIERS_A_MAJ",
      nom: "DOSSIERS A - MISE A JOUR COMPTABILITE",
      objet: "[ENTREPRISE] - MISE A JOUR COMPTABILITE",
      categories: ["TVA A"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Pour rappel, le régime de TVA de [Entreprise] est la déclaration annuelle.

Dans ce cadre, des acomptes sont à prévoir sur les mois de juillet et décembre.

De notre côté, nous privilégions un calcul basé sur la TVA réellement due sur la période. Cela permet d'éviter les écarts à la régularisation finale et d'avancer plus sereinement sur le bilan.

Pour cela, nous devons mettre à jour la comptabilité.

Tu retrouveras sur Pennylane les demandes comptables. Peux-tu déposer l'ensemble des factures correspondantes et essayer de te tenir à jour jusqu'à la fin du mois ?

Cela nous permettra de récupérer un maximum de TVA sur tes achats, tout en assurant un bon suivi de ton activité.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "DOSSIERS_A_RAPPEL_DERNIERES",
      nom: "DOSSIERS A - RAPPEL DERNIERES PIECES COMPTABLES POUR BILAN",
      objet: "[ENTREPRISE] - RAPPEL DERNIERES PIECES COMPTABLES DE L'ANNEE",
      categories: ["TVA A", "TVA N/A"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Pour rappel, les dernières pièces comptables nécessaire à la préparation du bilan sont disponibles sur Pennylane.

Peux-tu déposer l'ensemble des justificatifs correspondants au plus tard pour le 31/01 ?

Cela nous permettra en interne de planifier dès maintenant la réalisation du bilan et donc, de te le présenter le plus rapidement possible.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "DOSSIERS_A_RAPPEL_MAJ",
      nom: "DOSSIERS A - RAPPEL MISE A JOUR COMPTABILITE",
      objet: "[ENTREPRISE] - RAPPEL MISE A JOUR COMPTABILITE",
      categories: ["TVA A"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Pour rappel, le régime de TVA de [Entreprise] est la déclaration annuelle et nous devons finaliser la mise à jour de la comptabilité.

Peux-tu déposer l'ensemble des factures manquantes de la période pour le 05 du mois suivant ?

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "DOSSIERS_M_RAPPEL_10",
      nom: "DOSSIERS M - RAPPEL PIECES COMPTABLES AU 10",
      objet: "[ENTREPRISE] - RAPPEL DEPÔT DES PIECES COMPTABLES AU 10",
      categories: ["TVA M"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Je me permets de te faire un rappel concernant l'envoi des pièces comptables.

Afin de pouvoir mettre à jour la comptabilité dans de bonnes conditions et revenir vers toi si besoin, nous avons besoin de recevoir les éléments avant le 10 du mois.

Cela nous permettra de récupérer un maximum de TVA déductible, mais également d'assurer le bon suivi de ton activité.

Merci par avance pour ton retour.
Bien cordialement`
    },
    {
      id: "DOSSIERS_MT_DERNIERES",
      nom: "DOSSIERS M+T - DERNIERES PIECES COMPTABLES POUR BILAN",
      objet: "[ENTREPRISE] - DERNIERES PIECES COMPTABLES",
      categories: ["TVA M", "TVA T"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Dans le cadre de la préparation du bilan, tu trouveras sur Pennylane les demandes comptables nécessaires à sa réalisation.

Peux-tu déposer l'ensemble des dernières pièces comptables de l'année au plus tard pour le 15/02 ?

Cela nous permettra en interne de planifier la réalisation du bilan et de te le présenter le plus rapidement possible.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "DOSSIERS_MT_RAPPEL_DERNIERES",
      nom: "DOSSIERS M+T - RAPPEL DERNIERES PIECES COMPTABLES POUR BILAN",
      objet: "[ENTREPRISE] - RAPPEL DERNIERES PIECES COMPTABLES DE L'ANNEE",
      categories: ["TVA M", "TVA T"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Pour rappel, les demandes comptables nécessaires à la préparation du bilan sont présentes sur Pennylane.

Peux-tu déposer l'ensemble des dernières pièces comptables de l'année au plus tard pour le 15/02 ?

Cela nous permettra en interne d'organiser au mieux la réalisation du bilan et de te le présenter dans les meilleurs délais.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "DOSSIERS_MT_RELANCE",
      nom: "DOSSIERS M+T - RELANCE DEPOT DES PIECES",
      objet: "[ENTREPRISE] - 2ème RELANCE - DEPÔT DES PIECES COMPTABLES",
      categories: ["TVA M", "TVA T"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Malgré mon précédent message concernant le dépôt des pièces, je n'ai pas encore le nécessaire sur Pennylane.

Sais-tu à quelle date tu pourras effectuer le dépôt ? Cela me permettra de m'organiser afin de pouvoir traiter les éléments dans les délais.

Sans un retour de ta part au moins sur la date de dépôt, je ne peux pas garantir le traitement des éléments à temps.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "DOSSIERS_T_RAPPEL",
      nom: "DOSSIERS T - RAPPEL DEPOT DES PIECES",
      objet: "[ENTREPRISE] - RAPPEL MISE A JOUR COMPTABILITE",
      categories: ["TVA T"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Pour rappel, nous devons finaliser la mise à jour comptable de ce trimestre dans le courant du mois prochain, notamment pour la déclaration de TVA.

Afin que l'on puisse avancer dans de bonnes conditions, je t'invite à déposer les factures sur Pennylane pour la fin du mois.

Merci par avance pour ton retour.
Bien cordialement`
    },
    {
      id: "DOSSIERS_T_2EME_RAPPEL",
      nom: "DOSSIERS T - 2EME RAPPEL DEPOT DES PIECES",
      objet: "[ENTREPRISE] - 2ème RAPPEL MISE A JOUR COMPTA",
      categories: ["TVA T"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Pour rappel, nous devons finaliser la mise à jour comptable de ce trimestre dans le courant du mois prochain, notamment pour la déclaration de TVA.

Peux-tu finaliser le dépôt des pièces sur Pennylane pour le 05 du mois suivant ? Cela me permettra de m'organiser pour assurer le traitement des éléments dans les délais.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "FM_AJUSTEMENT_REM",
      nom: "FM SARL + FM EI - AJUSTEMENT REMUNERATION",
      objet: "[ENTREPRISE] - POINT REMUNERATION",
      categories: ["FM SARL", "FM EI"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Je souhaitais faire un point sur l'évolution de ton activité depuis le début d'année.

Cela nous permettra de comparer avec les projections que tu avais indiquées en début d'année et d'ajuster si nécessaire ta rémunération sur l'ensemble de l'année.

L'objectif est également d'anticiper correctement les cotisations afin d'éviter toute régularisation importante sur l'année suivante.

Si tu le souhaites, on peut prévoir un point ensemble pour ajuster tout cela.

Merci d'avance pour ton retour
Bien cordialement`
    },
    {
      id: "FM_PROJECTION_REM",
      nom: "FM SARL + FM EI - PROJECTION ACTIVITE-REMUNERATION",
      objet: "[ENTREPRISE] - PROJECTION REMUNERATION",
      categories: ["FM SARL", "FM EI"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Dans le cadre de cette nouvelle année, je souhaitais faire un point avec toi sur tes perspectives d'activité. Cela nous permettra notamment d'anticiper au mieux ta rémunération et de l'adapter si nécessaire en fonction de tes objectifs.

As-tu déjà une vision sur l'évolution de ton activité sur cette année et de la rémunération que tu souhaiterais te verser ?

Si tu as besoin du bilan de l'année écoulée pour y réfléchir, nous pourrons en parler et faire le point ensemble lors de la présentation de ton bilan.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "S_CAISSE_GESTION",
      nom: "S CAISSE - GESTION DE LA CAISSE",
      objet: "[ENTREPRISE] - VALIDATION CAISSE POUR BILAN",
      categories: ["S Caisse"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

À l'approche de la fin d'année, et donc pour la réalisation du bilan, je me permets de te rappeler la nécessité de contrôler le solde final de ta caisse au 31/12 avec les éléments suivants :

- Les encaissements en espèces sur l'année
- Les éventuelles dépenses réalisées en espèces (à reporter sur le logiciel de caisse)
- Les dépôts d'espèces effectués sur l'exercice
- Le solde final de la caisse.

Ces contrôles permettent de s'assurer de la cohérence entre le solde comptable de caisse et le solde réel.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "S_ESPECES_GESTION",
      nom: "S ESPECES - GESTION DES ESPECES",
      objet: "[ENTREPRISE] - PREPARATION DU BILAN - GESTION DES ESPECES",
      categories: ["S esp"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

À l'approche de la fin d'année, et donc pour la réalisation du bilan, je me permets de te rappeler la nécessité de déposer les derniers encaissements en espèces en banque si nécessaire avant le 31/12.

À défaut, nous aurons besoin d'un récapitulatif des encaissements en espèces sur l'année.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "S_STOCK_INVENTAIRE",
      nom: "S STOCK - REALISATION INVENTAIRE POUR BILAN",
      objet: "[ENTREPRISE] - PREPRATION BILAN - RAPPEL REALISATION INVENTAIRE",
      categories: ["S Stock"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

À l'approche de la fin d'année et pour la réalisation du bilan, je me permets de te rappeler la nécessité de réaliser l'inventaire au 31/12.

Cet inventaire nous permettra de valoriser correctement le stock dans le cadre de l'établissement des comptes.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "S_STOCK_RAPPEL_INVENTAIRE",
      nom: "S STOCK - RAPPEL REALISATION INVENTAIRE POUR BILAN",
      objet: "[ENTREPRISE] - PREPRATION BILAN - RAPPEL REALISATION INVENTAIRE",
      categories: ["S Stock"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Pour rappel, la réalisation de l'inventaire au 31/12 est nécessaire dans le cadre de la préparation du bilan.

Peux-tu me confirmer par mail une fois l'inventaire réalisé ? Et me le transmettre par la même occasion.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "S_STOCK_VALORISATION",
      nom: "S Stock - Stock à récupérer",
      objet: "[ENTREPRISE] - VALORISATION DU STOCK",
      categories: ["S Stock"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Dans le cadre de la préparation du bilan, pourrais-tu me transmettre l'inventaire au 31/12 avec le coût d'achat de chaque produit ?

Ces éléments nous permettront de valoriser correctement le stock dans les comptes.

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "S_VEHICULE_AND",
      nom: "S Véhicule - AND pour leasing",
      objet: "[ENTREPRISE] - PREPARATION BILAN - INFORMATIONS AMORTISSEMENT VEHICULE",
      categories: ["S Véhicule"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Dans le cadre de la préparation du bilan, nous devons déterminer la part d'amortissement non déductible (AND) des véhicules.

Pour les véhicules en location, ce calcul dépend notamment des informations communiquées par le bailleur, notamment la durée d'amortissement retenue.

Peux-tu te rapprocher de ton bailleur afin de récupérer cette information et me la transmettre ?

Merci d'avance pour ton retour.
Bien cordialement`
    },
    {
      id: "S_VEHICULE_CALCUL_TVS",
      nom: "S VEHICULE - CALCUL TVS",
      objet: "[ENTREPRISE] - CALCUL TVS",
      categories: ["S Véhicule"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Tu trouveras ci-joint la fiche de calcul de la taxe sur les véhicules de société (TVS).

Comme indiqué précédemment, ce montant sera ajouté à la déclaration de TVA.

Bien cordialement`
    },
    {
      id: "S_VEHICULE_ENVOI_TVS",
      nom: "S VEHICULE - Envoi TVS",
      objet: "[ENTREPRISE] - TVS",
      categories: ["S Véhicule"],
      corps: `Bonjour [Prénom],

J'espère que tu vas bien.

Tu trouveras ci-joint la fiche de calcul de la taxe sur les véhicules de société (TVS).

Comme indiqué précédemment, ce montant sera ajouté à la déclaration de TVA.

Bien cordialement`
    }
  ],

  // ── PLANNING ────────────────────────────────────────────────
  planning: [
    { id: 1, date: "1er jour ouvré du mois", recurrence: "mensuel", action: "Relance pièces compta pour le 10", categories: ["TVA M"], templateId: "DOSSIERS_M_RAPPEL_10" },
    { id: 2, date: "11 de chaque mois", recurrence: "mensuel", action: "Dernière relance pièces", categories: ["TVA M"], templateId: "DOSSIERS_MT_RELANCE" },
    { id: 3, date: "10 mars / 10 juin / 10 sept / 10 déc", recurrence: "trimestriel", action: "Demande MAJ pièces trimestrielles", categories: ["TVA T"], templateId: "DOSSIERS_T_RAPPEL" },
    { id: 4, date: "25 mars / 25 juin / 25 sept / 25 déc", recurrence: "trimestriel", action: "Rappel MAJ pièces trimestrielles", categories: ["TVA T"], templateId: "DOSSIERS_T_2EME_RAPPEL" },
    { id: 5, date: "30 avril", recurrence: "annuel", action: "Prévention trésorerie", categories: ["tous"], templateId: "PREVENTION_TRESO" },
    { id: 6, date: "10 juin", recurrence: "annuel", action: "Demande comptas 1er semestre", categories: ["TVA A"], templateId: "DOSSIERS_A_MAJ" },
    { id: 7, date: "25 juin", recurrence: "annuel", action: "Rappel comptas 1er semestre", categories: ["TVA A"], templateId: "DOSSIERS_A_RAPPEL_MAJ" },
    { id: 8, date: "1er juillet", recurrence: "annuel", action: "Ajustement rémunération", categories: ["FM SARL", "FM EI"], templateId: "FM_AJUSTEMENT_REM" },
    { id: 9, date: "10 novembre", recurrence: "annuel", action: "Demande comptas 2ème semestre", categories: ["TVA A"], templateId: "DOSSIERS_A_MAJ" },
    { id: 10, date: "25 novembre", recurrence: "annuel", action: "Rappel comptas 2ème semestre", categories: ["TVA A"], templateId: "DOSSIERS_A_RAPPEL_MAJ" },
    { id: 11, date: "25 novembre", recurrence: "annuel", action: "Rappel théorique TVS", categories: ["S Véhicule"], templateId: "S_VEHICULE_CALCUL_TVS" },
    { id: 12, date: "5 décembre", recurrence: "annuel", action: "Envoi CFE", categories: ["tous"], templateId: "CFE" },
    { id: 13, date: "10 décembre", recurrence: "annuel", action: "Envoi TVS", categories: ["S Véhicule"], templateId: "S_VEHICULE_ENVOI_TVS" },
    { id: 14, date: "10 décembre", recurrence: "annuel", action: "Rappel inventaire 31/12", categories: ["S Stock"], templateId: "S_STOCK_INVENTAIRE" },
    { id: 15, date: "15 décembre", recurrence: "annuel", action: "Rappel espèces banque (Caisse)", categories: ["S Caisse"], templateId: "S_CAISSE_GESTION" },
    { id: 16, date: "15 décembre", recurrence: "annuel", action: "Rappel espèces / récap (Espèces)", categories: ["S esp"], templateId: "S_ESPECES_GESTION" },
    { id: 17, date: "22 décembre", recurrence: "annuel", action: "2ème rappel inventaire 31/12", categories: ["S Stock"], templateId: "S_STOCK_RAPPEL_INVENTAIRE" },
    { id: 18, date: "10 janvier", recurrence: "annuel", action: "Dernières pièces pour le 31/01", categories: ["TVA A", "TVA N/A"], templateId: "DOSSIERS_A_DERNIERES_PIECES" },
    { id: 19, date: "10 janvier", recurrence: "annuel", action: "AND véhicule leasing", categories: ["S Véhicule"], templateId: "S_VEHICULE_AND" },
    { id: 20, date: "10 janvier", recurrence: "annuel", action: "Demande inventaire (stock)", categories: ["S Stock"], templateId: "S_STOCK_VALORISATION" },
    { id: 21, date: "25 janvier", recurrence: "annuel", action: "Rappel dernières pièces 31/01", categories: ["TVA A", "TVA N/A"], templateId: "DOSSIERS_A_RAPPEL_DERNIERES" },
    { id: 22, date: "25 janvier", recurrence: "annuel", action: "Dernières pièces pour le 15/02", categories: ["TVA M", "TVA T"], templateId: "DOSSIERS_MT_DERNIERES" },
    { id: 23, date: "1er février", recurrence: "annuel", action: "Projections + rémunération prévisionnelle", categories: ["FM SARL", "FM EI"], templateId: "FM_PROJECTION_REM" },
    { id: 24, date: "10 février", recurrence: "annuel", action: "Rappel dernières pièces 15/02", categories: ["TVA M", "TVA T"], templateId: "DOSSIERS_MT_RAPPEL_DERNIERES" }
  ],

  // ── COLLÈGUES ────────────────────────────────────────────────
  collegues: [
    { id: 1, prenom: "Collègue 1", mail: "" },
    { id: 2, prenom: "Collègue 2", mail: "" },
    { id: 3, prenom: "Collègue 3", mail: "" },
    { id: 4, prenom: "Collègue 4", mail: "" },
    { id: 5, prenom: "Collègue 5", mail: "" }
  ],

  // ── PARAMÈTRES ───────────────────────────────────────────────
  settings: {
    monEmail: "oukawen.mendes@myne.fr",
    modeTest: true,
    intervalleEnvoi: 10000 // 10 secondes en ms
  },

  // ── PRÉFÉRENCES DESTINATAIRES PAR ENTREPRISE ─────────────────
  // { dossier: "MAPLAD", a: [id1], cc: [id2], colleguesCc: [1,2] }
  preferences: []
};

// ── FONCTIONS UTILITAIRES ────────────────────────────────────

// Récupère tous les contacts d'un dossier
function getContactsByDossier(dossier) {
  return CRM_DATA.contacts.filter(c => c.dossier === dossier);
}

// Récupère toutes les entreprises uniques
function getAllDossiers() {
  return [...new Set(CRM_DATA.contacts.map(c => c.dossier))].sort();
}

// Filtre les contacts selon un critère de catégorie
function filterContactsByCategory(filterFn) {
  const dossiers = getAllDossiers();
  const result = [];
  for (const dossier of dossiers) {
    const contacts = getContactsByDossier(dossier);
    if (contacts.some(filterFn)) {
      result.push({ dossier, contacts });
    }
  }
  return result;
}

// Résout les entreprises selon les catégories du planning
function resolveEntreprises(categories) {
  if (categories.includes("tous")) {
    return getAllDossiers().map(dossier => ({
      dossier,
      contacts: getContactsByDossier(dossier)
    }));
  }

  const dossiers = getAllDossiers();
  const result = [];

  for (const dossier of dossiers) {
    const contacts = getContactsByDossier(dossier);
    const match = categories.some(cat => {
      if (cat.startsWith("TVA")) return contacts.some(c => c.tva === cat);
      if (cat.startsWith("FM")) return contacts.some(c => c.fm === cat);
      if (cat.startsWith("S")) return contacts.some(c => c.s && c.s.includes(cat));
      return false;
    });
    if (match) result.push({ dossier, contacts });
  }
  return result;
}

// Récupère les préférences d'une entreprise
function getPreferences(dossier) {
  return CRM_DATA.preferences.find(p => p.dossier === dossier) || null;
}

// Sauvegarde les préférences
function savePreferences(dossier, a, cc, colleguesCc) {
  const idx = CRM_DATA.preferences.findIndex(p => p.dossier === dossier);
  const pref = { dossier, a, cc, colleguesCc };
  if (idx >= 0) CRM_DATA.preferences[idx] = pref;
  else CRM_DATA.preferences.push(pref);
  localStorage.setItem("crm_preferences", JSON.stringify(CRM_DATA.preferences));
}

// Charge depuis localStorage
function loadFromStorage() {
  try {
    const contacts = localStorage.getItem("crm_contacts");
    if (contacts) CRM_DATA.contacts = JSON.parse(contacts);
    const prefs = localStorage.getItem("crm_preferences");
    if (prefs) CRM_DATA.preferences = JSON.parse(prefs);
    const collegues = localStorage.getItem("crm_collegues");
    if (collegues) CRM_DATA.collegues = JSON.parse(collegues);
    const settings = localStorage.getItem("crm_settings");
    if (settings) CRM_DATA.settings = { ...CRM_DATA.settings, ...JSON.parse(settings) };
    const planning = localStorage.getItem("crm_planning");
    if (planning) CRM_DATA.planning = JSON.parse(planning);
    const templates = localStorage.getItem("crm_templates");
    if (templates) CRM_DATA.templates = JSON.parse(templates);
  } catch(e) { console.error("Erreur chargement storage:", e); }
}

function saveContacts() {
  localStorage.setItem("crm_contacts", JSON.stringify(CRM_DATA.contacts));
}

function saveSettings() {
  localStorage.setItem("crm_settings", JSON.stringify(CRM_DATA.settings));
}

function saveCollegues() {
  localStorage.setItem("crm_collegues", JSON.stringify(CRM_DATA.collegues));
}

function savePlanning() {
  localStorage.setItem("crm_planning", JSON.stringify(CRM_DATA.planning));
}

function saveTemplates() {
  localStorage.setItem("crm_templates", JSON.stringify(CRM_DATA.templates));
}
