---
layout: page
title: Visitor Statistics
permalink: /visitors/
description: Page views and visitor locations
---

<link rel="stylesheet" href="{{ '/assets/css/visitor-stats.css' | relative_url | bust_file_cache }}">
<section class="visitor-stats" data-endpoint="{{ site.homepage_analytics_endpoint | replace: '/collect', '/public-stats' | escape }}">
  <p class="stats-intro">Explore visits over time and around the world.</p>
  <p class="stats-status" role="status" aria-live="polite">Loading visitor statistics…</p>
  <button class="stats-retry" type="button" hidden>Try again</button>
  <div class="stats-content" hidden>
    <div class="stats-cards" aria-label="Page view totals">
      <div class="stats-card"><span>Today</span><strong data-value="today">—</strong><small>Since midnight</small></div>
      <div class="stats-card"><span>Last 7 days</span><strong data-value="week">—</strong><small>Including today</small></div>
      <div class="stats-card"><span>Last 30 days</span><strong data-value="month">—</strong><small>Including today</small></div>
      <div class="stats-card"><span>All time</span><strong data-value="views">—</strong><small>Recorded page views</small></div>
    </div>
    <p class="stats-yesterday"></p>
    <section class="stats-section" aria-labelledby="daily-title">
      <h2 id="daily-title">Daily visits</h2>
      <p>Last 30 days · today's count is still growing</p>
      <div class="stats-chart" role="img" aria-label="Daily page views for the last 30 days; exact values are available in the table below."></div>
      <div class="stats-chart-labels" aria-hidden="true"><span class="stats-start"></span><span class="stats-end"></span></div>
      <details class="stats-daily-table"><summary>View daily counts</summary>
        <table><thead><tr><th scope="col">Date (Beijing)</th><th scope="col">Page views</th></tr></thead><tbody></tbody></table>
      </details>
    </section>
    <section class="stats-section" aria-labelledby="regions-title">
      <h2 id="regions-title">Countries / regions</h2>
      <div class="stats-filters" role="group" aria-label="Filter locations by time period">
        <button type="button" data-period="today" aria-pressed="false">Today</button>
        <button type="button" data-period="week" aria-pressed="true">Last 7 days</button>
        <button type="button" data-period="month" aria-pressed="false">Last 30 days</button>
        <button type="button" data-period="views" aria-pressed="false">All time</button>
      </div>
      <p class="stats-region-summary" role="status" aria-live="polite"></p>
      <table class="stats-regions"><thead><tr><th scope="col">Country / region</th><th scope="col">Page views</th></tr></thead><tbody></tbody></table>
    </section>
  </div>
  <p class="stats-note">All dates use Beijing time (UTC+8). Counts represent recorded page views, not unique visitors, and may include repeat or automated visits. Locations are approximate. Statistics may be cached for up to 5 minutes.</p>
  <a href="{{ '/' | relative_url }}">← Back to homepage</a>
</section>
<script defer src="{{ '/assets/js/visitor-stats.js' | relative_url | bust_file_cache }}"></script>
