---
layout: page
permalink: /arxiv/
title: arXiv
nav: true
nav_order: 3
---

<!-- _pages/arxiv.md -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography --file preprints --group_by none --sort_by year --order descending %}

</div>
