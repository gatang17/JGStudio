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
    <style>
      #packageDetails {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        line-height: 1.5;
      }
      #totalPrice small {
        font-size: 0.8rem;
      }
    </style>
  `;
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = headContent.trim();
  Array.from(tempDiv.children).forEach(child => document.head.appendChild(child));

  const script = document.createElement('script');
  script.src = 'css/javascript/script.js';
  document.body.appendChild(script);

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
          <a href="#">Gallery</a>
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
        essential: { name: "Essential Portrait", price: 75, image: "img/services/retrato.jpg" },
        creative: { name: "Creative Portrait", price: 120, image: "img/services/retrato2.jpg" },
        branding: { name: "Branding Mini Session", price: 150, image: "img/services/retrato3.jpg" }
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
    const extraPhotos = Math.max(0, photoInput - rules.minPhotos);
    const outfitChanges = Math.max(0, outfitInput - rules.minOutfits);
    const rushDelivery = document.getElementById("rushDelivery")?.checked;
  
    total += extraPhotos * 20;
    total += outfitChanges * 15;
    if (rushDelivery) total += 25;
  
    const totalWithTax = (total * 1.06).toFixed(2);
    document.getElementById("totalPrice").innerHTML = `${totalWithTax} <small>(Taxes included)</small>`;
  }
  
  document.getElementById("getPackageBtn").addEventListener("click", () => {
    const photoInput = parseInt(document.getElementById("extraPhotos")?.value) || 0;
    const outfitInput = parseInt(document.getElementById("outfitChanges")?.value) || 0;
    const extraPhotos = Math.max(0, photoInput - rules.minPhotos);
    const outfitChanges = Math.max(0, outfitInput - rules.minOutfits);
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
  
}

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

document.addEventListener("DOMContentLoaded", () => {
  calculatorPageInit();
  contactPageInit();
});