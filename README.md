# course-theme

This repo is AI generated, use with caution.

A minimal Jekyll theme for course/lecture-note sites on GitHub Pages. No JS beyond a small vanilla script for the dark/light toggle, the mobile menu, and table-of-contents extraction — plus an optional math-rendering library you can turn on or off.

## Usage

In the site that should use this theme, add to `_config.yml`:

```yaml
remote_theme: ami-null/simple-ghp-theme
plugins:
  - jekyll-remote-theme
```

This works with GitHub Pages' classic build — no custom Ruby plugins are used, so nothing needs an Actions workflow. Pin to a specific commit once the theme is stable (`remote_theme: ami-null/simple-ghp-theme@<commit-sha>`) so a later change to the theme can't unexpectedly break a site using it.

Pages need `layout: page` (or `layout: home` for the site root) in front matter, or rely on GitHub Pages' auto-assigned default layout for files without one.

## Config options

All of these go inside your site's `_config.yml`, *not the theme's*.

```yaml
title: Website title
show_title: true        # false hides the site title in the topbar (link still there if you want, but default is to hide with the title)
description: "A short description of the course."
show_description: true  # false hides the description line even if `description` is set
theme_toggle: true       # false removes the light/dark toggle entirely

header:
  floating: true           # false = plain full-width bar instead of a detached, rounded, floating one
  sticky: true              # false = scrolls away with the page instead of staying pinned in view

favicon: /assets/favicon.ico   # optional; omit for no favicon

font:
  name: "Inter"           # any Google Fonts family name; omit for the browser's default font stack
  weights: [400, 600]      # optional; defaults to [400, 600]

nav_links:                 # arbitrary links in the topbar; omit or leave empty for none
  - text: GitHub
    url: https://github.com/you/repo
  - text: Syllabus
    url: /syllabus/

toc:
  enabled: true
  position: right           # left | right | top
                              # left/right: floating sidebar beside the content (collapses above content under 900px)
                              # top: full-width block right below the topbar/description

math:
  enabled: true
  engine: katex              # katex (lighter, faster) | mathjax (heavier, broader LaTeX-macro support)
  macros:                     # optional; same macros are wired into either engine
    "\\bX": "\\mathbf{X}"
    "\\Var": "\\operatorname{Var}"

footer_links:                 # first footer, up to as many columns as you list — designed for three
  - title: Course
    links:
      - text: Syllabus
        url: /syllabus/
  - title: Resources
    links:
      - text: Reference text
        url: https://example.com/

copyright: "&copy; 2026 Your Name. All rights reserved."   # second footer; omit for none
```

## Behavior notes

- **Mobile**: below 700px the topbar keeps the site title and the theme toggle visible, and collapses `nav_links` behind a hamburger button that expands the topbar downward. If `nav_links` is empty, the hamburger never renders.
- **Table of contents**: entries are pulled from `h2`/`h3` elements in the page content at load time (a small script in `assets/js/theme.js`), including a scroll-based highlight of the current section. No config needed per page — it just reads what's on the page. With `position: left` or `right`, the TOC sits in a grid gutter column beside the centered content column (`position: sticky`, so it starts wherever it naturally falls below your header/description and then sticks while scrolling) rather than sharing a container with the content, so the content column stays centered the same way with or without a TOC. Below ~1150px viewport width there's no room for that gutter, so it falls back to a static block right below the description — same spot `position: top` always uses.
- **Topbar**: sticky and visually detached (rounded corners, shadow, margin from the viewport edges) by default — `header.floating: false` reverts it to a plain full-width bar, and `header.sticky: false` makes it scroll away with the page instead of staying pinned. The two are independent, so any combination works.
- **Dark mode**: respects the visitor's OS preference on first visit, remembers an explicit toggle in `localStorage` after that. Colors are deliberately not pure black/white — see `_sass/theme/_variables.scss` to adjust.
- **Fonts**: with `font.name` set, the theme loads it from Google Fonts and applies it via a CSS variable; without it, `--font-family` falls back to the system font stack, so nothing needs to be re-declared per site.

## Local preview

```
bundle exec jekyll serve
```

uses the demo `_config.yml` and `index.md` in this repo. They're for previewing the theme itself — a consuming site's own `_config.yml` and pages fully replace them.

## Structure

```
_layouts/       default.html (the real implementation), page.html and home.html (thin wrappers)
_includes/      head, header, site-description, footer-links, footer-copyright, math
_sass/theme/    variables, base, header, site-description, toc, footer
assets/         main.scss (compiles to main.css) and js/theme.js
```
