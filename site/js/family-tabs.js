(function () {
  document.querySelectorAll("[data-family-tabs]").forEach((section) => {
    const tabs = section.querySelectorAll("[data-family-tab]");
    const panels = section.querySelectorAll("[data-family-panel]");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const i = tab.getAttribute("data-family-tab");
        tabs.forEach((t) => {
          const on = t.getAttribute("data-family-tab") === i;
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.classList.toggle("familyTabActive", on);
        });
        panels.forEach((p) => {
          p.hidden = p.getAttribute("data-family-panel") !== i;
        });
      });
    });
  });
})();
