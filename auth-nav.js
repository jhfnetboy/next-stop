/* Next Stop — nav auth gate.
   Rules (enforced with CSS !important so React re-renders can't override):
   - The user avatar is shown ONLY on the homepage, and ONLY when logged in.
   - It carries data-home-avatar on the homepage; every other page's avatar
     (no marker) is always hidden.
   - Login state is kept in localStorage 'ns_auth'; we mirror it as a
     .ns-authed class on <html>.
   Click delegation wires [data-login] / [data-logout] triggers even when
   they are rendered dynamically. */
(function () {
  var KEY = 'ns_auth';
  function authed() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  function injectStyle() {
    if (document.getElementById('ns-auth-style')) return;
    var s = document.createElement('style');
    s.id = 'ns-auth-style';
    s.textContent =
      'nav a[href="\u6211\u7684\u4e3b\u9875.dc.html"]:not([data-home-avatar]){display:none !important;}' +
      'html:not(.ns-authed) nav a[data-home-avatar]{display:none !important;}';
    (document.head || document.documentElement).appendChild(s);
  }

  function syncClass() {
    document.documentElement.classList.toggle('ns-authed', authed());
  }

  window.NextStopAuth = {
    login: function (name) {
      try { localStorage.setItem(KEY, '1'); if (name) localStorage.setItem('ns_name', name); } catch (e) {}
      syncClass();
    },
    logout: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      syncClass();
    },
    isAuthed: authed
  };

  function onClick(e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('[data-logout]')) { window.NextStopAuth.logout(); return; }
    if (t.closest('[data-login]')) { window.NextStopAuth.login(); }
  }

  function boot() {
    injectStyle();
    syncClass();
    document.addEventListener('click', onClick, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
