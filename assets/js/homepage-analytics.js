(function () {
  var endpoint = window.homepageAnalyticsEndpoint;
  if (!endpoint || !navigator.sendBeacon) return;

  var payload = JSON.stringify({
    page: window.location.pathname + window.location.search,
    title: document.title,
    referrer: document.referrer,
  });

  var blob = new Blob([payload], { type: "application/json" });
  navigator.sendBeacon(endpoint, blob);
})();
