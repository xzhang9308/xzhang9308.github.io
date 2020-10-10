---
title: "Xi Zhang - Home"
layout: gridlay
excerpt: "Xi Zhang"
sitemap: true
permalink: /
---

<div class="container-fluid">

<div class="row">

<div class="col-sm-8">

I am a Ph.D. candidate at Shanghai Jiao Tong University, supervised by [Prof. Xiaolin Wu](https://scholar.google.com/citations?user=ZuQnEIgAAAAJ). <br>
I received my B.Sc. degree in Mathematics and Physics Basic Science from University of Electronic Science and Technology of China (UESTC) in 2015. I am currently pursuing the Ph.D. degree with the Department of Electronic Engineering at Shanghai Jiao Tong University, China. I was also a visiting Ph.D. student with the Department of Electrical and Computer Engineering at McMaster University, Canada.  

My research interests include image processing, computer vision and deep learning, especially in areas of image/video compression, restoration and cognitive computing.

<!-- **_I am looking for motivated students for collaborations and internships. If interested, please drop me an email with your CV._** -->

<!-- **_If you are interested in research collaboration, please drop me an email with your CV._** -->

### News
{% for article in site.data.news limit:7 %}
{{ article.date }} :
<em>{{ article.headline }}</em>
{% endfor %}
<a href="{{ site.url }}{{ site.baseurl }}/allnews.html">see all news</a>

</div>

<div class="col-sm-4" style="display:table-cell; vertical-align:middle; text-align:left">

  <ul style="overflow: hidden">
  <img src="{{ site.url }}{{ site.baseurl }}/images/xizhang.jpg" class="img-responsive" width="100%" />
  </ul>

  <!-- <br clear="all" /> -->
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="mailto:xzhang9308@gmail.com">xzhang9308@gmail.com</a> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Shanghai Jiao Tong University <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 800 Dongchuan RD. <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Minhang, Shanghai, China. <br>

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <script type='text/javascript' id='clustrmaps' src='//cdn.clustrmaps.com/map_v2.js?cl=baafaf&w=a&t=n&d=UXi-7QCbKF9U-SufK06K6XusnA2APnOCSQEbRJP32I0&co=dfe9f0&cmo=7e7dc9&cmn=8dd999'></script> <br>

</div>

</div>
</div>

<div class="col-sm-12">

### Publications

{% for publi in site.data.publist limit:100 %}

<div class="col-sm-11 clearfix">
 <div class="well">
 <pubtit>{{ publi.title }}</pubtit>

 <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" width="250px" height="100px" style="float: left" />

 <!-- <p>{{ publi.description }}</p> -->

 <p><em>{{ publi.authors }}</em></p>

 <b>{{ publi.venue }}</b>

 {% if publi.number_link == 1 %}
 <p><a href="{{ publi.link1.url }}">{{ publi.link1.display }}</a></p>
 {% endif %}

 {% if publi.number_link == 2 %}
 <p><a href="{{ publi.link1.url }}">{{ publi.link1.display }}</a>
 /
 <a href="{{ publi.link2.url }}">{{ publi.link2.display }}</a></p>
 {% endif %}

 {% if publi.number_link == 3 %}
 <p><a href="{{ publi.link1.url }}">{{ publi.link1.display }}</a>
 /
 <a href="{{ publi.link2.url }}">{{ publi.link2.display }}</a>
 /
 <a href="{{ publi.link3.url }}">{{ publi.link3.display }}</a></p>
 {% endif %}

 {% if publi.number_link == 4 %}
 <p><a href="{{ publi.link1.url }}">{{ publi.link1.display }}</a>
 /
 <a href="{{ publi.link2.url }}">{{ publi.link2.display }}</a>
 /
 <a href="{{ publi.link3.url }}">{{ publi.link3.display }}</a>
 /
 <a href="{{ publi.link4.url }}">{{ publi.link4.display }}</a></p>
 {% endif %}

 {% if publi.number_link == 5 %}
 <p><a href="{{ publi.link1.url }}">{{ publi.link1.display }}</a>
 /
 <a href="{{ publi.link2.url }}">{{ publi.link2.display }}</a>
 /
 <a href="{{ publi.link3.url }}">{{ publi.link3.display }}</a>
 /
 <a href="{{ publi.link4.url }}">{{ publi.link4.display }}</a>
 /
 <a href="{{ publi.link5.url }}">{{ publi.link5.display }}</a></p>
 {% endif %}

 </div>
</div>

{% endfor %}

<br clear="all"/>

#### <a href="{{ site.url }}{{ site.baseurl }}/publications">see all publications</a>

</div>

