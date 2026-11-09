(function () {
  var endpoint = window.homepageAnalyticsEndpoint;
  if (!endpoint) return;

  var visitorLabel = "";
  try {
    var search = new URLSearchParams(window.location.search);
    var hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    visitorLabel = search.get("analytics_visitor") || hash.get("analytics_visitor") || "";

    if (visitorLabel) {
      localStorage.setItem("homepageAnalyticsVisitorLabel", visitorLabel);
    } else {
      visitorLabel = localStorage.getItem("homepageAnalyticsVisitorLabel") || "";
    }
  } catch (error) {
    visitorLabel = "";
  }

  async function record() {
    try {
      await fetch(endpoint, {
        method: 'POST', keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify({
          page: window.location.pathname + window.location.search,
          title: document.title, referrer: document.referrer,
          visitor_label: visitorLabel,
        }),
      });
    } catch (_) { /* Analytics must never interrupt the page. */ }
  }
  record();
})();
