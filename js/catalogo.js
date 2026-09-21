const FAMILIES = [
  {
    id: "chiles",
    tab: "Chiles frescos y secos",
    title: "Chiles frescos y secos",
    lead: "Del poblano y el serrano de todos los días a los secos para salsa y adobo.",
    img: "img/familia-chiles.png",
    cols: ["Producto", "Presentación", "Unidad", "Descripción"],
    rows: [
      ["Chile ancho", "Caja", "Kilo · Caja", "Poblano seco. Dulce y con cuerpo: la base del adobo y del mole."],
      ["Chile cascabel", "Caja", "Kilo · Caja", "Redondo y de piel brillante. Nuez y tostado, para salsas de molcajete."],
      ["Chile chilaca", "Kilo", "Kilo", "Fresco y alargado. Asado y en rajas: es el pasilla antes de secarse."],
      ["Chile chipotle", "Kilo", "Kilo", "Jalapeño ahumado y seco. Aporta humo y picor a fondos y adobos."],
      ["Chile de árbol seco", "Caja", "Kilo · Caja", "Delgado y de picor alto. Salsas rojas y aceites."],
      ["Chile en polvo fino", "Kilo", "Kilo", "Molido listo para sazonar. Botanas, fruta y rebozados."],
      ["Chile guajillo", "Kilo", "Kilo", "Seco, de picor medio. Base de adobos y salsas de mesa. Se hidrata en diez minutos."],
      ["Chile güero caribe", "Kilo", "Kilo", "Suave y de pared delgada. Encurtido y guisos de pescado."],
      ["Chile habanero", "Kilo", "Kilo", "El más picante del catálogo, con aroma cítrico. Se usa en gotas."],
      ["Chile jalapeño rojo", "Kilo", "Kilo", "Mismo cuerpo que el verde, con más dulzor. Aporta color a la salsa."],
      ["Chile jalapeño verde", "Kilo", "Kilo", "El de uso diario. Escabeche, relleno y salsa cocida."],
      ["Chile japonés", "Kilo", "Kilo", "Seco y de picor alto. Salsas de mesa y aceites infusionados."],
      ["Chile morita", "Kilo", "Kilo", "Jalapeño ahumado, pequeño y dulce. Salsa de mesa y marinada."],
      ["Chile morron amarillo", "Caja", "Kilo · Caja", "Dulce y de color estable al calor. Ensalada y montaje."],
      ["Chile morron naranja", "Caja", "Kilo · Caja", "El más dulce de la familia. Crudo, en tiras y en crema."],
      ["Chile morron rojo", "Caja", "Kilo · Caja", "Dulce y de pared gruesa. Asado, relleno y guarnición."],
      ["Chile morron verde", "Caja", "Kilo · Caja", "El de menor dulzor de los cuatro. Sofrito y ensalada."],
      ["Chile pasilla", "Kilo", "Kilo", "Chilaca seca. Notas de cacao y pasa, para moles y salsas oscuras."],
      ["Chile piquin", "Kilo", "Kilo", "Pequeño y muy picante. Molido en seco o en salsa de mesa."],
      ["Chile poblano", "Kilo", "Kilo", "Carnoso y de piel gruesa. El de relleno y rajas: aguanta el asado y conserva la forma."],
      ["Chile serrano", "Kilo", "Kilo", "Picor firme y constante. Salsa cruda, encurtido y guarnición."]
    ]
  },
  {
    id: "hoja",
    tab: "Hoja y ensalada",
    title: "Hoja y ensalada",
    lead: "Lechugas, hoja verde y brotes para ensalada y montaje.",
    img: "img/familia-hoja.png",
    cols: ["Producto", "Presentación", "Unidad"],
    rows: [
      ["Acelgas", "Caja", "Manojo · Kilo · Caja"],
      ["Arúgula", "Kilo", "Kilo"],
      ["Arúgula baby orgánica", "Pieza", "Charola · Kilo"],
      ["Berros", "Kilo", "Manojo · Kilo"],
      ["Col blanca", "Bulto", "Pieza · Kilo"],
      ["Col morada", "Kilo", "Pieza · Kilo"],
      ["Espinaca", "Pieza · Manojo", "Charola · Manojo · Kilo"],
      ["Lechuga escarola", "Caja", "Pieza · Kilo · Caja"],
      ["Lechuga francesa", "Caja", "Pieza · Kilo · Caja"],
      ["Lechuga italiana", "Caja", "Pieza · Kilo · Caja"],
      ["Lechuga orejona", "Caja", "Pieza · Kilo · Caja"],
      ["Lechuga radicchio", "Pieza", "Pieza"],
      ["Lechuga romana", "Caja", "Pieza · Kilo · Caja"],
      ["Lechuga sangría", "Caja", "Pieza · Kilo · Caja"],
      ["Romeritos", "Kilo", "Kilo"],
      ["Verdolaga", "Manojo", "Manojo · Kilo"]
    ]
  },
  {
    id: "aromaticas",
    tab: "Aromáticas y hierbas",
    title: "Aromáticas y hierbas",
    lead: "Hierba fresca por manojo, cortada el mismo día del reparto.",
    img: "img/familia-hoja.png",
    cols: ["Producto", "Presentación", "Unidad"],
    rows: [
      ["Albahaca", "Caja", "Manojo · Kilo · Caja"], ["Cebollin", "Manojo", "Manojo"], ["Cilantro", "Caja", "Manojo · Kilo · Caja"],
      ["Cilantro criollo", "Kilo", "Kilo"], ["Eneldo", "Manojo", "Manojo · Kilo"], ["Epazote", "Manojo", "Manojo · Kilo"],
      ["Hoja de aguacate", "Manojo", "Manojo"], ["Hoja de plátano", "Kilo", "Kilo"], ["Hoja de plátano ahumada", "Kilo", "Kilo"],
      ["Hoja para tamal", "Kilo", "Kilo"], ["Hoja santa", "Manojo", "Manojo"], ["Limoncelo", "Caja", "Kilo · Caja"],
      ["Mejorana", "Manojo", "Manojo · Kilo"], ["Menta", "Manojo", "Manojo · Kilo"], ["Pencas de maguey", "Pieza", "Pieza"],
      ["Perejil chino", "Manojo", "Manojo · Kilo"], ["Perejil liso", "Manojo", "Manojo · Kilo"], ["Romero", "Manojo", "Manojo · Kilo"],
      ["Salvia", "Manojo", "Manojo · Kilo"], ["Tomillo", "Manojo", "Manojo · Kilo"], ["Yerbabuena", "Manojo", "Manojo · Kilo"]
    ]
  },
  {
    id: "raiz",
    tab: "Raíz, tubérculo y bulbo",
    title: "Raíz, tubérculo y bulbo",
    lead: "La base del fondo y la guarnición: papa, cebolla, ajo y zanahoria.",
    img: "img/card-seleccion.png",
    cols: ["Producto", "Presentación", "Unidad"],
    rows: [
      ["Ajo", "Caja", "Kilo · Caja"], ["Ajo limpio", "Pieza", "Pieza"], ["Ajo macho", "Kilo", "Kilo"], ["Betabel", "Kilo", "Kilo"],
      ["Camote", "Kilo", "Kilo"], ["Cebolla amarilla", "Kilo", "Kilo"], ["Cebolla blanca", "Bulto", "Kilo · Bulto"],
      ["Cebolla cambray", "Caja", "Manojo · Kilo · Caja"], ["Cebolla morada", "Bulto", "Kilo · Bulto"], ["Jengibre", "Kilo", "Kilo"],
      ["Jicama", "Kilo", "Kilo"], ["Nabo", "Kilo", "Kilo"], ["Papa blanca", "Bulto", "Kilo · Bulto"],
      ["Papa cambray blanca", "Bulto", "Kilo · Bulto"], ["Papa cambray roja", "Bulto", "Kilo · Bulto"], ["Papa tamal", "Bulto", "Kilo · Bulto"],
      ["Poro", "Pieza", "Pieza · Kilo"], ["Rábano cambray (bolsa)", "Pieza", "Pieza · Kilo"], ["Shallot", "Kilo", "Kilo"],
      ["Xoconostle", "Kilo", "Kilo"], ["Yuca", "Kilo", "Kilo"], ["Zanahoria baby", "Kilo", "Kilo"],
      ["Zanahoria leña", "Bulto", "Kilo · Bulto"], ["Zanahoria mediana", "Bulto", "Kilo · Bulto"]
    ]
  },
  {
    id: "hortaliza",
    tab: "Hortaliza de fruto",
    title: "Hortaliza de fruto",
    lead: "Tomate, calabaza, elote y el resto del trabajo diario de la cocina.",
    img: "img/card-seleccion.png",
    cols: ["Producto", "Presentación", "Unidad"],
    rows: [
      ["Aguacate extra", "Caja", "Kilo · Caja"], ["Aguacate súper extra", "Caja", "Kilo · Caja"], ["Alcachofa", "Pieza", "Pieza · Kilo"],
      ["Apio", "Caja", "Pieza · Kilo · Caja"], ["Berenjena", "Kilo", "Kilo"], ["Brocoli", "Caja", "Kilo · Caja"],
      ["Calabacita", "Caja", "Kilo · Caja"], ["Calabaza bola", "Caja", "Kilo · Caja"], ["Chayote", "Caja", "Kilo · Caja"],
      ["Chícharo congelado", "Kilo", "Kilo"], ["Chícharo nieve", "Kilo", "Kilo"], ["Coliflor", "Caja", "Kilo · Caja"],
      ["Ejotes", "Kilo", "Kilo"], ["Elote amarillo", "Charola", "Kilo"], ["Elote amarillo (pieza)", "Charola", "Pieza"],
      ["Elote amarillo desgranado", "Kilo", "Kilo"], ["Elote baby", "Kilo", "Kilo"], ["Elote blanco", "Pieza", "Kilo"],
      ["Elote blanco (pieza)", "Pieza", "Pieza"], ["Elote blanco desgranado", "Kilo", "Kilo"], ["Espárragos", "Kilo", "Kilo"],
      ["Flor de calabaza", "Manojo", "Manojo · Kilo"], ["Limón sin semilla", "Caja", "Kilo · Caja"], ["Limón verde de primera", "Caja", "Kilo · Caja"],
      ["Nopal entero", "Kilo", "Kilo"], ["Nopal picado", "Kilo", "Kilo"], ["Tomate bola", "Caja", "Kilo · Caja"],
      ["Tomate cherry (charola)", "Caja", "Charola · Kilo"], ["Tomate guaje", "Caja", "Kilo · Caja"],
      ["Tomate guaje salsero", "Caja", "Kilo · Caja"], ["Tomatillo", "Caja", "Kilo · Caja"]
    ]
  },
  {
    id: "hongo",
    tab: "Hongo y germinado",
    title: "Hongo y germinado",
    lead: "Champiñón, setas y germinados, en charola o a granel.",
    img: "img/card-seleccion.png",
    cols: ["Producto", "Presentación", "Unidad"],
    rows: [
      ["Alfalfa", "Manojo", "Manojo"], ["Champiñón", "Caja", "Kilo · Caja"], ["Champiñón portobello", "Charola", "Kilo"],
      ["Champiñón portobello (charola 500 g)", "Charola", "Kilo"], ["Germen de alfalfa", "Pieza", "Charola · Kilo"],
      ["Germen de soya", "Pieza", "Charola · Kilo"], ["Setas", "Pieza", "Kilo"], ["Setas (charola 250 g)", "Pieza", "Charola"]
    ]
  },
  {
    id: "fruta",
    tab: "Fruta",
    title: "Fruta",
    lead: "Fruta de temporada y de todo el año, para postre, barra y jugo.",
    img: "img/familia-fruta.png",
    cols: ["Producto", "Presentación", "Unidad"],
    rows: [
      ["Arándano azul", "Caja", "Pieza · Kilo · Caja"], ["Carambola", "Kilo", "Kilo"], ["Ciruela roja", "Kilo", "Kilo"],
      ["Coco (kilo)", "Pieza", "Kilo"], ["Coco (pieza)", "Pieza", "Pieza"], ["Durazno", "Caja", "Kilo · Caja"],
      ["Frambuesa", "Caja", "Pieza · Kilo · Caja"], ["Fresa", "Caja", "Pieza · Kilo · Caja"], ["Granada", "Kilo", "Kilo"],
      ["Guanábana", "Kilo", "Kilo"], ["Guanábana en pulpa", "Pieza", "Pieza"], ["Guayaba", "Caja", "Kilo · Caja"],
      ["Higo", "Kilo", "Kilo"], ["Kiwi", "Caja", "Pieza · Kilo"], ["Mandarina", "Caja", "Kilo · Caja"],
      ["Mango ataulfo", "Kilo", "Kilo"], ["Mango Tommy", "Kilo", "Kilo"], ["Manzana escolar", "Kilo", "Kilo"],
      ["Manzana Gala", "Caja", "Kilo · Caja"], ["Manzana Golden", "Caja", "Kilo · Caja"], ["Manzana Granny Smith", "Caja", "Kilo · Caja"],
      ["Manzana roja", "Caja", "Kilo · Caja"], ["Melón chino", "Caja", "Kilo · Caja"], ["Melón valenciano", "Kilo", "Kilo"],
      ["Naranja juguera", "Bulto", "Kilo · Bulto"], ["Papaya maradol", "Caja", "Kilo · Caja"], ["Pepino", "Caja", "Kilo · Caja"],
      ["Pera", "Caja", "Kilo · Caja"], ["Pera Bosc", "Kilo", "Kilo"], ["Pera d'Anjou", "Caja", "Kilo · Caja"],
      ["Pera mantequilla", "Caja", "Kilo · Caja"], ["Piña esmeralda", "Kilo", "Kilo"], ["Piña miel", "Kilo", "Kilo"],
      ["Plátano dominico", "Kilo", "Kilo"], ["Plátano macho", "Caja", "Kilo · Caja"], ["Plátano tabasco", "Caja", "Kilo · Caja"],
      ["Sandia", "Kilo", "Kilo"], ["Toronja grande", "Kilo", "Kilo"], ["Tuna", "Caja", "Kilo · Caja"],
      ["Uva globo", "Caja", "Kilo · Caja"], ["Uva roja", "Caja", "Kilo · Caja"], ["Uva verde", "Caja", "Kilo · Caja"],
      ["Zarzamora", "Caja", "Charola · Kilo · Caja"]
    ]
  },
  {
    id: "semilla",
    tab: "Semilla y fruto seco",
    title: "Semilla y fruto seco",
    lead: "Nuez, almendra, cacahuate y semilla para repostería y botana.",
    img: "img/familia-abarrote.png",
    cols: ["Producto", "Presentación", "Unidad"],
    rows: [
      ["Ajonjolí", "Kilo", "Kilo"], ["Ajonjolí negro", "Kilo", "Kilo"], ["Ajonjolí sin cutícula", "Kilo", "Kilo"],
      ["Almendra entera", "Kilo", "Kilo"], ["Almendra fileteada", "Kilo", "Kilo"], ["Amaranto con miel", "Kilo", "Kilo"],
      ["Arándano seco", "Kilo", "Kilo"], ["Cacahuate con cáscara", "Kilo", "Kilo"], ["Cacahuate enchilado", "Kilo", "Kilo"],
      ["Cacahuate japones", "Kilo", "Kilo"], ["Cacahuate natural horneado", "Kilo", "Kilo"], ["Cacahuate salado", "Kilo", "Kilo"],
      ["Chia", "Kilo", "Kilo"], ["Ciruela pasa con hueso", "Kilo", "Kilo"], ["Ciruela pasa sin hueso", "Kilo", "Kilo"],
      ["Coco rallado", "Kilo", "Kilo"], ["Granola", "Kilo", "Kilo"], ["Linaza", "Kilo", "Kilo"], ["Nuez corazón", "Kilo", "Kilo"],
      ["Nuez de la India", "Kilo", "Kilo"], ["Nuez picada", "Kilo", "Kilo"], ["Pasitas", "Kilo", "Kilo"],
      ["Pepita de calabaza", "Kilo", "Kilo"], ["Pepita de girasol", "Kilo", "Kilo"], ["Tamarindo", "Kilo", "Kilo"], ["Uva pasa", "Kilo", "Kilo"]
    ]
  },
  {
    id: "especia",
    tab: "Especia y condimento",
    title: "Especia y condimento",
    lead: "Especia entera y molida, para sazonar y para fondo.",
    img: "img/familia-abarrote.png",
    cols: ["Producto", "Presentación", "Unidad"],
    rows: [
      ["Anis", "Kilo", "Kilo"], ["Azafrán", "Kilo", "Kilo"], ["Bicarbonato", "Kilo", "Kilo"], ["Canela entera", "Kilo", "Kilo"],
      ["Canela molida", "Kilo", "Kilo"], ["Clavo", "Kilo", "Kilo"], ["Comino entero", "Kilo", "Kilo"], ["Comino molido", "Kilo", "Kilo"],
      ["Consomé de pollo", "Kilo", "Kilo"], ["Consomé de tomate", "Kilo", "Kilo"], ["Flor de jamaica", "Kilo", "Kilo"],
      ["Laurel", "Kilo", "Kilo"], ["Orégano", "Kilo", "Kilo"], ["Pimienta entera", "Kilo", "Kilo"],
      ["Pimienta lemon pepper", "Kilo", "Kilo"], ["Pimienta molida", "Kilo", "Kilo"], ["Sal de grano", "Kilo", "Kilo"], ["Tomillo molido", "Kilo", "Kilo"]
    ]
  },
  {
    id: "abarrote",
    tab: "Abarrote, grano y huevo",
    title: "Abarrote, grano y huevo",
    lead: "Arroz, frijol, harina, azúcar, huevo y jugo: lo que evita un segundo proveedor.",
    img: "img/familia-abarrote.png",
    cols: ["Producto", "Presentación", "Unidad"],
    rows: [
      ["Alubia", "Kilo", "Kilo"], ["Arroz a granel", "Kilo", "Kilo"], ["Avena", "Kilo", "Kilo"], ["Azúcar glass", "Kilo", "Kilo"],
      ["Azúcar morena", "Kilo", "Kilo"], ["Azúcar refinada", "Bulto", "Kilo · Bulto"], ["Caña de azúcar", "Kilo", "Kilo"],
      ["Cocoa", "Kilo", "Kilo"], ["Frijol negro", "Kilo", "Kilo"], ["Frijol peruano", "Kilo", "Kilo"], ["Frijol pinto", "Kilo", "Kilo"],
      ["Garbanzo", "Kilo", "Kilo"], ["Grajea", "Kilo", "Kilo"], ["Haba fresca", "Kilo", "Kilo"], ["Harina Hoja de Plata", "Bulto", "Bulto"],
      ["Harina repostera", "Kilo", "Kilo"], ["Huevo", "Caja", "Kilo · Charola · Caja"], ["Huevo blanco (pieza)", "Caja", "Pieza"],
      ["Jugo de limón (galón)", "Pieza", "Pieza"], ["Jugo de naranja (galón)", "Pieza", "Pieza"], ["Jugo de toronja (galón)", "Pieza", "Pieza"],
      ["Jugo de zanahoria (galón)", "Pieza", "Pieza"], ["Lentejas", "Kilo", "Kilo"], ["Maíz palomero", "Kilo", "Kilo"],
      ["Maíz pozolero", "Kilo", "Kilo"], ["Piloncillo", "Kilo", "Kilo"], ["Puré de papa", "Kilo", "Kilo"], ["Salvado", "Kilo", "Kilo"]
    ]
  }
];

const tabs = document.getElementById("tabs");
const panels = document.getElementById("panels");

FAMILIES.forEach((f, i) => {
  const b = document.createElement("button");
  b.textContent = f.tab;
  if (i === 0) b.className = "on";
  b.addEventListener("click", () => {
    document.querySelectorAll("#tabs button").forEach((x) => x.classList.remove("on"));
    document.querySelectorAll(".panel").forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
    const panel = document.getElementById(f.id);
    panel.classList.add("on");
    panel.querySelectorAll("img").forEach((img) => {
      if (!img.naturalWidth) {
        const src = img.getAttribute("src");
        img.src = src;
      }
    });
  });
  tabs.appendChild(b);

  const shop = "https://www.frescosdelvalle.com/shop";
  const cols = f.cols;
  const list = `<div class="table-wrap"><table>
    <thead><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead>
    <tbody>${f.rows.map((row) => `<tr>${cols.map((_, idx) => `<td>${row[idx] || ""}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;

  const panel = document.createElement("div");
  panel.className = "panel" + (i === 0 ? " on" : "");
  panel.id = f.id;
  panel.innerHTML = `
    <div class="cat-head">
      <div>
        <h3 style="font-size:32px;letter-spacing:-.03em">${f.title}</h3>
        <p class="muted" style="margin-top:10px">${f.lead}</p>
        <a class="btn" href="${shop}" target="_blank" rel="noopener noreferrer">Comprar en línea</a>
      </div>
      <img alt="${f.tab}" src="${f.img}" />
    </div>
    ${list}`;
  panels.appendChild(panel);
});
