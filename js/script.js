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
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

<script src="css/javascript/menus.js" ></script> 
   
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


