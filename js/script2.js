// =============================
// PRELOADER
// =============================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const mostrado = sessionStorage.getItem('preloaderShown');

  if (!preloader) return;

  if (!mostrado && window.location.pathname.endsWith("index.html")) {
    sessionStorage.setItem('preloaderShown', 'true');
    preloader.style.display = 'flex';
    preloader.style.opacity = '1';

    setTimeout(() => {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';

      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 3000);
  } else {
    preloader.style.display = 'none';
  }
});

// =============================
// HEADER INJECTION + MENU LOGIC
// =============================
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      const header = document.getElementById("header");
      if (!header) return;

      header.innerHTML = html;

      const btnHbg = document.getElementById('btn_H');
      const copyright = document.getElementById('copyright');
      const divMenu = document.getElementById('div_menutop');
      const divFoot = document.getElementById('div_menubotom');
      const footerStyle = document.getElementById('foot_bar');
      const btnHamburguesa = document.getElementById('menu_hamburguer');
      const elementosBorrosos = document.getElementsByClassName('borroso');
      const menuDrop = document.getElementById('navbarMenu');
      const menu_cny = document.getElementById('container_top');

      if (!btnHbg || !divMenu || !divFoot || !footerStyle || !btnHamburguesa || !menuDrop || !menu_cny) {
        return;
      }

      const esHome = window.location.pathname.includes("index") || window.location.pathname === "/";
      const menuOriginalHTML = divMenu.innerHTML;
      const footerOriginalHTML = divFoot.innerHTML;

      btnHbg.style.removeProperty('--bs-btn-color');

      let menuAbierto = false;

      function aplicarEstiloHeader() {
        const iconosFooter = footerStyle.querySelectorAll("i, svg, a");
        const posicionActual = window.scrollY;

        if (esHome && posicionActual === 0) {
          iconosFooter.forEach(el => {
            el.style.color = "white";
            el.style.fill = "white";
          });

          menu_cny.style.backgroundColor = "transparent";
          menu_cny.style.color = "white";

          if (copyright) copyright.style.color = "white";
          btnHbg.style.color = "white";
          footerStyle.style.backgroundColor = "transparent";
        } else {
          menu_cny.style.backgroundColor = "var(--color-fondo)";
          menu_cny.style.color = "var(--color-texto)";
          footerStyle.style.backgroundColor = "var(--color-fondo)";
          btnHbg.style.color = "var(--color-borde)";

          if (copyright) copyright.style.color = "grey";

          iconosFooter.forEach(el => {
            el.style.color = "var(--color-texto)";
            el.style.fill = "var(--color-texto)";
          });
        }
      }

      document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          document.body.style.overflow = '';
          menuDrop.style.visibility = "hidden";

          for (let el of elementosBorrosos) {
            el.style.filter = "none";
          }

          menuAbierto = false;
        });
      });

      function actualizarUI() {
        const ancho = window.innerWidth;

        if (ancho < 765) {
          divMenu.innerHTML = '';
          divFoot.innerHTML = footerOriginalHTML;
          footerStyle.style.borderTop = "var(--color-texto-dbg) solid";
          btnHamburguesa.style.visibility = "visible";
          menuDrop.style.visibility = menuAbierto ? "visible" : "hidden";
        } else {
          divMenu.innerHTML = menuOriginalHTML;
          divFoot.innerHTML = '';
          footerStyle.style.border = "none";
          btnHamburguesa.style.visibility = "hidden";
          menuDrop.style.visibility = "hidden";
          menuAbierto = false;

          for (let el of elementosBorrosos) {
            el.style.filter = "none";
          }
        }
      }

      btnHamburguesa.addEventListener("click", () => {
        menuAbierto = !menuAbierto;

        if (menuAbierto) {
          document.body.style.overflow = 'hidden';
          menuDrop.style.visibility = "visible";

          for (let el of elementosBorrosos) {
            el.style.filter = "blur(5px) brightness(0.3)";
          }

          menuDrop.classList.add('menu-overlay');
        } else {
          document.body.style.overflow = '';
          menuDrop.style.visibility = "hidden";

          for (let el of elementosBorrosos) {
            el.style.filter = "none";
          }

          menuDrop.classList.remove('menu-overlay');
        }
      });

      window.addEventListener('scroll', aplicarEstiloHeader);
      window.addEventListener('resize', actualizarUI);
      window.addEventListener('load', () => {
        actualizarUI();
        aplicarEstiloHeader();
      });

      aplicarEstiloHeader();
    })
    .catch(err => console.error("Header load error", err));
});

// =============================
// HERO BACKGROUND CAROUSEL
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const cont = document.getElementById('cont_background');
  if (!cont) return;

  const images = [
    "./img/photos/carousel/04.jpg",
    "./img/photos/carousel/02.jpg",
    "./img/photos/carousel/03.jpg",
    "./img/photos/carousel/01.jpg",
    "./img/photos/carousel/05.jpg"
  ];

  const divCarrusel = document.createElement('div');
  divCarrusel.id = 'carr_ind';
  cont.appendChild(divCarrusel);

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
    imgs[current].style.opacity = '0';
    imgs[next].style.opacity = '1';
    current = next;
  }, 5000);
});

// =============================
// FEATURED SESSION
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const featuredMedia = document.getElementById("featuredMedia");
  const featuredTitle = document.getElementById("featuredTitle");
  const featuredDescription = document.getElementById("featuredDescription");
  const featuredBtn = document.getElementById("featuredBtn");
  const featuredLinkImage = document.getElementById("featuredLinkImage");

  if (!featuredMedia || !featuredTitle || !featuredDescription || !featuredBtn || !featuredLinkImage) {
    return;
  }

  fetch("data/services.json")
    .then(res => res.json())
    .then(data => {
      const featured = data.galleries?.featured;
      if (!featured) return;

      featuredTitle.textContent = featured.title || "Moments We Love";
      featuredDescription.textContent = featured.description || "";
      featuredBtn.href = "gallery.html?service=featured";
      featuredLinkImage.href = "gallery.html?service=featured";

      const coverImage = `${featured.src}/1.jpg`;
      featuredMedia.style.backgroundImage = `url('${coverImage}')`;
    })
    .catch(err => console.error("Featured session load error:", err));
});

// =============================
// FORM FLOATING LABELS
// =============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.input-box').forEach(box => {
    const field = box.querySelector('input, textarea');
    if (!field) return;

    const update = () => {
      if (field.value.trim() !== '') box.classList.add('has-value');
      else box.classList.remove('has-value');
    };

    field.addEventListener('input', update);
    update();
  });
});

// =============================
// POPUP
// =============================
document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('popup');
  const btnSub = document.getElementById('btSub');
  const elementosBorrosos = document.querySelectorAll('.borroso');

  if (!popup || !btnSub) return;

  function togglePopup() {
    const isOpen = popup.style.display === 'block';
    popup.style.display = isOpen ? 'none' : 'block';

    elementosBorrosos.forEach(el => {
      el.style.filter = isOpen ? 'none' : 'blur(5px) brightness(0.3)';
    });
  }

  btnSub.addEventListener('click', function () {
    togglePopup();
  });
});

// =============================
// GALLERY
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("gallery-grid");
  if (!galleryContainer) return;

  const params = new URLSearchParams(window.location.search);
  const serviceKey = params.get("service") || "photography";

  sessionStorage.setItem("selectedService", serviceKey.toLowerCase());

  fetch("data/services.json")
    .then(res => res.json())
    .then(data => {
      const galleryData = data.galleries[serviceKey] || data.galleries.photography;
      const container = document.getElementById("gallery-grid");
      if (!container) return;

      container.innerHTML = "";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";
      container.style.paddingBottom = "4rem";

      const innerGrid = document.createElement("div");
      innerGrid.className = "gallery-grid";

      const title = document.createElement("h1");
      title.textContent = galleryData.title;
      title.style.setProperty("margin", "0rem 0 0rem", "important");
      title.style.setProperty("text-align", "center", "important");
      container.appendChild(title);

      if (galleryData.description) {
        const desc = document.createElement("p");
        desc.textContent = galleryData.description;
        desc.style.marginTop = "2.5rem";
        desc.style.maxWidth = "700px";
        desc.style.marginBottom = "2.5rem";
        container.appendChild(desc);
      }

      container.appendChild(innerGrid);

      const images = Array.from(
        { length: galleryData.count || 18 },
        (_, i) => `${galleryData.src}/${i + 1}.jpg`
      );

      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }

      let currentIndex = 0;
      let imagesList = [];

      images.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = galleryData.title;
        innerGrid.appendChild(img);

        imagesList.push(src);

        img.addEventListener("click", () => {
          currentIndex = index;

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

            prev.addEventListener("click", e => {
              e.stopPropagation();
              showPrev();
            });

            next.addEventListener("click", e => {
              e.stopPropagation();
              showNext();
            });

            overlay.append(imgBig, prev, next);
            document.body.appendChild(overlay);

            overlay.addEventListener("click", e => {
              if (e.target === overlay) overlay.style.display = "none";
            });

            document.addEventListener("keydown", e => {
              if (overlay.style.display !== "flex") return;
              if (e.key === "ArrowRight") showNext();
              if (e.key === "ArrowLeft") showPrev();
              if (e.key === "Escape") overlay.style.display = "none";
            });

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

          imgBig.src = src;
          overlay.style.display = "flex";
        });
      });
    })
    .catch(err => console.error("Gallery load error:", err));
});

// =============================
// CALCULATOR
// =============================

document.addEventListener("DOMContentLoaded", () => {
  const card_container = document.getElementById("card_container");
  if (!card_container) return;

  let selectedCard = null;
  let services = {};

  fetch("data/services.json")
    .then(res => res.json())
    .then(data => {
      services = data.packages;

      Object.keys(services).forEach(key => {
        const pkg = services[key];

        card_container.innerHTML += `
          <div class="text-center package-card card" data-package="${key}">
            <h1 class="packageName">${pkg.name}</h1>
            <p class="packageSelect">${pkg.tagline}</p>

            <h2>$<span class="basePrice">${pkg.basePrice.toFixed(2)}</span></h2>

            <div class="d-flex gap-3 justify-content-center py-5">
              <span class="mini-card">
                <i class="fa-solid fa-camera"></i>
                ${pkg.base.photos} Photos
              </span>

              <span class="mini-card">
                <i class="fa-solid fa-clock"></i>
                ${pkg.base.duration}
              </span>

              <span class="mini-card">
                <i class="fa-solid fa-shirt"></i>
                ${pkg.base.outfitChanges} Outfit${pkg.base.outfitChanges > 1 ? "s" : ""}
              </span>
            </div>

            <div class="package-details"></div>
          </div>
        `;
      });

      attachEvents();
    })
    .catch(err => console.error("Calculator load error:", err));

  function createDetails(pkg) {
    const featuresList = pkg.features
      .map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`)
      .join("");

    return `
      <ul class="features-list">
        ${featuresList}
      </ul>

      <div class="extras show">
        <p>ADD-ONS</p>

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

      <h4 class="totalp">Total: $<span class="totalPrice">${pkg.basePrice.toFixed(2)}</span></h4>
      <a class="getPackageBtn hvr-grow btn">Get This Package</a>
    `;
  }

  function closeCard(card) {
    card.classList.remove("active", "card_bronce", "card_gold", "card_silver");

    card.querySelectorAll("li, p, h1, h2, h3, h4, span, label").forEach(el => {
      el.style.color = "var(--color-texto)";
    });

    const details = card.querySelector(".package-details");
    if (details) details.innerHTML = "";
  }

  function closeAllCards() {
    document.querySelectorAll(".package-card").forEach(card => {
      closeCard(card);
    });
  }

  function applyPackageColor(card) {
    const packageName = card.querySelector(".packageName").textContent.trim().toLowerCase();

    if (packageName === "essential") {
      card.classList.add("card_bronce");
    } else if (packageName === "prestige") {
      card.classList.add("card_gold");
    } else if (packageName === "signature") {
      card.classList.add("card_silver");
    }
  }

  function openCard(card) {
    const key = card.dataset.package;
    const pkg = services[key];

    if (!pkg) return;

    card.classList.add("active");
    card.querySelector(".package-details").innerHTML = createDetails(pkg);

    applyPackageColor(card);

    card.querySelectorAll("li, p, h1, h2, h3, h4, span, label").forEach(el => {
      /* el.style.color = "var(--color-texto-dbg)"; */
    });

    selectedCard = card;
    calculateTotal(card);
  }

  function attachEvents() {
    document.querySelectorAll(".package-card").forEach(card => {
      card.addEventListener("click", e => {
        const clickedInsideControl = e.target.closest(
          ".extras, .extra-control, .counter, .increase, .decrease, .rushDelivery, .getPackageBtn"
        );

        if (clickedInsideControl) return;

        const isAlreadyActive = card.classList.contains("active");

        closeAllCards();

        if (isAlreadyActive) {
          selectedCard = null;
          return;
        }

        openCard(card);
      });
    });

    document.addEventListener("click", e => {
      const card = e.target.closest(".package-card");
      if (!card || !card.classList.contains("active")) return;

      if (e.target.classList.contains("increase") || e.target.classList.contains("decrease")) {
        e.stopPropagation();

        const countEl = e.target.parentElement.querySelector(".count");
        let val = parseInt(countEl.textContent);

        if (e.target.classList.contains("increase")) val++;
        if (e.target.classList.contains("decrease") && val > 0) val--;

        countEl.textContent = val;
        calculateTotal(card);
      }

      if (e.target.classList.contains("getPackageBtn")) {
        e.stopPropagation();
        goToContact(card);
      }
    });

    document.addEventListener("change", e => {
      if (!e.target.classList.contains("rushDelivery")) return;

      e.stopPropagation();

      const card = e.target.closest(".package-card");
      if (!card) return;

      calculateTotal(card);
    });
  }

  function calculateTotal(card) {
    const basePrice = parseFloat(card.querySelector(".basePrice").textContent);
    const counts = card.querySelectorAll(".extra-control .count");

    const extraPhotos = parseInt(counts[0]?.textContent) || 0;
    const outfits = parseInt(counts[1]?.textContent) || 0;
    const rush = card.querySelector(".rushDelivery")?.checked || false;

    let total = basePrice;
    total += extraPhotos * 15;
    total += outfits * 30;

    if (rush) total += 70;

    card.querySelector(".totalPrice").textContent = total.toFixed(2);
  }

  function goToContact(card) {
    const name = card.querySelector(".packageName").textContent;
    const tagline = card.querySelector(".packageSelect").textContent;
    const total = card.querySelector(".totalPrice").textContent;

    const counts = card.querySelectorAll(".extra-control .count");
    const extraPhotos = parseInt(counts[0]?.textContent) || 0;
    const outfits = parseInt(counts[1]?.textContent) || 0;
    const rush = card.querySelector(".rushDelivery")?.checked || false;

    let extrasArr = [];

    if (extraPhotos > 0) extrasArr.push(`${extraPhotos} additional photos`);
    if (outfits > 0) extrasArr.push(`${outfits} outfit changes`);
    if (rush) extrasArr.push("rush delivery");

    const extrasText = extrasArr.length ? extrasArr.join(", ") : "No extras";

    const contactUrl = `contact.html?service=${encodeURIComponent(name)}&package=${encodeURIComponent(tagline)}&extras=${encodeURIComponent(extrasText)}&total=${encodeURIComponent("$" + total)}`;

    window.location.href = contactUrl;
  }
});
// =============================
// CONTACT PAGE PREFILL
// =============================
document.addEventListener("DOMContentLoaded", () => {
  contactPageInit();
});

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

    messageInput.style.height = "auto";
    messageInput.style.height = messageInput.scrollHeight + "px";
  } else {
    messageInput.value = "";
  }
}