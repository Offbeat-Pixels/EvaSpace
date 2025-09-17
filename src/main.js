import "./output.css";
// Import Swiper and required modules from NPM
import { Swiper } from "swiper";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Global state to prevent multiple initializations
let isInitialized = false;
let servicesSwiper = null;
let glimpsesSwiper = null;

// Your existing data
const servicesData = [
  {
    id: 1,
    title: "Co-Working Spaces",
    description:
      "Modern and adaptive workspace solutions designed for collaboration and productivity.",
    image: "/images/Services/service1.png",
    link: "/services/coworking",
  },
  {
    id: 2,
    title: "Community & Networking",
    description:
      "Grow your connections with like-minded professionals through curated events.",
    image: "/images/Services/service2.png",
    link: "/services/community",
  },
  {
    id: 3,
    title: "Private Offices",
    description:
      "Flexible and secure private office spaces with premium amenities.",
    image: "/images/Services/service3.png",
    link: "/services/private-offices",
  },
  {
    id: 4,
    title: "Meeting Rooms",
    description:
      "Professional meeting spaces equipped with modern technology for presentations.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    link: "/services/meeting-rooms",
  },
  {
    id: 5,
    title: "Event Spaces",
    description:
      "Versatile venues for workshops, seminars, and corporate events.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    link: "/services/events",
  },
];

const glimpsesData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=500&fit=crop",
    alt: "Community workspace with people collaborating",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop",
    alt: "Modern bedroom workspace",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop",
    alt: "Professional meeting room",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=500&fit=crop",
    alt: "Creative workspace with modern design",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=500&fit=crop",
    alt: "Comfortable lounge area",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop",
    alt: "Event space setup",
  },
];

// Services slider functions
function createServiceSlide(service) {
  return `
    <div class="swiper-slide">
      <div class="service-card relative rounded-2xl overflow-hidden h-80 cursor-pointer group bg-white shadow-lg"
           onclick="handleServiceClick('${service.link}')">
        <div class="relative">
          <img src='${service.image}' alt="${service.title}" 
               class="service-image w-full h-80 object-cover" loading="lazy">
        </div>
        <div class="arrow-icon absolute top-4 right-4 bg-yellow-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-transform duration-200 group-hover:scale-110">
          ➝
        </div>
        <div class="absolute left-4 bottom-4 right-4">
          <div class="content-overlay bg-white/90 backdrop-blur-sm rounded-2xl p-4">
            <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
              ${service.title}
            </h3>
            <p class="text-gray-700 text-sm leading-relaxed line-clamp-2">
              ${service.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderServices(data) {
  const container = document.getElementById("slides-container");
  if (!container) {
    console.error("Services container not found");
    return;
  }
  console.log("Rendering services data:", data);
  // Clear existing content first
  container.innerHTML = "";
  container.innerHTML = data.map(createServiceSlide).join("");
}

function initServicesSlider() {
  // Destroy existing swiper if it exists
  if (servicesSwiper) {
    servicesSwiper.destroy(true, true);
    servicesSwiper = null;
  }

  // Wait a bit for DOM to be ready
  setTimeout(() => {
    servicesSwiper = new Swiper(".services-swiper", {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        640: { slidesPerView: 1.5, spaceBetween: 24 },
        768: { slidesPerView: 2, spaceBetween: 32 },
        1024: { slidesPerView: 2.5, spaceBetween: 32 },
        1280: { slidesPerView: 2.5, spaceBetween: 40 },
      },
      speed: 600,
      grabCursor: true,
      a11y: {
        prevSlideMessage: "Previous service",
        nextSlideMessage: "Next service",
      },
    });
    console.log("Services swiper initialized:", servicesSwiper);
  }, 100);

  return servicesSwiper;
}

// Glimpses slider functions
function createGlimpseSlide(glimpse) {
  return `
    <div class="swiper-slide">
      <div class="glimpse-card w-80 h-96 rounded-2xl overflow-hidden shadow-lg">
        <img src="${glimpse.image}" alt="${glimpse.alt}" 
             class="w-full h-full object-cover" loading="lazy">
      </div>
    </div>
  `;
}

function renderGlimpses(data) {
  const container = document.getElementById("glimpses-container");
  if (!container) {
    console.error("Glimpses container not found");
    return;
  }
  console.log("Rendering glimpses data:", data);
  container.innerHTML = data.map(createGlimpseSlide).join("");
}

function initGlimpsesSlider() {
  // Destroy existing swiper if it exists
  if (glimpsesSwiper) {
    glimpsesSwiper.destroy(true, true);
    glimpsesSwiper = null;
  }

  console.log("Initializing glimpses swiper...");

  setTimeout(() => {
    glimpsesSwiper = new Swiper(".glimpses-swiper", {
      modules: [Autoplay, EffectCoverflow],
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      },
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 800,
      breakpoints: {
        320: { coverflowEffect: { rotate: 15, depth: 150 } },
        640: { coverflowEffect: { rotate: 20, depth: 200 } },
        1024: { coverflowEffect: { rotate: 25, depth: 250 } },
      },
      a11y: {
        prevSlideMessage: "Previous glimpse",
        nextSlideMessage: "Next glimpse",
      },
    });
    console.log("Glimpses swiper initialized:", glimpsesSwiper);
  }, 100);

  return glimpsesSwiper;
}

// Handle service clicks
window.handleServiceClick = function (link) {
  console.log("Service clicked:", link);
  // Add your navigation logic here
};

// Component loading logic
const componentCache = new Map();

const generatePaths = (componentName) => [`./components/${componentName}.html`];

const loadComponent = async (id, componentName, callback) => {
  if (componentCache.has(componentName)) {
    injectComponent(id, componentCache.get(componentName), callback);
    return;
  }

  const paths = generatePaths(componentName);

  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        const html = await response.text();
        componentCache.set(componentName, html);
        injectComponent(id, html, callback);
        return;
      }
    } catch (error) {
      continue;
    }
  }

  console.error(`Failed to load ${componentName}`);
};

const injectComponent = (id, html, callback) => {
  const container = document.getElementById(id);
  if (!container) return console.error(`Container #${id} not found`);

  container.innerHTML = html;
  callback && requestAnimationFrame(callback);
};

const initComponents = async () => {
  try {
    await Promise.all([
      loadComponent("navbar", "navbar"),
      loadComponent("footer", "footer"),
    ]);
  } catch (error) {
    console.error("Failed to load components:", error);
  }
};

// Clean up function for HMR
function cleanup() {
  if (servicesSwiper) {
    servicesSwiper.destroy(true, true);
    servicesSwiper = null;
  }
  if (glimpsesSwiper) {
    glimpsesSwiper.destroy(true, true);
    glimpsesSwiper = null;
  }

  // Remove event listeners
  const servicesPrev = document.getElementById("custom-prev");
  const servicesNext = document.getElementById("custom-next");
  const glimpsesPrev = document.getElementById("glimpses-prev");
  const glimpsesNext = document.getElementById("glimpses-next");

  [servicesPrev, servicesNext, glimpsesPrev, glimpsesNext].forEach((btn) => {
    if (btn) {
      btn.replaceWith(btn.cloneNode(true));
    }
  });

  isInitialized = false;
}

// Initialize both sliders
function initializeApp() {
  // Prevent multiple initialization
  if (isInitialized) {
    console.warn("App already initialized, skipping...");
    return;
  }

  console.log("Initializing app...");

  // Render slides first
  renderServices(servicesData);
  renderGlimpses(glimpsesData);

  // Initialize sliders with delay
  setTimeout(() => {
    const services = initServicesSlider();
    const glimpses = initGlimpsesSlider();

    // Services navigation
    setTimeout(() => {
      const servicesPrev = document.getElementById("custom-prev");
      const servicesNext = document.getElementById("custom-next");

      if (servicesPrev && servicesNext && servicesSwiper) {
        servicesPrev.addEventListener("click", () =>
          servicesSwiper.slidePrev()
        );
        servicesNext.addEventListener("click", () =>
          servicesSwiper.slideNext()
        );
      }

      // Glimpses navigation
      const glimpsesPrev = document.getElementById("glimpses-prev");
      const glimpsesNext = document.getElementById("glimpses-next");

      if (glimpsesPrev && glimpsesNext && glimpsesSwiper) {
        glimpsesPrev.addEventListener("click", () =>
          glimpsesSwiper.slidePrev()
        );
        glimpsesNext.addEventListener("click", () =>
          glimpsesSwiper.slideNext()
        );
      }

      // Hover controls for services
      const servicesContainer = document.querySelector(".services-swiper");
      if (servicesContainer && servicesSwiper) {
        servicesContainer.addEventListener("mouseenter", () =>
          servicesSwiper.autoplay.stop()
        );
        servicesContainer.addEventListener("mouseleave", () =>
          servicesSwiper.autoplay.start()
        );
      }

      // Hover controls for glimpses
      const glimpsesContainer = document.querySelector(".glimpses-swiper");
      if (glimpsesContainer && glimpsesSwiper) {
        glimpsesContainer.addEventListener("mouseenter", () =>
          glimpsesSwiper.autoplay.stop()
        );
        glimpsesContainer.addEventListener("mouseleave", () =>
          glimpsesSwiper.autoplay.start()
        );
      }
    }, 200);
  }, 100);

  isInitialized = true;
  console.log("App initialized successfully");
}

async function safeInitializeApp() {
  if (isInitialized) {
    console.warn("App already initialized, skipping...");
    return;
  }

  try {
    // Load components first
    await initComponents();

    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
      initializeApp();
    }, 200);
  } catch (error) {
    console.error("Failed to initialize app:", error);
    isInitialized = false; // Reset flag on error
  }
}

// Handle page visibility change (helpful for HMR)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cleanup();
  } else if (!isInitialized) {
    safeInitializeApp();
  }
});

// HMR cleanup for Vite
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    cleanup();
  });
}

// Initialize based on document state
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", safeInitializeApp);
} else {
  // DOM is already loaded
  safeInitializeApp();
}
