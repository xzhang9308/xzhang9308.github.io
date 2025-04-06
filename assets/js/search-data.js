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
        },{id: "nav-resume",
          title: "Resume",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
      
        title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
      section: "Posts",
      handler: () => {
        
          window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
        
      },
    },{id: "post-displaying-external-posts-on-your-al-folio-blog",
      
        title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
        
      },
    },{id: "news-one-paper-on-talking-head-video-decompression-is-accepted-by-cvpr-2020",
          title: '🎉 One paper on talking head video decompression is accepted by CVPR 2020....',
          description: "",
          section: "News",},{id: "news-one-paper-on-multi-modality-video-restoration-is-accepted-by-acmmm-2020",
          title: '🎉  One paper on multi-modality video restoration is accepted by ACMMM 2020.',
          description: "",
          section: "News",},{id: "news-one-paper-on-numerosity-is-accepted-by-neurips-2020",
          title: '🎉  One paper on numerosity is accepted by NeurIPS 2020.',
          description: "",
          section: "News",},{id: "news-one-paper-on-high-fidelity-image-compression-is-accepted-by-tip",
          title: '🎉  One paper on high fidelity image compression is accepted by TIP.',
          description: "",
          section: "News",},{id: "news-one-paper-on-roi-image-compression-is-accepted-by-cvpr-2021",
          title: '🎉  One paper on ROI image compression is accepted by CVPR 2021.',
          description: "",
          section: "News",},{id: "news-one-paper-on-multi-modality-face-video-restoration-is-accepted-by-tpami",
          title: '🎉  One paper on multi-modality face video restoration is accepted by TPAMI.',
          description: "",
          section: "News",},{id: "news-one-paper-on-lvq-for-image-compression-is-accepted-by-cvpr-2023",
          title: '🎉 One paper on LVQ for image compression is accepted by CVPR 2023....',
          description: "",
          section: "News",},{id: "news-one-paper-on-light-field-image-compression-is-accepted-by-jvci",
          title: '🎉  One paper on light field image compression is accepted by JVCI.',
          description: "",
          section: "News",},{id: "news-one-paper-on-point-cloud-compression-is-accepted-by-eccv-2024",
          title: '🎉  One paper on point cloud compression is accepted by ECCV 2024.',
          description: "",
          section: "News",},{id: "news-one-paper-on-optimal-lattice-vector-quantizer-is-accepted-by-neurips-2024",
          title: '🎉 One paper on optimal lattice vector quantizer is accepted by NeurIPS 2024....',
          description: "",
          section: "News",},{id: "news-one-paper-on-multirate-image-compression-is-accepted-by-cvpr-2025",
          title: '🎉  One paper on multirate image compression is accepted by CVPR 2025.',
          description: "",
          section: "News",},{id: "news-our-cvpr-2025-paper-has-been-selected-as-a-highlight-top-2",
          title: '🔥 Our CVPR 2025 paper has been selected as a highlight (Top 2%)....',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
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
