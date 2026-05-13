// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-arxiv",
          title: "arXiv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/arxiv/";
          },
        },{id: "nav-resume",
          title: "Resume",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-one-paper-on-talking-head-video-decompression-is-accepted-by-cvpr-2020",
          title: 'One paper on talking head video decompression is accepted by CVPR 2020.',
          description: "",
          section: "News",},{id: "news-one-paper-on-multi-modality-video-restoration-is-accepted-by-acmmm-2020",
          title: 'One paper on multi-modality video restoration is accepted by ACMMM 2020.',
          description: "",
          section: "News",},{id: "news-one-paper-on-numerosity-is-accepted-by-neurips-2020",
          title: 'One paper on numerosity is accepted by NeurIPS 2020.',
          description: "",
          section: "News",},{id: "news-one-paper-on-high-fidelity-image-compression-is-accepted-by-tip",
          title: 'One paper on high fidelity image compression is accepted by TIP.',
          description: "",
          section: "News",},{id: "news-one-paper-on-roi-image-compression-is-accepted-by-cvpr-2021",
          title: 'One paper on ROI image compression is accepted by CVPR 2021.',
          description: "",
          section: "News",},{id: "news-one-paper-on-multi-modality-face-video-restoration-is-accepted-by-tpami",
          title: 'One paper on multi-modality face video restoration is accepted by TPAMI.',
          description: "",
          section: "News",},{id: "news-one-paper-on-lvq-for-image-compression-is-accepted-by-cvpr-2023",
          title: 'One paper on LVQ for image compression is accepted by CVPR 2023.',
          description: "",
          section: "News",},{id: "news-one-paper-on-light-field-image-compression-is-accepted-by-jvci",
          title: 'One paper on light field image compression is accepted by JVCI.',
          description: "",
          section: "News",},{id: "news-one-paper-on-point-cloud-compression-is-accepted-by-eccv-2024",
          title: 'One paper on point cloud compression is accepted by ECCV 2024.',
          description: "",
          section: "News",},{id: "news-one-paper-on-optimal-lattice-vector-quantizer-is-accepted-by-neurips-2024",
          title: 'One paper on optimal lattice vector quantizer is accepted by NeurIPS 2024.',
          description: "",
          section: "News",},{id: "news-one-paper-on-multirate-image-compression-is-accepted-by-cvpr-2025",
          title: 'One paper on multirate image compression is accepted by CVPR 2025.',
          description: "",
          section: "News",},{id: "news-our-cvpr-2025-paper-has-been-selected-as-a-highlight-top-3",
          title: 'Our CVPR 2025 paper has been selected as a Highlight (Top 3%).',
          description: "",
          section: "News",},{id: "news-two-papers-on-green-ai-are-accepted-by-neurips-2025",
          title: 'Two papers on Green AI are accepted by NeurIPS 2025.',
          description: "",
          section: "News",},{id: "news-i-was-selected-as-a-neurips-2025-top-reviewer",
          title: 'I was selected as a NeurIPS 2025 Top Reviewer.',
          description: "",
          section: "News",},{id: "news-one-paper-on-image-quality-assessment-coreset-is-accepted-by-wacv-2026",
          title: 'One paper on image quality assessment coreset is accepted by WACV 2026.',
          description: "",
          section: "News",},{id: "news-one-paper-on-domain-generalization-is-accepted-by-icassp-2026",
          title: 'One paper on domain generalization is accepted by ICASSP 2026.',
          description: "",
          section: "News",},{id: "news-one-paper-on-vlm-quantization-is-accepted-by-cvpr-findings-2026",
          title: 'One paper on VLM quantization is accepted by CVPR Findings 2026.',
          description: "",
          section: "News",},{id: "news-one-paper-on-3dgs-compression-is-accepted-by-ieee-t-ip",
          title: 'One paper on 3DGS compression is accepted by IEEE T-IP.',
          description: "",
          section: "News",},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
