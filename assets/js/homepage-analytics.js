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

  var params = new URLSearchParams();
  params.set("page", window.location.pathname + window.location.search);
  params.set("title", document.title);
  params.set("referrer", document.referrer);
  params.set("visitor_label", visitorLabel);
  params.set("t", String(Date.now()));

  var image = new Image(1, 1);
  image.referrerPolicy = "strict-origin-when-cross-origin";
  image.src = endpoint + ".gif?" + params.toString();
})();
