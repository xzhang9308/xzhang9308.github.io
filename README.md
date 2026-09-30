# Xi Zhang — Academic Homepage

Personal academic website of **Xi Zhang**, Associate Professor at the School of Computer Engineering and Science, Shanghai University.

[Website](https://xzhang9308.github.io/) · [Publications](https://xzhang9308.github.io/publications/) · [News](https://xzhang9308.github.io/news/) · [Google Scholar](https://scholar.google.com/citations?user=78WvEjMAAAAJ)

## Research

My research focuses on **Green AI**: efficient model design, quantization, and visual compression, with an emphasis on reducing the energy, memory, and computational costs of large-scale models.

The website brings together my research background, publications, recent paper acceptances, and awards. Selected publications are featured on the homepage; the full list is available on the Publications page.

## Local preview

With Ruby and Bundler installed, run:

```sh
bundle install
bundle exec jekyll serve
```

Open [localhost:4000](http://localhost:4000). To generate the static site without starting a server:

```sh
bundle exec jekyll build
```

## Updating the site

| Content | Location |
| --- | --- |
| Biography and homepage | `_pages/about.md` |
| Publications | `_bibliography/papers.bib` |
| News | `_news/` |
| Site settings | `_config.yml` |
| Styling and colors | `_sass/` |
| Images and documents | `assets/` |

Set `selected={true}` in a publication entry to feature it on the homepage. Corresponding authors can be marked with a field such as `corresponding_authors={Xi Zhang; Weisi Lin}`.

Relevant changes pushed to `main` trigger the [deployment workflow](https://github.com/xzhang9308/xzhang9308.github.io/actions/workflows/deploy.yml), which builds the site and publishes it through GitHub Pages.

## Credits

Built with [Jekyll](https://jekyllrb.com/) and adapted from the [al-folio](https://github.com/alshedivat/al-folio) theme. See [LICENSE](LICENSE) for the repository license.
