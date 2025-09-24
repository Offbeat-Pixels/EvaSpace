// import "./output.css";

// === UTILITIES ===
const animations = {
  fadeIn: (element, duration = 300) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
    requestAnimationFrame(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });
  },

  staggerChildren: (container, delay = 80) => {
    const children = container.querySelectorAll(".swiper-slide");
    children.forEach((child, index) => {
      child.style.opacity = "0";
      child.style.transform = "scale(0.9) translateY(20px)";
      child.style.transition = "opacity 400ms ease, transform 400ms ease";
      setTimeout(() => {
        child.style.opacity = "1";
        child.style.transform = "scale(1) translateY(0)";
      }, index * delay);
    });
  },
};

// Global image fallback handler
function setFallbackImages() {
  document.querySelectorAll("img").forEach((img) => {
    if (!img.dataset.fallbackSet) {
      img.onerror = () => {
        img.src =
          "https://img.freepik.com/free-vector/404-error-with-man-cones_24908-77788.jpg?t=st=1758540375~exp=1758543975~hmac=7ace41be601e9463efc9ea66207b7b8d903a0bcd0b3ea583fe508bb5e8ce3e82&w=1480";
      };
      img.dataset.fallbackSet = "true";
    }
  });
}

// Improved partial loader with script deduplication
async function loadPartial(id, url) {
  try {
    const container = document.getElementById(id);
    if (!container) {
      console.warn(`Container with id "${id}" not found`);
      return false;
    }

    const response = await fetch(url, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to load ${url}`);
    }

    const content = await response.text();
    container.innerHTML = content;

    // Execute scripts with deduplication
    const scripts = container.querySelectorAll("script");
    scripts.forEach((script) => {
      if (!script.textContent.trim() || script.dataset.loaded) return;

      const newScript = document.createElement("script");
      newScript.textContent = script.textContent;
      newScript.dataset.loaded = "true";
      document.body.appendChild(newScript);
    });

    console.log(`✅ Successfully loaded: ${url}`);
    return true;
  } catch (err) {
    console.error(`❌ Error loading ${url}:`, err);
    return false;
  }
}

// === DATA ===
const servicesData = [
  {
    id: 1,
    title: "Co-Working Spaces",
    description:
      "Modern and adaptive workspace solutions designed for collaboration and productivity.",
    image: "images/Services/service1.webp",
    link: "/Services/coworking",
  },
  {
    id: 2,
    title: "Community & Networking",
    description:
      "Grow your connections with like-minded professionals through curated events.",
    image: "images/Services/service2.webp",
    link: "/Services/community",
  },
  {
    id: 3,
    title: "Private Offices",
    description:
      "Flexible and secure private office spaces with premium amenities.",
    image: "images/Services/service3.webp",
    link: "/Services/private-offices",
  },
];
const glimpsesData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=500&fit=crop",
    alt: "Community workspace with people collaborating",
    category: "workspace",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop",
    alt: "Modern bedroom workspace",
    category: "workspace",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop",
    alt: "Professional meeting room",
    category: "workspace",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=500&fit=crop",
    alt: "Creative workspace with modern design",
    category: "party",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=500&fit=crop",
    alt: "Comfortable lounge area",
    category: "bnb",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop",
    alt: "Event space setup",
    category: "rooftop",
  },
];
const testimonialsData = [
  {
    id: 1,
    name: "Jhon Doe",
    role: "Cafe Owner",
    rating: 4,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod, nisl at convallis faucibus.",
    avatar: "https://i.pravatar.cc/60?img=1",
  },
  {
    id: 2,
    name: "Jhon Doe",
    role: "Digital Marketer",
    rating: 5,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod, nisl at convallis faucibus.",
    avatar: "https://i.pravatar.cc/60?img=2",
  },
  {
    id: 3,
    name: "Jhon Doe",
    role: "Freelancer",
    rating: 4,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod, nisl at convallis faucibus.",
    avatar: "https://i.pravatar.cc/60?img=3",
  },
  {
    id: 5,
    name: "Jhon Doe",
    role: "Freelancer",
    rating: 4,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod, nisl at convallis faucibus.",
    avatar: "https://i.pravatar.cc/60?img=3",
  },
  {
    id: 6,
    name: "Jhon Doe",
    role: "Freelancer",
    rating: 4,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod, nisl at convallis faucibus.",
    avatar: "https://i.pravatar.cc/60?img=3",
  },
  {
    id: 7,
    name: "Jhon Doe",
    role: "Freelancer",
    rating: 4,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod, nisl at convallis faucibus.",
    avatar: "https://i.pravatar.cc/60?img=3",
  },
  {
    id: 8,
    name: "Jhon Doe",
    role: "Freelancer",
    rating: 4,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod, nisl at convallis faucibus.",
    avatar: "https://i.pravatar.cc/60?img=3",
  },
];
const clientsData = [
  {
    id: 1,
    logo: "images/Clients/talo.webp",
    alt: " talo a client of Eva space coworking space in dehradun ",
  },
  {
    id: 2,
    logo: "images/Clients/solid-state.webp",
    alt: " solid state a client of Eva space coworking space in dehradun",
  },
  {
    id: 3,
    logo: "images/Clients/noted.webp",
    alt: "noted a client of Eva space coworking space in dehradun",
  },
  {
    id: 4,
    logo: "images/Clients/goan.webp",
    alt: "goan a client of Eva space coworking space in dehradun",
  },
  {
    id: 5,
    logo: "images/Clients/mowi.webp",
    alt: "mowi a client of Eva space coworking space in dehradun",
  },
  {
    id: 6,
    logo: "images/Clients/talo.webp",
    alt: " talo a client of Eva space coworking space in dehradun ",
  },
  {
    id: 7,
    logo: "images/Clients/solid-state.webp",
    alt: " solid state a client of Eva space coworking space in dehradun",
  },
  {
    id: 8,
    logo: "images/Clients/noted.webp",
    alt: "noted a client of Eva space coworking space in dehradun",
  },
  {
    id: 9,
    logo: "images/Clients/goan.webp",
    alt: "goan a client of Eva space coworking space in dehradun",
  },
  {
    id: 10,
    logo: "images/Clients/mowi.webp",
    alt: "mowi a client of Eva space coworking space in dehradun",
  },
];
const coworkingData = [
  {
    id: 1,
    image: "images/Services/coworking/space1.webp",
    alt: "Spacious coworking office view",
  },
  {
    id: 2,
    image: "images/Services/coworking/space2.webp",
    alt: "Team working in coworking office",
  },
  {
    id: 3,
    image: "images/Services/coworking/space3.webp",
    alt: "Private cabin inside coworking office",
  },
];
const bnbData = [
  {
    id: 1,
    image: "images/Services/bnb/bnb1.webp",
    alt: "Spacious bnb office view",
  },
  {
    id: 2,
    image: "images/Services/bnb/bnb2.webp",
    alt: "Team working in bnb office",
  },
  {
    id: 3,
    image: "images/Services/bnb/bnb3.webp",
    alt: "Private cabin inside bnb office",
  },
  {
    id: 4,
    image: "images/Services/bnb/bnb1.webp",
    alt: "Spacious bnb office view",
  },
  {
    id: 5,
    image: "images/Services/bnb/bnb2.webp",
    alt: "Team working in bnb office",
  },
  {
    id: 6,
    image: "images/Services/bnb/bnb3.webp",
    alt: "Private cabin inside bnb office",
  },
];
const partyAreaData = [
  {
    id: 1,
    image: "images/Services/bnb/bnb1.webp",
    alt: "Spacious bnb office view",
  },
  {
    id: 2,
    image: "images/Services/bnb/bnb2.webp",
    alt: "Team working in bnb office",
  },
  {
    id: 3,
    image: "images/Services/bnb/bnb3.webp",
    alt: "Private cabin inside bnb office",
  },
  {
    id: 4,
    image: "images/Services/bnb/bnb1.webp",
    alt: "Spacious bnb office view",
  },
  {
    id: 5,
    image: "images/Services/bnb/bnb2.webp",
    alt: "Team working in bnb office",
  },
  {
    id: 6,
    image: "images/Services/bnb/bnb3.webp",
    alt: "Private cabin inside bnb office",
  },
];

// === SLIDER CONFIGURATION ===
const sliderConfigs = {
  services: {
    containerSelector: ".services-swiper",
    containerId: "slides-container",
    data: servicesData,
    slideTemplate: (service) => `
      <div class="swiper-slide">
        <div class="relative rounded-2xl overflow-hidden h-full group ">
          <div class="relative">
            <img src="${service.image}" alt="${service.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='https://img.freepik.com/free-vector/404-error-with-man-cones_24908-77788.jpg?t=st=1758540375~exp=1758543975~hmac=7ace41be601e9463efc9ea66207b7b8d903a0bcd0b3ea583fe508bb5e8ce3e82&w=1480'">
          </div>
          <div data-link="${service.link}" class="arrow-icon cursor-pointer absolute top-0 right-0 bg-yellow-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-transform duration-200 group-hover:text-black">
            →
          </div>
          <div class="absolute left-4 bottom-4 right-4">
            <div class="content-overlay bg-white/90 backdrop-blur-sm rounded-2xl p-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-1">${service.title}</h3>
              <p class="text-gray-700 text-sm leading-relaxed line-clamp-2">${service.description}</p>
            </div>
          </div>
        </div>
      </div>
    `,
    options: {
      slidesPerView: "auto",
      spaceBetween: 24,
      breakpoints: {
        640: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      speed: 600,
      grabCursor: true,
    },
    controls: { prev: "custom-prev", next: "custom-next" },
  },
  glimpses: {
    containerSelector: ".glimpses-swiper",
    containerId: "glimpses-container",
    data: glimpsesData,
    slideTemplate: (glimpse) => `
    <div class="swiper-slide w-[24rem]">
  <div class="glimpse-card aspect-[3/4] rounded-2xl overflow-hidden">
    <img src="${glimpse.image}" 
         alt="${glimpse.alt}" 
         class="w-full h-full object-cover" loading="lazy"  onerror="this.src='https://img.freepik.com/free-vector/404-error-with-man-cones_24908-77788.jpg?t=st=1758540375~exp=1758543975~hmac=7ace41be601e9463efc9ea66207b7b8d903a0bcd0b3ea583fe508bb5e8ce3e82&w=1480'"  />
  </div>
</div>`,
    options: {
      effect: "coverflow",
      slidesPerView: "auto",
      spaceBetween: 50,
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      coverflowEffect: { rotate: 20, depth: 200, slideShadows: false },
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      speed: 600,
    },
    controls: { prev: "glimpses-prev", next: "glimpses-next" },
  },
  testimonials: {
    containerSelector: ".testimonials-swiper",
    containerId: "testimonials-container",
    data: testimonialsData,
    slideTemplate: (t) => `
    <div class="swiper-slide w-full h-full ">
      <div class="bg-green-50 rounded-xl p-6 shadow hover:shadow-lg transition h-full flex flex-col">
        <div class="flex items-center mb-4">
          <img src="${t.avatar}" alt="${
      t.name
    }" class="w-12 h-12 rounded-full mr-3" loading="lazy" />
          <div>
            <h3 class="text-lg font-semibold text-gray-800">${t.name}</h3>
            <p class="text-sm text-gray-500">${t.role}</p>
          </div>
        </div>
        <div class="flex mb-3 text-yellow-500">
          ${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}
        </div>
        <p class="text-gray-600 text-sm leading-relaxed flex-1">
          ${t.feedback}
        </p>
      </div>
    </div>
  `,
    options: {
      slidesPerView: "auto",
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
     
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3},
        1280: { slidesPerView: 5 },
      },
      speed: 600,
      grabCursor: true,
    },
  },
  clients: {
    containerSelector: ".clients-swiper",
    containerId: "clients-container",
    data: clientsData,
    slideTemplate: (c) => `
    <div class="swiper-slide flex justify-center ">
      <div class="w-40 h-28 hover:scale-95 duration-300 flex items-center justify-center bg-white border border-gray-300 rounded-xl  transition">
        <img src="${c.logo}" alt="${c.alt}" class="max-h-16 object-contain " loading="lazy" />
      </div>
    </div>
  `,
    options: {
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      },
      speed: 600,
      grabCursor: true,
    },
  },
  coworking: {
    containerSelector: ".coworking-swiper",
    containerId: "coworking-container",
    data: coworkingData,
    slideTemplate: (c) => `
    <div class="swiper-slide">
      <div class="rounded-xl overflow-hidden ">
        <img src="${c.image}" 
             alt="${c.alt}" 
             class="w-full h-96 object-contain aspect-square" 
             loading="lazy"
             onerror="this.src='https://img.freepik.com/free-vector/404-error-with-man-cones_24908-77788.jpg?t=st=1758540375~exp=1758543975~hmac=7ace41be601e9463efc9ea66207b7b8d903a0bcd0b3ea583fe508bb5e8ce3e82&w=1480'"/>
      </div>
    </div>
  `,
    options: {
      slidesPerView: "auto",
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: "#coworking-next",
        prevEl: "#coworking-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      speed: 600,
      grabCursor: true,
    },
  },
  bnb: {
    containerSelector: ".bnb-swiper",
    containerId: "bnb-container",
    data: bnbData,
    slideTemplate: (c) => `
    <div class="swiper-slide">
      <div class="rounded-xl overflow-hidden ">
        <img src="${c.image}" 
             alt="${c.alt}" 
             class="w-full h-96 object-contain aspect-square" 
             loading="lazy"
             onerror="this.src='https://img.freepik.com/free-vector/404-error-with-man-cones_24908-77788.jpg?t=st=1758540375~exp=1758543975~hmac=7ace41be601e9463efc9ea66207b7b8d903a0bcd0b3ea583fe508bb5e8ce3e82&w=1480'"/>
      </div>
    </div>
  `,
    options: {
      slidesPerView: "auto",
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: "#bnb-next",
        prevEl: "#bnb-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      speed: 600,
      grabCursor: true,
    },
  },
  partyArea: {
    containerSelector: ".partyArea-swiper",
    containerId: "partyArea-container",
    data: partyAreaData,
    slideTemplate: (c) => `
    <div class="swiper-slide">
      <div class="rounded-xl overflow-hidden ">
        <img src="${c.image}" 
             alt="${c.alt}" 
             class="w-full h-96 object-contain aspect-square" 
             loading="lazy"
             onerror="this.src='https://img.freepik.com/free-vector/404-error-with-man-cones_24908-77788.jpg?t=st=1758540375~exp=1758543975~hmac=7ace41be601e9463efc9ea66207b7b8d903a0bcd0b3ea583fe508bb5e8ce3e82&w=1480'"/>
      </div>
    </div>
  `,
    options: {
      slidesPerView: "auto",
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: "#partyArea-next",
        prevEl: "#partyArea-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      speed: 600,
      grabCursor: true,
    },
  },
};

// === CORE FUNCTIONS ===
function renderSlides(config) {
  const container = document.getElementById(config.containerId);
  if (!container) {
    console.warn(`❌ Container ${config.containerId} not found`);
    return false;
  }
  container.innerHTML = config.data.map(config.slideTemplate).join("");
  return true;
}

function lazyInitSwiper(config, key) {
  const containerEl = document.querySelector(config.containerSelector);
  if (!containerEl) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        try {
          const swiper = new Swiper(config.containerSelector, config.options);

          // Attach navigation if present
          if (config.controls?.prev && config.controls?.next) {
            const prevBtn = document.getElementById(config.controls.prev);
            const nextBtn = document.getElementById(config.controls.next);
            prevBtn?.addEventListener("click", () => swiper.slidePrev());
            nextBtn?.addEventListener("click", () => swiper.slideNext());
          }

          console.log(`✅ ${key} slider initialized lazily`);
          obs.disconnect();
        } catch (err) {
          console.error(`❌ Failed to init ${key} slider:`, err);
        }
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(containerEl);
}

// Gallery-specific functionality
let glimpsesSwiper;

function initGlimpsesSwiper(data, isFilterChange = false) {
  const config = sliderConfigs.glimpses;
  const container = document.getElementById(config.containerId);

  if (!container) return;

  if (isFilterChange && glimpsesSwiper) {
    container.style.opacity = "0";
    container.style.transform = "scale(0.95)";
    container.style.transition = "opacity 300ms ease, transform 300ms ease";

    setTimeout(() => updateSliderContent(), 300);
  } else {
    updateSliderContent();
  }

  function updateSliderContent() {
    container.innerHTML = data.map(config.slideTemplate).join("");
    setFallbackImages();

    if (glimpsesSwiper) glimpsesSwiper.destroy(true, true);

    glimpsesSwiper = new Swiper(config.containerSelector, {
      ...config.options,
      navigation: {
        nextEl: `#${config.controls.next}`,
        prevEl: `#${config.controls.prev}`,
      },
    });

    container.style.opacity = "1";
    container.style.transform = "scale(1)";
    setTimeout(() => animations.staggerChildren(container), 100);
  }
}

function initializeGalleryTabs() {
  initGlimpsesSwiper(glimpsesData);

  document.querySelectorAll(".glimpses-tab").forEach((tab, index) => {
    setTimeout(() => animations.fadeIn(tab, 300), index * 50);
  });

  document.querySelectorAll(".glimpses-tab").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      if (btn.classList.contains("animating")) return;
      btn.classList.add("animating");

      // Update tab styles
      document.querySelectorAll(".glimpses-tab").forEach((b) => {
        b.style.transform = "scale(1)";
        b.style.transition = "all 200ms ease";
        b.classList.remove("active", "bg-yellow-400", "text-white");
        b.classList.add("bg-gray-200");
      });

      btn.style.transform = "scale(1.05)";
      btn.classList.remove("bg-gray-200");
      btn.classList.add("active", "bg-yellow-400", "text-white");

      setTimeout(() => {
        btn.style.transform = "scale(1)";
        btn.classList.remove("animating");
      }, 200);

      // Filter data
      const filter = btn.dataset.filter;
      const filteredData =
        filter === "all"
          ? glimpsesData
          : glimpsesData.filter((item) => item.category === filter);

      initGlimpsesSwiper(filteredData, true);
    });

    // Hover effects
    btn.addEventListener("mouseenter", () => {
      if (!btn.classList.contains("active")) {
        btn.style.transform = "translateY(-2px)";
        btn.style.transition = "transform 200ms ease";
      }
    });

    btn.addEventListener("mouseleave", () => {
      if (!btn.classList.contains("active")) {
        btn.style.transform = "translateY(0)";
      }
    });
  });
}

// === MAIN INITIALIZATION ===
document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 Starting component loading...");

  try {
    const [navbarLoaded, footerLoaded] = await Promise.allSettled([
      loadPartial("navbar", "navbar.html"),
      loadPartial("footer", "footer.html"),
    ]);

    if (navbarLoaded.status === "rejected") {
      console.error("❌ Navbar failed to load:", navbarLoaded.reason);
    }
    if (footerLoaded.status === "rejected") {
      console.error("❌ Footer failed to load:", footerLoaded.reason);
    }

    setTimeout(() => {
      // Render all slides
      Object.values(sliderConfigs).forEach((config) => {
        if (renderSlides(config)) {
          setFallbackImages();
        }
      });

      // Initialize sliders lazily
      Object.entries(sliderConfigs).forEach(([key, config]) => {
        if (key !== "glimpses") {
          // Special handling for glimpses
          lazyInitSwiper(config, key);
        }
      });

      // Initialize gallery tabs
      initializeGalleryTabs();

      // Service card click handler
      document.addEventListener("click", (e) => {
        const arrow = e.target.closest(".arrow-icon");
        if (arrow?.dataset?.link) {
          window.location.href = arrow.dataset.link;
        }
      });

      console.log("🎯 All components initialized");
    }, 100);
  } catch (error) {
    console.error("❌ Critical error during component loading:", error);
  }
});

// Enhanced CSS animations
const animationStyles = `
  .glimpses-tab {
    position: relative;
    overflow: hidden;
  }
  
  .glimpses-tab::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 400ms ease;
  }
  
  .glimpses-tab:hover::before {
    left: 100%;
  }
  
  .swiper-slide {
    transition: transform 300ms ease, opacity 300ms ease;
  }
  
  .swiper-slide:hover {
    transform: translateY(-5px);
  }
  
  .glimpse-card {
    transition: transform 400ms ease, box-shadow 400ms ease;
  }
  
  .glimpse-card:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
