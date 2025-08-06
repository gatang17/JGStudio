// Mostrar parámetros de la URL
// Agregar estilos y scripts de forma segura al head
document.addEventListener('DOMContentLoaded', function () {
  const headContent = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>J&G Photography</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous">
    <link rel="stylesheet" href="css/styles.css">
   
  `;
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = headContent.trim();
  Array.from(tempDiv.children).forEach(child => document.head.appendChild(child));

  /*const script = document.createElement('script');
  script.src = 'css/javascript/script.js';
  document.body.appendChild(script);*/

  const bootstrap = document.createElement('script');
  bootstrap.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
  bootstrap.integrity = 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz';
  bootstrap.crossOrigin = 'anonymous';
  document.body.appendChild(bootstrap);
});

function moveCarousel() {
  const carousel = document.getElementById('carr_ind');
  const mobilePlaceholder = document.getElementById('carousel-mobile-placeholder');
  const desktopContainer = document.getElementById('carousel-container');
  const width = window.innerWidth;
  if (!carousel || !mobilePlaceholder || !desktopContainer) return;
  if (width < 768) {
    if (!mobilePlaceholder.contains(carousel)) {
      mobilePlaceholder.appendChild(carousel);
    }
  } else {
    if (!desktopContainer.contains(carousel)) {
      desktopContainer.appendChild(carousel);
    }
  }
}
window.addEventListener('DOMContentLoaded', moveCarousel);
window.addEventListener('resize', moveCarousel);

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let current = 0;
  function showNextSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }
  setInterval(showNextSlide, 4000);
});

document.addEventListener('DOMContentLoaded', function () {
  const footerHTML = `
    <footer>
      <h3>Quick Links</h3>
      <div class="row">
        <div class="col-4 cont_foot">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
        </div>
        <div class="col-4 cont_foot">
          <a href="Gallery.html">Gallery</a>
          <a href="#">Packages</a>
        </div>
        <div class="col-4 cont_foot">
          <a href="#">Post</a>
        </div>
      </div>
    </footer>
  `;
  document.getElementById('footer-placeholder').innerHTML = footerHTML;
});

document.addEventListener('DOMContentLoaded', function () {
  const section_1HTML = `
    <div class="menu_2 col-md-6 col-sm-12">
      <a href="index.html" class="nav-link">HOME</a>
      <div class="dropdown">
        <a href="services.html" class="nav-link">SERVICES ▾</a>
        <div class="dropdown-content">
          <a href="photography.html">Photography</a>
          <a href="graphic_design.html">Graphic Design</a>
          <a href="social_media.html">Social Media</a>
        </div>
      </div>
      <a href="about_us.html" class="nav-link">ABOUT US</a>
      <a href="contact.html" class="nav-link">CONTACT</a>
    </div>
  `;
  document.getElementById('section_1').innerHTML = section_1HTML;
});

function calculatorPageInit() {
  if (!document.getElementById("extraPhotos")) return;

  const urlParams = new URLSearchParams(window.location.search);
  const serviceKey = urlParams.get("service");
  const packageKey = urlParams.get("package");

  const services = {
    portrait: {
      name: "Portrait Photography",
      packages: {
        essential: { name: "Essential Portrait", price: 150, image: "img/services/retrato.jpg" },
        creative: { name: "Creative Portrait", price: 215, image: "img/services/retrato2.jpg" },
        branding: { name: "Branding Mini Session", price: 190, image: "img/services/retrato3.jpg" }
      }
    },
    flyer: {
      name: "Flyer Design",
      packages: {
        basic: { name: "Basic Flyer", price: 45, image: "img/services/flyer.jpg" }
      }
    },
    social: {
      name: "Social Media Kit",
      packages: {
        starter: { name: "Starter Social Media Kit", price: 60, image: "img/services/social.jpg" }
      }
    }
  };

  const service = services[serviceKey] || services["portrait"];
  const pkg = service.packages[packageKey] || Object.values(service.packages)[0];

  
  document.getElementById("packageName").textContent = pkg.name;
  document.getElementById("basePrice").textContent = `$${pkg.price}`;
  document.getElementById("previewImage").src = pkg.image;

  const minRules = {
    "Essential Portrait": { minPhotos: 5, minOutfits: 1, session: "30-minute session" },
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
  
    total += extraPhotos * 15;
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



//aqui comienza la galeria

document.addEventListener("DOMContentLoaded", () => {
  const imagesPerCategory = 5;

  const photographyImages = [
    {
      name: "1.jpg", description: `
      <h3>Fine Art Portraits</h3>
      <p>More than a photograph — a piece of art. Fine Art sessions are designed to create timeless, intentional portraits with a painterly feel...</p>`
    },
    {
      name: "2.jpg", description: `
      <h3>Outdoor Sessions</h3>
      <p>Natural light, open spaces, and real moments — outdoor sessions offer the perfect setting for genuine expressions and relaxed portraits...</p>`
    },
    {
      name: "3.jpg", description: `
      <h3>Family Portraits</h3>
      <p>Take this special moment to capture the genuine energy and connection of your family...</p>`
    },
    {
      name: "4.jpg", description: `
      <h3>Maternity & Baby Sessions</h3>
      <p>Celebrate the early days of your baby's life with a calm, detail-focused session...</p>`
    },
    {
      name: "5.jpg", description: `
      <h3>Studio Sessions</h3>
      <p>Studio sessions offer a clean, controlled environment where lighting and background highlight your personality...</p>`
    }
  ];

  const graphicImages = [
    { name: "1.jpg", description: "Diseño gráfico: logo corporativo" },
    { name: "2.jpg", description: "Flyer"},
    { name: "3.jpg", description: "Product Label" },
    { name: "4.jpg", description: "Packaging creativo" },
    { name: "5.jpg", description: "Diseño de iconos" }
  ];

  const socialImages = [
    { name: "1.jpg", description: "Social Media" },
    { name: "2.jpg", description: "Paginas Web" },
    { name: "3.jpg", description: "Promoción Facebook" },
    { name: "4.jpg", description: "Marketing digital" },
    { name: "5.jpg", description: "Publicidad viral" }
  ];
  


  
  function pickRandom(images, count) {
    const shuffled = images.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }


  
  


  
  const galleryImages = [
    ...pickRandom(photographyImages, imagesPerCategory).map(img => ({
      src: `img/photos/photography/${img.name}`,
      category: "photography",
      description: img.description
    })),
    ...pickRandom(graphicImages, imagesPerCategory).map(img => ({
      src: `img/photos/graphic/${img.name}`,
      category: "graphic",
      description: img.description
    })),
    ...pickRandom(socialImages, imagesPerCategory).map(img => ({
      src: `img/photos/social/${img.name}`,
      category: "social",
      description: img.description
    }))
  ];

  const shuffledGallery = shuffleArray(galleryImages);
  let allImages = shuffledGallery;

  const gallery = document.getElementById('gallery-grid');
  const overlay = document.getElementById('overlay');
  const overlayImage = document.getElementById('overlay-image');
  const overlayDescription = document.getElementById('overlay-description');
  const closeBtn = document.getElementById('close-overlay') || document.querySelector('.close-button');

  function shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function displayGallery(images) {
    gallery.innerHTML = ''; // Vaciar la galería antes de agregar nuevas imágenes

    images.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.category;
      img.style.width = '100%';
      img.style.borderRadius = '6px';
      img.style.cursor = 'pointer';
      img.style.objectFit = 'cover';
      img.style.height = '150px';

      img.addEventListener('click', () => {
        overlay.style.display = 'flex';
        overlayImage.src = photo.src;
        overlayImage.alt = photo.category;
        overlayDescription.innerHTML = photo.description;
        adjustOverlayLayout();
      });

      gallery.appendChild(img);
    });
  }

  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = 'none';
    }
  });

  function adjustOverlayLayout() {
    const overlayContent = document.getElementById('overlay-content');
    if (window.innerWidth < 768) {
      overlayContent.style.flexDirection = 'column';
      overlayImage.style.width = '100%';
      overlayDescription.style.width = '100%';
      overlayDescription.style.padding = '15px 10px';
    } else {
      overlayContent.style.flexDirection = 'row';
      overlayImage.style.width = '70%';
      overlayDescription.style.width = '30%';
      overlayDescription.style.padding = '20px';
    }
  }

  window.addEventListener('resize', () => {
    if (overlay.style.display === 'flex') {
      adjustOverlayLayout();
    }
  });

  document.getElementById('categoryFilter').addEventListener('change', function () {
    const selected = this.value;

    if (selected === 'all') {
      displayGallery(allImages);
    } else {
      const fullSet = {
        photography: photographyImages,
        graphic: graphicImages,
        social: socialImages
      };

      const filteredImages = fullSet[selected].map(img => ({
        src: `img/photos/${selected}/${img.name}`,
        category: selected,
        description: img.description
      }));

      displayGallery(filteredImages);
    }
  });

  // Mostrar todas las imágenes al cargar
  displayGallery(allImages);
});
