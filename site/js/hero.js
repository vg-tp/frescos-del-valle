(function () {
  const root = document.querySelector("[data-hero]");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll(".slide"));
  const dots = Array.from(root.querySelectorAll("[data-hero-dot]"));
  const headline = root.querySelector("[data-hero-headline]");
  const body = root.querySelector("[data-hero-body]");
  const cta = root.querySelector("[data-hero-cta]");
  let index = 0;
  const total = slides.length;
  let timer = null;

  const slideData = slides.map((s) => ({
    headline: s.getAttribute("data-headline") || "",
    body: s.getAttribute("data-body") || "",
    cta: s.getAttribute("data-cta") || "",
    href: s.getAttribute("data-href") || "#",
  }));

  function show(i) {
    index = (i + total) % total;
    slides.forEach((s, n) => {
      s.classList.toggle("active", n === index);
      s.setAttribute("aria-hidden", n === index ? "false" : "true");
    });
    dots.forEach((d, n) => {
      d.className = n === index ? "dotActive" : "dot";
      d.setAttribute("aria-selected", n === index ? "true" : "false");
    });
    const data = slideData[index];
    if (data && headline) headline.textContent = data.headline;
    if (data && body) body.textContent = data.body;
    if (data && cta) {
      cta.textContent = data.cta;
      cta.setAttribute("href", data.href);
    }
  }

  function start() {
    stop();
    timer = window.setInterval(() => show(index + 1), 6000);
  }
  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  root.querySelector("[data-hero-prev]")?.addEventListener("click", () => {
    show(index - 1);
    start();
  });
  root.querySelector("[data-hero-next]")?.addEventListener("click", () => {
    show(index + 1);
    start();
  });
  dots.forEach((d) => {
    d.addEventListener("click", () => {
      show(Number(d.getAttribute("data-hero-dot")));
      start();
    });
  });

  start();
})();
