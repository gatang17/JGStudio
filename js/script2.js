
//initial animation preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const mostrado = sessionStorage.getItem('preloaderShown');

  // Solo mostrar la primera vez en index.html
  if (!mostrado && window.location.pathname.endsWith("index.html")) {
    sessionStorage.setItem('preloaderShown', 'true');
    preloader.style.display = 'flex';
    preloader.style.opacity = '1';

    // Espera 5 segundos antes de hacer fade out
    setTimeout(() => {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';

      // Después de 0.5s ocultamos completamente
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 3000); // Duración mínima de 5 segundos

  } else {
    // Si ya se mostró, ocultar inmediatamente
    //sitax error
    preloader.style.display = 'none';
  }
});

//header injection
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header").innerHTML = html;

      // --- VARIABLES INICIALES ---
const divMenu = document.getElementById('div_menutop');       // menú top
const divFoot = document.getElementById('div_menubotom');     // footer
const footerStyle = document.getElementById('foot_bar');      // contenedor footer
const btnHamburguesa = document.getElementById('menu_hamburguer'); // botón hamburguesa
const elementosBorrosos = document.getElementsByClassName('borroso'); // elementos que se desenfocan
const menuDrop = document.getElementById('navbarMenu');       // menú desplegable hamburguesa
const menu_cny = document.getElementById('container_top')
/* para notas*/ 

// Guardar HTML original
const menuOriginalHTML = divMenu.innerHTML;
const footerOriginalHTML = divFoot.innerHTML;
 menu_cny.style.color= "var(--color-texto-dbg)"; 
let menuAbierto = false; // estado del menú hamburguesa
let ultimaPosicionScroll = 0; // posición anterior del scroll

// Selecciona todos los enlaces <a>
// Selecciona todos los enlaces <a>
const todosLosLinks = document.querySelectorAll("a");

// Recorrerlos y agregar evento
todosLosLinks.forEach(link => {
  link.addEventListener("click", () => {
    
    document.body.style.overflow = '';
    menuDrop.style.visibility = "hidden";
    for (let i = 0; i < elementosBorrosos.length; i++) {
      elementosBorrosos[i].style.filter = "none";

    }
    menuAbierto = false;
  });
});

// --- FUNCION PARA ACTUALIZAR UI SEGÚN TAMAÑO ---
function actualizarUI() {
  const ancho = window.innerWidth;
  console.log(ancho);
  

  if (ancho < 765) { // Móvil
    divMenu.innerHTML = '';                         
    divFoot.innerHTML = footerOriginalHTML;        
    footerStyle.style.borderTop = "var(--color-texto-dbg) solid";
    btnHamburguesa.style.visibility = "visible";   
    menuDrop.style.visibility = menuAbierto ? "visible" : "hidden";
    // Agregar esto **una vez**, fuera de actualizarUI**

  } else { // Tablet o Desktop
    divMenu.innerHTML = menuOriginalHTML;          
    divFoot.innerHTML = '';                         
    footerStyle.style.border = "none";
    btnHamburguesa.style.visibility = "hidden";    
    menuDrop.style.visibility = "hidden";          
    menuAbierto = false;                            
    for (let i = 0; i < elementosBorrosos.length; i++) {
      elementosBorrosos[i].style.filter = "none";
    }
  }
}

//--- TOGGLE DEL MENU HAMBURGUESA v2---

btnHamburguesa.addEventListener("click", () => {
  menuAbierto = !menuAbierto; // alterna primero

  if (menuAbierto) {   
    document.body.style.overflow = 'hidden';
    menuDrop.style.visibility = "visible";
    for (let i = 0; i < elementosBorrosos.length; i++) {
      elementosBorrosos[i].style.filter = "blur(5px) brightness(0.3)";
    }
        // agrega clase overlay 
    menuDrop.classList.add('menu-overlay');
 

  } else {
    document.body.style.overflow = ''; // <- restaura al valor por defecto
    menuDrop.style.visibility = "hidden";
    for (let i = 0; i < elementosBorrosos.length; i++) {
      elementosBorrosos[i].style.filter = "none";
    }
    // Quitar clase overlay 
    menuDrop.classList.remove('menu-overlay');
  }
});

// --- EFECTO DE SCROLL EN EL TOP ---
window.addEventListener('scroll', () => {
  const posicionActual = window.scrollY;

  // Si está en el tope
  if (posicionActual === 0) {
    menu_cny.style.backgroundColor = "transparent";
    menu_cny.style.color= "var(--color-texto-dbg)"; 
    footerStyle.style.backgroundColor = "transparent";
  } else {
    // Si baja o sube (cualquier movimiento de scroll)
    menu_cny.style.backgroundColor = "var(--color-fondo)";  
     menu_cny.style.color= "var( --invert_color)"; 
   footerStyle.style.backgroundColor = "var(--color-fondo)";
  }

  // Actualiza la posición actual del scroll
  ultimaPosicionScroll = posicionActual;
});

// --- EVENTOS PARA CARGA Y REDIMENSIÓN ---
window.addEventListener('load', actualizarUI);
window.addEventListener('resize', actualizarUI);
    })
    .catch(err => console.error("Header load error", err));
});

//CARROUSEL container pero con el metodo crear elemento
document.addEventListener('DOMContentLoaded', () => {
  const cont = document.getElementById('cont_background');
  const images = [
    "./img/photos/carousel/04.jpg",
    "./img/photos/carousel/02.jpg",
    "./img/photos/carousel/03.jpg",
    "./img/photos/carousel/01.jpg",
    "./img/photos/carousel/05.jpg"
  ];  
  // Crear contenedor
  const divCarrusel = document.createElement('div');
  divCarrusel.id = 'carr_ind';
  cont.appendChild(divCarrusel);

  // aqui esta el efecto fade!!!!!!
  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'img_carr';
    img.style.position = 'absolute';
    img.style.filter= 'brightnes(0.1)'
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.opacity = i === 0 ? '1' : '0';
    img.style.transition = 'opacity 3s ease-in-out';
    divCarrusel.appendChild(img);
  });

  let current = 0;
  setInterval(() => {
    const imgs = divCarrusel.querySelectorAll('.img_carr');
    const next = (current + 1) % imgs.length;
    imgs[current].style.opacity = '0.0';
    imgs[next].style.opacity = '1';
    current = next;
  }, 5000);
});

//esto espara cargar los htmls MENU Y  para cerrar el menu hamburguersa

//AQUI SE ORGANIZA EL FORM PARA Q LO LABEL SUBAN
  /* Añade/quita la clase .has-value según el contenido del campo :valid no funciona igual para los <textarea> si no les pones required o placeholder.
  Entonces el JavaScript se encarga de hacer manualmente lo que el CSS no puede detectar por sí solo.*/

document.querySelectorAll('.input-box').forEach(box => {
      const field = box.querySelector('input');
    
      if (!field) return;
    
      const update = () => {
        // Si tiene contenido (no solo espacios) o si el field está en foco, marca como has-value
        if (field.value.trim() !== '') box.classList.add('has-value');
        else box.classList.remove('has-value');
      };
    

      // Eventos que actualizan el estado
      field.addEventListener('input', update);
      // Ejecutar una vez en carga (por si hay value pre-llenado)
      update();
    }); 

    
   /*dfnbsdvbfdsvdsmv****************/
  
    const textarea = document.getElementById('auto-textarea');


    //FORMULARIOOOO

  document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('popup');
  const btnSub = document.getElementById('btSub');
  const elementosBorrosos = document.querySelectorAll('.borroso');

  // Función para abrir/cerrar popup
  function togglePopup() {
    const isOpen = popup.style.display === 'block'; // esto devuelve Verdadero si es Block
    popup.style.display = isOpen ? 'none' : 'block'; // aqui se pregunta si isOpen es F o V
    elementosBorrosos.forEach(el => {
      el.style.filter = isOpen ? 'none' : 'blur(5px) brightness(0.3)';
    });
  }



  // Cerrar popup al hacer clic en el botón
  btnSub.addEventListener('click', function(e){
    // e.preventDefault();
    togglePopup();
  });
});

//GALERIAAAAAAAA 
document.addEventListener("DOMContentLoaded", () => {

// 1️ Leer servicio desde URL
const params = new URLSearchParams(window.location.search);
const serviceKey = params.get("service") || "photography";

// Guardar en sessionStorage
sessionStorage.setItem("selectedService", serviceKey.toLowerCase());
const service = sessionStorage.getItem("selectedService");

  // 2️ Overlay  
  const overlay = document.getElementById("overlay");
  //const overlayContent = document.getElementById("overlay-content");
  const overlayImage = document.getElementById("overlay-image");
  //const overlayDescription = document.getElementById("overlay-description");

  // 3️ Cargar JSON
  fetch("data/services.json")
    .then(res => res.json())
    .then(data => {
      const overlay = document.getElementById("overlay");


      
      const galleryData = data.galleries[serviceKey] || data.galleries.photography;
      const container = document.getElementById("gallery-grid");
      const otro_container = document.createElement("div");
      container.innerHTML = ""; // limpiar por si acaso
      //esto hace q el contenedor general sea flexible
      container.style.display = "flex";
      container.style.flexDirection = "column";   // vertical
      container.style.justifyContent = "center";  // centra en el eje vertical
      container.style.alignItems = "center";      // centra en el eje horizontal
      container.style.paddingTop="12rem";
      container.style.paddingBottom="4rem";
 
      otro_container.className = "gallery-grid";

      const title = document.createElement("h1");
      title.textContent = galleryData.title;
      title.style.setProperty("margin", "0rem 0 0rem", "important");
      title.style.setProperty("text-align", "center", "important");

      
     container.appendChild(title);

      if (galleryData.description) {
        const desc = document.createElement("p");
        desc.textContent = galleryData.description;
        desc.style.marginTop="2.5rem";
        desc.style.maxWidth= "700px"; 
        desc.style.marginBottom="2.5rem";
        container.appendChild(desc);
        
      }
      
      container.appendChild(otro_container);

      // 5️ Crear array de imágenes
      const images = Array.from(
        { length: galleryData.count || 18 },
        (_, i) => `${galleryData.src}/${i + 1}.jpg`
      );

      // 6️ Mezclar (opcional)
      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }

      //ESTO ES PARA EMPEZAR LAS ARROWS GUARDO EL
      // Variables globales
let currentIndex = 0;
let imagesList = [];

// Pintar imágenes
images.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = galleryData.title;
  otro_container.appendChild(img);

  imagesList.push(src); // guardamos todas las imágenes

  img.addEventListener("click", () => {

    currentIndex = index;

    // Crear overlay UNA sola vez
    let overlay = document.getElementById("popupOverlay");
    let imgBig;

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "popupOverlay";
      overlay.style.position = "fixed";
      overlay.style.inset = "0";
      overlay.style.background = "rgba(0,0,0,0.85)";
      overlay.style.display = "flex";
      overlay.style.justifyContent = "center";
      overlay.style.alignItems = "center";
      overlay.style.zIndex = "999999";

      imgBig = document.createElement("img");
      imgBig.id = "popupImage";
      imgBig.style.maxWidth = "80vw";
      imgBig.style.maxHeight = "80vh";
      imgBig.style.objectFit = "contain";

      // Flechas
      const prev = document.createElement("i");
      prev.className = "fa-solid fa-chevron-left";
      const next = document.createElement("i");
      next.className = "fa-solid fa-chevron-right";
      [prev, next].forEach(icon => {
        icon.style.color = "white";
        icon.style.fontSize = "2rem";
        icon.style.cursor = "pointer";
        icon.style.position = "absolute";
        icon.style.top = "50%";
        icon.style.filter = "drop-shadow(2px 2px 4px rgba(0,0,0,0.7))";
        icon.style.transform = "translateY(-50%)";
      });
      prev.style.left = "2rem";
      next.style.right = "2rem";

      // Flechas eventos
      prev.addEventListener("click", e => { e.stopPropagation(); showPrev(); });
      next.addEventListener("click", e => { e.stopPropagation(); showNext(); });

      overlay.append(imgBig, prev, next);
      document.body.appendChild(overlay);

      // Click fuera cierra
      overlay.addEventListener("click", e => {
        if (e.target === overlay) overlay.style.display = "none";
      });

      // Teclado
      document.addEventListener("keydown", e => {
        if (overlay.style.display !== "flex") return;
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") overlay.style.display = "none";
      });

      // Funciones navegación
      function showNext() {
        currentIndex = (currentIndex + 1) % imagesList.length;
        imgBig.src = imagesList[currentIndex];
      }
      function showPrev() {
        currentIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
        imgBig.src = imagesList[currentIndex];
      }
    } else {
      imgBig = document.getElementById("popupImage");
    }

    // Abrir overlay
    imgBig.src = src;
    overlay.style.display = "flex";
  });
});
   }) 
});
//=============================CALCULADORAAA VERSION 2

document.addEventListener("DOMContentLoaded", () => {
  const card_container = document.getElementById("card_container");
  let selectedCard = null;

  // ===== Cargar paquetes desde JSON =====
  fetch("data/services.json")
    .then(res => res.json())

    .then(data => {
      const services = data.packages;

      Object.keys(services).forEach(key => {
        const pkg = services[key];
        
        const featuresList = pkg.features
        .map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`)
        .join("");
        card_container.innerHTML += `
          <div class="text-center card">

            <h1 class="packageName">${pkg.name}</h1>
            <p class="packageSelect">${pkg.tagline}</p>

            <h2>$<span class="basePrice">${pkg.basePrice.toFixed(2)}</span></h2>

            <div class="d-flex gap-3 justify-content-center py-5">
              <span class="mini-card">
            <i class="fa-solid fa-camera"></i>
              ${pkg.base.photos} Photos</span>
              <span class="mini-card">
              <i class="fa-solid fa-clock"></i>
              ${pkg.base.duration}</span>
              <span class="mini-card">
              <i class="fa-solid fa-shirt"></i>
              ${pkg.base.outfitChanges} Outfit${pkg.base.outfitChanges > 1 ? "s" : ""}</span>
            </div>

             <!=========================FEATURES DINAMIC -->
    <ul class="features-list">
      ${featuresList}
    </ul>

            <div class="extras">
            <p>ADD-ONS<p>
              <div class="extra-control">
                <label>Additional Photos</label>
                <div class="counter">
                  <button type="button" class="decrease">-</button>
                  <span class="count">0</span>
                  <button type="button" class="increase">+</button>
                </div>
              </div>

              <div class="extra-control outfits">
                <label>Extra Outfit Changes</label>
                <div class="counter">
                  <button type="button" class="decrease">-</button>
                  <span class="count">0</span>
                  <button type="button" class="increase">+</button>
                </div>
              </div>

              <div class="extra-control">
                <label>Rush Delivery</label>
                <input type="checkbox" class="rushDelivery">
              </div>
            </div>

            <h4 class="totalp d-none">Total: $<span class="totalPrice ">${pkg.basePrice}</span></h4>
            <a class="getPackageBtn btn d-none">Get This Package</a>

          </div>
        `;
      });

      // Después de crear las cards, agregamos los eventos
      attachEvents();
    });

  // ===== FUNCIONES =====
  function attachEvents() {
    // Seleccionar card y mostrar extras
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => {
        document.querySelectorAll(".card").forEach(c => {

          c.classList.remove("active");
          c.querySelector(".extras").classList.remove("show");
           c.classList.remove("card_bronce");
           c.classList.remove("card_gold");
           c.classList.remove("card_silver");
           c.querySelector(".totalp").classList.add("d-none");
          c.querySelector(".getPackageBtn").classList.add("d-none");
        });

        card.classList.add("active");
        card.querySelector(".extras").classList.add("show");
        card.querySelector(".totalp").classList.remove("d-none");
        card.querySelector(".getPackageBtn").classList.remove("d-none");
        selectedCard = card;
    //here i get the package name
      const packageName = card.querySelector(".packageName").textContent.trim().toLowerCase();

      //  estile here
      if (packageName === "essential") {
        card.querySelector(".outfits").classList.add("d-none");
        card.classList.add("card_bronce");
      } else if (packageName === "prestige") {
        card.classList.add("card_gold");
      } else if (packageName === "signature") {
        card.classList.add("card_silver");
      }
     

        calculateTotal(card); // recalcula al seleccionar
      });
    });



    // Botones +/-
    document.addEventListener("click", e => {
      const card = e.target.closest(".card");
      if (!card) return;

      const countEl = e.target.parentElement.querySelector(".count");
      if (!countEl) return;

      let val = parseInt(countEl.textContent);

      if (e.target.classList.contains("increase")) val++;
      if (e.target.classList.contains("decrease") && val > 0) val--;

      countEl.textContent = val;
      calculateTotal(card);
    });

    // Checkbox rush delivery
    document.addEventListener("change", e => {
      if (!e.target.classList.contains("rushDelivery")) return;
      const card = e.target.closest(".card");
      calculateTotal(card);
    });

    // Botón Get This Package
    document.querySelectorAll(".getPackageBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        if (!card) return;

        const name = card.querySelector(".packageName").textContent;
        const tagline = card.querySelector(".packageSelect").textContent;
        const total = card.querySelector(".totalPrice").textContent;

        const counts = card.querySelectorAll(".extra-control .count");
        const extraPhotos = parseInt(counts[0].textContent) || 0;
        const outfits = parseInt(counts[1].textContent) || 0;
        const rush = card.querySelector(".rushDelivery").checked;

        let extrasArr = [];
        if (extraPhotos > 0) extrasArr.push(`${extraPhotos} additional photos`);
        if (outfits > 0) extrasArr.push(`${outfits} outfit changes`);
        if (rush) extrasArr.push("rush delivery");

        const extrasText = extrasArr.length ? extrasArr.join(", ") : "No extras";

        const contactUrl = `contact.html?service=${encodeURIComponent(name)}&package=${encodeURIComponent(tagline)}&extras=${encodeURIComponent(extrasText)}&total=${encodeURIComponent("$" + total)}`;
        window.location.href = contactUrl;
      });
    });
  }

  // Calcular total
  function calculateTotal(card) {
    const basePrice = parseFloat(card.querySelector(".basePrice").textContent);
    const counts = card.querySelectorAll(".extra-control .count");
    const extraPhotos = parseInt(counts[0].textContent) || 0;
    const outfits = parseInt(counts[1].textContent) || 0;
    const rush = card.querySelector(".rushDelivery").checked;

    let total = basePrice;
    total += extraPhotos * 15;
    total += outfits * 30;
    if (rush) total += 70;

    card.querySelector(".totalPrice").textContent = total.toFixed(2);
  }
 
});
// contact.html
document.addEventListener("DOMContentLoaded", () => {
  contactPageInit();
});
//crea el mensage
function contactPageInit() {
  const messageInput = document.getElementById("message");
  if (!messageInput) return;

  const params = new URLSearchParams(window.location.search);
  const service = params.get("service") || "";
  const packageName = params.get("package") || "";
  const extras = params.get("extras") || "";
  const total = params.get("total") || "";

  if (service || packageName || extras || total) {
    const prefillMessage = `Hello, I would like to book the following package:\n\nService: ${service}\nPackage: ${packageName}\nExtras: ${extras}\nTotal Price: ${total}\n\nPlease let me know the next steps.`;
    messageInput.value = prefillMessage;

    // Ajusta el textarea automáticamente
    messageInput.style.height = "auto";
    messageInput.style.height = messageInput.scrollHeight + "px";
  } else {
    messageInput.value = "";
  }
}

//DESIGNER NOTES

/*
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container_top");
  if (!container) return;

  // Obtener el nombre del archivo actual
  const currentPage = window.location.pathname.split("/").pop();

  // Si NO estamos en designerNotes.html, insertamos el banner
  if (currentPage !== "designerNotes.html") {
    const content = `
      <div id="designernote" class="dNote">
        <a href="designerNotes.html">
          <p class="dlink"><span>DESIGNER'S NOTES</span></p>
        </a>
      </div>
    `;
    container.insertAdjacentHTML("afterbegin", content);
  }
});*/

/*
document.addEventListener("DOMContentLoaded", () => {

  fetch("data/services.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('designer-notes');

      // Title
      const title = document.createElement('h1');
      title.textContent = data.dnotes.title;
      container.appendChild(title);

      // Introduction
      const intro = document.createElement('p');
      intro.textContent = data.dnotes.introduction;
      container.appendChild(intro);

      // Goals
      const goalsTitle = document.createElement('h3');
      goalsTitle.textContent = 'Goals';
      container.appendChild(goalsTitle);

      const goalsList = document.createElement('ul');
      data.dnotes.goals.forEach(goal => {
        const li = document.createElement('li');
        li.textContent = goal;
        goalsList.appendChild(li);
      });
      container.appendChild(goalsList);

      // Technology
      const techTitle = document.createElement('h3');
      techTitle.textContent = 'Technology';
      container.appendChild(techTitle);

      const techDesc = document.createElement('p');
      techDesc.innerHTML = `<strong>Decision:</strong> ${data.dnotes.technology.tc_opc}<br><strong>Workflow:</strong> ${data.dnotes.technology.tc_dep}`;
      container.appendChild(techDesc);

      const techList = document.createElement('ul');
      data.dnotes.technology.explanation.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        techList.appendChild(li);
      });
      container.appendChild(techList);

      // Code Explanation
      const codeTitle = document.createElement('h3');
      codeTitle.textContent = 'Code Explanation';
      container.appendChild(codeTitle);

      const codePara = document.createElement('p');
      codePara.textContent = data.dnotes.codeExplanation;
      container.appendChild(codePara);

      // Cost Considerations
      const costTitle = document.createElement('h3');
      costTitle.textContent = 'Cost Considerations';
      container.appendChild(costTitle);

      const costList = document.createElement('ul');
      data.dnotes.cost.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        costList.appendChild(li);
      });
      container.appendChild(costList);

      // User Experience
      const uxTitle = document.createElement('h4');
      uxTitle.textContent = 'User Experience';
      container.appendChild(uxTitle);

      const uxList = document.createElement('ul');
      data.dnotes.userExperience.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        uxList.appendChild(li);
      });
      container.appendChild(uxList);

      // Conclusion
      const conclTitle = document.createElement('h3');
      conclTitle.textContent = 'Conclusion';
      container.appendChild(conclTitle);

      const conclPara = document.createElement('p');
      conclPara.textContent = data.dnotes.conclusion;
      container.appendChild(conclPara);

    })
    .catch(err => console.error('Error loading JSON:', err));

}); */

//abre un sitio externo
const btnLink = document.getElementById('btPotf');
btnLink.addEventListener('click', () => {
  window.open('https://gatang.vercel.app', '_blank');
});




