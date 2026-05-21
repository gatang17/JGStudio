// =============================
// PRELOADER
// =============================
function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  preloader.classList.add("hide");

  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
}

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  preloader.style.display = 'flex';
  preloader.style.opacity = '1';
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
          for (let el of elementosBorrosos) el.style.filter = "none";
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
          for (let el of elementosBorrosos) el.style.filter = "none";
        }
      }

      btnHamburguesa.addEventListener("click", () => {
        menuAbierto = !menuAbierto;

        if (menuAbierto) {
          document.body.style.overflow = 'hidden';
          menuDrop.style.visibility = "visible";
          for (let el of elementosBorrosos) el.style.filter = "blur(5px) brightness(0.3)";
          menuDrop.classList.add('menu-overlay');
        } else {
          document.body.style.overflow = '';
          menuDrop.style.visibility = "hidden";
          for (let el of elementosBorrosos) el.style.filter = "none";
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
document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("cont_background");
  if (!cont) return;

  const images = [
    "./img/photos/carousel/04.jpg",
    "./img/photos/carousel/02.jpg",
    "./img/photos/carousel/03.jpg",
    "./img/photos/carousel/01.jpg",
    "./img/photos/carousel/05.jpg"
  ];

  const divCarrusel = document.createElement("div");
  divCarrusel.id = "carr_ind";
  cont.appendChild(divCarrusel);

  let current = 0;
  let nextIndex = 1;
  const slides = [];

  const motions = [
    { start: "start-right",  move: "move-left"  },
    { start: "start-left",   move: "move-right" },
    { start: "start-top",    move: "move-down"  },
    { start: "start-bottom", move: "move-up"    },
    { start: "start-zoom",   move: "move-zoom"  }
  ];

  function createSlide(src, visible = false, index = 0) {
    const motion = motions[index % motions.length];
    const img = document.createElement("img");
    img.className = `img_carr ${motion.start}`;
    img.dataset.move = motion.move;
    img.src = src;
    img.loading = visible ? "eager" : "lazy";
    img.decoding = "async";
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.opacity = visible ? "1" : "0";
    divCarrusel.appendChild(img);
    return img;
  }

  function startMotion(slide) {
    if (!slide) return;
    setTimeout(() => { slide.classList.add(slide.dataset.move); }, 80);
  }

  function loadSlide(index) {
    if (slides[index]) return slides[index];
    slides[index] = createSlide(images[index], false, index);
    return slides[index];
  }

  function showNextSlide() {
    const next = nextIndex;
    loadSlide(next);

    const currentSlide = slides[current];
    const nextSlide = slides[next];

    currentSlide.style.opacity = "0";
    nextSlide.style.transition = "none";
    nextSlide.style.opacity = "0";
    nextSlide.classList.remove(nextSlide.dataset.move);
    void nextSlide.offsetWidth;
    nextSlide.style.transition = "opacity 3s ease-in-out, transform 14s linear";
    nextSlide.style.opacity = "1";
    setTimeout(() => { nextSlide.classList.add(nextSlide.dataset.move); }, 80);

    current = next;
    nextIndex = (current + 1) % images.length;
    loadSlide(nextIndex);
  }

  slides[0] = createSlide(images[0], true, 0);
  slides[0].onload = () => { startMotion(slides[0]); hidePreloader(); };
  if (slides[0].complete) { startMotion(slides[0]); hidePreloader(); }
  slides[1] = createSlide(images[1], false, 1);

  let carouselTimer;

  function startCarouselTimer() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(showNextSlide, 7000);
  }

  function restartCurrentMotion() {
    const slide = slides[current];
    if (!slide) return;
    slide.style.transition = "none";
    slide.classList.remove(slide.dataset.move);
    void slide.offsetWidth;
    slide.style.transition = "opacity 3s ease-in-out, transform 14s linear";
    setTimeout(() => { slide.classList.add(slide.dataset.move); }, 80);
  }

  window.addEventListener("hashchange", () => { restartCurrentMotion(); startCarouselTimer(); });
  window.addEventListener("pageshow",   () => { restartCurrentMotion(); startCarouselTimer(); });
  startCarouselTimer();
});

// =============================
// FEATURED SESSION
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const featuredMedia       = document.getElementById("featuredMedia");
  const featuredTitle       = document.getElementById("featuredTitle");
  const featuredDescription = document.getElementById("featuredDescription");
  const featuredBtn         = document.getElementById("featuredBtn");
  const featuredLinkImage   = document.getElementById("featuredLinkImage");

  if (!featuredMedia || !featuredTitle || !featuredDescription || !featuredBtn || !featuredLinkImage) return;

  fetch("data/services.json")
    .then(res => res.json())
    .then(data => {
      const featured = data.galleries?.featured;
      if (!featured) return;

      featuredTitle.textContent       = featured.title || "Moments We Love";
      featuredDescription.textContent = featured.description || "";
      featuredBtn.href                = "gallery.html?service=featured";
      featuredLinkImage.href          = "gallery.html?service=featured";
      featuredMedia.style.backgroundImage = `url('${featured.src}/1.jpg')`;
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
    const update = () => box.classList.toggle('has-value', field.value.trim() !== '');
    field.addEventListener('input', update);
    update();
  });
});

// =============================
// POPUP
// =============================
document.addEventListener('DOMContentLoaded', function () {
  const popup             = document.getElementById('popup');
  const btnSub            = document.getElementById('btSub');
  const elementosBorrosos = document.querySelectorAll('.borroso');

  if (!popup || !btnSub) return;

  function togglePopup() {
    const isOpen = popup.style.display === 'block';
    popup.style.display = isOpen ? 'none' : 'block';
    elementosBorrosos.forEach(el => {
      el.style.filter = isOpen ? 'none' : 'blur(5px) brightness(0.3)';
    });
  }

  btnSub.addEventListener('click', togglePopup);
});

// =============================
// GALLERY
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer =
    document.getElementById("gallery-grid") ||
    document.getElementById("gallery");

  if (!galleryContainer) return;

  const params     = new URLSearchParams(window.location.search);
  const serviceKey = params.get("service") || "photography";

  fetch("data/services.json")
    .then(res => res.json())
    .then(data => {
      const galleryData = data.galleries?.[serviceKey] || data.galleries?.photography;

      if (!galleryData) {
        galleryContainer.innerHTML = "<p>Gallery not found.</p>";
        return;
      }

      const images    = Array.from({ length: galleryData.count || 12 }, (_, i) => `${galleryData.src}/${i + 1}.jpg`);
      const heroImage = galleryData.hero || images[0];

      galleryContainer.innerHTML = `
        <section class="gallery-hero" style="background-image: url('${heroImage}')">
          <div class="gallery-hero-content">
            <span class="section-kicker">JG Photography</span>
            <h1>${galleryData.title}</h1>
            <p>${galleryData.description}</p>
            <a href="calculator.html?service=${serviceKey}" class="btn mybtn">View Packages for This Session</a>
          </div>
        </section>

        <section class="gallery-intro">
          <p>${galleryData.description}</p>
        </section>

        <section class="gallery-masonry" id="galleryMasonry"></section>

        <section class="gallery-cta">
          <span class="section-kicker">Ready when you are</span>
          <h2>Shape a ${galleryData.title} session around your story.</h2>
          <a href="calculator.html?service=${serviceKey}" class="btn mybtn">Customize a Package</a>
        </section>
      `;

      const masonry = document.getElementById("galleryMasonry");

      images.forEach((src, index) => {
        const item     = document.createElement("button");
        item.className = `gallery-item item-${index + 1}`;
        item.type      = "button";
        item.innerHTML = `<img src="${src}" alt="${galleryData.title}" loading="lazy">`;

        item.querySelector("img").onerror = () => {
          console.warn("Image not found:", src);
          item.remove();
        };

        item.addEventListener("click", () => { openGalleryOverlay(images, index); });
        masonry.appendChild(item);
      });
    })
    .catch(err => console.error("Gallery load error:", err));
});

function openGalleryOverlay(images, startIndex) {
  let currentIndex = startIndex;
  let overlay      = document.getElementById("popupOverlay");
  let imgBig       = document.getElementById("popupImage");

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    imgBig.src = images[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    imgBig.src = images[currentIndex];
  }

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "popupOverlay";

    imgBig = document.createElement("img");
    imgBig.id = "popupImage";

    const closeBtn = document.createElement("button");
    closeBtn.className = "gallery-close";
    closeBtn.innerHTML = "&times;";

    const prev = document.createElement("button");
    prev.className = "gallery-arrow gallery-prev";
    prev.innerHTML = "&#10094;";

    const next = document.createElement("button");
    next.className = "gallery-arrow gallery-next";
    next.innerHTML = "&#10095;";

    overlay.append(imgBig, closeBtn, prev, next);
    document.body.appendChild(overlay);

    closeBtn.addEventListener("click", e => { e.stopPropagation(); overlay.style.display = "none"; });
    overlay.addEventListener("click",  e => { if (e.target === overlay) overlay.style.display = "none"; });
    prev.addEventListener("click",     e => { e.stopPropagation(); showPrev(); });
    next.addEventListener("click",     e => { e.stopPropagation(); showNext(); });

    document.addEventListener("keydown", e => {
      if (overlay.style.display !== "flex") return;
      if (e.key === "Escape")     overlay.style.display = "none";
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft")  showPrev();
    });
  }

  imgBig = document.getElementById("popupImage");
  imgBig.src = images[currentIndex];
  overlay.style.display = "flex";
}

// =============================
// CONTACT SECTION INJECTION
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const contactInject = document.getElementById("contactInject");
  if (!contactInject) return;

  fetch("contact-section.html")
    .then(res => res.text())
    .then(html => {
      contactInject.innerHTML = html;
      contactPageInit();
    })
    .catch(err => console.error("Contact section load error:", err));
});

// =============================
// CALCULATOR
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.getElementById("card_container");
  if (!cardContainer) return;

  let packages      = [];
  let sharedOptions = {};
  let rushTiers     = [];

  const params     = new URLSearchParams(window.location.search);
  const serviceKey = params.get("service") || "families";

  const serviceTypeMap = {
    families:    "family",
    newborn:     "newborn",
    milestones:  "milestone",
    portrait:    "portrait",
    photography: "portrait",
    featured:    "family"
  };

  const currentType = serviceTypeMap[serviceKey] || "portrait";

  fetch("data/services.json")
    .then(res => res.json())
    .then(data => {
      // Lee sharedOptions y rushTiers desde la raíz del JSON
      sharedOptions = data.sharedOptions || {};
      rushTiers     = data.rushTiers     || [];

      const galleryData  = data.galleries?.[serviceKey] || data.galleries?.photography;
      const previewTitle = document.querySelector("#previewImage .title");
      const previewImage = document.getElementById("previewImage");

      if (previewTitle && galleryData) {
        previewTitle.innerHTML = `
          <span class="calculator-kicker">Customize Your Package</span>
          ${galleryData.title}
        `;
      }

      if (previewImage && galleryData) {
        const heroImage = galleryData.hero || `${galleryData.src}/1.jpg`;
        previewImage.style.setProperty("background-image", `url("${heroImage}")`, "important");
      }

      // packages ahora es un array plano de objetos en la raíz del JSON
      packages = data.packages.filter(pkg => pkg.type === currentType);

      if (!packages.length) {
        cardContainer.innerHTML = `<p>No packages found for ${currentType}.</p>`;
        return;
      }

      renderPackages(packages);
    })
    .catch(err => console.error("Calculator load error:", err));

  // Retorna el precio de rush según las fotos base.
  // Si supera todos los tiers, retorna null (opción no disponible).
  function getRushPrice(basePhotos) {
    for (const tier of rushTiers) {
      if (basePhotos <= tier.maxPhotos) return tier.price;
    }
    return null;
  }

  // Construye la opción final mezclando sharedOptions con los datos del paquete.
  function resolveOption(optionId, pkg) {
    const shared = sharedOptions[optionId];
    if (!shared) return null;

    const resolved = { ...shared };

    if (optionId === "session-style") {
      resolved.choices = resolved.choices.map(choice =>
        choice.value === "studio"
          ? { ...choice, price: pkg.studioUpcharge || 0 }
          : choice
      );
    }

    if (optionId === "extra-photo") {
      resolved.price = pkg.photoPrice || 15;
    }

    if (optionId === "rush") {
      const price = getRushPrice(pkg.limits.basePhotos);
      if (price === null) return null; // no mostrar para paquetes grandes
      resolved.price = price;
    }

    return resolved;
  }

  function renderPackages(packageList) {
    cardContainer.innerHTML = "";

    packageList.forEach((pkg, index) => {
      const isSpecial = index === 1;

      cardContainer.innerHTML += `
        <article class="package-card ${isSpecial ? "package-special" : ""}" data-id="${pkg.id}">
          ${isSpecial ? `<span class="package-badge">Most Loved</span>` : ""}

          <h2>${pkg.name}</h2>

          <p class="package-blurb">${pkg.blurb}</p>

          <h2>$${pkg.basePrice}</h2>

          <ul class="package-includes">
            ${pkg.includes.map(item => `<li><i class="fa-solid fa-check"></i> ${item}</li>`).join("")}
          </ul>

          <span class="package-open-label">CUSTOMIZE PACKAGE ↗</span>

          <div class="package-details"></div>

          <button type="button" class="selectPackageBtn">
            Get This Package
          </button>
        </article>
      `;
    });

    attachPackageEvents();
  }

  function attachPackageEvents() {
    document.querySelectorAll(".package-card").forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest(".package-details") || e.target.closest(".selectPackageBtn")) return;
        const wasActive = card.classList.contains("active");
        closeAllPackages();
        if (wasActive) return;
        openPackage(card);
      });
    });

    document.addEventListener("click", e => {
      // Counters
      const counter    = e.target.closest(".option-counter");
      const counterBtn = e.target.closest("button");

      if (counter && counterBtn &&
          (counterBtn.classList.contains("increase") || counterBtn.classList.contains("decrease"))) {
        e.stopPropagation();
        const card    = e.target.closest(".package-card");
        const countEl = counter.querySelector(".count");
        let count     = parseInt(countEl.textContent);
        const max     = parseInt(counter.dataset.max);

        if (counterBtn.classList.contains("increase") && count < max) count++;
        if (counterBtn.classList.contains("decrease") && count > 0)   count--;

        countEl.textContent = count;
        calculateTotal(card);
        return;
      }

      // Botón "Get This Package"
      const btn = e.target.closest(".selectPackageBtn");
      if (!btn) return;

      e.stopPropagation();
      const card = btn.closest(".package-card");

      if (!card.classList.contains("active")) {
        closeAllPackages();
        openPackage(card);
      }

      updateContactMessage(card);
      document.getElementById("contactSection")?.scrollIntoView({ behavior: "smooth" });
    });

    document.addEventListener("change", e => {
      if (!e.target.classList.contains("package-option") &&
          !e.target.classList.contains("package-select")) return;
      calculateTotal(e.target.closest(".package-card"));
    });
  }

  function openPackage(card) {
    const pkg = getPackageByCard(card);
    if (!pkg) return;

    card.classList.add("active");

    // Resuelve cada opción por ID contra sharedOptions + datos del paquete
    const resolvedOptions = pkg.options
      .map(id => resolveOption(id, pkg))
      .filter(Boolean); // elimina null (ej. rush no disponible)

    card.querySelector(".package-details").innerHTML = `
      <p class="customize-label">Customize</p>
      <div class="package-options">
        ${resolvedOptions.map(option => createOptionHTML(option, pkg)).join("")}
      </div>
      <h4 class="package-total">
        Total: $ <span class="totalPrice">${pkg.basePrice}</span>
      </h4>
    `;

    calculateTotal(card);
  }

  function createOptionHTML(option, pkg) {
    if (option.control === "select") {
      return `
        <label class="package-option-row package-select-row">
          <span>${option.label}</span>
          <select class="package-select">
            ${option.choices.map(choice => `
              <option
                value="${choice.value}"
                data-label="${choice.label}"
                data-price="${choice.price}"
              >
                ${choice.label}${choice.price > 0 ? ` (+$${choice.price})` : ""}
              </option>
            `).join("")}
          </select>
        </label>
      `;
    }

    if (option.control === "counter") {
      const max = option.id === "extra-photo"
        ? Math.max(0, pkg.limits.maxPhotos - pkg.limits.basePhotos)
        : option.max || 1;

      return `
        <div class="package-option-row">
          <span>${option.label}</span>
          <div class="option-counter" data-label="${option.label}" data-price="${option.price}" data-max="${max}">
            <button type="button" class="decrease"><i class="fa-solid fa-minus"></i></button>
            <span class="count">0</span>
            <button type="button" class="increase"><i class="fa-solid fa-plus"></i></button>
          </div>
          <strong>+$${option.price}</strong>
        </div>
      `;
    }

    return `
      <label class="package-option-row">
        <span>
          <input
            type="checkbox"
            class="package-option"
            data-label="${option.label}"
            data-price="${option.price}"
          >
          ${option.label}
        </span>
        <strong>+$${option.price}</strong>
      </label>
    `;
  }

  function closeAllPackages() {
    document.querySelectorAll(".package-card").forEach(card => {
      card.classList.remove("active");
      const details = card.querySelector(".package-details");
      if (details) details.innerHTML = "";
    });
  }

  function getPackageByCard(card) {
    return packages.find(pkg => pkg.id === card.dataset.id);
  }

  function calculateTotal(card) {
    const pkg = getPackageByCard(card);
    if (!pkg) return;

    let total = pkg.basePrice;

    card.querySelectorAll(".package-option:checked").forEach(option => {
      total += Number(option.dataset.price);
    });

    card.querySelectorAll(".package-select").forEach(select => {
      total += Number(select.options[select.selectedIndex].dataset.price || 0);
    });

    card.querySelectorAll(".option-counter").forEach(counter => {
      total += parseInt(counter.querySelector(".count").textContent) * Number(counter.dataset.price);
    });

    const totalEl = card.querySelector(".totalPrice");
    if (totalEl) totalEl.textContent = total;
  }

  function updateContactMessage(card) {
    const pkg          = getPackageByCard(card);
    const messageInput = document.getElementById("message");
    if (!pkg || !messageInput) return;

    const selectedOptions = [];

    // Checkboxes
    card.querySelectorAll(".package-option:checked").forEach(option => {
      selectedOptions.push(`${option.dataset.label} (+$${option.dataset.price})`);
    });

    // Counters
    card.querySelectorAll(".option-counter").forEach(counter => {
      const count = parseInt(counter.querySelector(".count").textContent);
      if (count > 0) {
        selectedOptions.push(
          `${count} ${counter.dataset.label}(s) (+$${Number(counter.dataset.price) * count})`
        );
      }
    });

    // Selects (session style, etc.)
    card.querySelectorAll(".package-select").forEach(select => {
      const selected = select.options[select.selectedIndex];
      const label    = selected.dataset.label || selected.textContent.trim();
      const price    = Number(selected.dataset.price || 0);
      const rowLabel = select.closest(".package-select-row")
        ?.querySelector("span")?.textContent?.trim() || "Option";
      selectedOptions.push(`${rowLabel}: ${label}${price > 0 ? ` (+$${price})` : ""}`);
    });

    const total = card.querySelector(".totalPrice")?.textContent || pkg.basePrice;

    messageInput.value =
`Hello, I would like to book the following package:

Service: ${serviceKey}
Package: ${pkg.name}
Base Price: $${pkg.basePrice}
Extras: ${selectedOptions.length ? selectedOptions.join(", ") : "No extras"}
Total Price: $${total}

Please let me know the next steps.`;

    messageInput.style.height = "auto";
    messageInput.style.height = messageInput.scrollHeight + "px";
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

  const params      = new URLSearchParams(window.location.search);
  const packageName = params.get("package") || "";
  const extras      = params.get("extras")  || "";
  const total       = params.get("total")   || "";

  if (packageName || extras || total) {
    const service = params.get("service") || "";

    messageInput.value =
`Hello, I would like to book the following package:

Service: ${service}
Package: ${packageName}
Extras: ${extras}
Total Price: ${total}

Please let me know the next steps.`;

    messageInput.style.height = "auto";
    messageInput.style.height = messageInput.scrollHeight + "px";
  } else {
    messageInput.value = "";
  }
}