(function () {
  "use strict";

  // --- Light / dark toggle ---
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // --- Mobile nav toggle ---
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");
  if (navToggle && navLinks) {
    var setNav = function (open) {
      navLinks.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    };

    navToggle.addEventListener("click", function () {
      setNav(!navLinks.classList.contains("is-open"));
    });

    // Close on any click outside the menu and its button (this includes the theme toggle).
    document.addEventListener("click", function (e) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) setNav(false);
    });

    // Close after picking a link (matters for same-page #anchors, which don't reload).
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    // Close on Escape.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  // --- Table of contents: auto-extract from headings ---
  var tocNav = document.getElementById("toc-nav");
  if (tocNav) {
    var content = document.querySelector(".page-content");
    var headings = content ? content.querySelectorAll("h2, h3") : [];

    if (headings.length === 0) {
      var container = tocNav.closest(".toc");
      if (container) container.style.display = "none";
    } else {
      var list = document.createElement("ul");
      list.className = "toc__list";

      var usedIds = {};
      headings.forEach(function (heading) {
        if (!heading.id) {
          var slug = heading.textContent
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          if (usedIds[slug]) {
            usedIds[slug] += 1;
            slug = slug + "-" + usedIds[slug];
          } else {
            usedIds[slug] = 1;
          }
          heading.id = slug;
        }

        var item = document.createElement("li");
        item.className = "toc__item toc__item--" + heading.tagName.toLowerCase();

        var link = document.createElement("a");
        link.href = "#" + heading.id;
        link.textContent = heading.textContent;
        item.appendChild(link);
        list.appendChild(item);
      });

      tocNav.appendChild(list);

      // Highlight the current section while scrolling.
      var links = tocNav.querySelectorAll("a");
      if ("IntersectionObserver" in window && links.length) {
        var linkByHeadingId = {};
        links.forEach(function (a) {
          linkByHeadingId[a.getAttribute("href").slice(1)] = a;
        });

        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              var link = linkByHeadingId[entry.target.id];
              if (!link || !entry.isIntersecting) return;
              links.forEach(function (a) { a.classList.remove("is-active"); });
              link.classList.add("is-active");
            });
          },
          { rootMargin: "0px 0px -70% 0px" }
        );

        headings.forEach(function (h) { observer.observe(h); });
      }
    }
  }
})();
