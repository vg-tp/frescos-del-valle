(function () {
  const header = document.querySelector("header.header");
  if (!header) return;

  const overPhoto = header.getAttribute("data-over-photo") === "1";
  const burger = header.querySelector(".burger");
  const drawer = header.querySelector(".mobileDrawer");
  let closeTimer = null;

  function setSolid(on) {
    header.classList.toggle("solid", on || !overPhoto);
    header.classList.toggle("overHero", overPhoto && !on);
  }

  function onScroll() {
    const force = !overPhoto || window.scrollY > 40 || (drawer && !drawer.hidden);
    setSolid(force);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function clearClose() {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  }

  function scheduleClose() {
    clearClose();
    closeTimer = window.setTimeout(() => closeMenus(), 140);
  }

  function closeMenus() {
    header.querySelectorAll(".navItemOpen").forEach((el) => el.classList.remove("navItemOpen"));
    header.querySelectorAll(".dropdown").forEach((el) => {
      el.classList.remove("dropdownOpen");
      el.setAttribute("aria-hidden", "true");
      el.setAttribute("inert", "");
    });
    header.querySelectorAll(".navTrigger").forEach((el) => el.setAttribute("aria-expanded", "false"));
  }

  function openMenu(item) {
    clearClose();
    closeMenus();
    item.classList.add("navItemOpen");
    const trigger = item.querySelector(".navTrigger");
    const dropdown = item.querySelector(".dropdown");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    if (dropdown) {
      dropdown.classList.add("dropdownOpen");
      dropdown.setAttribute("aria-hidden", "false");
      dropdown.removeAttribute("inert");
    }
  }

  header.querySelectorAll('.navItem[data-has-menu="true"]').forEach((item) => {
    item.addEventListener("mouseenter", () => openMenu(item));
    item.addEventListener("mouseleave", scheduleClose);
    const trigger = item.querySelector(".navTrigger");
    const dropdown = item.querySelector(".dropdown");
    if (trigger) {
      trigger.addEventListener("focus", () => openMenu(item));
      trigger.addEventListener("blur", (e) => {
        if (!item.contains(e.relatedTarget)) scheduleClose();
      });
    }
    if (dropdown) {
      dropdown.addEventListener("mouseenter", () => openMenu(item));
      dropdown.addEventListener("mouseleave", scheduleClose);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenus();
      if (drawer && !drawer.hidden) setDrawer(false);
    }
  });

  function setDrawer(open) {
    if (!drawer || !burger) return;
    drawer.hidden = !open;
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.style.overflow = open ? "hidden" : "";
    onScroll();
  }

  if (burger && drawer) {
    burger.addEventListener("click", () => setDrawer(drawer.hidden));
  }

  header.querySelectorAll('.mobileItem[data-has-menu="true"]').forEach((item) => {
    const btn = item.querySelector(".mobileRow button");
    const sub = item.querySelector(".mobileSub");
    if (!btn || !sub) return;
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      sub.hidden = expanded;
      const caret = btn.querySelector(".caret");
      if (caret) caret.classList.toggle("caretOpen", !expanded);
    });
  });

  const cookie = document.getElementById("cookie-banner");
  if (cookie) {
    const hide = () => {
      cookie.remove();
    };
    cookie.querySelector("[data-cookie-accept]")?.addEventListener("click", hide);
    cookie.querySelector("[data-cookie-close]")?.addEventListener("click", hide);
  }
})();
