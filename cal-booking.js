// Booking pop-up: the "Hire Gary" buttons open Cal.com's booking calendar over the page,
// so visitors book without leaving the site. Each button keeps its normal cal.com link,
// so it still works if Cal.com's script can't load.
// Based on Cal.com's "element click" embed code for the gary-demo event.

(function loadCalEmbed(win, embedScriptUrl, initCommand) {
  function queueCommand(api, commandArguments) {
    api.q.push(commandArguments);
  }

  win.Cal = win.Cal || function () {
    const cal = win.Cal;
    const commandArguments = arguments;

    // The first call adds Cal.com's script; commands wait in a queue until it arrives
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      const script = win.document.createElement('script');
      script.src = embedScriptUrl;
      script.onload = function () {
        cal.embedScriptLoaded = true;
      };
      win.document.head.appendChild(script);
      cal.loaded = true;
    }

    if (commandArguments[0] === initCommand) {
      const namespaceApi = function () {
        queueCommand(namespaceApi, arguments);
      };
      const namespace = commandArguments[1];
      namespaceApi.q = namespaceApi.q || [];
      if (typeof namespace === 'string') {
        cal.ns[namespace] = cal.ns[namespace] || namespaceApi;
        queueCommand(cal.ns[namespace], commandArguments);
        queueCommand(cal, ['initNamespace', namespace]);
      } else {
        queueCommand(cal, commandArguments);
      }
      return;
    }

    queueCommand(cal, commandArguments);
  };
})(window, 'https://app.cal.com/embed/embed.js', 'init');

Cal('init', 'gary-demo', { origin: 'https://app.cal.com' });
Cal.config = Cal.config || {};
Cal.config.forwardQueryParams = true;
Cal.ns['gary-demo']('ui', { hideEventTypeDetails: false, layout: 'month_view' });

// Once Cal.com's script is ready, stop the buttons from leaving the page so only the pop-up opens.
// Before that, or if the script never loads, the buttons open cal.com as normal links.
document.addEventListener('click', (event) => {
  const bookingButton = event.target.closest('a[data-cal-link]');
  if (bookingButton && Cal.embedScriptLoaded) {
    event.preventDefault();
  }
});
