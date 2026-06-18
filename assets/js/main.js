// Experience accordion: collapsed by default, click to toggle.
// Triggers are real <button> elements, so Enter and Space work natively.
(function () {
  var triggers = document.querySelectorAll(".accordion-trigger");
  if (!triggers.length) return;

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var expanded = trigger.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      trigger.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });
})();

// Scroll reveal: fade and rise blocks as they enter view. On project pages each
// content block reveals as it scrolls in (on load too). On the home page the
// selected-work, just-for-fun, and experience sections stay hidden until the
// first scroll, so the opening view stays on the hero and skills before the rest
// is "revealed" on the way down (the hero and skills have their own on-load
// entrance). Added in JS so non-JS visitors always see the content, and skipped
// entirely under reduced motion.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });

  var projectContainer = document.querySelector(".project-body .container");
  if (projectContainer) {
    Array.prototype.slice.call(projectContainer.children).forEach(function (block) {
      block.classList.add("reveal");
      observer.observe(block);
    });
  }

  if (document.querySelector(".hero")) {
    var homeBlocks = Array.prototype.slice.call(
      document.querySelectorAll(".work, .fun, .experience")
    );
    homeBlocks.forEach(function (block) {
      block.classList.add("reveal-peek");
    });

    var cue = document.createElement("button");
    cue.type = "button";
    cue.className = "scroll-cue";
    cue.innerHTML =
      '<span class="scroll-cue-label">View Work</span>' +
      '<svg class="scroll-cue-arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none">' +
      '<path d="M6 10l6 6 6-6" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.body.appendChild(cue);

    var started = false;

    // fade the cue in after the hero entrance settles, unless already scrolled
    var cueTimer = setTimeout(function () {
      if (!started) cue.classList.add("is-shown");
    }, 1100);

    var startReveal = function () {
      if (started) return;
      started = true;
      clearTimeout(cueTimer);
      window.removeEventListener("scroll", startReveal);
      cue.classList.remove("is-shown");
      setTimeout(function () {
        if (cue.parentNode) cue.parentNode.removeChild(cue);
      }, 500);
      homeBlocks.forEach(function (block) {
        observer.observe(block);
      });
    };

    // a slower eased scroll than the browser default, so the click glides down
    var smoothScrollTo = function (targetY, duration) {
      var html = document.documentElement;
      var prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      var startY = window.pageYOffset;
      var diff = targetY - startY;
      var startTime = null;
      var step = function (now) {
        if (startTime === null) startTime = now;
        var t = Math.min((now - startTime) / duration, 1);
        var eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, startY + diff * eased);
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          html.style.scrollBehavior = prevBehavior;
        }
      };
      requestAnimationFrame(step);
    };

    // clicking the cue does the same as scrolling, then glides down to the work
    cue.addEventListener("click", function () {
      var work = document.querySelector(".work");
      startReveal();
      if (!work) return;
      var targetY = work.getBoundingClientRect().top + window.pageYOffset;
      smoothScrollTo(targetY, 900);
    });

    window.addEventListener("scroll", startReveal, { passive: true });
  }
})();

// Project preview modal: clicking a work tile opens an in-page "mini project
// page" cloned from a per-project <template>, instead of navigating straight to
// the full page. Tiles keep their real href, so without JS (or when a project
// has no template yet) the click just follows the link. Content reuses the
// project-page classes and the same .reveal scroll animation, scoped to the
// dialog's own scroll area. All gated behind reduced motion.
(function () {
  var overlay = document.getElementById("project-modal");
  if (!overlay) return;
  var tiles = document.querySelectorAll(".work-tile, .fun-tile");
  if (!tiles.length) return;

  var dialog = overlay.querySelector(".modal-dialog");
  var body = overlay.querySelector(".modal-body");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lastFocused = null;
  var closeTimer = null;

  var revealObserver =
    !reduce && "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries, obs) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
              }
            });
          },
          { root: body, threshold: 0.08 }
        )
      : null;

  // "projects/focus-puck.html" -> "focus-puck"
  var keyFromHref = function (href) {
    var match = href && href.match(/projects\/([^\/]+)\.html/);
    return match ? match[1] : null;
  };

  var openModal = function (tile) {
    var key = keyFromHref(tile.getAttribute("href"));
    if (!key) return false;
    var template = document.getElementById("modal-" + key);
    if (!template) return false; // no preview built yet: let the link navigate

    lastFocused = tile;
    body.innerHTML = "";
    body.appendChild(template.content.cloneNode(true));

    var title = body.querySelector(".project-title");
    dialog.setAttribute("aria-label", title ? title.textContent : "Project preview");

    // point the pinned "Read More" bar at this project's full page
    var readmore = overlay.querySelector(".modal-readmore");
    if (readmore) readmore.setAttribute("href", "projects/" + key + ".html");

    if (revealObserver) {
      Array.prototype.slice
        .call(body.querySelectorAll(".modal-article > *"))
        .forEach(function (block) {
          block.classList.add("reveal");
          revealObserver.observe(block);
        });
    }

    overlay.hidden = false;
    document.body.classList.add("modal-open");
    // reset scroll now that the dialog is visible and has layout; doing this while
    // it was still hidden is a no-op and the browser restores the old position
    body.scrollTop = 0;
    // two frames so the browser registers the starting state before transitioning
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add("is-open");
      });
    });

    var closeBtn = overlay.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
    return true;
  };

  var closeModal = function () {
    if (overlay.hidden) return;
    overlay.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    var finish = function () {
      overlay.hidden = true;
      body.innerHTML = "";
      if (lastFocused) {
        lastFocused.focus();
        lastFocused = null;
      }
    };
    if (reduce) {
      finish();
    } else {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(finish, 360);
    }
  };

  tiles.forEach(function (tile) {
    tile.addEventListener("click", function (ev) {
      // let modified clicks (open in new tab, etc.) follow the link as normal
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) {
        return;
      }
      if (openModal(tile)) ev.preventDefault();
    });
  });

  overlay.addEventListener("click", function (ev) {
    // closest() so clicks on the SVG inside the close button still match
    if (ev.target.closest("[data-modal-close]")) closeModal();
  });

  document.addEventListener("keydown", function (ev) {
    if (overlay.hidden) return;
    if (ev.key === "Escape") {
      closeModal();
    } else if (ev.key === "Tab") {
      var focusables = dialog.querySelectorAll("a[href], button:not([disabled])");
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (ev.shiftKey && document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    }
  });
})();
