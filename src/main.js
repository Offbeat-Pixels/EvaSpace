import "./output.css";
import { Swiper } from "swiper";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// ✅ Improved loading with proper error handling and sequencing
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

    // ✅ Execute any scripts in the loaded content
    const scripts = container.querySelectorAll("script");
    scripts.forEach((script) => {
      const newScript = document.createElement("script");
      newScript.textContent = script.textContent;
      document.head.appendChild(newScript);
    });

    console.log(`✅ Successfully loaded: ${url}`);
    return true;
  } catch (err) {
    console.error(`❌ Error loading ${url}:`, err);
    return false;
  }
}

// ✅ Load components in parallel with proper error handling
document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 Starting component loading...");

  try {
    // Load navbar and footer in parallel since they're independent
    const [navbarLoaded, footerLoaded] = await Promise.allSettled([
      loadPartial("navbar", "/src/components/navbar.html"),
      loadPartial("footer", "/src/components/footer.html"),
    ]);

    if (navbarLoaded.status === "rejected") {
      console.error("❌ Navbar failed to load:", navbarLoaded.reason);
    }

    if (footerLoaded.status === "rejected") {
      console.error("❌ Footer failed to load:", footerLoaded.reason);
    }

    // ✅ Initialize sliders after a brief delay to ensure DOM is ready
    setTimeout(initializeSliders, 100);
  } catch (error) {
    console.error("❌ Critical error during component loading:", error);
  }
});

// === DATA ===
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
  { id: 1, logo: "/public/images/clients/talo.png", alt: " talo a client of Eva space coworking space in dehradun " },
  { id: 2, logo: "/public/images/clients/solid-state.png", alt: " solid state a client of Eva space coworking space in dehradun" },
  { id: 3, logo: "/public/images/clients/noted.png", alt: "noted a client of Eva space coworking space in dehradun" },
  { id: 4, logo: "/public/images/clients/goan.png", alt: "goan a client of Eva space coworking space in dehradun" },
  { id: 5, logo: "/public/images/clients/mowi.png", alt: "mowi a client of Eva space coworking space in dehradun" },
  { id: 6, logo: "/public/images/clients/talo.png", alt: " talo a client of Eva space coworking space in dehradun " },
  { id: 7, logo: "/public/images/clients/solid-state.png", alt: " solid state a client of Eva space coworking space in dehradun" },
  { id: 8, logo: "/public/images/clients/noted.png", alt: "noted a client of Eva space coworking space in dehradun" },
  { id: 9, logo: "/public/images/clients/goan.png", alt: "goan a client of Eva space coworking space in dehradun" },
  { id: 10, logo: "/public/images/clients/mowi.png", alt: "mowi a client of Eva space coworking space in dehradun" },
];
const coworkingData = [
  {
    id: 1,
    image: "/public/images/services/coworking/space1.png",
    alt: "Spacious coworking office view",
  },
  {
    id: 2,
    image: "/public/images/services/coworking/space2.png",
    alt: "Team working in coworking office",
  },
  {
    id: 3,
    image: "/public/images/services/coworking/space3.png",
    alt: "Private cabin inside coworking office",
  },
];
const bnbData = [
  {
    id: 1,
    image: "/public/images/services/bnb/bnb1.png",
    alt: "Spacious bnb office view",
  },
  {
    id: 2,
    image: "/public/images/services/bnb/bnb2.png",
    alt: "Team working in bnb office",
  },
  {
    id: 3,
    image: "/public/images/services/bnb/bnb3.png",
    alt: "Private cabin inside bnb office",
  },
  {
    id: 4,
    image: "/public/images/services/bnb/bnb1.png",
    alt: "Spacious bnb office view",
  },
  {
    id: 5,
    image: "/public/images/services/bnb/bnb2.png",
    alt: "Team working in bnb office",
  },
  {
    id: 6,
    image: "/public/images/services/bnb/bnb3.png",
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
            <img src="${service.image}" alt="${service.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'">
          </div>
          <div data-link="${service.link}" class="arrow-icon cursor-pointer absolute top-4 right-4 bg-yellow-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-transform duration-200 group-hover:scale-110">
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
        640: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2.5 },
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
         class="w-full h-full object-cover" loading="lazy"  onerror="this.src='https://via.placeholder.com/320x384?text=Image+Not+Found'"  />
  </div>
</div>

    `,
    options: {
      modules: [Autoplay, EffectCoverflow],
      effect: "coverflow",
      slidesPerView: 1,
      spaceBetween: 50,
      grabCursor: true,
      centeredSlides: true,
      loop: true,

      slidesPerView: "auto",
      coverflowEffect: { rotate: 20, depth: 200, slideShadows: false },
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
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
      modules: [Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
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
      modules: [Pagination, Autoplay],
      slidesPerView: 2,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true,
      //   dynamicBullets: true,
      // },
      breakpoints: {
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      },
      speed: 600,
      grabCursor: true,
    },
  },
  coworking:{
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
             onerror="this.src='https://via.placeholder.com/600x400?text=Image+Not+Found'"/>
      </div>
    </div>
  `,
  options: {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: "#coworking-next",
      prevEl: "#coworking-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3},
    },
    speed: 600,
    grabCursor: true,
  },
},
  bnb:{
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
             onerror="this.src='https://via.placeholder.com/600x400?text=Image+Not+Found'"/>
      </div>
    </div>
  `,
  options: {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: "#bnb-next",
      prevEl: "#bnb-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3},
    },
    speed: 600,
    grabCursor: true,
  },
},
};

// ✅ Separate initialization function
function initializeSliders() {
  console.log("🎯 Initializing sliders...");

  Object.values(sliderConfigs).forEach((config) => {
    const container = document.getElementById(config.containerId);
    if (!container) {
      console.warn(`⚠️ Slider container "${config.containerId}" not found`);
      return;
    }

    container.innerHTML = config.data.map(config.slideTemplate).join("");
    const swiper = new Swiper(config.containerSelector, config.options);

    if (config.controls?.prev && config.controls?.next) {
      const prevBtn = document.getElementById(config.controls.prev);
      const nextBtn = document.getElementById(config.controls.next);

      prevBtn?.addEventListener("click", () => swiper.slidePrev());
      nextBtn?.addEventListener("click", () => swiper.slideNext());
    }

    console.log(`✅ Slider "${config.containerId}" initialized`);
  });

  // ✅ Event delegation for service card clicks
  document.addEventListener("click", (e) => {
    const arrow = e.target.closest(".arrow-icon");
    if (arrow?.dataset?.link) {
      window.location.href = arrow.dataset.link;
    }
  });
}
setTimeout(initializeSliders, 100);
