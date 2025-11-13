
//initial animation
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


// --- VARIABLES INICIALES ---
const divMenu = document.getElementById('div_menutop');       // menú top
const divFoot = document.getElementById('div_menubotom');     // footer
const footerStyle = document.getElementById('foot_bar');      // contenedor footer
const btnHamburguesa = document.getElementById('menu_hamburguer'); // botón hamburguesa
const elementosBorrosos = document.getElementsByClassName('borroso'); // elementos que se desenfocan
const menuDrop = document.getElementById('navbarMenu');       // menú desplegable hamburguesa
const menu_cny = document.getElementById('container_top')

// Guardar HTML original
const menuOriginalHTML = divMenu.innerHTML;
const footerOriginalHTML = divFoot.innerHTML;

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
    footerStyle.style.borderTop = "#ffffff8f solid";
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

/* *--- TOGGLE DEL MENU HAMBURGUESA v1---
btnHamburguesa.addEventListener("click", () => {
  if (!menuAbierto) {   
document.body.style.overflow = 'hidden';
    menuDrop.style.visibility = "visible";
    for (let i = 0; i < elementosBorrosos.length; i++) {
      elementosBorrosos[i].style.filter = "blur(5px) brightness(0.3)";

    }
    menuAbierto = true;
   
    
  } 
  
  else {
    document.body.style.overflow = 'auto';  
        menuDrop.style.visibility = "hidden";
    for (let i = 0; i < elementosBorrosos.length; i++) {
      elementosBorrosos[i].style.filter = "none";
    }
    menuAbierto = false;
}

});*/
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
 
    footerStyle.style.backgroundColor = "transparent";
  } else {
    // Si baja o sube (cualquier movimiento de scroll)
    menu_cny.style.backgroundColor = "black";
  
    footerStyle.style.backgroundColor = "black";
  }

  // Actualiza la posición actual del scroll
  ultimaPosicionScroll = posicionActual;
});

// --- EVENTOS PARA CARGA Y REDIMENSIÓN ---
window.addEventListener('load', actualizarUI);
window.addEventListener('resize', actualizarUI);


//AQUI SE ORGANIZA EL FORM PARA Q LO LABEL SUBAN
  /* Añade/quita la clase .has-value según el contenido del campo :valid no funciona igual para los <textarea> si no les pones required o placeholder.
  Entonces el JavaScript se encarga de hacer manualmente lo que el CSS no puede detectar por sí solo.*/

document.querySelectorAll('.input-box').forEach(box => {
      const field = box.querySelector('input, textarea');
    
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

  // Delegación de eventos: escuchar clicks en cualquier .link_log
  document.addEventListener('click', function(e){
    if(e.target.classList.contains('link_log')){
      e.preventDefault();
      togglePopup();
    }

    // Cerrar si se hace click fuera del popup
    /*if(popup.style.display === 'block' && !popup.contains(e.target) && !e.target.classList.contains('link_log')){
      togglePopup();
    }*/
  });

  // Cerrar popup al hacer clic en el botón
  btnSub.addEventListener('click', function(e){
    e.preventDefault();
    togglePopup();
  });
});

//galeria enGOOOOOOGLE
const albums = {
  "UgGQLB482cNuCAG37": "https://photos.app.goo.gl/UgGQLB482cNuCAG37"
  // puedes agregar más códigos aquí
};

function checkCode() {
  const code = document.getElementById('code').value.trim();
  if(albums[code]){
   // window.location.href = albums[code]; // abre en la misma página
    window.open(albums[code], "_blank"); //nueva pesta;a
  } else {
    alert("Código incorrecto");
  }
}



//GALERIAAAAAAAA

document.addEventListener("DOMContentLoaded", () => {
  // Detecta el nombre del archivo actual (por ejemplo: "galeria.html" o "portrait.html")
  const currentPage = window.location.pathname.split("/").pop();

  // Definimos dos posibles galerías
  const galleries = {
    "Gallery.html": {
      folder: "img/photos/photography/",
      images: Array.from({ length: 18 }, (_, i) => ({ name: `${i + 1}.jpg` }))
    },
    "portraits.html": {
      folder: "img/photos/portrait/",
      images: Array.from({ length: 18 }, (_, i) => ({ name: `${i + 1}.jpg` }))
    }
  };

  // Seleccionamos qué galería usar según la página
  const selectedGallery = galleries[currentPage] || galleries["Gallery.html"];

  // Mezclamos las imágenes (algoritmo Fisher–Yates)
  for (let i = selectedGallery.images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedGallery.images[i], selectedGallery.images[j]] = [selectedGallery.images[j], selectedGallery.images[i]];
  }

  // Insertamos imágenes en el grid
  const gallery = document.getElementById("gallery-grid");
  selectedGallery.images.forEach(photo => {
    const img = document.createElement("img");
    img.src = `${selectedGallery.folder}${photo.name}`;
    img.alt = "Photography";
    img.style.width = "100%";
    img.style.borderRadius = "2px";
    img.style.cursor = "pointer";
    img.style.objectFit = "cover";
    img.style.height = "100%";

    img.addEventListener("click", () => {
      const overlay = document.getElementById("overlay");
      const overlayImage = document.getElementById("overlay-image");
      const overlayDescription = document.getElementById("overlay-description");

      overlay.style.display = "flex";
      overlayImage.src = img.src;
      overlayDescription.innerHTML = photo.description || "";
    });

    gallery.appendChild(img);
  });

  // --- Overlay interacciones ---
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("overlay-content");

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  overlayContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // --- Textarea autoajustable (si existe) ---
  const tex = document.getElementById("message");
  if (tex) {
    tex.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }
});

/*
document.addEventListener("DOMContentLoaded", () => {
  const photographyImages = [
    { name: "1.jpg" },
    { name: "2.jpg" },
    { name: "3.jpg" },
    { name: "4.jpg" },
    { name: "5.jpg" },
    { name: "6.jpg" },
    { name: "7.jpg" },
    { name: "8.jpg" },
    { name: "9.jpg" },
    { name: "10.jpg"},
    { name: "11.jpg"},
    { name: "12.jpg"},
    { name: "13.jpg"},
    { name: "14.jpg"},
    { name: "15.jpg"},
    { name: "16.jpg"},
    { name: "17.jpg"},
    { name: "18.jpg"}
  ];

  // Mezclar el arreglo
  for (let i = photographyImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photographyImages[i], photographyImages[j]] = [photographyImages[j], photographyImages[i]];
  }

  const gallery = document.getElementById('gallery-grid');

  photographyImages.forEach(photo => {
    const img = document.createElement('img');
    img.src = `img/photos/photography/${photo.name}`;
    img.alt = "Photography";
    img.style.width = '100%';
    img.style.borderRadius = '2px';
    img.style.cursor = 'pointer';
    img.style.objectFit = 'cover';
    img.style.height = '100%';

    img.addEventListener('click', () => {
      const overlay = document.getElementById('overlay');
      const overlayImage = document.getElementById('overlay-image');
      const overlayDescription = document.getElementById('overlay-description');

      overlay.style.display = 'flex';
      overlayImage.src = img.src;
      overlayDescription.innerHTML = photo.description;
    });  
    
    gallery.appendChild(img);
  });
});

//CLICK
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById('overlay');
  const overlayImage = document.getElementById('overlay-image');
  const overlayDescription = document.getElementById('overlay-description');

  // Abrir overlay (ejemplo al hacer click en una imagen)
  document.querySelectorAll('#gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
      overlay.style.display = 'flex';
      overlayImage.src = img.src;
      overlayDescription.innerHTML = img.dataset.description || '';
    });
  });

  // Cerrar overlay al hacer click en cualquier lugar del overlay
  overlay.addEventListener('click', (e) => {
    overlay.style.display = 'none';
  });

  // Evitar que se cierre si se hace click dentro de overlay-content
  const overlayContent = document.getElementById('overlay-content');
  overlayContent.addEventListener('click', (e) => {
    e.stopPropagation(); // evita que el click burbujee hacia el overlay
  });
});


//this is for contact form, mesage can grow acording the mesage length
const tex = document.getElementById('message');

tex.addEventListener('input', function () {
  // Reset height para calcular correctamente
  this.style.height = 'auto';
  // Ajusta la altura al scrollHeight (altura real del contenido)
  this.style.height = this.scrollHeight + 'px';
});
*/

//CALCULADORAAA

function calculatorPageInit() {
  if (!document.getElementById("extraPhotos")) return;

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get("index.html#seccionServices");
  const packageKey = urlParams.get("portraits");

  const services = {
    portrait: {
      name: "Portrait Photography",
      packages: {
        essential: { name: "Portrait", price: 150, image: "img/photos/portrait/14.jpg" },
        creative: { name: "Creative Portrait", price: 215, image: "img/services/retrato2.jpg" },
        branding: { name: "Branding Mini Session", price: 190, image: "img/services/retrato3.jpg" }
      }
    },
  };

  const service = services[serviceKey] || services["portrait"];
  const pkg = service.packages[packageKey] || Object.values(service.packages)[0];

  
  document.getElementById("packageName").textContent = pkg.name;
  document.getElementById("basePrice").textContent = `$${pkg.price}`;
  document.getElementById("previewImage").src = pkg.image;

  const minRules = {
    "Portrait": { minPhotos: 5, minOutfits: 1, session: "30-minute session" },
    "Creative Portrait": { minPhotos: 10, minOutfits: 2, session: "1-hour session" },
    "Branding Mini Session": { minPhotos: 3, minOutfits: 1, session: "45-minute session" }
  };
  
  const rules = minRules[pkg.name] || { minPhotos: 0, minOutfits: 0, session: "" };
  
  const detailBox = document.createElement("div");
  detailBox.id = "packageDetails";
  detailBox.innerHTML = `
    <strong>Includes:</strong><br>
    ${rules.minPhotos} edited photos<br>
    ${rules.minOutfits} outfit${rules.minOutfits > 1 ? "s" : ""}<br>
    ${rules.session}
  `;
  document.getElementById("packageName").after(detailBox);
  
  document.getElementById("extraPhotos").min = 0;
  document.getElementById("extraPhotos").value = 0;
  document.getElementById("outfitChanges").min = 0;
  document.getElementById("outfitChanges").value = 0;
  
  const detailsText = `${rules.minPhotos} edited photos\n${rules.minOutfits} outfit${rules.minOutfits > 1 ? "s" : ""}\n${rules.session}`;
  
  function calculateTotal() {
    let total = pkg.price;
  
    const photoInput = parseInt(document.getElementById("extraPhotos")?.value) || 0;
    const outfitInput = parseInt(document.getElementById("outfitChanges")?.value) || 0;
    const rushDelivery = document.getElementById("rushDelivery")?.checked;
  
    const extraPhotos = Math.max(0, photoInput);
    const outfitChanges = Math.max(0, outfitInput);
  
    //precio exponencial
    const basePricePerPhoto = pkg.price / rules.minPhotos;
let extrasTotal = 0;

for (let i = 1; i <= extraPhotos; i++) {
  if (i <= 5) {
    extrasTotal += basePricePerPhoto * 0.05;
  } else if (i <= 10) {
    extrasTotal += basePricePerPhoto * 0.05;
  } else {
    extrasTotal += basePricePerPhoto * (0.05 * i);
  }
}

total += extrasTotal;



    total += outfitChanges * 5;
    if (rushDelivery) total += 50;
  
    const totalWithTax = (total * 1.06).toFixed(2);
    document.getElementById("totalPrice").innerHTML = `${totalWithTax} <small>(Taxes included)</small>`;
  }
  
  
  document.getElementById("getPackageBtn").addEventListener("click", () => {
    const photoInput = parseInt(document.getElementById("extraPhotos")?.value) || 0;
    const outfitInput = parseInt(document.getElementById("outfitChanges")?.value) || 0;
    const extraPhotos = Math.max(0, photoInput);
    const outfitChanges = Math.max(0, outfitInput);
    const rushDelivery = document.getElementById("rushDelivery")?.checked;
    const total = document.getElementById("totalPrice").textContent;
  
    const extrasArr = [];
    if (extraPhotos > 0) extrasArr.push(`${extraPhotos} additional photos`);
    if (outfitChanges > 0) extrasArr.push(`${outfitChanges} outfit changes`);
    if (rushDelivery) extrasArr.push("rush delivery");
  
    const extrasText = extrasArr.length > 0 ? extrasArr.join(", ") : "None";
  
    const prefillMessage = `Hello, I would like to book the following package:\n\nService: ${service.name}\nPackage: ${pkg.name}\nIncludes:\n${detailsText}\nExtras: ${extrasText}\nTotal Price: ${total}\n\nPlease let me know the next steps.`;
  
    const contactUrl = `contact.html?service=${encodeURIComponent(service.name)}&package=${encodeURIComponent(pkg.name)}&extras=${encodeURIComponent(extrasText)}&total=${encodeURIComponent("$" + total)}&details=${encodeURIComponent(detailsText)}`;
    window.location.href = contactUrl;
  });
  
  
  document.getElementById("extraPhotos").addEventListener("input", calculateTotal);
  document.getElementById("outfitChanges").addEventListener("input", calculateTotal);
  document.getElementById("rushDelivery").addEventListener("change", calculateTotal);
  
  calculateTotal();
  


} // Fin de la función

// Llamar la función cuando el DOM esté listo esto hace q se cargue la imagen
document.addEventListener("DOMContentLoaded", calculatorPageInit);



//aqui se genera el mensaje
function contactPageInit() {
  if (!document.getElementById("message")) return;
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service") || "";
  const packageName = params.get("package") || "";
  const extras = params.get("extras") || "";
  const total = params.get("total") || "";
  const details = params.get("details") || "";
  const messageInput = document.getElementById("message");

  if (service || packageName || extras || total || details) {
    const prefillMessage = `Hello, I would like to book the following package:\n\nService: ${service}\nPackage: ${packageName}\nIncludes:\n${details}\n\nExtras: ${extras}\nTotal Price: ${total}\n\nPlease let me know the next steps.`;
    messageInput.value = prefillMessage;
  } else {
    messageInput.value = "";
  }
}

// Aquí afuera, le dices que la ejecute cuando la página esté lista
document.addEventListener("DOMContentLoaded", contactPageInit);

