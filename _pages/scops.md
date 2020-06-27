---
title: "Varun Jampani - SCOPS"
layout: gridlay
excerpt: "Varun Jampani: SCOPS"
sitemap: false
permalink: /scops/
---

[comment]: Title
<h2 align="center"> SCOPS: Self-Supervised Co-Part Segmentation </h2>
<p>&nbsp;</p>

[comment]: Authors
<p style="text-align: center;">
<a href="https://hfslyc.github.io" style="color: #CC0000"> Wei-Chih Hung </a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://varunjampani.github.io" style="color: #CC0000"> Varun Jampani </a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://www.sifeiliu.net/" style="color: #CC0000"> Sifei Liu </a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://research.nvidia.com/person/pavlo-molchanov" style="color: #CC0000"> Pavlo Molchanov </a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://faculty.ucmerced.edu/mhyang/" style="color: #CC0000"> Ming-Hsuan Yang </a>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://jankautz.com/" style="color: #CC0000"> Jan Kautz </a>
</p>
<p>&nbsp;</p>

[comment]: Abstract
<h3> Abstract </h3>
Parts provide a good intermediate representation of objects that is robust with respect to the camera, pose and appearance variations. Existing works on part segmentation is dominated by supervised approaches that rely on large amounts of manual annotations and can not generalize to unseen object categories. We propose a self-supervised deep learning approach for part segmentation, where we devise several loss functions that aids in predicting part segments that are geometrically concentrated, robust to object variations and are also semantically consistent across different object instances. Extensive experiments on different types of image collections demonstrate that our approach can produce part segments that adhere to object boundaries and also more semantically consistent across object instances compared to existing self-supervised techniques.

<center>
<figure>
		<div id="projectid">
    <img src="{{ site.url }}{{ site.baseurl }}/images/projectpic/scops_results.png" width="900px" />
		</div>
		<br />
    <figcaption>
				Sample part segmentation obtained by SCOPS on different types of image collections: (left) unaligned faces from CelebA, (middle) birds from CUB and (right) horses from PASCAL VOC dataset images, showing that SCOPS can be robust to appearance, viewpoint and pose variations.
    </figcaption>
</figure>
</center>

[comment]: Paper
<h3> Paper </h3>
- Paper: <a href="{{ site.url }}{{ site.baseurl }}/papers/hung19_SCOPS.pdf" style="color: #CC0000"> PDF </a>
- Supplementary: <a href="{{ site.url }}{{ site.baseurl }}/papers/hung19_SCOPS_supp.pdf" style="color: #CC0000"> PDF </a>

<!-- - Poster: <a href="https://ps.is.tuebingen.mpg.de/uploads_file/attachment/attachment/279/cvpr_poster.pdf" style="color: #CC0000"> PDF </a> -->

Please consider citing if you make use of this work and/or the corresponding code:

```
@inproceedings{hung:CVPR:2019,
	title = {SCOPS: Self-Supervised Co-Part Segmentation},
	author = {Hung, Wei-Chih and Jampani, Varun and Liu, Sifei and Molchanov, Pavlo and Yang, Ming-Hsuan and Kautz, Jan},
	booktitle = {IEEE Conf. on Computer Vision and Pattern Recognition (CVPR)},
	month = june,
	year = {2019}
}
```

[comment]: Code
<h3> Code </h3>
SCOPS is implemented using <a href="https://pytorch.org/" style="color: #CC0000">pytorch</a> neural network framework. Code is available in this github repository:
<a href="https://github.com/NVlabs/SCOPS" style="color: #CC0000">https://github.com/NVlabs/SCOPS</a>.

[comment]: Video
<h3> Video </h3>
<center>
<iframe width="900" height="500" src="https://www.youtube.com/embed/OeBhDK8mQa8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</center>
