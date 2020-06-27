---
title: "Varun Jampani - VPN"
layout: gridlay
excerpt: "Varun Jampani: VPN"
sitemap: false
permalink: /vpn/
---

[comment]: Title
<h2 align="center"> Video Propagation Networks </h2>
<p>&nbsp;</p>

[comment]: Authors
<p style="text-align: center;">
<a href="http://varunjampani.github.io" style="color: #CC0000"> Varun Jampani </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://ps.is.tuebingen.mpg.de/person/rgadde" style="color: #CC0000"> Raghudeep Gadde </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://files.is.tue.mpg.de/pgehler/" style="color: #CC0000"> Peter V. Gehler </a>
</p>
<p>&nbsp;</p>

[comment]: Abstract
<h3> Abstract </h3>
In this paper we propose a technique that propagates information forward through video data. The method is conceptually simple and can be applied to tasks that require the propagation of structured information, such as semantic labels, based on video content. We propose a 'Video Propagation Network' that processes video frames in an adaptive manner. The model is applied online: it propagates information forward without the need to access future frames other than the current ones. In particular, we combine two components, a temporal bilateral network for dense and video adaptive filtering, followed by a spatial network to refine features and increased flexibility. We present experiments on video object segmentation and semantic video segmentation and show increased performance comparing to the best previous task-specific methods, while having favorable runtime. Additionally we demonstrate our approach on an example regression task of propagating color in a grayscale video.

<center>
<figure>
		<div id="projectid">
    <img src="{{ site.url }}{{ site.baseurl }}/images/projectpic/bcl_vpn_illustration.png" width="900px" />
		</div>
    <figcaption>
				Schematic of Bilateral Convolutional Layer, which forms the core of video propagation networks. Mask probabilities from previous frames are splatted on to the lattice positions defined by the image features. The splatted result is convolved with a 1 × 1 filter B, and the filtered result is sliced back to the original image space to get result for the present frame. Input and output can also be an intermediate CNN representations.
    </figcaption>
</figure>
</center>

[comment]: Paper
<h3> Paper </h3>
- Paper: <a href="{{ site.url }}{{ site.baseurl }}/papers/jampani17_VPN.pdf" style="color: #CC0000"> PDF </a>
- Supplementary: <a href="{{ site.url }}{{ site.baseurl }}/papers/jampani17_VPN_supp.pdf" style="color: #CC0000"> PDF </a>

<!-- - Poster: <a href="https://ps.is.tuebingen.mpg.de/uploads_file/attachment/attachment/279/cvpr_poster.pdf" style="color: #CC0000"> PDF </a> -->

Please consider citing if you make use of this work and/or the corresponding code:

```
@inproceedings{jampani:vpn:2017,
	title = {Video Propagation Networks},
	author = {Jampani, Varun and Gadde, Raghudeep and Gehler, Peter V.},
	booktitle = { IEEE Conf. on Computer Vision and Pattern Recognition (CVPR)},
	month = july,
	year = {2017}
}
```

[comment]: Code
<h3> Code </h3>
We integrated video propagation network into <a href="http://caffe.berkeleyvision.org/" style="color: #CC0000"> Caffe </a> neural network framework. Code is available in this github repository:
<a href="https://github.com/varunjampani/video_prop_networks" style="color: #CC0000"> https://github.com/varunjampani/video_prop_networks</a>.


<h3> Usage </h3>

The video propagation networks are generic and can be used for propagating any type of information across video frames. They are end-to-end trainable and can be combined with any existing deep network. The main use of VPNs in comparison to standard spatio-temporal CNNs is that VPNs can enable long-range pixel/superpixel connections while being computationally fast. In this paper, we experimented with label propagation (foreground or semantic labels) and colour propagation. See experiments in the paper and the corresponding <a href="https://github.com/varunjampani/video_prop_networks" style="color: #CC0000"> codes</a>.

An example color propagation:

<center>
<figure>
		<div id="projectid">
    <img src="{{ site.url }}{{ site.baseurl }}/images/projectpic/color_propagation.png" width="800px" />
		<p> &nbsp; </p>
		</div>
    <figcaption>
		<b>
			Input grayscale video frames and corresponding ground-truth (GT) color images together with color predictions of Levin et al. (2004) and VPN-Stage1 models.
		</b>
    </figcaption>
</figure>
</center>

A couple of examples for object mask propagation:

<center>
<figure>
		<div id="projectid">
    <img src="{{ site.url }}{{ site.baseurl }}/images/projectpic/video_seg_visuals.png" width="800px" />
		<p> &nbsp; </p>
		</div>
    <figcaption>
		<b>
			Shown are the different frames in example videos with the corresponding ground truth (GT) masks, predictions from BVS [M&auml;rki et al. 2016], OFL [Tsai et al. 2016], VPN (VPN- Stage2) and VPN-DLab (VPN-DeepLab) models.
		</b>
    </figcaption>
</figure>
</center>

<p> &nbsp; </p>
