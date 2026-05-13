---
layout: page
permalink: /publications/
title: Publications
venue_badge_legend: true
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography --query @*[year>=2024]* %}

<h2 class="bibliography">2023 &amp; Before</h2>

{% bibliography --group_by none --query @*[year<=2023]* %}

</div>
