

//Carrusel container pero con el metodo crear elemento
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
    imgs[current].style.opacity = '0.5';
    imgs[next].style.opacity = '1';
    current = next;
  }, 6000);
});

//esto espara cargar los htmls menu

// esto es para cerrar el menu hamburguersa


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
    
    document.body.style.overflow = 'hidden';
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

// --- TOGGLE DEL MENU HAMBURGUESA ---
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
    document.body.style.overflow = 'auto';  // <- aquí
    menuDrop.style.visibility = "hidden";
    for (let i = 0; i < elementosBorrosos.length; i++) {
      elementosBorrosos[i].style.filter = "none";
    }
    menuAbierto = false;
}

});

// --- EFECTO DE SCROLL ---
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
    if(popup.style.display === 'block' && !popup.contains(e.target) && !e.target.classList.contains('link_log')){
      togglePopup();
    }
  });

  // Cerrar popup al hacer clic en el botón
  btnSub.addEventListener('click', function(e){
    e.preventDefault();
    togglePopup();
  });
});





//  galeria

document.addEventListener("DOMContentLoaded", () => {
  const photographyImages = [
    { name: "1.jpg", description: "<h3>Fine Art Portraits</h3><p>Descripción...</p>" },
    { name: "2.jpg", description: "<h3>Outdoor Sessions</h3><p>Descripción...</p>" },
    { name: "3.jpg", description: "<h3>Family Portraits</h3><p>Descripción...</p>" },
    { name: "4.jpg", description: "<h3>Maternity & Baby Sessions</h3><p>Descripción...</p>" },
    { name: "5.jpg", description: "<h3>Studio Sessions</h3><p>Descripción...</p>" }
  ];

  const gallery = document.getElementById('gallery-grid');

  photographyImages.forEach(photo => {
    const img = document.createElement('img');
    img.src = `img/photos/photography/${photo.name}`;
    img.alt = "Photography";
    img.style.width = '100%';
    img.style.borderRadius = '6px';
    img.style.cursor = 'pointer';
    img.style.objectFit = 'cover';
    img.style.height = '150px';

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
