
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
  } 
}


//GALERIAAAAAAAA #111111
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
      container.style.paddingTop="5rem";
 
      otro_container.className = "gallery-grid";

      const title = document.createElement("h1");
      title.textContent = galleryData.title;
      title.style.setProperty("margin", "0rem 0 0rem", "important");
      title.style.setProperty("text-align", "center", "important");

      
     container.appendChild(title);

      if (galleryData.description) {
        const desc = document.createElement("p");
        desc.textContent = galleryData.description;
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

      // 7 Pintar imágenes
      images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = galleryData.title;
        
        otro_container.appendChild(img);

        img.addEventListener("click", () => {
          const overlay = document.createElement("div");
          overlay.style.position = "fixed";
          overlay.style.inset = "0";
          overlay.style.background = "rgba(0,0,0,0.85)";
          overlay.style.display = "flex";
          overlay.style.justifyContent = "center";
          overlay.style.alignItems = "center";
          overlay.style.zIndex = "999999";
        
          const imgBig = document.createElement("img");
          imgBig.src = src;
          imgBig.style.maxWidth = "80vw";
          imgBig.style.maxHeight = "80vh";
          imgBig.style.objectFit = "contain";
        
          overlay.appendChild(imgBig);
          document.body.appendChild(overlay);
        
          overlay.addEventListener("click", () => {
            overlay.remove();
          });
        });
     
   
        
      });
     

//Boton q va a calculadora
    const btn = document.getElementById("goCalculator");
    btn.addEventListener("click", () => {
     
      
      window.location.href = `./calculator.html?service=${service}`;
    });

    })
    .catch(err => console.error("Error loading gallery:", err));


});

//CALCULADORAAA

document.addEventListener("DOMContentLoaded", () => {
  const packageNameEl = document.getElementById("packageName"); // select de servicios
  const packageSelect = document.getElementById("packageSelect"); // select de paquetes
  const previewImage = document.getElementById("previewImage");
  const basePriceEl = document.getElementById("basePrice");
  const p_info = document.getElementById("p_infoPack");

  const extraPhotosInput = document.getElementById("extraPhotos");
  const outfitChangesInput = document.getElementById("outfitChanges");
  const rushDeliveryInput = document.getElementById("rushDelivery");
  const totalPriceEl = document.getElementById("totalPrice");
  const getPackageBtn = document.getElementById("getPackageBtn");
  previewImage.style.display = "none"; // ocultamos por defecto
  
 //const preSelectedServiceKey = sessionStorage.getItem("selectedService"); // siempre tiene valor
//const selectedService = services[preSelectedServiceKey]; // NO usar fallback

  fetch("data/services.json")
    .then(res => res.json())
    .then(data => {
      const services = data.services;

      // Leer servicio desde URL
      const urlParams = new URLSearchParams(window.location.search);
      const preSelectedServiceKey = urlParams.get("service"); // "portrait", "fam_kids", etc.

      // Elegir servicio por defecto si no viene en URL
      let selectedService = preSelectedServiceKey ? services[preSelectedServiceKey] : services.portrait;
      // 1️ Revisar URL para ver si viene un servicio preseleccionado
  
       
     

      //packageNameEl.innerHTML = "";

      if (!preSelectedServiceKey||preSelectedServiceKey == "photography") {
        // Si no hay servicio en URL, agregar opción inicial
        const defaultServiceOption = document.createElement("option");
        defaultServiceOption.value = "";
        defaultServiceOption.disabled = true;
        defaultServiceOption.selected = true;
        defaultServiceOption.textContent = "PLEASE CLICK HERE TO SELECT A SERVICE";
        
        packageNameEl.appendChild(defaultServiceOption);
      } else {

        //option.selected = true;
        packageNameEl.disabled = true; // No editable
        packageNameEl.style.border="none";
      
      }

      // Llenar select con todos los servicios
      Object.keys(services).forEach(key => {
        const srv = services[key];
        const option = document.createElement("option");
        option.value = key;
        option.textContent = srv.name;    
        packageNameEl.appendChild(option);
        
      });

      //let selectedService = preSelectedServiceKey ? services[preSelectedServiceKey] : null;

      // 2️ Si no hay servicio preseleccionado, esperar selección del usuario
      packageNameEl.addEventListener("change", () => {
        const selectedKey = packageNameEl.value;
        selectedService = services[selectedKey];

        // Limpiar select de paquetes
        packageSelect.innerHTML = "";
        const defaultPkgOption = document.createElement("option");
        defaultPkgOption.value = "";
        defaultPkgOption.disabled = true;
        defaultPkgOption.selected = true;
        defaultPkgOption.textContent = "SELECT YOUR PACKAGE";
        packageSelect.appendChild(defaultPkgOption);

        Object.keys(selectedService.packages).forEach(pkgKey => {
          const pkg = selectedService.packages[pkgKey];
          const option = document.createElement("option");
          option.value = pkgKey;
          option.textContent = pkg.name;
          packageSelect.appendChild(option);
        });

        // Limpiar info hasta seleccionar paquete
        previewImage.src = "";
        basePriceEl.textContent = "";
        p_info.textContent = "";
        totalPriceEl.textContent = "";
        extraPhotosInput.value = 0;
        outfitChangesInput.value = 0;
        rushDeliveryInput.checked = false;
      });

      
      // 3️ Si ya viene servicio por URL, llenar paquetes automáticamente
      if (selectedService) {
        // llenar select de paquetes
        packageSelect.innerHTML = "";
        const defaultPkgOption = document.createElement("option");
        defaultPkgOption.value = "";
        defaultPkgOption.disabled = true;
        defaultPkgOption.selected = true;
        defaultPkgOption.textContent = "Seleccione un paquete";
        packageSelect.appendChild(defaultPkgOption);
      
        Object.keys(selectedService.packages).forEach(pkgKey => {
          const pkg = selectedService.packages[pkgKey];
          const option = document.createElement("option");
          option.value = pkgKey;
          option.textContent = pkg.name;
          packageSelect.appendChild(option);
        });
      
        // **Preseleccionar el primer paquete automáticamente**
        const firstPkgKey = Object.keys(selectedService.packages)[0];
        packageSelect.value = firstPkgKey;
        updatePackageInfo(); // Esto actualizará la imagen, precio y descripción
      } 
      
      // 4️ Funciones para actualizar info y calcular total
      function updatePackageInfo() {
        if (!selectedService || !packageSelect.value) {
          previewImage.style.display = "none"; // Ocultar imagen si no hay paquete seleccionado
          basePriceEl.textContent = "";
          p_info.textContent = "";
          totalPriceEl.textContent = "";
          return;
        }
      
        const pkg = selectedService.packages[packageSelect.value];
        previewImage.src = pkg.image;
        previewImage.style.display = "block"; // Mostrar imagen cuando hay paquete
        basePriceEl.textContent = `$${pkg.price}`;
        p_info.textContent = pkg.description;
      
        // Reiniciar extras
        extraPhotosInput.value = 0;
        outfitChangesInput.value = 0;
        rushDeliveryInput.checked = false;
      
        calculateTotal();
      }

      function calculateTotal() {
        if (!selectedService || !packageSelect.value) return;
        const pkg = selectedService.packages[packageSelect.value];
        let total = pkg.price;
        total += (parseInt(extraPhotosInput.value) || 0) * 5;
        total += (parseInt(outfitChangesInput.value) || 0) * 5;
        if (rushDeliveryInput.checked) total += 50;
        totalPriceEl.textContent = (total * 1.06).toFixed(2);
      }

      packageSelect.addEventListener("change", updatePackageInfo);
      extraPhotosInput.addEventListener("input", calculateTotal);
      outfitChangesInput.addEventListener("input", calculateTotal);
      rushDeliveryInput.addEventListener("change", calculateTotal);

      getPackageBtn.addEventListener("click", () => {
        if (!selectedService || !packageSelect.value) return;
        const pkg = selectedService.packages[packageSelect.value];
        const extrasArr = [];
        if ((parseInt(extraPhotosInput.value) || 0) > 0) extrasArr.push(`${extraPhotosInput.value} additional photos`);
        if ((parseInt(outfitChangesInput.value) || 0) > 0) extrasArr.push(`${outfitChangesInput.value} outfit changes`);
        if (rushDeliveryInput.checked) extrasArr.push("rush delivery");

        const extrasText = extrasArr.length > 0 ? extrasArr.join(", ") : "None";

        const contactUrl = `contact.html?service=${encodeURIComponent(packageNameEl.value)}&package=${encodeURIComponent(pkg.name)}&include=${encodeURIComponent(pkg.description)}&extras=${encodeURIComponent(extrasText)}&total=${encodeURIComponent("$" + totalPriceEl.textContent)}`;
        window.location.href = contactUrl;
      });
    })
    .catch(err => console.error("Error cargando JSON:", err));
});

//crea el mensage
function contactPageInit() {
  const messageInput = document.getElementById("message"); // tu textarea
  if (!messageInput) return;

  const params = new URLSearchParams(window.location.search);
  const service = params.get("service") || "";
  const packageName = params.get("package") || "";
  const packagedescr = params.get("include") || "";
  const extras = params.get("extras") || "";
  const total = params.get("total") || "";

  if (service || packageName || extras || total) {
    const prefillMessage = `Hello, I would like to book the following package:\n\nService: ${service}\nPackage: ${packageName}\nInclude: ${packagedescr}\nExtras: ${extras}\nTotal Price: ${total}\n\nPlease let me know the next steps.`;
  
    // Asignamos el texto al textarea
    const messageInput = document.getElementById("message");
    messageInput.value = prefillMessage;
  
    // --- Textarea autoajustable ---
    messageInput.style.height = "auto"; // reinicia altura
    messageInput.style.height = messageInput.scrollHeight + "px"; // ajusta al contenido
  }
   else {
    messageInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", contactPageInit);
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




