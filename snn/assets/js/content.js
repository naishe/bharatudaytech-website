/* ═══════════════════════════════════════════════════════════
   content.js — all copy + data in one place.
   In production this is what the CMS would serve as JSON,
   which is why nothing here is hard-coded into markup.
   Every record carries hi/en so the language toggle is a
   data concern, not a template concern.
   ═══════════════════════════════════════════════════════════ */
const TAX_URL = 'https://ptaxsnn.com/';
const MUTATION_URL = 'https://ptaxsnn.com/OnlineMutation.aspx';
const MUTATION_STATUS_URL = 'https://ptaxsnn.com/MutationStatus.aspx';

const UI = {
  hi: {
    skip:'मुख्य सामग्री पर जाएँ', govLine:'उत्तर प्रदेश शासन · नगर विकास विभाग',
    contrast:'उच्च कंट्रास्ट', menu:'मेन्यू',
    orgName:'नगर निगम सहारनपुर', orgNameAlt:'Saharanpur Municipal Corporation',
    navHome:'मुख्य पृष्ठ', navServices:'सेवाएँ', navNotices:'सूचना पट्ट', navMedia:'मीडिया केंद्र',
    navDepts:'विभाग', navGrievance:'शिकायत', navContact:'संपर्क', navAbout:'नगर निगम के बारे में',
    address:'गुरुद्वारा रोड, सहारनपुर — 247001, उत्तर प्रदेश',
    footServices:'प्रमुख सेवाएँ', footInfo:'जानकारी', footHelp:'हेल्पलाइन',
    footUp:'नगर विकास विभाग, उ.प्र. ↗',
    footGO:'शासनादेश ↗',
    copyright:'© 2026 नगर निगम सहारनपुर। सर्वाधिकार सुरक्षित।',
    demoNote:'प्रदर्शन प्रति (डेमो) — Nishant Labs द्वारा प्रस्तुत',

    heroKicker:'नागरिक सेवा पोर्टल',
    heroTitle:'आपका काम, <em>चार टैप</em> में।',
    heroLede:'गृहकर, शिकायत, जल बिल या प्रमाण पत्र — जो चाहिए, नीचे खोजें। कार्यालय आने की ज़रूरत नहीं।',
    findPlaceholder:'क्या करना है? जैसे — गृहकर, नाली, जन्म प्रमाण पत्र',
    findTry:'अक्सर खोजा गया:',
    findNone:'इस नाम की कोई सेवा नहीं मिली। हेल्पलाइन 0132-2648112 पर पूछें।',
    clear:'खाली करें',

    secTop:'सबसे ज़्यादा उपयोग', secTopT:'चार मुख्य काउंटर',
    secAll:'सेवा सूची', secAllT:'सभी नागरिक सेवाएँ',
    secAllN:'नगर निगम की ऑनलाइन और ऑफ़लाइन दोनों सेवाएँ एक जगह। ↗ वाली सेवाएँ राज्य/निगम के अलग पोर्टल पर खुलती हैं।',
    secNotice:'सूचना पट्ट', secNoticeT:'नवीनतम सूचनाएँ',
    secDept:'संगठन', secDeptT:'विभाग एवं प्रभार',
    secPeople:'नेतृत्व', secPeopleT:'महापौर एवं नगर आयुक्त',
    secStat:'एक नज़र में', secStatT:'सहारनपुर नगर निगम',
    viewAll:'सभी देखें', viewAllNotice:'सभी सूचनाएँ',

    helpH:'शिकायत हेल्पलाइन', helpP:'सफाई, पेयजल और पथ प्रकाश से जुड़ी समस्या पर सीधे कॉल करें। समय: सोम–शनि, प्रातः 10 से सायं 5।',
    helpFoot:'फ़ोन पर शिकायत दर्ज कराने पर भी आपको शिकायत संख्या दी जाएगी — उसे सुरक्षित रखें।',

    charterEye:'नागरिक चार्टर', charterT:'हर सेवा की <span>समय-सीमा</span> तय है',
    charterP:'नागरिक चार्टर में दर्ज अवधि के भीतर निस्तारण न होने पर शिकायत स्वतः वरिष्ठ अधिकारी को अग्रेषित होती है।',
    charterCol1:'सेवा / शिकायत', charterCol2:'निस्तारण अवधि', charterCol3:'उत्तरदायी विभाग',
    charterAll:'पूरा चार्टर देखें',

    ticketH:'शिकायत दर्ज हो गई', ticketP:'नीचे दी गई संख्या सुरक्षित रखें।',
    ticketNo:'शिकायत संख्या', ticketCat:'श्रेणी', ticketWard:'वार्ड', ticketOn:'दर्ज तिथि',
    ticketStatus:'स्थिति', ticketOpen:'दर्ज — विभाग को भेजी गई', ticketEta:'निस्तारण की संभावित अवधि',
    ticketDays:'3 कार्यदिवस',
    trackAnother:'दूसरी शिकायत दर्ज करें', trackView:'मेरी शिकायतें',

    bridgeT:'आप गृहकर पोर्टल पर जा रहे हैं',
    bridgeP:'भुगतान नगर निगम के अधिकृत कर पोर्टल पर होगा। यह बैंक की सुरक्षा शर्तों के कारण अलग पेज पर खुलता है।',
    bridgeNoteT:'भुगतान से पहले ध्यान दें',
    bridgeNote:'यदि भुगतान के बाद रसीद नहीं बनी और राशि कट गई है, तो दोबारा भुगतान न करें — 24 घंटे प्रतीक्षा करें, फिर हेल्पलाइन पर संपर्क करें।',
    bridgeGo:'कर पोर्टल खोलें', bridgeBack:'वापस जाएँ',
    bridgeWhat:'वहाँ आपको चाहिए होगा:',

    formT:'शिकायत दर्ज करें',
    formP:'सफाई, पेयजल, नाली, स्ट्रीट लाइट, आवारा पशु या अतिक्रमण — विवरण भरें, शिकायत संख्या तुरंत मिलेगी।',
    fName:'आपका नाम', fPhone:'मोबाइल नंबर', fWard:'वार्ड', fCat:'शिकायत का प्रकार',
    fPlace:'स्थान / लैंडमार्क', fDesc:'समस्या का विवरण', fPhoto:'फ़ोटो (वैकल्पिक)',
    fSubmit:'शिकायत दर्ज करें', fSelect:'— चुनें —',
    fReqName:'नाम भरें।', fReqPhone:'10 अंकों का मोबाइल नंबर भरें।', fReqWard:'वार्ड चुनें।',
    fReqCat:'शिकायत का प्रकार चुनें।', fReqDesc:'कम से कम 10 अक्षर में समस्या बताएँ।',
    fPhoneHint:'शिकायत की स्थिति इसी नंबर पर SMS से भेजी जाएगी।',
    fPhotoHint:'JPG या PNG, अधिकतम 5 MB।',

    trackT:'मेरी शिकायतें', trackP:'इस उपकरण से दर्ज की गई शिकायतें यहाँ दिखती हैं।',
    trackEmptyH:'अभी कोई शिकायत दर्ज नहीं है',
    trackEmptyP:'सफाई, पेयजल या स्ट्रीट लाइट से जुड़ी समस्या दर्ज करें — शिकायत संख्या तुरंत मिलेगी।',
    trackEmptyC:'शिकायत दर्ज करें',

    contactT:'संपर्क करें', contactP:'कार्यालय, हेल्पलाइन और ज़ोन कार्यालयों का विवरण।',
    cOffice:'मुख्य कार्यालय', cHours:'कार्यालय समय', cHoursV:'सोमवार – शनिवार, प्रातः 10:00 – सायं 5:00',
    cZones:'ज़ोन कार्यालय', cWrite:'ईमेल', cMap:'नक्शे पर देखें',
    officersEye:'पदाधिकारी', officersT:'पदाधिकारियों की सूची', cNoPhone:'उपलब्ध नहीं',

    deptT:'विभाग', deptP:'नगर निगम के कार्य तेरह विभागों में विभाजित हैं।',
    noticeT:'सूचना पट्ट', noticeP:'निविदा, आदेश, परिपत्र और जन-सूचनाएँ।',
    servT:'सभी सेवाएँ', servP:'नागरिकों के लिए उपलब्ध सभी ऑनलाइन एवं ऑफ़लाइन सेवाएँ।',
    aboutT:'नगर निगम के बारे में', aboutP:'सहारनपुर नगर निगम का परिचय, क्षेत्र और उत्तरदायित्व।',

    installT:'इस पोर्टल को फ़ोन में जोड़ें',
    installP:'ऑफ़लाइन भी सूचनाएँ और हेल्पलाइन नंबर देखें।',
    installGo:'जोड़ें', dismiss:'बंद करें',
    offline:'आप ऑफ़लाइन हैं — सहेजी गई जानकारी दिख रही है।',
    demoBadge:'यह प्रदर्शन प्रति है। भरा गया डेटा केवल आपके उपकरण में सुरक्षित रहता है, कहीं भेजा नहीं जाता।',
    notFoundT:'यह पृष्ठ नहीं मिला', notFoundP:'लिंक बदल गया हो सकता है। मुख्य पृष्ठ से सेवा खोजें।',
    goHome:'मुख्य पृष्ठ',

    /* जल एवं सीवर */
    waterT:'जल एवं सीवर बिल', waterP:'कनेक्शन संख्या या मकान संख्या से अपना बकाया देखें।',
    wConn:'कनेक्शन संख्या', wConnHint:'पुराने बिल पर ऊपर बाईं ओर छपी 8 अंकों की संख्या।',
    wOr:'अथवा', wHouse:'मकान संख्या', wWard:'वार्ड',
    wFind:'बकाया देखें', wReqConn:'कनेक्शन संख्या, या मकान संख्या और वार्ड भरें।',
    wRes:'कनेक्शन विवरण', wName:'उपभोक्ता', wCat:'श्रेणी', wCatV:'घरेलू',
    wSize:'कनेक्शन आकार', wLast:'अंतिम भुगतान', wArrear:'पूर्व बकाया',
    wCurrent:'चालू वर्ष माँग', wTotal:'कुल देय', wDue:'भुगतान की अंतिम तिथि',
    wPay:'कर पोर्टल पर भुगतान करें',
    wPayNote:'जल एवं सीवर कर की वसूली गृहकर के साथ उसी कर पोर्टल से होती है।',
    wNoRec:'इस संख्या पर कोई कनेक्शन दर्ज नहीं मिला। ज़ोन कार्यालय से संपर्क करें।',

    /* प्रमाण पत्र */
    certT:'जन्म एवं मृत्यु प्रमाण पत्र', certP:'नया आवेदन करें अथवा जारी प्रमाण पत्र की प्रति डाउनलोड करें।',
    certTabA:'नया आवेदन', certTabB:'प्रति डाउनलोड',
    cType:'प्रमाण पत्र का प्रकार', cBirth:'जन्म प्रमाण पत्र', cDeath:'मृत्यु प्रमाण पत्र',
    cPerson:'जिसका प्रमाण पत्र है — पूरा नाम', cDate:'घटना की तिथि',
    cPlace:'घटना का स्थान', cPlaceH:'अस्पताल का नाम अथवा घर का पता',
    cFather:'पिता का नाम', cMother:'माता का नाम',
    cApplicant:'आवेदक का नाम', cRelation:'सम्बन्ध',
    cSubmit:'आवेदन जमा करें',
    cRegNo:'पंजीकरण संख्या', cRegNoHint:'अस्पताल अथवा निगम द्वारा दी गई संख्या।',
    cFetch:'प्रमाण पत्र खोजें',
    cReqPerson:'नाम भरें।', cReqDate:'तिथि चुनें।', cReqApp:'आवेदक का नाम भरें।', cReqReg:'पंजीकरण संख्या भरें।',
    cAckT:'आवेदन प्राप्त हुआ', cAckP:'यह संख्या सुरक्षित रखें।', cAckNo:'आवेदन संख्या',
    cAckEta:'निर्धारित अवधि', cAckDays:'7 कार्यदिवस',
    cReady:'प्रमाण पत्र उपलब्ध है', cDownload:'PDF डाउनलोड करें',
    cIssued:'जारी तिथि', cNoRec:'इस पंजीकरण संख्या पर कोई अभिलेख नहीं मिला।',
    cLate:'21 दिन के बाद पंजीकरण पर विलम्ब शुल्क एवं शपथ पत्र आवश्यक है।',

    /* निविदा */
    tendT:'ई-निविदा', tendP:'वर्तमान निविदाएँ, शुद्धि पत्र एवं अंतिम तिथियाँ।',
    tendOpen:'खुली', tendClosing:'अंतिम तिथि निकट', tendClosed:'बंद',
    tendNo:'निविदा संख्या', tendDept:'विभाग', tendVal:'अनुमानित लागत',
    tendEmd:'धरोहर राशि', tendPub:'प्रकाशन', tendLast:'अंतिम तिथि',
    tendDoc:'निविदा प्रपत्र', tendPortal:'ई-प्रोक्योरमेंट पोर्टल पर बोली लगाएँ',
    tendFilterAll:'सभी', tendNone:'इस श्रेणी में कोई निविदा नहीं।',

    /* वार्ड एवं पार्षद */
    wardT:'वार्ड एवं पार्षद', wardP:'अपना वार्ड चुनें — पार्षद, ज़ोन कार्यालय और प्रभारी कर्मचारियों के नंबर देखें।',
    wardPick:'वार्ड चुनें', wardZone:'ज़ोन', wardOffice:'ज़ोन कार्यालय',
    wardParshad:'पार्षद', wardStaff:'क्षेत्रीय प्रभारी',
    wardSafai:'सफाई निरीक्षक', wardJal:'जल कर्मचारी', wardLight:'विद्युत कर्मचारी',
    wardComplaint:'इस वार्ड की शिकायत दर्ज करें',
    wardDemo:'वार्ड सीमाएँ, पार्षद नाम एवं कर्मचारी विवरण केवल उदाहरण हैं — अंतिम संस्करण में निगम की आधिकारिक सूची से भरे जाएँगे।',

    /* अधिकारी दृश्य */
    offT:'अधिकारी दृश्य', offP:'शिकायत कतार, समय-सीमा अनुपालन और सूचना प्रकाशन — यह वही स्क्रीन है जो निगम कर्मचारी देखेंगे।',
    offDemoT:'यह प्रबंधन पैनल का पूर्वावलोकन है',
    offDemo:'वास्तविक पैनल में लॉगिन, भूमिका-आधारित अनुमति और अंकेक्षण अभिलेख होंगे। यहाँ दिखाए गए आँकड़े उदाहरण हैं।',
    offTotal:'कुल शिकायतें', offDone:'निस्तारित', offOpen:'लंबित', offLate:'समय-सीमा पार',
    offQueue:'शिकायत कतार', offFilterZ:'ज़ोन', offFilterC:'श्रेणी', offAll:'सभी',
    offId:'संख्या', offWard:'वार्ड', offCat:'श्रेणी', offAge:'आयु', offStatus:'स्थिति',
    offDays:'दिन', offSopen:'लंबित', offSprog:'कार्यवाही में', offSdone:'निस्तारित', offSlate:'विलम्बित',
    offNone:'इस फ़िल्टर पर कोई शिकायत नहीं।',
    offPubT:'सूचना प्रकाशित करें', offPubP:'सूचना पट्ट पर तुरंत दिखेगी — किसी वेब एजेंसी की आवश्यकता नहीं।',
    offPubTitle:'सूचना का शीर्षक', offPubTag:'श्रेणी', offPubFile:'संलग्न PDF',
    offPubGo:'प्रकाशित करें', offPubDone:'प्रकाशित — सूचना पट्ट पर देखें',
    offPubReq:'शीर्षक भरें।',

    /* मीडिया केंद्र */
    mediaT:'मीडिया केंद्र', mediaP:'नगर निगम के कार्यों एवं आयोजनों की तस्वीरें, तथा समाचार-पत्रों में प्रकाशित समाचार।',
    mediaNone:'इस श्रेणी में अभी कुछ भी प्रकाशित नहीं है।', mediaEnlarge:'बड़ा करके देखें'
  },
  en: {
    skip:'Skip to main content', govLine:'Government of Uttar Pradesh · Urban Development Dept.',
    contrast:'High contrast', menu:'Menu',
    orgName:'Saharanpur Municipal Corporation', orgNameAlt:'नगर निगम सहारनपुर',
    navHome:'Home', navServices:'Services', navNotices:'Notices', navMedia:'Media Centre',
    navDepts:'Departments', navGrievance:'Complaints', navContact:'Contact', navAbout:'About',
    address:'Gurudwara Road, Saharanpur — 247001, Uttar Pradesh',
    footServices:'Top services', footInfo:'Information', footHelp:'Helplines',
    footUp:'UP Urban Development Dept. ↗',
    footGO:'Government Order ↗',
    copyright:'© 2026 Saharanpur Municipal Corporation. All rights reserved.',
    demoNote:'Demonstration build — prepared by Nishant Labs',

    heroKicker:'Citizen services portal',
    heroTitle:'Your errand, in <em>four taps</em>.',
    heroLede:'House tax, complaints, water bills, certificates — find what you need below. No trip to the office required.',
    findPlaceholder:'What do you need? e.g. house tax, drain, birth certificate',
    findTry:'Commonly searched:',
    findNone:'No service matches that. Call the helpline on 0132-2648112.',
    clear:'Clear',

    secTop:'Most used', secTopT:'Four main counters',
    secAll:'Service directory', secAllT:'All citizen services',
    secAllN:'Every corporation service in one place. Items marked ↗ open on a separate state or corporation portal.',
    secNotice:'Notice board', secNoticeT:'Latest notices',
    secDept:'Organisation', secDeptT:'Departments and remits',
    secPeople:'Leadership', secPeopleT:'Mayor and Municipal Commissioner',
    secStat:'At a glance', secStatT:'Saharanpur Municipal Corporation',
    viewAll:'View all', viewAllNotice:'All notices',

    helpH:'Complaint helpline', helpP:'Call directly about sanitation, drinking water and street lighting. Mon–Sat, 10 am to 5 pm.',
    helpFoot:'Complaints logged by phone also get a complaint number — keep it safe.',

    charterEye:'Citizen charter', charterT:'Every service has a <span>stated deadline</span>',
    charterP:'If a complaint is not closed within the charter period, it escalates automatically to a senior officer.',
    charterCol1:'Service / complaint', charterCol2:'Resolution time', charterCol3:'Responsible department',
    charterAll:'View the full charter',

    ticketH:'Complaint registered', ticketP:'Keep the number below safe.',
    ticketNo:'Complaint number', ticketCat:'Category', ticketWard:'Ward', ticketOn:'Registered on',
    ticketStatus:'Status', ticketOpen:'Registered — sent to department', ticketEta:'Expected resolution',
    ticketDays:'3 working days',
    trackAnother:'Register another complaint', trackView:'My complaints',

    bridgeT:'You are going to the house tax portal',
    bridgeP:'Payment happens on the corporation’s authorised tax portal. It opens as a separate page because of bank security rules.',
    bridgeNoteT:'Before you pay',
    bridgeNote:'If money was debited but no receipt was generated, do not pay again — wait 24 hours, then call the helpline.',
    bridgeGo:'Open tax portal', bridgeBack:'Go back',
    bridgeWhat:'You will need:',

    formT:'Register a complaint',
    formP:'Sanitation, drinking water, drains, street lights, stray cattle or encroachment — fill in the details and get a complaint number immediately.',
    fName:'Your name', fPhone:'Mobile number', fWard:'Ward', fCat:'Type of complaint',
    fPlace:'Location / landmark', fDesc:'Describe the problem', fPhoto:'Photo (optional)',
    fSubmit:'Register complaint', fSelect:'— Select —',
    fReqName:'Enter your name.', fReqPhone:'Enter a 10-digit mobile number.', fReqWard:'Choose a ward.',
    fReqCat:'Choose a complaint type.', fReqDesc:'Describe the problem in at least 10 characters.',
    fPhoneHint:'Status updates are sent by SMS to this number.',
    fPhotoHint:'JPG or PNG, up to 5 MB.',

    trackT:'My complaints', trackP:'Complaints registered from this device appear here.',
    trackEmptyH:'No complaints yet',
    trackEmptyP:'Report a sanitation, water or street-light problem and get a complaint number immediately.',
    trackEmptyC:'Register a complaint',

    contactT:'Contact us', contactP:'Office, helplines and zone office details.',
    cOffice:'Head office', cHours:'Office hours', cHoursV:'Monday – Saturday, 10:00 am – 5:00 pm',
    cZones:'Zone offices', cWrite:'Email', cMap:'View on map',
    officersEye:'Officers', officersT:"Officers' List", cNoPhone:'Not available',

    deptT:'Departments', deptP:'The corporation’s work is divided across thirteen departments.',
    noticeT:'Notice board', noticeP:'Tenders, orders, circulars and public notices.',
    servT:'All services', servP:'Every online and offline service available to residents.',
    aboutT:'About the corporation', aboutP:'Saharanpur Municipal Corporation — remit, area and responsibilities.',

    installT:'Add this portal to your phone',
    installP:'See notices and helpline numbers even when offline.',
    installGo:'Add', dismiss:'Dismiss',
    offline:'You are offline — showing saved information.',
    demoBadge:'This is a demonstration build. Anything you enter stays on your device and is not sent anywhere.',
    notFoundT:'Page not found', notFoundP:'The link may have changed. Search for a service from the home page.',
    goHome:'Home',

    /* Water & sewer */
    waterT:'Water & sewer bill', waterP:'Check your dues using a connection number or house number.',
    wConn:'Connection number', wConnHint:'The 8-digit number printed at the top left of an old bill.',
    wOr:'or', wHouse:'House number', wWard:'Ward',
    wFind:'Check dues', wReqConn:'Enter a connection number, or a house number and ward.',
    wRes:'Connection details', wName:'Consumer', wCat:'Category', wCatV:'Domestic',
    wSize:'Connection size', wLast:'Last payment', wArrear:'Previous arrears',
    wCurrent:'Current year demand', wTotal:'Total payable', wDue:'Payment due by',
    wPay:'Pay on the tax portal',
    wPayNote:'Water and sewer charges are collected alongside house tax on the same tax portal.',
    wNoRec:'No connection found against that number. Please contact your zone office.',

    /* Certificates */
    certT:'Birth & death certificates', certP:'Apply for a new certificate or download a copy of one already issued.',
    certTabA:'New application', certTabB:'Download a copy',
    cType:'Certificate type', cBirth:'Birth certificate', cDeath:'Death certificate',
    cPerson:'Full name of the person', cDate:'Date of the event',
    cPlace:'Place of the event', cPlaceH:'Hospital name or home address',
    cFather:'Father’s name', cMother:'Mother’s name',
    cApplicant:'Applicant’s name', cRelation:'Relationship',
    cSubmit:'Submit application',
    cRegNo:'Registration number', cRegNoHint:'The number issued by the hospital or the corporation.',
    cFetch:'Find certificate',
    cReqPerson:'Enter the name.', cReqDate:'Choose a date.', cReqApp:'Enter the applicant’s name.', cReqReg:'Enter a registration number.',
    cAckT:'Application received', cAckP:'Keep this number safe.', cAckNo:'Application number',
    cAckEta:'Stated timeline', cAckDays:'7 working days',
    cReady:'Certificate available', cDownload:'Download PDF',
    cIssued:'Issued on', cNoRec:'No record found against that registration number.',
    cLate:'Registration after 21 days needs a late fee and an affidavit.',

    /* Tenders */
    tendT:'E-tenders', tendP:'Live tenders, corrigenda and closing dates.',
    tendOpen:'Open', tendClosing:'Closing soon', tendClosed:'Closed',
    tendNo:'Tender no.', tendDept:'Department', tendVal:'Estimated cost',
    tendEmd:'EMD', tendPub:'Published', tendLast:'Closes',
    tendDoc:'Tender document', tendPortal:'Bid on the e-procurement portal',
    tendFilterAll:'All', tendNone:'No tenders in this category.',

    /* Wards & councillors */
    wardT:'Wards & councillors', wardP:'Pick your ward to see the councillor, zone office and the staff responsible for your area.',
    wardPick:'Choose a ward', wardZone:'Zone', wardOffice:'Zone office',
    wardParshad:'Councillor', wardStaff:'Area staff',
    wardSafai:'Sanitation inspector', wardJal:'Water staff', wardLight:'Electrical staff',
    wardComplaint:'Report a problem in this ward',
    wardDemo:'Ward boundaries, councillor names and staff details are illustrative — the final build fills these from the corporation’s official lists.',

    /* Officer view */
    offT:'Officer view', offP:'Complaint queue, charter compliance and notice publishing — the screen corporation staff would actually use.',
    offDemoT:'This is a preview of the admin panel',
    offDemo:'The real panel adds login, role-based permissions and an audit trail. Figures shown here are illustrative.',
    offTotal:'Total complaints', offDone:'Closed', offOpen:'Open', offLate:'Past deadline',
    offQueue:'Complaint queue', offFilterZ:'Zone', offFilterC:'Category', offAll:'All',
    offId:'Number', offWard:'Ward', offCat:'Category', offAge:'Age', offStatus:'Status',
    offDays:'days', offSopen:'Open', offSprog:'In progress', offSdone:'Closed', offSlate:'Overdue',
    offNone:'No complaints match this filter.',
    offPubT:'Publish a notice', offPubP:'It appears on the notice board immediately — no web agency needed.',
    offPubTitle:'Notice title', offPubTag:'Category', offPubFile:'Attach a PDF',
    offPubGo:'Publish', offPubDone:'Published — see it on the notice board',
    offPubReq:'Enter a title.',

    /* Media Centre */
    mediaT:'Media Centre', mediaP:'Photos of civic works and events, and press coverage of the corporation.',
    mediaNone:'Nothing published in this category yet.', mediaEnlarge:'View larger'
  }
};

/* ── services ────────────────────────────────────────────── */
const SERVICES = [
  { id:'tax', icon:'i-rupee', top:true, route:'#/grihkar',
    hi:{n:'गृहकर भुगतान', d:'संपत्ति खोजें और ऑनलाइन कर जमा करें', k:'गृहकर हाउस टैक्स संपत्ति कर बिल भुगतान PTIN रसीद'},
    en:{n:'Pay house tax', d:'Find your property and pay online', k:'house tax property tax bill pay ptin receipt'} },

  { id:'complaint', icon:'i-megaphone', top:true, route:'#/shikayat',
    hi:{n:'शिकायत दर्ज करें', d:'सफाई, नाली, स्ट्रीट लाइट, पेयजल', k:'शिकायत सफाई कूड़ा नाली सीवर स्ट्रीट लाइट पेयजल आवारा पशु अतिक्रमण'},
    en:{n:'Register a complaint', d:'Sanitation, drains, street lights, water', k:'complaint garbage drain sewer street light water stray cattle encroachment'} },

  { id:'water', icon:'i-drop', top:true, route:'#/sewa/water',
    hi:{n:'जल एवं सीवर बिल', d:'जल कर देखें और जमा करें', k:'जल पानी सीवर बिल कनेक्शन नल'},
    en:{n:'Water & sewer bill', d:'View and pay water charges', k:'water sewer bill connection tap'} },

  { id:'birth', icon:'i-cert', top:true, route:'#/sewa/birth',
    hi:{n:'जन्म / मृत्यु प्रमाण पत्र', d:'आवेदन करें और प्रति डाउनलोड करें', k:'जन्म मृत्यु प्रमाण पत्र सर्टिफिकेट पंजीकरण'},
    en:{n:'Birth / death certificate', d:'Apply and download a copy', k:'birth death certificate registration'} },

  { id:'mutation', icon:'i-swap', external:MUTATION_URL,
    hi:{n:'नामांतरण (म्यूटेशन)', d:'संपत्ति स्वामित्व परिवर्तन', k:'नामांतरण म्यूटेशन दाखिल खारिज संपत्ति स्वामित्व'},
    en:{n:'Property mutation', d:'Transfer of ownership record', k:'mutation property ownership transfer'} },

  { id:'mut-status', icon:'i-track', external:MUTATION_STATUS_URL,
    hi:{n:'नामांतरण की स्थिति', d:'आवेदन कहाँ तक पहुँचा', k:'नामांतरण स्थिति स्टेटस आवेदन'},
    en:{n:'Mutation status', d:'Track your application', k:'mutation status application track'} },

  { id:'track', icon:'i-search', route:'#/meri-shikayat',
    hi:{n:'शिकायत की स्थिति', d:'शिकायत संख्या से जाँचें', k:'शिकायत स्थिति स्टेटस ट्रैक संख्या'},
    en:{n:'Track a complaint', d:'Check with your complaint number', k:'complaint status track number'} },

  { id:'trade', icon:'i-shop', route:'#/sewa/trade',
    hi:{n:'व्यापार लाइसेंस', d:'नया लाइसेंस एवं नवीनीकरण', k:'व्यापार लाइसेंस दुकान ट्रेड नवीनीकरण'},
    en:{n:'Trade licence', d:'New licence and renewal', k:'trade licence shop renewal business'} },

  { id:'building', icon:'i-build', route:'#/sewa/building',
    hi:{n:'भवन निर्माण अनुमति', d:'नक्शा स्वीकृति एवं शुल्क', k:'भवन निर्माण नक्शा मानचित्र अनुमति स्वीकृति'},
    en:{n:'Building permission', d:'Plan approval and fees', k:'building plan approval construction permission'} },

  { id:'tender', icon:'i-doc', route:'#/sewa/tender',
    hi:{n:'ई-निविदा (टेंडर)', d:'वर्तमान निविदाएँ एवं शुद्धि पत्र', k:'निविदा टेंडर ई-टेंडर ठेका बोली'},
    en:{n:'E-tenders', d:'Live tenders and corrigenda', k:'tender e-tender bid contract procurement'} },

  { id:'shelter', icon:'i-bed', route:'#/sewa/shelter',
    hi:{n:'रैन बसेरा', d:'नगर के आश्रय स्थल एवं क्षमता', k:'रैन बसेरा आश्रय शेल्टर रात ठंड'},
    en:{n:'Night shelters', d:'Shelter locations and capacity', k:'night shelter rain basera homeless'} },

  { id:'gaushala', icon:'i-cow', route:'#/sewa/gaushala',
    hi:{n:'गौशाला एवं पशु', d:'आवारा पशु सूचना एवं गोद लेना', k:'गौशाला गाय पशु आवारा कैटल'},
    en:{n:'Gaushala & cattle', d:'Report stray cattle, adoption', k:'gaushala cow cattle stray'} },

  { id:'svanidhi', icon:'i-cart', external:'https://pmsvanidhi.mohua.gov.in/',
    hi:{n:'पीएम स्वनिधि योजना', d:'पथ विक्रेताओं हेतु ऋण', k:'स्वनिधि पथ विक्रेता ठेला लोन ऋण योजना'},
    en:{n:'PM SVANidhi scheme', d:'Loans for street vendors', k:'svanidhi street vendor loan scheme'} },

  { id:'swachh', icon:'i-broom', external:'https://cf.sbmurban.org/',
    hi:{n:'स्वच्छ सर्वेक्षण फ़ीडबैक', d:'नागरिक प्रतिक्रिया दर्ज करें', k:'स्वच्छ सर्वेक्षण फीडबैक सफाई रैंकिंग'},
    en:{n:'Swachh Survekshan feedback', d:'Submit citizen feedback', k:'swachh survekshan feedback cleanliness ranking'} },

  { id:'ward', icon:'i-pin', route:'#/parshad',
    hi:{n:'वार्ड एवं पार्षद', d:'अपने वार्ड के पार्षद एवं प्रभारी कर्मचारी', k:'वार्ड पार्षद ज़ोन क्षेत्र प्रभारी सफाई निरीक्षक नंबर'},
    en:{n:'Ward & councillor', d:'Your ward councillor and area staff', k:'ward councillor parshad zone area staff inspector'} },

  { id:'rti', icon:'i-info', route:'#/sewa/rti',
    hi:{n:'जन सूचना (RTI)', d:'सूचना का अधिकार आवेदन', k:'आरटीआई सूचना अधिकार जन सूचना अपील'},
    en:{n:'Right to Information', d:'File an RTI application', k:'rti right to information appeal'} },

  { id:'park', icon:'i-tree', route:'#/sewa/park',
    hi:{n:'उद्यान एवं वृक्षारोपण', d:'पार्क रखरखाव, वृक्ष कटान अनुमति', k:'उद्यान पार्क वृक्ष पेड़ कटान हरियाली'},
    en:{n:'Parks & tree felling', d:'Park upkeep, tree felling permits', k:'park garden tree felling permission green'} },

  { id:'light', icon:'i-bulb', route:'#/sewa/light',
    hi:{n:'पथ प्रकाश', d:'खराब स्ट्रीट लाइट की सूचना', k:'लाइट स्ट्रीट पथ प्रकाश बल्ब अंधेरा खंभा'},
    en:{n:'Street lighting', d:'Report a faulty street light', k:'street light lamp pole dark bulb'} }
];

/* ── notices ─────────────────────────────────────────────── */
const NOTICES = [
  { d:'12', m:{hi:'अग',en:'Aug'}, y:2026, isNew:true, file:true,
    hi:{t:'कांवड़ यात्रा 2026 — व्यवस्था विवरण पत्रिका एवं मार्ग परिवर्तन', tag:'जन सूचना'},
    en:{t:'Kanwar Yatra 2026 — arrangements booklet and route diversions', tag:'Public notice'} },
  { d:'05', m:{hi:'अग',en:'Aug'}, y:2026, isNew:true, file:true,
    hi:{t:'ज़ोन-2 हकीकत नगर में सड़क मरम्मत हेतु ई-निविदा आमंत्रण', tag:'निविदा'},
    en:{t:'E-tender invited for road repair works in Zone-2 Hakikat Nagar', tag:'Tender'} },
  { d:'28', m:{hi:'जुल',en:'Jul'}, y:2026, isNew:true, file:true,
    hi:{t:'गृहकर एकमुश्त समाधान योजना — ब्याज में छूट की अंतिम तिथि बढ़ी', tag:'कर विभाग'},
    en:{t:'House tax one-time settlement — interest waiver deadline extended', tag:'Tax dept.'} },
  { d:'19', m:{hi:'जुल',en:'Jul'}, y:2026, file:true,
    hi:{t:'गांधी डिजिटल लाइब्रेरी हेतु पुस्तकालय प्रबंध समिति का गठन', tag:'आदेश'},
    en:{t:'Constitution of the library management committee, Gandhi Digital Library', tag:'Order'} },
  { d:'02', m:{hi:'जुल',en:'Jul'}, y:2026, file:true,
    hi:{t:'वर्षा ऋतु में जलभराव नियंत्रण हेतु नियंत्रण कक्ष एवं दूरभाष संख्या', tag:'जन सूचना'},
    en:{t:'Monsoon waterlogging control room and contact numbers', tag:'Public notice'} },
  { d:'24', m:{hi:'जून',en:'Jun'}, y:2026, file:true,
    hi:{t:'ठोस अपशिष्ट प्रबंधन नीति-2018 एवं नियमावली-2021 — अनुपालन निर्देश', tag:'नीति'},
    en:{t:'Solid Waste Management Policy 2018 and Rules 2021 — compliance directions', tag:'Policy'} },
  { d:'11', m:{hi:'जून',en:'Jun'}, y:2026, file:true,
    hi:{t:'वार्डवार पार्षद सूची एवं नामित पार्षद सूची (संशोधित)', tag:'सूची'},
    en:{t:'Ward-wise councillor list and nominated councillors (revised)', tag:'List'} },
  { d:'30', m:{hi:'मई',en:'May'}, y:2026, file:true,
    hi:{t:'फ़ीकल स्लज एवं सेप्टेज प्रबंधन — सेवा प्रदाता पंजीकरण', tag:'निविदा'},
    en:{t:'Faecal sludge and septage management — service provider registration', tag:'Tender'} }
];

/* ── departments (as listed by the corporation) ──────────── */
const DEPTS = [
  { hi:{n:'कर विभाग', d:'गृहकर, जलकर एवं अन्य करों का निर्धारण एवं वसूली।'},
    en:{n:'Tax', d:'Assessment and collection of house tax, water tax and other levies.'}, ph:'8477008027' },
  { hi:{n:'स्वास्थ्य एवं सफाई', d:'नगर की सफाई व्यवस्था, कूड़ा उठान एवं ठोस अपशिष्ट प्रबंधन।'},
    en:{n:'Health & Sanitation', d:'City cleanliness, waste collection and solid waste management.'}, ph:'8477008058' },
  { hi:{n:'जल विभाग', d:'पेयजल आपूर्ति, नलकूप एवं पाइपलाइन का रखरखाव।'},
    en:{n:'Water', d:'Drinking water supply, tubewells and pipeline upkeep.'}, ph:'8477008057' },
  { hi:{n:'पथ प्रकाश (लाइट)', d:'स्ट्रीट लाइट की स्थापना, मरम्मत एवं ऊर्जा प्रबंधन।'},
    en:{n:'Street Lighting', d:'Installation, repair and energy management of street lights.'}, ph:'8477008015' },
  { hi:{n:'निर्माण विभाग', d:'सड़क, नाली एवं भवन निर्माण कार्यों का क्रियान्वयन।'},
    en:{n:'Construction', d:'Execution of road, drain and building works.'} },
  { hi:{n:'संपत्ति विभाग', d:'निगम संपत्तियों का अभिलेख, किराया एवं आवंटन।'},
    en:{n:'Property', d:'Records, rent and allotment of corporation properties.'} },
  { hi:{n:'लेखा विभाग', d:'बजट, बैलेंस शीट एवं वित्तीय अभिलेख।'},
    en:{n:'Accounts', d:'Budget, balance sheet and financial records.'} },
  { hi:{n:'लाइसेंस विभाग', d:'व्यापार लाइसेंस एवं विज्ञापन अनुमति।'},
    en:{n:'Licence', d:'Trade licences and advertisement permits.'} },
  { hi:{n:'गौशाला', d:'गौवंश आश्रय, चारा एवं देखभाल।'},
    en:{n:'Gaushala', d:'Cattle shelter, fodder and care.'} },
  { hi:{n:'पशु चिकित्सा', d:'पशु स्वास्थ्य, टीकाकरण एवं आवारा पशु प्रबंधन।'},
    en:{n:'Veterinary', d:'Animal health, vaccination and stray animal management.'} },
  { hi:{n:'उद्यान विभाग', d:'पार्क, हरित पट्टी एवं वृक्षारोपण।'},
    en:{n:'Horticulture', d:'Parks, green belts and plantation.'} },
  { hi:{n:'गैराज विभाग', d:'निगम वाहनों का संचालन एवं रखरखाव।'},
    en:{n:'Garage', d:'Operation and maintenance of corporation vehicles.'} },
  { hi:{n:'मीडिया विभाग', d:'जन-संपर्क, प्रेस विज्ञप्ति एवं सोशल मीडिया।'},
    en:{n:'Media', d:'Public relations, press releases and social media.'} }
];

/* ── helplines ───────────────────────────────────────────── */
const HELPLINES = [
  { num:'0132-2648112', hi:'नियंत्रण कक्ष', en:'Control room' },
  { num:'8477008027',   hi:'सफाई / कूड़ा उठान', en:'Sanitation / waste' },
  { num:'8477008057',   hi:'पेयजल', en:'Drinking water' },
  { num:'8477008015',   hi:'पथ प्रकाश', en:'Street lighting' },
  { num:'8477008058',   hi:'जलभराव / नाली', en:'Waterlogging / drains' }
];

/* ── people, zones, wards, stats, pledges ────────────────── */
const PEOPLE = [
  { init:'अ', hi:{r:'महापौर', n:'डॉ. अजय कुमार सिंह', c:'नगर निगम सहारनपुर'},
    en:{r:'Mayor', n:'Dr. Ajay Kumar Singh', c:'Saharanpur Municipal Corporation'} },
  { init:'सि', hi:{r:'नगर आयुक्त', n:'सिपु गिरि (आई.ए.एस.)', c:'नगर निगम सहारनपुर'},
    en:{r:'Municipal Commissioner', n:'Sipu Giri (IAS)', c:'Saharanpur Municipal Corporation'} }
];

const ZONES = [
  { hi:{n:'ज़ोन 1 — नुमाइश कैंप', a:'नुमाइश कैंप, सहारनपुर'}, en:{n:'Zone 1 — Numaish Camp', a:'Numaish Camp, Saharanpur'}, ph:'8477008027' },
  { hi:{n:'ज़ोन 2 — हकीकत नगर', a:'हकीकत नगर, सहारनपुर'},   en:{n:'Zone 2 — Hakikat Nagar', a:'Hakikat Nagar, Saharanpur'}, ph:'8477008057' },
  { hi:{n:'ज़ोन 3 — मनोहरपुर', a:'मनोहरपुर, सहारनपुर'},      en:{n:'Zone 3 — Manoharpur', a:'Manoharpur, Saharanpur'}, ph:'8477008015' }
];

const OFFICERS = [
  { ph:'8477008001', hi:{n:'सिपु गिरि', r:'नगर आयुक्त'}, en:{n:'Sipu Giri', r:'Municipal Commissioner'} },
  { ph:'8477008003', hi:{n:'प्रदीप कुमार यादव', r:'अपर नगर आयुक्त'}, en:{n:'Pradeep Kumar Yadav', r:'Additional Municipal Commissioner'} },
  { ph:'9415431296', hi:{n:'मृत्युंजय', r:'अपर नगर आयुक्त'}, en:{n:'Mrityunjay', r:'Additional Municipal Commissioner'} },
  { ph:'',           hi:{n:'मनोज त्रिपाठी', r:'लेखा अधिकारी'}, en:{n:'Manoj Tripathi', r:'Account Officer'} },
  { ph:'9359509136', hi:{n:'सुरेंद्र कुमार मिश्रा', r:'मुख्य अभियंता, निर्माण'}, en:{n:'Surendra Kumar Mishra', r:'Chief Engineer, Nirmaan'} },
  { ph:'9219501959', hi:{n:'पुरुषोत्तम कुमार', r:'महाप्रबंधक, जलकल'}, en:{n:'Purushottam Kumar', r:'General Manager, Jalkal'} },
  { ph:'6398777787', hi:{n:'संगीता गुप्ता', r:'मुख्य कर निर्धारण अधिकारी'}, en:{n:'Sangeeta Gupta', r:'Chief Tax Assessment Officer'} },
  { ph:'8477008016', hi:{n:'जय प्रकाश यादव', r:'सहायक नगर आयुक्त'}, en:{n:'Jai Prakash Yadav', r:'Assistant Municipal Commissioner'} },
  { ph:'8470878254', hi:{n:'विकास धर दुबे', r:'सहायक नगर आयुक्त'}, en:{n:'Bikas Dhar Dubay', r:'Assistant Municipal Commissioner'} },
  { ph:'8376869676', hi:{n:'संदीप कुमार मिश्रा', r:'पशु चिकित्सा अधिकारी'}, en:{n:'Sandeep Kumar Mishra', r:'Veterinary Officer'} }
];

const WARDS = Array.from({ length: 70 }, (_, i) => i + 1);

const CATEGORIES = [
  { id:'safai',   hi:'सफाई / कूड़ा नहीं उठा',        en:'Sanitation / waste not collected' },
  { id:'jal',     hi:'पेयजल — आपूर्ति या गुणवत्ता',  en:'Drinking water — supply or quality' },
  { id:'nali',    hi:'नाली / सीवर जाम',              en:'Blocked drain or sewer' },
  { id:'light',   hi:'स्ट्रीट लाइट खराब',            en:'Street light not working' },
  { id:'sadak',   hi:'सड़क / गड्ढा',                 en:'Road or pothole' },
  { id:'pashu',   hi:'आवारा पशु',                    en:'Stray cattle or dogs' },
  { id:'atikram', hi:'अतिक्रमण',                     en:'Encroachment' },
  { id:'anya',    hi:'अन्य',                         en:'Other' }
];

const STATS = [
  { n:'70',    hi:'वार्ड',                    en:'Wards' },
  { n:'3',     hi:'ज़ोन कार्यालय',            en:'Zone offices' },
  { n:'7.6 लाख', nEn:'7.6 L', hi:'अनुमानित जनसंख्या', en:'Estimated population' },
  { n:'~1.4 लाख', nEn:'~1.4 L', hi:'कर-निर्धारित संपत्तियाँ', en:'Assessed properties' }
];

/* ── citizen charter — service level commitments ─────────── */
const CHARTER = [
  { icon:'i-broom', t:{ hi:'24 घंटे', en:'24 hours' },
    hi:{ s:'कूड़ा न उठने की शिकायत', d:'स्वास्थ्य एवं सफाई' },
    en:{ s:'Waste not collected', d:'Health & Sanitation' } },
  { icon:'i-drop', t:{ hi:'24 घंटे', en:'24 hours' },
    hi:{ s:'पेयजल लीकेज अथवा आपूर्ति बाधित', d:'जल विभाग' },
    en:{ s:'Water leak or supply failure', d:'Water' } },
  { icon:'i-drop', t:{ hi:'48 घंटे', en:'48 hours' },
    hi:{ s:'नाली अथवा सीवर जाम', d:'स्वास्थ्य एवं सफाई' },
    en:{ s:'Blocked drain or sewer', d:'Health & Sanitation' } },
  { icon:'i-bulb', t:{ hi:'3 कार्यदिवस', en:'3 working days' },
    hi:{ s:'स्ट्रीट लाइट मरम्मत', d:'पथ प्रकाश' },
    en:{ s:'Street light repair', d:'Street Lighting' } },
  { icon:'i-cert', t:{ hi:'7 कार्यदिवस', en:'7 working days' },
    hi:{ s:'जन्म अथवा मृत्यु प्रमाण पत्र', d:'स्वास्थ्य विभाग' },
    en:{ s:'Birth or death certificate', d:'Health' } },
  { icon:'i-shop', t:{ hi:'15 कार्यदिवस', en:'15 working days' },
    hi:{ s:'व्यापार लाइसेंस नवीनीकरण', d:'लाइसेंस विभाग' },
    en:{ s:'Trade licence renewal', d:'Licence' } },
  { icon:'i-swap', t:{ hi:'30 कार्यदिवस', en:'30 working days' },
    hi:{ s:'संपत्ति नामांतरण', d:'कर विभाग' },
    en:{ s:'Property mutation', d:'Tax' } },
  { icon:'i-info', t:{ hi:'30 दिन', en:'30 days' },
    hi:{ s:'जन सूचना (RTI) आवेदन', d:'जन सूचना अधिकारी' },
    en:{ s:'RTI application', d:'Public Information Officer' } }
];

/* ── tenders ─────────────────────────────────────────────── */
const TENDERS = [
  { no:'SNN/2026-27/PW/041', cat:'works', status:'closing', pub:'05 Aug 2026', last:'26 Aug 2026',
    val:{ hi:'₹ 2.84 करोड़', en:'₹ 2.84 Cr' }, emd:{ hi:'₹ 5.68 लाख', en:'₹ 5.68 L' },
    hi:{ t:'ज़ोन-2 हकीकत नगर में सी.सी. सड़क एवं नाली निर्माण', d:'निर्माण विभाग' },
    en:{ t:'CC road and drain construction, Zone-2 Hakikat Nagar', d:'Construction' } },
  { no:'SNN/2026-27/SAN/018', cat:'services', status:'open', pub:'01 Aug 2026', last:'04 Sep 2026',
    val:{ hi:'₹ 1.10 करोड़ प्रतिवर्ष', en:'₹ 1.10 Cr / year' }, emd:{ hi:'₹ 2.20 लाख', en:'₹ 2.20 L' },
    hi:{ t:'फ़ीकल स्लज एवं सेप्टेज संग्रहण — सेवा प्रदाता चयन', d:'स्वास्थ्य एवं सफाई' },
    en:{ t:'Faecal sludge and septage collection — service provider', d:'Health & Sanitation' } },
  { no:'SNN/2026-27/ELE/007', cat:'supply', status:'open', pub:'28 Jul 2026', last:'08 Sep 2026',
    val:{ hi:'₹ 96.50 लाख', en:'₹ 96.50 L' }, emd:{ hi:'₹ 1.93 लाख', en:'₹ 1.93 L' },
    hi:{ t:'एल.ई.डी. स्ट्रीट लाइट आपूर्ति एवं स्थापना — 4,200 इकाई', d:'पथ प्रकाश' },
    en:{ t:'Supply and installation of LED street lights — 4,200 units', d:'Street Lighting' } },
  { no:'SNN/2026-27/HOR/012', cat:'services', status:'open', pub:'22 Jul 2026', last:'12 Sep 2026',
    val:{ hi:'₹ 38.75 लाख प्रतिवर्ष', en:'₹ 38.75 L / year' }, emd:{ hi:'₹ 77,500', en:'₹ 77,500' },
    hi:{ t:'नगर के 26 पार्कों का वार्षिक अनुरक्षण', d:'उद्यान विभाग' },
    en:{ t:'Annual maintenance of 26 city parks', d:'Horticulture' } },
  { no:'SNN/2026-27/VEH/003', cat:'supply', status:'closed', pub:'12 Jun 2026', last:'21 Jul 2026',
    val:{ hi:'₹ 1.62 करोड़', en:'₹ 1.62 Cr' }, emd:{ hi:'₹ 3.24 लाख', en:'₹ 3.24 L' },
    hi:{ t:'कूड़ा उठान हेतु 12 कॉम्पैक्टर वाहन क्रय', d:'गैराज विभाग' },
    en:{ t:'Purchase of 12 compactor vehicles for waste collection', d:'Garage' } },
  { no:'SNN/2026-27/IT/002', cat:'services', status:'closed', pub:'02 Jun 2026', last:'07 Jul 2026',
    val:{ hi:'₹ 24.00 लाख', en:'₹ 24.00 L' }, emd:{ hi:'₹ 48,000', en:'₹ 48,000' },
    hi:{ t:'निगम वेबसाइट एवं शिकायत प्रणाली — विकास एवं अनुरक्षण', d:'मीडिया विभाग' },
    en:{ t:'Corporation website and grievance system — build and maintenance', d:'Media' } }
];

const TENDER_CATS = [
  { id:'all',      hi:'सभी',        en:'All' },
  { id:'works',    hi:'निर्माण कार्य', en:'Works' },
  { id:'supply',   hi:'आपूर्ति',     en:'Supply' },
  { id:'services', hi:'सेवाएँ',      en:'Services' }
];

/* ── media centre (photos, work showcase, press clippings) ──
   Images are placeholders from Lorem Picsum, seeded by item id
   so each stays stable across reloads instead of changing every
   render — real photos/clippings would replace these 1:1. ───── */
const MEDIA_CATS = [
  { id:'all',    hi:'सभी',          en:'All' },
  { id:'works',  hi:'हमारे कार्य',    en:'Our Work' },
  { id:'photos', hi:'तस्वीरें',       en:'Photos' },
  { id:'press',  hi:'समाचार में',    en:'Press Coverage' }
];

const MEDIA = [
  { id:'m001', cat:'works', date:'10 Aug 2026', ward:14,
    img:'https://picsum.photos/seed/m001/640/420', link:'https://picsum.photos/seed/m001/1400/1000',
    hi:{ t:'ज़ोन-2 हकीकत नगर में नई सी.सी. सड़क का निर्माण पूर्ण', d:'70 फीट लंबी सड़क एवं नाली का कार्य 10 दिनों में पूरा हुआ।' },
    en:{ t:'New CC road completed in Zone-2 Hakikat Nagar', d:'A 70-foot stretch of road and drain finished in 10 days.' } },
  { id:'m002', cat:'photos', date:'05 Aug 2026',
    img:'https://picsum.photos/seed/m002/640/420', link:'https://picsum.photos/seed/m002/1400/1000',
    hi:{ t:'स्वच्छता ही सेवा अभियान', d:'वार्ड 22 में सफाई कर्मचारियों एवं नागरिकों का संयुक्त श्रमदान।' },
    en:{ t:'Swachhata Hi Seva drive', d:'Sanitation staff and residents join a cleanliness drive in Ward 22.' } },
  { id:'m003', cat:'press', date:'02 Aug 2026', source:{ hi:'दैनिक जागरण', en:'Dainik Jagran' },
    img:'https://picsum.photos/seed/m003/640/420', link:'https://picsum.photos/seed/m003/1200/1600',
    hi:{ t:'निगम ने शुरू किया डोर-टू-डोर कूड़ा संग्रहण', d:'शहर के सभी 70 वार्डों में सेवा अब विस्तारित।' },
    en:{ t:'Corporation launches door-to-door waste collection', d:'Service now extended to all 70 wards of the city.' } },
  { id:'m004', cat:'works', date:'28 Jul 2026', ward:8,
    img:'https://picsum.photos/seed/m004/640/420', link:'https://picsum.photos/seed/m004/1400/1000',
    hi:{ t:'वार्ड 8 में नए पार्क का सौंदर्यीकरण', d:'झूले, बेंच एवं हरियाली सहित पार्क नागरिकों को समर्पित।' },
    en:{ t:'New park beautified in Ward 8', d:'A park with play equipment, benches and greenery opened to residents.' } },
  { id:'m005', cat:'photos', date:'22 Jul 2026',
    img:'https://picsum.photos/seed/m005/640/420', link:'https://picsum.photos/seed/m005/1400/1000',
    hi:{ t:'वृक्षारोपण अभियान', d:'महापौर एवं पार्षदों द्वारा 500 पौधे रोपे गए।' },
    en:{ t:'Tree plantation drive', d:'The Mayor and councillors plant 500 saplings across the city.' } },
  { id:'m006', cat:'press', date:'18 Jul 2026', source:{ hi:'अमर उजाला', en:'Amar Ujala' },
    img:'https://picsum.photos/seed/m006/640/420', link:'https://picsum.photos/seed/m006/1200/1600',
    hi:{ t:'एलईडी स्ट्रीट लाइट से रोशन होंगी सड़कें', d:'4,200 पुराने लैंप बदले जाएंगे — निगम की नई पहल।' },
    en:{ t:'LED street lights to light up city roads', d:'4,200 old lamps to be replaced under a new corporation initiative.' } },
  { id:'m007', cat:'works', date:'10 Jul 2026', ward:30,
    img:'https://picsum.photos/seed/m007/640/420', link:'https://picsum.photos/seed/m007/1400/1000',
    hi:{ t:'वार्ड 30 में सीवर लाइन का जीर्णोद्धार', d:'पुरानी लाइन बदलकर जलभराव की समस्या दूर की गई।' },
    en:{ t:'Sewer line relaid in Ward 30', d:'Old pipeline replaced, resolving a long-standing waterlogging problem.' } },
  { id:'m008', cat:'photos', date:'05 Jul 2026',
    img:'https://picsum.photos/seed/m008/640/420', link:'https://picsum.photos/seed/m008/1400/1000',
    hi:{ t:'योग दिवस समारोह', d:'नगर निगम परिसर में सामूहिक योगाभ्यास।' },
    en:{ t:'Yoga Day celebration', d:'Staff and citizens join a mass yoga session at the corporation premises.' } },
  { id:'m009', cat:'press', date:'28 Jun 2026', source:{ hi:'हिन्दुस्तान', en:'Hindustan' },
    img:'https://picsum.photos/seed/m009/640/420', link:'https://picsum.photos/seed/m009/1200/1600',
    hi:{ t:'नगर निगम को स्वच्छ सर्वेक्षण में मिला सम्मान', d:'राज्य स्तर पर श्रेष्ठ प्रदर्शन हेतु प्रशस्ति पत्र प्राप्त।' },
    en:{ t:'Corporation honoured in Swachh Survekshan', d:'Awarded a citation for top state-level performance.' } }
];

/* ── ward directory (illustrative) ───────────────────────── */
const PARSHAD_NAMES = [
  'श्री रमेश कुमार','श्रीमती सुनीता देवी','श्री मोहम्मद इरफ़ान','श्रीमती कविता शर्मा',
  'श्री अनिल कुमार','श्रीमती रेखा रानी','श्री जावेद अख़्तर','श्रीमती पूजा सैनी',
  'श्री सतीश चंद','श्रीमती नीलम गुप्ता'
];
const PARSHAD_NAMES_EN = [
  'Shri Ramesh Kumar','Smt. Sunita Devi','Shri Mohammad Irfan','Smt. Kavita Sharma',
  'Shri Anil Kumar','Smt. Rekha Rani','Shri Javed Akhtar','Smt. Pooja Saini',
  'Shri Satish Chand','Smt. Neelam Gupta'
];
const STAFF_NAMES = ['श्री दिनेश','श्री सुरेश','श्री राजपाल','श्री फ़िरोज़','श्री ओमप्रकाश','श्री नदीम'];
const STAFF_NAMES_EN = ['Shri Dinesh','Shri Suresh','Shri Rajpal','Shri Firoz','Shri Omprakash','Shri Nadeem'];

function wardInfo(w) {
  const z = w <= 24 ? 0 : w <= 48 ? 1 : 2;
  const p = (w * 7) % PARSHAD_NAMES.length;
  const s = w % STAFF_NAMES.length;
  const pad = n => String(80000000 + w * 971 + n).slice(-10);
  return {
    ward: w, zone: ZONES[z],
    parshad: { hi: PARSHAD_NAMES[p], en: PARSHAD_NAMES_EN[p], ph: '94' + pad(3).slice(0, 8) },
    staff: [
      { k:'wardSafai', hi:STAFF_NAMES[s],                     en:STAFF_NAMES_EN[s],                     ph:'84' + pad(11).slice(0, 8) },
      { k:'wardJal',   hi:STAFF_NAMES[(s + 2) % 6],           en:STAFF_NAMES_EN[(s + 2) % 6],           ph:'84' + pad(29).slice(0, 8) },
      { k:'wardLight', hi:STAFF_NAMES[(s + 4) % 6],           en:STAFF_NAMES_EN[(s + 4) % 6],           ph:'84' + pad(47).slice(0, 8) }
    ]
  };
}

/* ── water connection records (illustrative) ─────────────── */
function waterRecord(key) {
  let h = 0;
  for (const ch of String(key)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  if (h % 9 === 0) return null;                       // some lookups legitimately miss
  const arrear = (h % 7) * 620;
  const current = 1450 + (h % 11) * 130;
  const names = ['राम सिंह','अब्दुल रशीद','सरोज बाला','विनोद कुमार','शहनाज़ बेगम','हरीश चंद'];
  const namesEn = ['Ram Singh','Abdul Rasheed','Saroj Bala','Vinod Kumar','Shahnaz Begum','Harish Chand'];
  return {
    conn: '4' + String(10000000 + (h % 8999999)).slice(-7),
    hi: names[h % 6], en: namesEn[h % 6],
    size: h % 3 === 0 ? '20 mm' : '15 mm',
    last: ['12 Mar 2026', '04 Feb 2026', '28 Nov 2025'][h % 3],
    arrear, current, total: arrear + current,
    due: '30 Sep 2026'
  };
}

/* ── officer view: complaint queue (illustrative) ────────── */
const QUEUE = (() => {
  const cats = CATEGORIES.filter(c => c.id !== 'anya').map(c => c.id);
  const out = [];
  for (let i = 0; i < 34; i++) {
    const w = ((i * 13) % 70) + 1;
    const cat = cats[i % cats.length];
    const limit = cat === 'light' ? 3 : cat === 'nali' ? 2 : 1;
    // ~56% closed, ~26% open, ~9% in progress, ~9% past the charter deadline
    const st = i % 11 === 4 ? 'late' : i % 11 === 7 ? 'prog' : i % 9 < 5 ? 'done' : 'open';
    const age = st === 'late' ? limit + 1 + (i % 4) : st === 'done' ? i % (limit + 1) : i % (limit + 1);
    out.push({
      id: `SNN-2026-${String(410000 + i * 137)}`,
      ward: w, zone: w <= 24 ? 1 : w <= 48 ? 2 : 3,
      cat, age, status: st
    });
  }
  return out;
})();
