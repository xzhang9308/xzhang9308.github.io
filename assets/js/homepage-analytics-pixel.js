(function () {
  var endpoint = window.homepageAnalyticsEndpoint;
  if (!endpoint) return;

  var params = new URLSearchParams();
  params.set("page", window.location.pathname + window.location.search);
  params.set("title", document.title);
  params.set("referrer", document.referrer);
  params.set("visitor_label", localStorage.getItem("homepageAnalyticsVisitorLabel") || "");
  params.set("t", String(Date.now()));

  var image = new Image(1, 1);
  image.referrerPolicy = "strict-origin-when-cross-origin";
  image.src = endpoint + ".gif?" + params.toString();
})();
