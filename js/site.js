(function () {
  const page = document.body.dataset.page || "";
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  const active = {
    catalogo: "catalogo.html",
    sectores: "sectores.html",
    nosotros: "nosotros.html",
    contacto: "contacto.html"
  };
  const link = (href, label) =>
    `<a href="${href}" class="${active[page] === href ? "is-active" : ""}">${label}</a>`;

  if (header) {
    header.innerHTML = `
      <div class="nav-wrap">
        <nav class="nav">
          <a class="logo" href="index.html" aria-label="Frescos del Valle">
            <img src="img/logo-frescos-del-valle.png" alt="Frescos del Valle" />
          </a>
          <div class="nav-links">
            ${link("nosotros.html", "Nosotros")}
            ${link("sectores.html", "Sectores")}
            ${link("catalogo.html", "Catálogo")}
            ${link("contacto.html", "Contacto")}
          </div>
          <div class="nav-right">
            <div class="lang" aria-label="Idioma"><span class="on">ES</span><span>EN</span></div>
            <a class="btn nav-login" href="contacto.html" aria-label="Iniciar sesión">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="3.4" stroke="#111814" stroke-width="1.8"/>
                <path d="M5.2 19.2c.8-3.4 3.4-5.2 6.8-5.2s6 1.8 6.8 5.2" stroke="#111814" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </a>
            <button class="menu-btn" id="menu" aria-label="Menú">☰</button>
          </div>
        </nav>
      </div>`;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="cta">
        <div>
          <h2>Abrir una cuenta</h2>
          <p>Nos dices qué tipo de operación tienes, en qué municipio y qué volumen manejas.<br>Un asesor te contacta y acordamos la primera entrega.</p>
        </div>
        <a class="btn" href="contacto.html">Abrir una cuenta →</a>
      </div>
      <footer>
        <div class="wrap foot-grid">
          <div>
            <a class="logo" href="index.html" aria-label="Frescos del Valle">
              <img src="img/logo-frescos-del-valle.png" alt="Frescos del Valle" />
            </a>
            <p style="margin-top:14px;max-width:36ch">Fruta, verdura, abarrote y huevo para cocinas profesionales del área metropolitana de Monterrey.</p>
            <div class="certs">
              <span>ISO 9001:2015</span>
              <span>NOM-251-SSA1-2009</span>
            </div>
          </div>
          <div class="foot-menus">
          <div>
            <h4>Menú</h4>
            <ul>
              <li><a href="catalogo.html">Catálogo</a></li>
              <li><a href="sectores.html">Sectores</a></li>
              <li><a href="nosotros.html">Nosotros</a></li>
              <li><a href="contacto.html">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4>Operación</h4>
            <ul>
              <li>Horarios de recepción</li>
              <li><a href="contacto.html#formato">Descargar formato de pedido</a></li>
            </ul>
          </div>
          </div>
        </div>
        <div class="wrap legal">
          <span>© ${new Date().getFullYear()} Frescos del Valle.</span>
          <span>Aviso de Privacidad.</span>
        </div>
      </footer>
      <button class="float" title="Contacto flotante" aria-label="Escribir sin salir de la página">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16v10H7l-3 3V6Z" stroke="#111814" stroke-width="1.8"/></svg>
      </button>`;
  }

  document.querySelectorAll(".step-h").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const open = item.classList.contains("open");
      document.querySelectorAll(".step").forEach((s) => s.classList.remove("open"));
      if (!open) item.classList.add("open");
    });
  });

  document.querySelectorAll("[data-acc] .acc-h").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const wrap = item.parentElement;
      const open = item.classList.contains("open");
      wrap.querySelectorAll(".acc-item").forEach((s) => s.classList.remove("open"));
      if (!open) item.classList.add("open");
    });
  });

  const gallery = document.querySelector(".gallery");
  if (gallery) {
    const box = document.createElement("div");
    box.className = "photo-lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Galería");
    box.innerHTML = `
      <button type="button" class="photo-lightbox-close" aria-label="Cerrar">×</button>
      <button type="button" class="photo-lightbox-prev" aria-label="Anterior">‹</button>
      <img alt="" />
      <button type="button" class="photo-lightbox-next" aria-label="Siguiente">›</button>`;
    document.body.appendChild(box);

    const img = box.querySelector("img");
    let index = 0;
    const items = () => [...document.querySelectorAll(".gallery-item")];

    const showPhoto = (i) => {
      const list = items();
      index = (i + list.length) % list.length;
      const photo = list[index].querySelector("img");
      img.src = photo.currentSrc || photo.src;
      img.alt = photo.alt || "";
    };
    const openLightbox = (i) => {
      showPhoto(i);
      box.classList.add("is-open");
      document.body.classList.add("lightbox-open");
    };
    const closeLightbox = () => {
      box.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
    };

    items().forEach((item) => {
      const photo = item.querySelector("img");
      if (photo && !item.getAttribute("aria-label")) item.setAttribute("aria-label", photo.alt);
    });

    document.addEventListener("click", (e) => {
      const item = e.target.closest(".gallery-item");
      if (!item) return;
      const i = items().indexOf(item);
      if (i < 0) return;
      e.preventDefault();
      openLightbox(i);
    });
    box.querySelector(".photo-lightbox-close").addEventListener("click", (e) => {
      e.stopPropagation();
      closeLightbox();
    });
    box.querySelector(".photo-lightbox-prev").addEventListener("click", (e) => {
      e.stopPropagation();
      showPhoto(index - 1);
    });
    box.querySelector(".photo-lightbox-next").addEventListener("click", (e) => {
      e.stopPropagation();
      showPhoto(index + 1);
    });
    box.addEventListener("click", (e) => {
      if (e.target === box) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPhoto(index - 1);
      if (e.key === "ArrowRight") showPhoto(index + 1);
    });
  }
})();
