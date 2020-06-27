---
title: "Varun Jampani - SSN"
layout: gridlay
excerpt: "Varun Jampani: SSN"
sitemap: false
permalink: /ssn/
---

[comment]: Title
<h2 align="center"> Superpixel Sampling Networks </h2>
<p>&nbsp;</p>

[comment]: Authors
<p style="text-align: center;">
<a href="http://varunjampani.github.io" style="color: #CC0000"> Varun Jampani </a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://research.nvidia.com/person/deqing-sun" style="color: #CC0000"> Deqing Sun </a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://mingyuliu.net/" style="color: #CC0000"> Ming-Yu Liu </a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://faculty.ucmerced.edu/mhyang/" style="color: #CC0000"> Ming-Hsuan Yang </a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://jankautz.com/" style="color: #CC0000"> Jan Kautz </a>
</p>
<p>&nbsp;</p>

[comment]: Abstract
<h3> Abstract </h3>
Superpixels provide an efficient low/mid-level representation of image data, which greatly reduces the number of image primitives for subsequent vision tasks. While various superpixel computation models exist, they are not differentiable, making them difficult to integrate into otherwise end-to-end trainable deep neural networks. In this work, we develop a new differentiable model for superpixel sampling that better leverages deep networks for learning superpixel segmentation. The resulting "Superpixel Sampling Network" (SSN) is end-to-end trainable, which allows learning task-specific superpixels with flexible loss functions and has fast runtime. Extensive experimental analysis indicates that SSNs not only outperforms existing superpixel algorithms on traditional segmentation benchmarks, but can also learns superpixels for other tasks. In addition, SSNs can be easily integrated into downstream deep networks resulting in performance improvements.

<center>
<figure>
		<div id="projectid">
    <img src="{{ site.url }}{{ site.baseurl }}/images/projectpic/ssn_illustration.png" width="900px" />
		</div>

    <figcaption>
		<br>
				Overview of Superpixel Sampling Networks. A given image is first passed onto a deep network that extracts features at each pixel, which are then used by differentiable SLIC to generate the superpixels. Shown here are a couple of example SSN generated task-specific superpixels for semantic segmentation and optical flow.
    </figcaption>
</figure>
</center>

[comment]: Paper
<h3> Paper </h3>

- Paper: <a href="{{ site.url }}{{ site.baseurl }}/papers/jampani18_SSN.pdf" style="color: #CC0000"> PDF </a>
- Supplementary: <a href="{{ site.url }}{{ site.baseurl }}/papers/jampani18_SSN_supp.pdf" style="color: #CC0000"> PDF </a>

<!-- - Poster: <a href="https://ps.is.tuebingen.mpg.de/uploads_file/attachment/attachment/279/cvpr_poster.pdf" style="color: #CC0000"> PDF </a> -->

Please consider citing if you make use of this work and/or the corresponding code:

```
@inproceedings{jampani:ssn:2018,
	title = {Superpixel Sampling Networks},
	author = {Jampani, Varun and Sun, Deqing and Liu, Ming-Yu and Yang, Ming-Hsuan and Kautz, Jan},
	booktitle = {European Conference on Computer Vision (ECCV)},
	month = September,
	year = {2018}
}
```

[comment]: Code
<h3> Code </h3>
We integrated superpixel sampling networks into <a href="http://caffe.berkeleyvision.org/" style="color: #CC0000"> Caffe </a> neural network framework. Code is available online in ths github repository:
<a href="https://github.com/NVlabs/ssn_superpixels" style="color: #CC0000">https://github.com/NVlabs/ssn_superpixels</a>.

[comment]: Video
<h3> Video </h3>
<center>
<iframe width="900" height="500" src="https://www.youtube.com/embed/q37MxZolDck" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</center>
