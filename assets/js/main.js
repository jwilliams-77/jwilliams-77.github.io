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
