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
      '<span class="scroll-cue-label">view work</span>' +
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
