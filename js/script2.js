
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

// Botón hamburguesa y menú
const btnHamburguesa = document.getElementById('menu_hamburguer');
const menuDrop = document.getElementById('navbarMenu');
const elementosBorrosos = document.getElementsByClassName('borroso');

let menuAbierto = false;

// Toggle hamburguesa
btnHamburguesa.addEventListener("click", () => {
  menuAbierto = !menuAbierto;

  if (menuAbierto) {
    document.body.style.overflow = 'hidden';
    menuDrop.style.visibility = "visible";

    for (let elem of elementosBorrosos) {
      elem.style.filter = "blur(5px) brightness(0.3)";
    }

  } else {
    document.body.style.overflow = '';
    menuDrop.style.visibility = "hidden";

    for (let elem of elementosBorrosos) {
      elem.style.filter = "none";
    }
  }
});

//this should close the menu once is clicked
const todosLosLinks = document.querySelectorAll("a");

todosLosLinks.forEach(link => {
  link.addEventListener("click", (e) => {

    if (link.getAttribute("href") === "#") {
      e.preventDefault();//Si el enlace es "#", NO recarga la página
    }

    //Close menú hamburguesa
    menuAbierto = false;
    menuDrop.style.visibility = "hidden";
    document.body.style.overflow = '';

    // off the blur
    for (let elem of elementosBorrosos) {
      elem.style.filter = "none";
    }
  });
});


// Scroll - top
const menu_cny = document.getElementById('container_top');
const footerStyle = document.getElementById('foot_bar');

window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    menu_cny.style.backgroundColor = "transparent";
    footerStyle.style.backgroundColor = "transparent";
  } else {
    menu_cny.style.backgroundColor = "black";
    footerStyle.style.backgroundColor = "black";
  }
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

/* old style
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

document.addEventListener("DOMContentLoaded", () => {
  const packageSelect = document.getElementById("packageSelect");
  const previewImage = document.getElementById("previewImage");
  const packageNameEl = document.getElementById("packageName");
  const basePriceEl = document.getElementById("basePrice");

  // inputs extras
  const extraPhotosInput = document.getElementById("extraPhotos");
  const outfitChangesInput = document.getElementById("outfitChanges");
  const rushDeliveryInput = document.getElementById("rushDelivery");
  const totalPriceEl = document.getElementById("totalPrice");
  const getPackageBtn = document.getElementById("getPackageBtn");

  // obtener servicio desde URL o por defecto "portrait"
  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get("service") || "portrait";

  fetch("data/services.json")
    .then(res => res.json())
    .then(services => {
      const service = services[serviceKey];
      if (!service) return;

      // llenar select con paquetes
      Object.keys(service.packages).forEach(key => {
        const pkg = service.packages[key];
        const option = document.createElement("option");
        option.value = key;
        option.textContent = pkg.name;
        packageSelect.appendChild(option);
      });

      // función para actualizar datos del paquete
      function updatePackageInfo() {
        const selectedKey = packageSelect.value;
        const pkg = service.packages[selectedKey];

        packageNameEl.textContent = pkg.name;
        basePriceEl.textContent = `$${pkg.price}`;
        previewImage.src = pkg.image;

        // detalles de fotos y outfits
        let minPhotos = 0, minOutfits = 0;
        if (pkg.name.toLowerCase().includes("portrait") || pkg.name.toLowerCase().includes("moments") || pkg.name.toLowerCase().includes("brand")) {
          minPhotos = 3;
          minOutfits = 1;
        }

        extraPhotosInput.min = 0;
        extraPhotosInput.value = 0;
        outfitChangesInput.min = 0;
        outfitChangesInput.value = 0;

        calculateTotal();
      }

      // recalcular total
      function calculateTotal() {
        const pkg = service.packages[packageSelect.value];
        let total = pkg.price;

        const extraPhotos = parseInt(extraPhotosInput.value) || 0;
        const outfitChanges = parseInt(outfitChangesInput.value) || 0;
        const rush = rushDeliveryInput.checked;

        // extra fotos: simple +5$ por cada
        total += extraPhotos * 5;
        total += outfitChanges * 5;
        if (rush) total += 50;

        totalPriceEl.textContent = (total * 1.06).toFixed(2); // con 6% impuesto
      }

      // eventos
      packageSelect.addEventListener("change", updatePackageInfo);
      extraPhotosInput.addEventListener("input", calculateTotal);
      outfitChangesInput.addEventListener("input", calculateTotal);
      rushDeliveryInput.addEventListener("change", calculateTotal);

      getPackageBtn.addEventListener("click", () => {
        const pkg = service.packages[packageSelect.value];
        const extrasArr = [];
        if ((parseInt(extraPhotosInput.value) || 0) > 0) extrasArr.push(`${extraPhotosInput.value} additional photos`);
        if ((parseInt(outfitChangesInput.value) || 0) > 0) extrasArr.push(`${outfitChangesInput.value} outfit changes`);
        if (rushDeliveryInput.checked) extrasArr.push("rush delivery");

        const extrasText = extrasArr.length > 0 ? extrasArr.join(", ") : "None";

        const contactUrl = `contact.html?service=${encodeURIComponent(service.name)}&package=${encodeURIComponent(pkg.name)}&extras=${encodeURIComponent(extrasText)}&total=${encodeURIComponent("$" + totalPriceEl.textContent)}`;
        window.location.href = contactUrl;
      });

      updatePackageInfo(); // inicial
    });
    
});

function contactPageInit() {
  const messageInput = document.getElementById("message"); // tu textarea
  if (!messageInput) return;

  const params = new URLSearchParams(window.location.search);
  const service = params.get("service") || "";
  const packageName = params.get("package") || "";
  const extras = params.get("extras") || "";
  const total = params.get("total") || "";

  if (service || packageName || extras || total) {
    const prefillMessage = `Hello, I would like to book the following package:\n\nService: ${service}\nPackage: ${packageName}\nExtras: ${extras}\nTotal Price: ${total}\n\nPlease let me know the next steps.`;
    messageInput.value = prefillMessage;
  } else {
    messageInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", contactPageInit);

