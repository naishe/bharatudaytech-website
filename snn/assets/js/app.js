/* ═══════════════════════════════════════════════════════════
   app.js — hash router + views.
   Hash routing is deliberate: it lets the whole site live in
   any sub-folder on any static host without server rewrites.
   (A production build should be server-rendered per URL for
   search indexing — see README.)
   ═══════════════════════════════════════════════════════════ */
(() => {
'use strict';

/* ── state ───────────────────────────────────────────────── */
const S = {
  lang: localStorage.getItem('snn.lang') || 'hi',
  fs:   localStorage.getItem('snn.fs')   || 'm',
  hc:   localStorage.getItem('snn.hc') === '1'
};

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const t  = k => (UI[S.lang][k] ?? UI.hi[k] ?? k);
const L  = o => (o ? (o[S.lang] || o.hi) : {});
const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const ico = (id, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#${id}"></use></svg>`;

/* ── the chakra mark (24 spokes) ─────────────────────────── */
function chakra(color = 'var(--chakra)') {
  let spokes = '';
  for (let i = 0; i < 24; i++) {
    const a = (i * 15) * Math.PI / 180;
    spokes += `<line x1="${(50 + 8 * Math.sin(a)).toFixed(2)}" y1="${(50 - 8 * Math.cos(a)).toFixed(2)}"
      x2="${(50 + 41 * Math.sin(a)).toFixed(2)}" y2="${(50 - 41 * Math.cos(a)).toFixed(2)}"/>`;
  }
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"
    style="stroke:${color};fill:none;stroke-width:2.1;stroke-linecap:round">
    <circle cx="50" cy="50" r="45" stroke-width="3.2"/>
    <circle cx="50" cy="50" r="41"  stroke-width="1.5" opacity=".55"/>
    <g>${spokes}</g>
    <circle cx="50" cy="50" r="7.5" fill="${color}" stroke="none"/>
  </svg>`;
}

/* ── preferences ─────────────────────────────────────────── */
function applyPrefs() {
  const h = document.documentElement;
  h.dataset.lang = S.lang;
  h.lang = S.lang === 'hi' ? 'hi' : 'en';
  h.dataset.fs = S.fs;
  h.classList.toggle('hc', S.hc);
  $('[data-contrast]').setAttribute('aria-pressed', String(S.hc));
  $('[data-lang-label]').textContent = S.lang === 'hi' ? 'English' : 'हिन्दी';
  $$('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  document.title = S.lang === 'hi'
    ? 'नगर निगम सहारनपुर | Saharanpur Municipal Corporation'
    : 'Saharanpur Municipal Corporation | नगर निगम सहारनपुर';
}

/* ── shared partials ─────────────────────────────────────── */
const serviceHref = s => s.external || s.route || '#/';
const isExt = s => Boolean(s.external);

function tileHTML(s) {
  const c = L(s);
  return `<a class="tile" href="${esc(serviceHref(s))}"${isExt(s) ? ' target="_blank" rel="noopener"' : ''}>
    ${ico(s.icon)}<span class="tile__t">${esc(c.n)}</span>
    ${isExt(s) ? ico('i-ext', 'ico tile__ext') : ''}</a>`;
}

function counterHTML(s) {
  const c = L(s);
  return `<a class="counter" href="${esc(serviceHref(s))}"${isExt(s) ? ' target="_blank" rel="noopener"' : ''}>
    <span class="counter__ico">${ico(s.icon)}</span>
    <span class="counter__t">${esc(c.n)}</span>
    <span class="counter__d">${esc(c.d)}</span>
    <span class="counter__go">${S.lang === 'hi' ? 'खोलें' : 'Open'} ${ico('i-arrow')}</span></a>`;
}

function noticeHTML(n) {
  const c = L(n);
  return `<a class="notice" href="#/suchna">
    <span class="notice__date"><b class="notice__d">${n.d}</b><span class="notice__m">${esc(L(n.m))}</span></span>
    <span><span class="notice__t">${esc(c.t)}</span>
      <span class="notice__meta"><span class="tag">${esc(c.tag)}</span>
      ${n.isNew ? `<span class="tag tag--new">${S.lang === 'hi' ? 'नया' : 'New'}</span>` : ''}</span></span>
    ${n.file ? ico('i-down', 'ico notice__dl') : ''}</a>`;
}

function helplineHTML() {
  return `<div class="help">
    <h3 class="help__h">${t('helpH')}</h3>
    <p class="help__p">${t('helpP')}</p>
    <div class="help__list">${HELPLINES.map(h => `
      <a class="help__row" href="tel:${h.num.replace(/[^0-9+]/g, '')}">
        ${ico('i-phone')}
        <span><span class="help__lbl">${esc(h[S.lang] || h.hi)}</span>
        <span class="help__num">${esc(h.num)}</span></span></a>`).join('')}
    </div>
    <p class="help__foot">${t('helpFoot')}</p></div>`;
}

const demoNote = () =>
  `<div class="note note--flat">${ico('i-info')}<span>${t('demoBadge')}</span></div>`;

function pageHead(titleKey, pKey) {
  return `<section class="phead"><div class="wrap">
    <p class="crumb"><a href="#/">${t('navHome')}</a> <span>/</span> <span>${t(titleKey)}</span></p>
    <h1 class="phead__t">${t(titleKey)}</h1>
    <p class="phead__p">${t(pKey)}</p></div></section>`;
}

/* ── views ───────────────────────────────────────────────── */
const V = {};

V.home = () => {
  const top = SERVICES.filter(s => s.top);
  return `
  <section class="hero"><div class="wrap">
    <p class="hero__kicker">${t('heroKicker')}</p>
    <h1 class="hero__title">${t('heroTitle')}</h1>
    <p class="hero__lede">${t('heroLede')}</p>

    <div class="finder">
      <div class="finder__box">
        ${ico('i-search')}
        <input id="find" type="search" autocomplete="off" aria-label="${esc(t('findPlaceholder'))}"
               placeholder="${esc(t('findPlaceholder'))}">
        <button class="finder__clear" type="button" data-find-clear hidden aria-label="${esc(t('clear'))}">×</button>
      </div>
      <div class="finder__hint"><span>${t('findTry')}</span>
        ${(S.lang === 'hi'
            ? ['गृहकर', 'कूड़ा', 'नाली', 'जन्म प्रमाण पत्र', 'लाइट']
            : ['house tax', 'garbage', 'drain', 'birth certificate', 'light'])
          .map(q => `<button class="chip" data-q="${esc(q)}">${esc(q)}</button>`).join('')}
      </div>
      <div class="finder__results" id="fres" role="region" aria-live="polite"></div>
    </div>

    <div class="counters">${top.map(counterHTML).join('')}</div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec__head"><div>
      <p class="eyebrow">${t('secAll')}</p>
      <h2 class="sec__title">${t('secAllT')}</h2>
      <p class="sec__note">${t('secAllN')}</p></div>
      <a class="more" href="#/sewaen">${t('viewAll')} ${ico('i-arrow')}</a></div>
    <div class="tiles">${SERVICES.slice(0, 12).map(tileHTML).join('')}</div>
  </div></section>

  <section class="sec sec--paper"><div class="wrap"><div class="grid2">
    <div>
      <div class="sec__head"><div>
        <p class="eyebrow">${t('secNotice')}</p>
        <h2 class="sec__title">${t('secNoticeT')}</h2></div>
        <a class="more" href="#/suchna">${t('viewAllNotice')} ${ico('i-arrow')}</a></div>
      <div class="notices">${NOTICES.slice(0, 5).map(noticeHTML).join('')}</div>
    </div>
    ${helplineHTML()}
  </div></div></section>

  <section class="viksit"><div class="viksit__chakra">${chakra('#FFFFFF')}</div>
    <div class="wrap viksit__in">
      <div>
        <p class="viksit__eye">${t('charterEye')}</p>
        <h2 class="viksit__t">${t('charterT')}</h2>
        <p class="viksit__p">${t('charterP')}</p>
        <a class="more more--light" href="#/charter">${t('charterAll')} ${ico('i-arrow')}</a>
      </div>
      <div class="pledges">${CHARTER.slice(0, 5).map(c => `
        <div class="pledge">${ico(c.icon)}
          <span class="pledge__txt"><b>${esc(L(c).s)}</b><span>${esc(L(c).d)}</span></span>
          <span class="pledge__t">${esc(L(c.t))}</span></div>`).join('')}
      </div>
    </div></section>

  <section class="sec"><div class="wrap">
    <p class="eyebrow">${t('secStat')}</p>
    <h2 class="sec__title" style="margin-bottom:1.3rem">${t('secStatT')}</h2>
    <div class="stats">${STATS.map(s => `<div class="stat">
      <div class="stat__n">${esc(S.lang === 'en' && s.nEn ? s.nEn : s.n)}</div>
      <div class="stat__l">${esc(s[S.lang] || s.hi)}</div></div>`).join('')}</div>

    <div class="sec__head" style="margin-top:2.6rem"><div>
      <p class="eyebrow">${t('secPeople')}</p>
      <h2 class="sec__title">${t('secPeopleT')}</h2></div></div>
    <div class="people">${PEOPLE.map(p => {
      const c = L(p);
      return `<div class="person"><span class="person__av" aria-hidden="true">${esc(p.init)}</span>
        <span><span class="person__r">${esc(c.r)}</span>
        <span class="person__n">${esc(c.n)}</span>
        <span class="person__c">${esc(c.c)}</span></span></div>`;
    }).join('')}</div>
  </div></section>`;
};

V.services = () => `
  ${pageHead('servT', 'servP')}
  <section class="sec"><div class="wrap">
    <p class="sec__note" style="margin-bottom:1.4rem">${t('secAllN')}</p>
    <div class="tiles">${SERVICES.map(tileHTML).join('')}</div>
  </div></section>`;

V.notices = () => `
  ${pageHead('noticeT', 'noticeP')}
  <section class="sec"><div class="wrap"><div class="grid2">
    <div class="card"><div class="notices">${NOTICES.map(noticeHTML).join('')}</div></div>
    ${helplineHTML()}
  </div></div></section>`;

V.depts = () => `
  ${pageHead('deptT', 'deptP')}
  <section class="sec"><div class="wrap">
    <div class="grid3">${DEPTS.map(d => {
      const c = L(d);
      return `<div class="dept"><span class="dept__n">${esc(c.n)}</span>
        <span class="dept__d">${esc(c.d)}</span>
        ${d.ph ? `<a class="dept__c" href="tel:${d.ph}">${ico('i-phone')}${esc(d.ph)}</a>` : ''}</div>`;
    }).join('')}</div>
  </div></section>`;

V.contact = () => `
  ${pageHead('contactT', 'contactP')}
  <section class="sec"><div class="wrap"><div class="grid2">
    <div class="card">
      <p class="eyebrow">${t('cOffice')}</p>
      <h2 style="font-size:1.35rem;margin-bottom:.5rem">${t('orgName')}</h2>
      <p style="color:var(--stone);margin-bottom:.9rem">${t('address')}</p>
      <dl style="display:grid;gap:.7rem;margin:0 0 1.2rem">
        <div class="kv"><dt>${t('cHours')}</dt><dd>${t('cHoursV')}</dd></div>
        <div class="kv"><dt>${t('cWrite')}</dt><dd><a href="mailto:nagarnigamsaharanpur@gmail.com">nagarnigamsaharanpur@gmail.com</a></dd></div>
      </dl>
      <a class="btn btn--ghost" target="_blank" rel="noopener"
         href="https://www.google.com/maps/search/?api=1&query=Nagar+Nigam+Saharanpur+Gurudwara+Road">
         ${ico('i-pin')}${t('cMap')}</a>

      <h3 style="font-size:1.1rem;margin:1.8rem 0 .8rem">${t('cZones')}</h3>
      <div class="grid3" style="grid-template-columns:1fr">${ZONES.map(z => {
        const c = L(z);
        return `<div class="dept"><span class="dept__n">${esc(c.n)}</span>
          <span class="dept__d">${esc(c.a)}</span>
          <a class="dept__c" href="tel:${z.ph}">${ico('i-phone')}${esc(z.ph)}</a></div>`;
      }).join('')}</div>
    </div>
    ${helplineHTML()}
  </div></div></section>

  <section class="sec"><div class="wrap">
    <div class="sec__head"><div>
      <p class="eyebrow">${t('officersEye')}</p>
      <h2 class="sec__title">${t('officersT')}</h2></div></div>
    <div class="grid3">${OFFICERS.map(o => {
      const c = L(o);
      return `<div class="card">
        <h3 class="help__h" style="color:var(--ink);margin-bottom:.6rem">${esc(c.n)}</h3>
        ${o.ph
          ? `<a class="help__row help__row--light" href="tel:${o.ph}">
              ${ico('i-phone')}<span><span class="help__lbl">${esc(c.r)}</span>
              <span class="help__num">${esc(o.ph)}</span></span></a>`
          : `<div class="help__row help__row--light" style="cursor:default">
              ${ico('i-phone')}<span><span class="help__lbl">${esc(c.r)}</span>
              <span class="help__num">${t('cNoPhone')}</span></span></div>`}
      </div>`;
    }).join('')}</div>
  </div></section>`;

V.about = () => `
  ${pageHead('aboutT', 'aboutP')}
  <section class="sec"><div class="wrap" style="max-width:52rem">
    <div class="card">
      <p style="margin-bottom:1rem">${S.lang === 'hi'
        ? 'नगर निगम सहारनपुर नगर की सफाई, पेयजल, पथ प्रकाश, सड़क एवं नाली, स्वास्थ्य, उद्यान तथा कर-निर्धारण जैसे नागरिक कार्यों के लिए उत्तरदायी संस्था है। निगम क्षेत्र 70 वार्डों और तीन ज़ोन कार्यालयों में विभाजित है।'
        : 'Saharanpur Municipal Corporation is responsible for sanitation, drinking water, street lighting, roads and drains, public health, parks and property tax assessment across the city. The corporation area is divided into 70 wards and three zone offices.'}</p>
      <p style="margin-bottom:1.4rem;color:var(--stone)">${S.lang === 'hi'
        ? 'निर्वाचित सदन का नेतृत्व महापौर करते हैं, जबकि प्रशासनिक प्रमुख नगर आयुक्त होते हैं।'
        : 'The elected house is led by the Mayor; the Municipal Commissioner is the administrative head.'}</p>
      <div class="stats">${STATS.map(s => `<div class="stat">
        <div class="stat__n">${esc(S.lang === 'en' && s.nEn ? s.nEn : s.n)}</div>
        <div class="stat__l">${esc(s[S.lang] || s.hi)}</div></div>`).join('')}</div>
    </div>
  </div></section>`;

/* handoff page for the external tax portal */
V.tax = () => `
  <section class="sec"><div class="wrap"><div class="bridge">
    <div class="bridge__mark">${chakra()}</div>
    <h1 class="bridge__t">${t('bridgeT')}</h1>
    <p class="bridge__p">${t('bridgeP')}</p>
    <div class="note">${ico('i-info')}<span><b>${t('bridgeNoteT')}</b>${t('bridgeNote')}</span></div>
    <p style="font-weight:600;margin-bottom:.5rem">${t('bridgeWhat')}</p>
    <p style="color:var(--stone);margin-bottom:1.2rem">${S.lang === 'hi'
      ? 'PTIN या पुरानी रसीद संख्या, अथवा मकान संख्या + वार्ड + स्वामी का नाम।'
      : 'Your PTIN or an old receipt number, or house number + ward + owner’s name.'}</p>
    <p class="bridge__url">${esc(TAX_URL)}</p>
    <div class="btnrow" style="justify-content:center">
      <a class="btn" href="${esc(TAX_URL)}" target="_blank" rel="noopener">${t('bridgeGo')} ${ico('i-ext')}</a>
      <a class="btn btn--ghost" href="#/">${t('bridgeBack')}</a>
    </div>
  </div></div></section>`;

/* ── charter ─────────────────────────────────────────────── */
V.charter = () => `
  ${pageHead('charterEye', 'charterP')}
  <section class="sec"><div class="wrap" style="max-width:52rem">
    <div class="card" style="padding:0;overflow:hidden">
      <table class="tbl"><thead><tr>
        <th>${t('charterCol1')}</th><th>${t('charterCol2')}</th><th>${t('charterCol3')}</th>
      </tr></thead><tbody>
      ${CHARTER.map(c => `<tr>
        <td><span class="tbl__main">${ico(c.icon)}${esc(L(c).s)}</span></td>
        <td><span class="tbl__num">${esc(L(c.t))}</span></td>
        <td class="tbl__mute">${esc(L(c).d)}</td></tr>`).join('')}
      </tbody></table>
    </div>
  </div></section>`;

/* ── water & sewer ───────────────────────────────────────── */
V.water = () => `
  ${pageHead('waterT', 'waterP')}
  <section class="sec"><div class="wrap" style="max-width:48rem">
    ${demoNote()}
    <form class="form card" id="wform" novalidate style="margin-top:1.3rem">
      <div class="field" data-f="conn">
        <label for="w-conn">${t('wConn')}</label>
        <input id="w-conn" name="conn" inputmode="numeric" maxlength="8" placeholder="41234567">
        <p class="field__hint">${t('wConnHint')}</p>
        <p class="field__err">${ico('i-info')}${t('wReqConn')}</p>
      </div>
      <p class="orline"><span>${t('wOr')}</span></p>
      <div class="form__row form__row--2">
        <div class="field"><label for="w-house">${t('wHouse')}</label><input id="w-house" name="house"></div>
        <div class="field"><label for="w-ward">${t('wWard')}</label>
          <select id="w-ward" name="ward"><option value="">${t('fSelect')}</option>
          ${WARDS.map(w => `<option value="${w}">${S.lang === 'hi' ? 'वार्ड ' + w : 'Ward ' + w}</option>`).join('')}
          </select></div>
      </div>
      <div class="btnrow"><button class="btn" type="submit">${ico('i-search')}${t('wFind')}</button></div>
    </form>
    <div id="wout" style="margin-top:1.4rem"></div>
  </div></section>`;

function waterResultHTML(r) {
  if (!r) return `<div class="note">${ico('i-info')}<span>${t('wNoRec')}</span></div>`;
  const rupee = n => '₹ ' + n.toLocaleString('en-IN');
  return `<div class="ticket">
    <div class="ticket__top"><h3>${t('wRes')}</h3><p class="mono">${esc(r.conn)}</p></div>
    <div class="ticket__body"><dl style="display:grid;gap:.75rem;margin:0">
      <div class="kv"><dt>${t('wName')}</dt><dd>${esc(r[S.lang] || r.hi)}</dd></div>
      <div class="kv"><dt>${t('wCat')}</dt><dd>${t('wCatV')}</dd></div>
      <div class="kv"><dt>${t('wSize')}</dt><dd>${esc(r.size)}</dd></div>
      <div class="kv"><dt>${t('wLast')}</dt><dd>${esc(r.last)}</dd></div>
      <div class="kv"><dt>${t('wArrear')}</dt><dd>${rupee(r.arrear)}</dd></div>
      <div class="kv"><dt>${t('wCurrent')}</dt><dd>${rupee(r.current)}</dd></div>
      <div class="kv kv--big"><dt>${t('wTotal')}</dt><dd>${rupee(r.total)}</dd></div>
      <div class="kv"><dt>${t('wDue')}</dt><dd>${esc(r.due)}</dd></div>
    </dl>
    <div class="btnrow" style="margin-top:1.1rem"><a class="btn" href="#/grihkar">${ico('i-rupee')}${t('wPay')}</a></div>
    <p class="field__hint" style="margin-top:.7rem">${t('wPayNote')}</p>
    </div></div>`;
}

/* ── certificates ────────────────────────────────────────── */
V.cert = () => `
  ${pageHead('certT', 'certP')}
  <section class="sec"><div class="wrap" style="max-width:48rem">
    ${demoNote()}
    <div class="tabs" role="tablist" style="margin-top:1.3rem">
      <button class="tab is-on" role="tab" aria-selected="true"  data-tab="apply">${t('certTabA')}</button>
      <button class="tab"       role="tab" aria-selected="false" data-tab="get">${t('certTabB')}</button>
    </div>

    <form class="form card" id="cform" data-pane="apply" novalidate>
      <div class="form__row form__row--2">
        <div class="field"><label for="c-type">${t('cType')}</label>
          <select id="c-type" name="type">
            <option value="birth">${t('cBirth')}</option><option value="death">${t('cDeath')}</option>
          </select></div>
        <div class="field" data-f="cdate"><label for="c-date">${t('cDate')} <span class="req">*</span></label>
          <input id="c-date" name="date" type="date">
          <p class="field__err">${ico('i-info')}${t('cReqDate')}</p></div>
      </div>
      <div class="field" data-f="cperson"><label for="c-person">${t('cPerson')} <span class="req">*</span></label>
        <input id="c-person" name="person">
        <p class="field__err">${ico('i-info')}${t('cReqPerson')}</p></div>
      <div class="form__row form__row--2">
        <div class="field"><label for="c-father">${t('cFather')}</label><input id="c-father" name="father"></div>
        <div class="field"><label for="c-mother">${t('cMother')}</label><input id="c-mother" name="mother"></div>
      </div>
      <div class="field"><label for="c-place">${t('cPlace')}</label>
        <input id="c-place" name="place" placeholder="${esc(t('cPlaceH'))}"></div>
      <div class="form__row form__row--2">
        <div class="field" data-f="capp"><label for="c-app">${t('cApplicant')} <span class="req">*</span></label>
          <input id="c-app" name="app">
          <p class="field__err">${ico('i-info')}${t('cReqApp')}</p></div>
        <div class="field"><label for="c-rel">${t('cRelation')}</label><input id="c-rel" name="rel"></div>
      </div>
      <div class="note">${ico('i-info')}<span>${t('cLate')}</span></div>
      <div class="btnrow"><button class="btn" type="submit">${ico('i-check')}${t('cSubmit')}</button></div>
    </form>

    <form class="form card" id="gform2" data-pane="get" hidden novalidate>
      <div class="field" data-f="reg"><label for="c-reg">${t('cRegNo')} <span class="req">*</span></label>
        <input id="c-reg" name="reg" placeholder="SNN/B/2019/004821">
        <p class="field__hint">${t('cRegNoHint')}</p>
        <p class="field__err">${ico('i-info')}${t('cReqReg')}</p></div>
      <div class="btnrow"><button class="btn" type="submit">${ico('i-search')}${t('cFetch')}</button></div>
    </form>

    <div id="cout" style="margin-top:1.4rem"></div>
  </div></section>`;

/* ── tenders ─────────────────────────────────────────────── */
V.tenders = (cat = 'all') => `
  ${pageHead('tendT', 'tendP')}
  <section class="sec"><div class="wrap">
    <div class="filters" role="group">${TENDER_CATS.map(c =>
      `<button class="chip${c.id === cat ? ' is-on' : ''}" data-tcat="${c.id}">${esc(c[S.lang] || c.hi)}</button>`).join('')}
    </div>
    <div class="grid3" style="margin-top:1.2rem" id="tlist">${tenderList(cat)}</div>
  </div></section>`;

function tenderList(cat) {
  const rows = TENDERS.filter(x => cat === 'all' || x.cat === cat);
  if (!rows.length) return `<p class="fres--none">${t('tendNone')}</p>`;
  const label = { open:'tendOpen', closing:'tendClosing', closed:'tendClosed' };
  return rows.map(x => `<article class="tend">
    <span class="tend__status tend__status--${x.status}">${t(label[x.status])}</span>
    <h3 class="tend__t">${esc(L(x).t)}</h3>
    <p class="tend__no mono">${esc(x.no)}</p>
    <dl class="tend__meta">
      <div><dt>${t('tendDept')}</dt><dd>${esc(L(x).d)}</dd></div>
      <div><dt>${t('tendVal')}</dt><dd>${esc(L(x.val))}</dd></div>
      <div><dt>${t('tendEmd')}</dt><dd>${esc(L(x.emd))}</dd></div>
      <div><dt>${t('tendPub')}</dt><dd>${esc(x.pub)}</dd></div>
      <div><dt>${t('tendLast')}</dt><dd><b>${esc(x.last)}</b></dd></div>
    </dl>
    <div class="btnrow">
      <a class="btn btn--ghost" href="#/sewa/tender">${ico('i-down')}${t('tendDoc')}</a>
      ${x.status !== 'closed'
        ? `<a class="btn" href="https://etender.up.nic.in/" target="_blank" rel="noopener">${t('tendPortal')} ${ico('i-ext')}</a>` : ''}
    </div></article>`).join('');
}

/* ── media centre ────────────────────────────────────────── */
V.media = (cat = 'all') => `
  ${pageHead('mediaT', 'mediaP')}
  <section class="sec"><div class="wrap">
    <div class="filters" role="group">${MEDIA_CATS.map(c =>
      `<button class="chip${c.id === cat ? ' is-on' : ''}" data-mcat="${c.id}">${esc(c[S.lang] || c.hi)}</button>`).join('')}
    </div>
    <div class="grid3" style="margin-top:1.2rem" id="mlist">${mediaList(cat)}</div>
  </div></section>`;

function mediaList(cat) {
  const rows = MEDIA.filter(x => cat === 'all' || x.cat === cat);
  if (!rows.length) return `<p class="fres--none">${t('mediaNone')}</p>`;
  return rows.map(mediaCard).join('');
}

function mediaCard(x) {
  const c = L(x);
  const tagLabel = (MEDIA_CATS.find(m => m.id === x.cat) || {})[S.lang] || '';
  const meta = x.cat === 'works' && x.ward
    ? (S.lang === 'hi' ? 'वार्ड ' + x.ward : 'Ward ' + x.ward)
    : x.cat === 'press' && x.source
      ? esc(x.source[S.lang] || x.source.hi)
      : '';
  return `<article class="card media-card">
    <button type="button" class="media-card__img" data-mimg="${esc(x.link || x.img)}" aria-label="${esc(t('mediaEnlarge'))}: ${esc(c.t)}">
      <img src="${esc(x.img)}" alt="" loading="lazy">
      <span class="media-card__tag">${esc(tagLabel)}</span>
    </button>
    <h3 class="media-card__t">${esc(c.t)}</h3>
    <p class="media-card__meta">${x.date}${meta ? ' · ' + meta : ''}</p>
    <p class="media-card__d">${esc(c.d)}</p>
  </article>`;
}

/* ── ward & councillor ───────────────────────────────────── */
V.ward = () => `
  ${pageHead('wardT', 'wardP')}
  <section class="sec"><div class="wrap" style="max-width:48rem">
    <div class="note">${ico('i-info')}<span>${t('wardDemo')}</span></div>
    <div class="field" style="margin-top:1.2rem;max-width:22rem">
      <label for="ward-pick">${t('wardPick')}</label>
      <select id="ward-pick"><option value="">${t('fSelect')}</option>
      ${WARDS.map(w => `<option value="${w}">${S.lang === 'hi' ? 'वार्ड ' + w : 'Ward ' + w}</option>`).join('')}
      </select>
    </div>
    <div id="ward-out" style="margin-top:1.4rem"></div>
  </div></section>`;

function wardResultHTML(w) {
  const i = wardInfo(w);
  const z = L(i.zone);
  return `<div class="ticket">
    <div class="ticket__top">
      <h3>${S.lang === 'hi' ? 'वार्ड ' + w : 'Ward ' + w}</h3>
      <p>${esc(z.n)}</p></div>
    <div class="ticket__body">
      <p class="eyebrow" style="margin-bottom:.6rem">${t('wardParshad')}</p>
      <a class="help__row help__row--light" href="tel:${i.parshad.ph}">
        ${ico('i-phone')}<span><span class="help__lbl">${esc(i.parshad[S.lang] || i.parshad.hi)}</span>
        <span class="help__num">${esc(i.parshad.ph)}</span></span></a>

      <p class="eyebrow" style="margin:1.3rem 0 .6rem">${t('wardStaff')}</p>
      <div style="display:grid;gap:.5rem">${i.staff.map(s => `
        <a class="help__row help__row--light" href="tel:${s.ph}">
          ${ico('i-phone')}<span><span class="help__lbl">${t(s.k)} — ${esc(s[S.lang] || s.hi)}</span>
          <span class="help__num">${esc(s.ph)}</span></span></a>`).join('')}</div>

      <p class="eyebrow" style="margin:1.3rem 0 .6rem">${t('wardOffice')}</p>
      <a class="help__row help__row--light" href="tel:${i.zone.ph}">
        ${ico('i-pin')}<span><span class="help__lbl">${esc(z.a)}</span>
        <span class="help__num">${esc(i.zone.ph)}</span></span></a>

      <div class="btnrow" style="margin-top:1.2rem">
        <a class="btn" href="#/shikayat">${ico('i-megaphone')}${t('wardComplaint')}</a></div>
    </div></div>`;
}

/* ── officer view ────────────────────────────────────────── */
V.officer = (zone = 'all', cat = 'all') => {
  const total = QUEUE.length;
  const done = QUEUE.filter(x => x.status === 'done').length;
  const late = QUEUE.filter(x => x.status === 'late').length;
  return `
  ${pageHead('offT', 'offP')}
  <section class="sec"><div class="wrap">
    <div class="note">${ico('i-info')}<span><b>${t('offDemoT')}</b>${t('offDemo')}</span></div>

    <div class="stats" style="margin-top:1.3rem">
      <div class="stat"><div class="stat__n">${total}</div><div class="stat__l">${t('offTotal')}</div></div>
      <div class="stat"><div class="stat__n">${done}</div><div class="stat__l">${t('offDone')}</div></div>
      <div class="stat"><div class="stat__n">${total - done}</div><div class="stat__l">${t('offOpen')}</div></div>
      <div class="stat"><div class="stat__n">${late}</div><div class="stat__l">${t('offLate')}</div></div>
    </div>

    <div class="sec__head" style="margin:2.2rem 0 1rem"><div>
      <p class="eyebrow">${t('offQueue')}</p>
      <h2 class="sec__title">${t('offQueue')}</h2></div></div>

    <div class="filters">
      <span class="filters__lbl">${t('offFilterZ')}</span>
      ${['all', '1', '2', '3'].map(z =>
        `<button class="chip${z === zone ? ' is-on' : ''}" data-oz="${z}">${z === 'all' ? t('offAll') : z}</button>`).join('')}
      <span class="filters__lbl" style="margin-left:.6rem">${t('offFilterC')}</span>
      ${['all', ...CATEGORIES.filter(c => c.id !== 'anya').map(c => c.id)].map(c => {
        const o = CATEGORIES.find(x => x.id === c);
        return `<button class="chip${c === cat ? ' is-on' : ''}" data-oc="${c}">${c === 'all' ? t('offAll') : esc((o[S.lang] || o.hi).split(' ')[0])}</button>`;
      }).join('')}
    </div>

    <div class="card" style="padding:0;overflow:auto;margin-top:1rem" id="qwrap">${queueHTML(zone, cat)}</div>

    <div class="grid2" style="margin-top:2.4rem">
      <form class="card form" id="pubform" novalidate>
        <div>
          <p class="eyebrow">${t('offPubT')}</p>
          <h2 style="font-size:1.3rem;margin:.1rem 0 .3rem">${t('offPubT')}</h2>
          <p class="sec__note" style="margin:0 0 .3rem">${t('offPubP')}</p>
        </div>
        <div class="field" data-f="pt"><label for="p-title">${t('offPubTitle')} <span class="req">*</span></label>
          <input id="p-title" name="title">
          <p class="field__err">${ico('i-info')}${t('offPubReq')}</p></div>
        <div class="form__row form__row--2">
          <div class="field"><label for="p-tag">${t('offPubTag')}</label>
            <select id="p-tag" name="tag">${(S.lang === 'hi'
              ? ['जन सूचना', 'निविदा', 'आदेश', 'नीति', 'कर विभाग']
              : ['Public notice', 'Tender', 'Order', 'Policy', 'Tax dept.'])
              .map(x => `<option>${esc(x)}</option>`).join('')}</select></div>
          <div class="field"><label for="p-file">${t('offPubFile')}</label>
            <input id="p-file" name="file" type="file" accept="application/pdf"></div>
        </div>
        <div class="btnrow"><button class="btn" type="submit">${ico('i-check')}${t('offPubGo')}</button></div>
        <div id="pubout"></div>
      </form>
      <div class="card">
        <p class="eyebrow">${t('secNotice')}</p>
        <div class="notices" id="pubpreview">${NOTICES.slice(0, 4).map(noticeHTML).join('')}</div>
      </div>
    </div>
  </div></section>`;
};

function queueHTML(zone, cat) {
  const rows = QUEUE.filter(x =>
    (zone === 'all' || String(x.zone) === zone) && (cat === 'all' || x.cat === cat));
  if (!rows.length) return `<p class="fres--none">${t('offNone')}</p>`;
  const lbl = { open:'offSopen', prog:'offSprog', done:'offSdone', late:'offSlate' };
  return `<table class="tbl tbl--q"><thead><tr>
      <th>${t('offId')}</th><th>${t('offWard')}</th><th>${t('offCat')}</th>
      <th>${t('offAge')}</th><th>${t('offStatus')}</th></tr></thead><tbody>
    ${rows.map(x => {
      const c = CATEGORIES.find(y => y.id === x.cat);
      return `<tr>
        <td class="mono">${esc(x.id)}</td>
        <td>${x.ward}</td>
        <td class="tbl__mute">${esc((c[S.lang] || c.hi).split(' —')[0])}</td>
        <td><span class="tbl__num">${x.age} ${t('offDays')}</span></td>
        <td><span class="pill pill--${x.status}">${t(lbl[x.status])}</span></td></tr>`;
    }).join('')}</tbody></table>`;
}

/* generic service stub — every non-wired service lands here */
V.stub = id => {
  const s = SERVICES.find(x => x.id === id);
  if (!s) return V.notFound();
  const c = L(s);
  return `
  <section class="phead"><div class="wrap">
    <p class="crumb"><a href="#/">${t('navHome')}</a> <span>/</span>
      <a href="#/sewaen">${t('navServices')}</a> <span>/</span> <span>${esc(c.n)}</span></p>
    <h1 class="phead__t">${esc(c.n)}</h1>
    <p class="phead__p">${esc(c.d)}</p></div></section>
  <section class="sec"><div class="wrap" style="max-width:46rem">
    ${demoNote()}
    <div class="card" style="margin-top:1.2rem">
      <p style="margin-bottom:1rem">${S.lang === 'hi'
        ? 'इस सेवा का ऑनलाइन फ़ॉर्म अंतिम संस्करण में यहाँ जुड़ेगा। तब तक संबंधित विभाग से संपर्क करें।'
        : 'The online form for this service will sit here in the final build. Until then, contact the department directly.'}</p>
      <div class="btnrow">
        <a class="btn" href="tel:+911322648112">${ico('i-phone')}0132-2648112</a>
        <a class="btn btn--ghost" href="#/sewaen">${t('navServices')}</a>
      </div>
    </div>
  </div></section>`;
};

/* complaint form */
V.grievance = () => `
  ${pageHead('formT', 'formP')}
  <section class="sec"><div class="wrap" style="max-width:48rem">
    ${demoNote()}
    <form class="form" id="gform" novalidate style="margin-top:1.3rem">
      <div class="form__row form__row--2">
        <div class="field" data-f="name">
          <label for="g-name">${t('fName')} <span class="req">*</span></label>
          <input id="g-name" name="name" autocomplete="name">
          <p class="field__err">${ico('i-info')}${t('fReqName')}</p>
        </div>
        <div class="field" data-f="phone">
          <label for="g-phone">${t('fPhone')} <span class="req">*</span></label>
          <input id="g-phone" name="phone" inputmode="numeric" autocomplete="tel" maxlength="10">
          <p class="field__hint">${t('fPhoneHint')}</p>
          <p class="field__err">${ico('i-info')}${t('fReqPhone')}</p>
        </div>
      </div>
      <div class="form__row form__row--2">
        <div class="field" data-f="ward">
          <label for="g-ward">${t('fWard')} <span class="req">*</span></label>
          <select id="g-ward" name="ward"><option value="">${t('fSelect')}</option>
            ${WARDS.map(w => `<option value="${w}">${S.lang === 'hi' ? 'वार्ड ' + w : 'Ward ' + w}</option>`).join('')}
          </select>
          <p class="field__err">${ico('i-info')}${t('fReqWard')}</p>
        </div>
        <div class="field" data-f="cat">
          <label for="g-cat">${t('fCat')} <span class="req">*</span></label>
          <select id="g-cat" name="cat"><option value="">${t('fSelect')}</option>
            ${CATEGORIES.map(c => `<option value="${c.id}">${esc(c[S.lang] || c.hi)}</option>`).join('')}
          </select>
          <p class="field__err">${ico('i-info')}${t('fReqCat')}</p>
        </div>
      </div>
      <div class="field" data-f="place">
        <label for="g-place">${t('fPlace')}</label>
        <input id="g-place" name="place">
      </div>
      <div class="field" data-f="desc">
        <label for="g-desc">${t('fDesc')} <span class="req">*</span></label>
        <textarea id="g-desc" name="desc"></textarea>
        <p class="field__err">${ico('i-info')}${t('fReqDesc')}</p>
      </div>
      <div class="field">
        <label for="g-photo">${t('fPhoto')}</label>
        <input id="g-photo" name="photo" type="file" accept="image/*">
        <p class="field__hint">${t('fPhotoHint')}</p>
      </div>
      <div class="btnrow">
        <button class="btn" type="submit">${ico('i-check')}${t('fSubmit')}</button>
        <a class="btn btn--ghost" href="#/meri-shikayat">${t('trackView')}</a>
      </div>
    </form>
    <div id="gout" style="margin-top:1.5rem"></div>
  </div></section>`;

V.track = () => {
  const list = readTickets();
  return `
  ${pageHead('trackT', 'trackP')}
  <section class="sec"><div class="wrap" style="max-width:48rem">
    ${list.length ? list.map(ticketHTML).join('<div style="height:1rem"></div>') : `
      <div class="card empty">
        <h3>${t('trackEmptyH')}</h3><p>${t('trackEmptyP')}</p>
        <a class="btn" href="#/shikayat">${ico('i-megaphone')}${t('trackEmptyC')}</a>
      </div>`}
  </div></section>`;
};

V.notFound = () => `
  <section class="sec"><div class="wrap"><div class="card empty">
    <h3>${t('notFoundT')}</h3><p>${t('notFoundP')}</p>
    <a class="btn" href="#/">${t('goHome')}</a>
  </div></div></section>`;

/* ── complaint tickets (device-local only) ───────────────── */
function readTickets() {
  try { return JSON.parse(localStorage.getItem('snn.tickets') || '[]'); }
  catch { return []; }
}
function saveTicket(x) {
  const l = readTickets(); l.unshift(x);
  localStorage.setItem('snn.tickets', JSON.stringify(l.slice(0, 25)));
}
function ticketHTML(x) {
  const cat = CATEGORIES.find(c => c.id === x.cat);
  return `<div class="ticket">
    <div class="ticket__top"><h3>${t('ticketH')}</h3><p>${t('ticketP')}</p></div>
    <div class="ticket__body"><dl style="display:grid;gap:.75rem;margin:0">
      <div class="kv"><dt>${t('ticketNo')}</dt><dd class="mono">${esc(x.id)}</dd></div>
      <div class="kv"><dt>${t('ticketCat')}</dt><dd>${esc(cat ? (cat[S.lang] || cat.hi) : x.cat)}</dd></div>
      <div class="kv"><dt>${t('ticketWard')}</dt><dd>${S.lang === 'hi' ? 'वार्ड ' + esc(x.ward) : 'Ward ' + esc(x.ward)}</dd></div>
      <div class="kv"><dt>${t('ticketOn')}</dt><dd>${esc(x.on)}</dd></div>
      <div class="kv"><dt>${t('ticketStatus')}</dt>
        <dd><span class="status">${ico('i-track')}${t('ticketOpen')}</span></dd></div>
      <div class="kv"><dt>${t('ticketEta')}</dt><dd>${t('ticketDays')}</dd></div>
    </dl></div></div>`;
}
function newId() {
  const n = String(Math.floor(Math.random() * 900000) + 100000);
  return `SNN-${new Date().getFullYear()}-${n}`;
}

/* ── search ──────────────────────────────────────────────── */
function runSearch(q) {
  const box = $('#fres'); if (!box) return;
  const s = q.trim().toLowerCase();
  $('[data-find-clear]').hidden = !s;
  if (!s) { box.innerHTML = ''; return; }
  const hits = SERVICES.filter(x =>
    ['hi', 'en'].some(l => (`${x[l].n} ${x[l].d} ${x[l].k}`).toLowerCase().includes(s))
  ).slice(0, 6);
  box.innerHTML = hits.length
    ? hits.map(x => { const c = L(x); return `
        <a class="fres" href="${esc(serviceHref(x))}"${isExt(x) ? ' target="_blank" rel="noopener"' : ''}>
          ${ico(x.icon)}<span><b>${esc(c.n)}</b><small>${esc(c.d)}</small></span>
          ${ico(isExt(x) ? 'i-ext' : 'i-arrow', 'ico fres__go')}</a>`; }).join('')
    : `<p class="fres--none">${t('findNone')}</p>`;
}

/* ── router ──────────────────────────────────────────────── */
const ROUTES = {
  '/':              V.home,
  '/sewaen':        V.services,
  '/suchna':        V.notices,
  '/media':         () => V.media('all'),
  '/vibhag':        V.depts,
  '/sampark':       V.contact,
  '/about':         V.about,
  '/grihkar':       V.tax,
  '/shikayat':      V.grievance,
  '/meri-shikayat': V.track,
  '/charter':       V.charter,
  '/parshad':       V.ward,
  '/adhikari':      V.officer,
  '/sewa/water':    V.water,
  '/sewa/birth':    V.cert,
  '/sewa/tender':   () => V.tenders('all')
};

function render() {
  const path = (location.hash.replace(/^#/, '') || '/').split('?')[0];
  const view = ROUTES[path] || (path.startsWith('/sewa/') ? () => V.stub(path.slice(6)) : V.notFound);
  const main = $('#view');
  main.innerHTML = view();

  $$('.nav a').forEach(a => {
    if (a.dataset.nav === path) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  $('#nav').classList.remove('is-open');
  $('[data-nav-toggle]').setAttribute('aria-expanded', 'false');

  wireView();
  reveal();
  if (path !== lastPath) { window.scrollTo({ top: 0, behavior: 'auto' }); main.focus({ preventScroll: true }); }
  lastPath = path;
}
let lastPath = null;

/* ── per-view wiring ─────────────────────────────────────── */
function wireView() {
  const find = $('#find');
  if (find) {
    find.addEventListener('input', e => runSearch(e.target.value));
    find.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); const f = $('#fres .fres'); if (f) f.click(); }
    });
    $('[data-find-clear]').addEventListener('click', () => { find.value = ''; runSearch(''); find.focus(); });
    $$('.chip').forEach(c => c.addEventListener('click', () => {
      find.value = c.dataset.q; runSearch(c.dataset.q); find.focus();
    }));
  }

  /* water & sewer lookup */
  const wf = $('#wform');
  if (wf) wf.addEventListener('submit', e => {
    e.preventDefault();
    const conn = wf.elements.conn.value.trim();
    const house = wf.elements.house.value.trim();
    const ward = wf.elements.ward.value;
    const ok = conn.length >= 6 || (house && ward);
    wf.querySelector('[data-f="conn"]').classList.toggle('is-bad', !ok);
    if (!ok) { wf.elements.conn.focus(); return; }
    const out = $('#wout');
    out.innerHTML = waterResultHTML(waterRecord(conn || `${house}-${ward}`));
    out.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });

  /* certificates — tabs, apply, download */
  if ($('#cform')) {
    $$('.tab').forEach(b => b.addEventListener('click', () => {
      $$('.tab').forEach(x => { x.classList.remove('is-on'); x.setAttribute('aria-selected', 'false'); });
      b.classList.add('is-on'); b.setAttribute('aria-selected', 'true');
      $$('[data-pane]').forEach(p => { p.hidden = p.dataset.pane !== b.dataset.tab; });
      $('#cout').innerHTML = '';
    }));

    $('#cform').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target, bad = [];
      const check = (n, ok) => {
        const el = f.querySelector(`[data-f="${n}"]`);
        el.classList.toggle('is-bad', !ok); if (!ok) bad.push(el);
      };
      check('cperson', f.elements.person.value.trim().length >= 2);
      check('cdate',   Boolean(f.elements.date.value));
      check('capp',    f.elements.app.value.trim().length >= 2);
      if (bad.length) { bad[0].querySelector('input').focus(); return; }
      const id = `SNN/${f.elements.type.value === 'birth' ? 'B' : 'D'}/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 9000) + 1000)}`;
      $('#cout').innerHTML = `<div class="ticket">
        <div class="ticket__top"><h3>${t('cAckT')}</h3><p>${t('cAckP')}</p></div>
        <div class="ticket__body"><dl style="display:grid;gap:.75rem;margin:0">
          <div class="kv"><dt>${t('cAckNo')}</dt><dd class="mono">${esc(id)}</dd></div>
          <div class="kv"><dt>${t('cPerson')}</dt><dd>${esc(f.elements.person.value.trim())}</dd></div>
          <div class="kv"><dt>${t('cAckEta')}</dt><dd>${t('cAckDays')}</dd></div>
        </dl></div></div>`;
      f.reset();
      $('#cout').scrollIntoView({ block: 'start', behavior: 'smooth' });
    });

    $('#gform2').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      const v = f.elements.reg.value.trim();
      const ok = v.length >= 4;
      f.querySelector('[data-f="reg"]').classList.toggle('is-bad', !ok);
      if (!ok) { f.elements.reg.focus(); return; }
      const found = !/0$/.test(v);
      $('#cout').innerHTML = found
        ? `<div class="ticket"><div class="ticket__top"><h3>${t('cReady')}</h3><p class="mono">${esc(v)}</p></div>
            <div class="ticket__body">
              <dl style="display:grid;gap:.75rem;margin:0">
                <div class="kv"><dt>${t('cIssued')}</dt><dd>18 Aug 2026</dd></div></dl>
              <div class="btnrow" style="margin-top:1.1rem">
                <button class="btn" type="button">${ico('i-down')}${t('cDownload')}</button></div>
            </div></div>`
        : `<div class="note">${ico('i-info')}<span>${t('cNoRec')}</span></div>`;
      $('#cout').scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  }

  /* tender filters */
  $$('[data-tcat]').forEach(b => b.addEventListener('click', () => {
    $$('[data-tcat]').forEach(x => x.classList.remove('is-on'));
    b.classList.add('is-on');
    $('#tlist').innerHTML = tenderList(b.dataset.tcat);
  }));

  /* media centre filters */
  $$('[data-mcat]').forEach(b => b.addEventListener('click', () => {
    $$('[data-mcat]').forEach(x => x.classList.remove('is-on'));
    b.classList.add('is-on');
    $('#mlist').innerHTML = mediaList(b.dataset.mcat);
  }));

  /* ward picker */
  const wp = $('#ward-pick');
  if (wp) wp.addEventListener('change', () => {
    $('#ward-out').innerHTML = wp.value ? wardResultHTML(Number(wp.value)) : '';
  });

  /* officer view: filters + publish */
  if ($('#qwrap')) {
    let oz = 'all', oc = 'all';
    const redraw = () => { $('#qwrap').innerHTML = queueHTML(oz, oc); };
    $$('[data-oz]').forEach(b => b.addEventListener('click', () => {
      oz = b.dataset.oz;
      $$('[data-oz]').forEach(x => x.classList.toggle('is-on', x === b));
      redraw();
    }));
    $$('[data-oc]').forEach(b => b.addEventListener('click', () => {
      oc = b.dataset.oc;
      $$('[data-oc]').forEach(x => x.classList.toggle('is-on', x === b));
      redraw();
    }));

    $('#pubform').addEventListener('submit', e => {
      e.preventDefault();
      const f = e.target;
      const title = f.elements.title.value.trim();
      const ok = title.length >= 3;
      f.querySelector('[data-f="pt"]').classList.toggle('is-bad', !ok);
      if (!ok) { f.elements.title.focus(); return; }
      const now = new Date();
      const months = { hi:['जन','फ़र','मार्च','अप्रै','मई','जून','जुल','अग','सित','अक्टू','नव','दिस'],
                       en:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] };
      const rec = {
        d: String(now.getDate()).padStart(2, '0'),
        m: { hi: months.hi[now.getMonth()], en: months.en[now.getMonth()] },
        isNew: true, file: Boolean(f.elements.file.value),
        hi: { t: title, tag: f.elements.tag.value },
        en: { t: title, tag: f.elements.tag.value }
      };
      NOTICES.unshift(rec);
      $('#pubpreview').innerHTML = NOTICES.slice(0, 4).map(noticeHTML).join('');
      $('#pubout').innerHTML = `<div class="note note--flat">${ico('i-check')}<span>${t('offPubDone')}</span></div>`;
      f.reset();
    });
  }

  const form = $('#gform');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const g = n => form.elements[n];
    const bad = [];
    const check = (name, ok) => {
      const f = form.querySelector(`[data-f="${name}"]`);
      f.classList.toggle('is-bad', !ok);
      if (!ok) bad.push(f);
    };
    check('name',  g('name').value.trim().length >= 2);
    check('phone', /^[6-9]\d{9}$/.test(g('phone').value.trim()));
    check('ward',  g('ward').value !== '');
    check('cat',   g('cat').value !== '');
    check('desc',  g('desc').value.trim().length >= 10);
    if (bad.length) {
      bad[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
      bad[0].querySelector('input,select,textarea').focus({ preventScroll: true });
      return;
    }
    const x = {
      id: newId(), cat: g('cat').value, ward: g('ward').value,
      on: new Date().toLocaleDateString(S.lang === 'hi' ? 'hi-IN' : 'en-IN',
            { day: '2-digit', month: 'short', year: 'numeric' })
    };
    saveTicket(x);
    form.reset();
    const out = $('#gout');
    out.innerHTML = ticketHTML(x) + `<div class="btnrow" style="margin-top:1rem">
      <a class="btn btn--ghost" href="#/meri-shikayat">${t('trackView')}</a></div>`;
    out.scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
}

/* ── scroll reveal ───────────────────────────────────────── */
function reveal() {
  if (!('IntersectionObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = $$('#view .sec, #view .viksit').slice(1);   // never hide the first screenful
  const io = new IntersectionObserver((es, o) => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); o.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => { el.classList.add('reveal'); io.observe(el); });
  // Safety net: content must never stay invisible, whatever happens to the observer.
  setTimeout(() => els.forEach(el => el.classList.add('is-in')), 2500);
}

/* ── chrome wiring ───────────────────────────────────────── */
function wireChrome() {
  $('#chakra').innerHTML = chakra();
  $('#chakra-foot').innerHTML = chakra('#FFFFFF');

  $('[data-nav-toggle]').addEventListener('click', e => {
    const open = $('#nav').classList.toggle('is-open');
    e.currentTarget.setAttribute('aria-expanded', String(open));
  });

  $('[data-lang-toggle]').addEventListener('click', () => {
    S.lang = S.lang === 'hi' ? 'en' : 'hi';
    localStorage.setItem('snn.lang', S.lang);
    applyPrefs(); buildFooter(); render();
  });

  $('[data-contrast]').addEventListener('click', () => {
    S.hc = !S.hc; localStorage.setItem('snn.hc', S.hc ? '1' : '0'); applyPrefs();
  });

  const steps = ['s', 'm', 'l', 'xl'];
  $$('[data-fontsize]').forEach(b => b.addEventListener('click', () => {
    const i = steps.indexOf(S.fs);
    S.fs = b.dataset.fontsize === 'reset' ? 'm'
         : b.dataset.fontsize === 'up' ? steps[Math.min(i + 1, 3)] : steps[Math.max(i - 1, 0)];
    localStorage.setItem('snn.fs', S.fs); applyPrefs();
  }));

  /* media lightbox — delegated so it works for cards re-rendered on every route change */
  const box = $('#lightbox');
  $('#view').addEventListener('click', e => {
    const btn = e.target.closest('[data-mimg]');
    if (!btn) return;
    $('#lightbox-img').src = btn.dataset.mimg;
    box.showModal();
  });
  box.addEventListener('click', e => { if (e.target === box) box.close(); });
  $('[data-lightbox-close]').addEventListener('click', () => box.close());
}

function buildFooter() {
  $('[data-foot-services]').innerHTML = SERVICES.slice(0, 6).map(s => {
    const c = L(s);
    return `<li><a href="${esc(serviceHref(s))}"${isExt(s) ? ' target="_blank" rel="noopener"' : ''}>${esc(c.n)}${isExt(s) ? ' ↗' : ''}</a></li>`;
  }).join('');
  $('[data-foot-helplines]').innerHTML = HELPLINES.map(h =>
    `<li><a href="tel:${h.num.replace(/[^0-9+]/g, '')}">${esc(h.num)}</a></li>`).join('');
}

/* ── PWA: install prompt + offline banner + SW ───────────── */
function wirePWA() {
  const bar = document.createElement('div');
  bar.className = 'offline';
  bar.textContent = t('offline');
  document.body.insertBefore(bar, document.body.firstChild);
  const sync = () => bar.classList.toggle('is-on', !navigator.onLine);
  addEventListener('online', sync); addEventListener('offline', sync); sync();

  let deferred = null;
  addEventListener('beforeinstallprompt', e => {
    if (localStorage.getItem('snn.install') === 'no') return;
    e.preventDefault(); deferred = e;
    const box = document.createElement('div');
    box.className = 'install is-on';
    box.innerHTML = `<div style="flex:1">
        <p class="install__t">${t('installT')}</p>
        <p class="install__p">${t('installP')}</p></div>
      <button class="btn" type="button" data-go>${t('installGo')}</button>
      <button class="install__x" type="button" data-x aria-label="${esc(t('dismiss'))}">×</button>`;
    document.body.appendChild(box);
    box.querySelector('[data-go]').onclick = async () => { box.remove(); deferred.prompt(); deferred = null; };
    box.querySelector('[data-x]').onclick = () => { box.remove(); localStorage.setItem('snn.install', 'no'); };
  });

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
}

/* ── boot ────────────────────────────────────────────────── */
applyPrefs();
wireChrome();
buildFooter();
wirePWA();
addEventListener('hashchange', render);
render();

})();
