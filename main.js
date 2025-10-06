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
    title: "Day Pass",
    description: "Pay-per-use passes on a daily basis.",
    image: "images/Services/day-pass.webp",
    link: "/services.html#day-pass",
  },
  {
    id: 2,
    title: "Dedicated Desk",
    description: "A personal desk reserved exclusively for you.",
    image: "images/Services/dedicated-desk.webp",
    link: "/services.html#dedicated-desk",
  },
  {
    id: 3,
    title: "Managed / Serviced Office",
    description: "Private, fully equipped office spaces.",
    image: "images/Services/managed-office.webp",
    link: "/services.html#managed-office",
  },
  {
    id: 4,
    title: "Meeting Rooms",
    description: "Reserved spaces designed for meetings.",
    image: "images/Services/meeting-rooms.webp",
    link: "/services.html#meeting-rooms",
  },
  {
    id: 5,
    title: "Community",
    description: "The social aspect of co-working.",
    image: "images/Services/community.webp",
    link: "/services.html#community",
  },
  {
    id: 6,
    title: "Shared Workspace",
    description: "Office spaces shared by multiple individuals and companies.",
    image: "images/Services/shared-workspace.webp",
    link: "/services.html#shared-workspace",
  },
];
const uspsData = [
  {
    id: 1,
    title: "Centrally Located",
    subtext: "Well Connected, Centrally Located Hub",
    image: "images/USP/usp1.webp",
    link: "/what-sets-us-apart.html#centrally-located",
  },
  {
    id: 2,
    title: "Open to Curation",
    subtext: "Your Space, Your Design, Our Execution",
    image: "images/USP/usp2.webp",
    link: "/what-sets-us-apart.html#open-to-curation",
  },
  {
    id: 3,
    title: "Experiential Integrated Workspace",
    subtext: "Explore the Fully Integrated Workspace",
    image: "images/USP/usp3.webp",
    link: "/what-sets-us-apart.html#experiential-integrated-workspace",
  },
  {
    id: 4,
    title: "Guest Retreat",
    subtext: "One of its kind workspace with a BnB in Dehradun",
    image: "images/USP/usp4.webp",
    link: "/what-sets-us-apart.html#guest-retreat",
  },
  {
    id: 5,
    title: "Tailored Dine-In Options",
    subtext:
      "To cater for those hunger pangs, we have a full-fledged Cafeteria",
    image: "images/USP/usp5.webp",
    link: "/what-sets-us-apart.html#tailored-dine-in-options",
  },
  {
    id: 6,
    title: "Rooftop Hobnobbing Space",
    subtext: "Don’t look far for your Get-togethers",
    image: "images/USP/usp6.webp",
    link: "/what-sets-us-apart.html#rooftop-hobnobbing-space",
  },
];
const glimpsesData = [
  // Workspace (6 images)
  {
    id: 1,
    image: "/images/Gallery/Gallery1-workspace.webp",
    alt: "Community workspace with people collaborating",
    category: "workspace",
  },
  {
    id: 2,
    image: "/images/Gallery/Gallery2-workspace.webp",
    alt: "Modern bedroom workspace",
    category: "workspace",
  },
  {
    id: 3,
    image: "/images/Gallery/Gallery3-workspace.webp",
    alt: "Professional meeting room",
    category: "workspace",
  },
  {
    id: 4,
    image: "/images/Gallery/Gallery4-workspace.webp",
    alt: "Modern bedroom workspace",
    category: "workspace",
  },
  {
    id: 5,
    image: "/images/Gallery/Gallery5-workspace.webp",
    alt: "Community workspace with people collaborating",
    category: "workspace",
  },
  {
    id: 6,
    image: "/images/Gallery/Gallery6-workspace.webp",
    alt: "Professional meeting room",
    category: "workspace",
  },

  // Party (6 images)
  {
    id: 7,
    image: "/images/Gallery/Gallery1-party-area.webp",
    alt: "Creative workspace with modern design",
    category: "party",
  },
  {
    id: 8,
    image: "/images/Gallery/Gallery2-party-area.webp",
    alt: "Comfortable lounge area",
    category: "party",
  },
  {
    id: 9,
    image: "/images/Gallery/Gallery3-party-area.webp",
    alt: "Creative workspace with modern design",
    category: "party",
  },
  {
    id: 10,
    image: "/images/Gallery/Gallery4-party-area.webp",
    alt: "Comfortable lounge area",
    category: "party",
  },
  {
    id: 11,
    image: "/images/Gallery/Gallery5-party-area.webp",
    alt: "Creative workspace with modern design",
    category: "party",
  },
  {
    id: 12,
    image: "/images/Gallery/Gallery6-party-area.webp",
    alt: "Comfortable lounge area",
    category: "party",
  },

  // BnB (6 images)
  {
    id: 13,
    image: "/images/Gallery/Gallery1-bnb.webp",
    alt: "Comfortable lounge area",
    category: "bnb",
  },
  {
    id: 14,
    image: "/images/Gallery/Gallery2-bnb.webp",
    alt: "Comfortable lounge area",
    category: "bnb",
  },
  {
    id: 15,
    image: "/images/Gallery/Gallery3-bnb.webp",
    alt: "Comfortable lounge area",
    category: "bnb",
  },
  {
    id: 16,
    image: "/images/Gallery/Gallery4-bnb.webp",
    alt: "Comfortable lounge area",
    category: "bnb",
  },
  {
    id: 17,
    image: "/images/Gallery/Gallery5-bnb.webp",
    alt: "Comfortable lounge area",
    category: "bnb",
  },
  {
    id: 18,
    image: "/images/Gallery/Gallery6-bnb.webp",
    alt: "Comfortable lounge area",
    category: "bnb",
  },

  // Rooftop (6 images)
  {
    id: 19,
    image: "/images/Gallery/Gallery1-rooftop.webp",
    alt: "Event space setup",
    category: "rooftop",
  },
  {
    id: 20,
    image: "/images/Gallery/Gallery2-rooftop.webp",
    alt: "Event space setup",
    category: "rooftop",
  },
  {
    id: 21,
    image: "/images/Gallery/Gallery3-rooftop.webp",
    alt: "Event space setup",
    category: "rooftop",
  },
  {
    id: 22,
    image: "/images/Gallery/Gallery4-rooftop.webp",
    alt: "Event space setup",
    category: "rooftop",
  },
  {
    id: 23,
    image: "/images/Gallery/Gallery5-rooftop.webp",
    alt: "Event space setup",
    category: "rooftop",
  },
  {
    id: 24,
    image: "/images/Gallery/Gallery6-rooftop.webp",
    alt: "Event space setup",
    category: "rooftop",
  },
];

const testimonialsData = [
  {
    id: 1,
    name: "Macula Consultants ",
    rating: 5,
    feedback:
      "Evaspaces  provides a seamless work environment with everything I need to focus and grow my projects.",
    avatar: "images/Clients/Macula.webp",
  },

  {
    id: 3,
    name: "Offbeat Pixels ",
    rating: 4,
    feedback:
      "A great space for meetings, brainstorming, and networking with other professionals.",
    avatar: "images/Clients/OP.webp",
  },
  {
    id: 5,
    name: "Ayush Chouhan ",
    rating: 4,
    feedback:
      "From the café to the workstations, every aspect of Evaspaces  makes working here enjoyable.",
    avatar:
      "https://imgs.search.brave.com/5k3wN1_sfVQBGKCcNtEKgYA18OAG0A6UFyS2TYqbnmA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTkx/NDA3MTExL3Bob3Rv/L2luZGlhbi1idXNp/bmVzc21hbi1zdGFu/ZGluZy1vbi1vZmZp/Y2Utc3RlcHMuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTR1/V0hiZGExZVZtVUFi/M2ZNTmxyX3BuMjVo/Q1ZHc1FjT2pXZVo3/RENFbFU9",
  },
  {
    id: 6,
    name: "Rohit Panwar",
    rating: 5,
    feedback:
      "The environment is professional yet welcoming - perfect for managing my team and hosting clients.",
    avatar:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    name: "Aditya Raj",
    rating: 4,
    feedback:
      "Every corner of Evaspaces  is thoughtfully designed, making it an inspiring place to work.",
    avatar:
      "https://media.istockphoto.com/id/1216426542/photo/portrait-of-happy-man-at-white-background-stock-photo.jpg?b=1&s=612x612&w=0&k=20&c=dE3NlvctnoSlmxBHwh5zFXeKZJXe1wnCSw9apjgtY_o=",
  },
  {
    id: 8,
    name: "Mohit Kumar",
    rating: 5,
    feedback:
      "From meeting rooms to breakout areas, everything is well-maintained and professional.",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
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
  usp: {
    containerSelector: ".usps-swiper",
    containerId: "usps-container",
    data: uspsData,
    slideTemplate: (usps) => `
      <div class="swiper-slide bg-[url(images/cardBg.webp)] bg-right bg-cover bg-no-repeat border border-gray-300 rounded-2xl overflow-hidden p-4 relative group card-animation">
        <div class="p-4  h-28 text-left">
         <span class="inline-block bg-yellow-500 text-white text-xs md:text-sm font-semibold px-3 py-2 rounded-full mb-3"> ${usps.title}</span>
           <p class="text-gray-600 "> ${usps.subtext} </p>
            </div>
       <div class="relative h-full">
            <img loading="lazy" src="${usps.image}" alt="${usps.title}" class="w-full h-72 object-cover rounded-t-2xl group-hover:scale-105 transition duration-500"  onerror="this.src='https://img.freepik.com/free-vector/404-error-with-man-cones_24908-77788.jpg?t=st=1758540375~exp=1758543975~hmac=7ace41be601e9463efc9ea66207b7b8d903a0bcd0b3ea583fe508bb5e8ce3e82&w=1480'">
          </div> 
            <a href="${usps.link}" class=" absolute bottom-4 right-4 bg-yellow-500 cursor-pointer text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md group-hover:scale-110 transition"> ➝ </a>
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
        640: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      grabCursor: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    controls: { prev: "usp-prev", next: "usp-next" },
  },
  services: {
    containerSelector: ".services-swiper",
    containerId: "slides-container",
    data: servicesData,
    slideTemplate: (service) => `
      <div class="swiper-slide">
        <div class="relative rounded-2xl overflow-hidden h-full group ">
          <div class="relative">
            <img loading="lazy" src="${service.image}" alt="${service.title}" class="w-full h-full object-cover"  onerror="this.src='https://img.freepik.com/free-vector/404-error-with-man-cones_24908-77788.jpg?t=st=1758540375~exp=1758543975~hmac=7ace41be601e9463efc9ea66207b7b8d903a0bcd0b3ea583fe508bb5e8ce3e82&w=1480'">
          </div>
          <a href="${service.link}" class="arrow-icon cursor-pointer absolute top-0 right-0 bg-yellow-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-transform duration-200 group-hover:text-black">
            →
          </a>
          <div class="absolute left-4 bottom-4 right-4">
            <div class="content-overlay bg-white/90 backdrop-blur-sm rounded-2xl p-4">
              <h3 class="text-xl font-bold text-gray-900  line-clamp-1">${service.title}</h3>
              <p class="text-gray-700 text-sm leading-relaxed line-clamp-2">${service.description}</p>
            </div>
          </div>
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
        640: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      speed: 600,
      grabCursor: true,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    controls: { prev: "services-prev", next: "services-next" },
  },
  glimpses: {
    containerSelector: ".glimpses-swiper",
    containerId: "glimpses-container",
    data: glimpsesData,
    slideTemplate: (glimpse) => `
    <div class="swiper-slide w-[24rem]">
  <div class="glimpse-card aspect-[3/4] rounded-2xl overflow-hidden">
    <img loading="eager" src="${glimpse.image}" 
         alt="${glimpse.alt}" 
         class="w-full h-full object-cover"  onerror="this.src='https://img.freepik.com/free-vector/404-error-with-man-cones_24908-77788.jpg?t=st=1758540375~exp=1758543975~hmac=7ace41be601e9463efc9ea66207b7b8d903a0bcd0b3ea583fe508bb5e8ce3e82&w=1480'"  />
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
      <div class="bg-green-50 rounded-xl p-6   transition h-full flex flex-col">
        <div class="flex items-center mb-4">
          <img loading="lazy" src="${t.avatar}" alt="${
      t.name
    }" class="w-12 h-12 object-cover border border-white shadow-md rounded-full mr-3"   />
          <div>
            <h3 class="text-lg font-semibold text-gray-800">${t.name}</h3> 
          </div>
        </div>
        <div class="flex mb-2 text-yellow-500">
          ${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}
        </div>
        <p class="text-gray-600 text-sm leading-relaxed h-20">
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
        768: { slidesPerView: 3 },
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
        <img loading="lazy" src="${c.logo}" alt="${c.alt}" class="max-h-16 object-contain "   />
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
      pagination: false,
    },
  },
  coworking: {
    containerSelector: ".coworking-swiper",
    containerId: "coworking-container",
    data: coworkingData,
    slideTemplate: (c) => `
    <div class="swiper-slide">
      <div class="rounded-xl overflow-hidden ">
        <img loading="lazy" src="${c.image}" 
             alt="${c.alt}" 
             class="w-full h-96 object-contain aspect-square" 
            
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
        <img loading="lazy" src="${c.image}" 
             alt="${c.alt}" 
             class="w-full h-96 object-contain aspect-square" 
             
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
        <img loading="lazy" src="${c.image}" 
             alt="${c.alt}" 
             class="w-full h-96 object-contain aspect-square" 
        
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

function contactFormSubmition() {
  const form =
    document.querySelector("form") ||
    document.querySelector("form[action='#']");

  if (!form) return;
  if (form.hasAttribute("data-handler-attached")) return;
  form.setAttribute("data-handler-attached", "true");

  const responseMessage = document.createElement("div");
  responseMessage.className = "form-response mt-4";
  form.appendChild(responseMessage);

  let isSubmitting = false;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (isSubmitting) return;

    const submitButton = form.querySelector('button[type="submit"]');
    isSubmitting = true;
    responseMessage.textContent = "";
    responseMessage.className = "form-response mt-4";

    if (submitButton) {
      submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Submitting...
      `;
      submitButton.disabled = true;
    }

    // Get form data matching your HTML form structure
    const formData = new FormData(form);
    const data = {
      "Company Name": formData.get("company") || "",
      Name: formData.get("name") || "",
      Email: formData.get("email") || "",
      Phone: formData.get("phone") || "",
      Request: formData.get("request") || "", // Tour / Info
      Lease: formData.get("lease") || "", // Furnished / Unfurnished
      "Desired Area": formData.get("area") || "", // Dehradun / Delhi / Other
      "Newsletter-Email":
        formData.get("newsletter_email") === "on" ? "Yes" : "No",
      "Newsletter-Personal":
        formData.get("newsletter_personal") === "on" ? "Yes" : "No",
      SubmittedAt: new Date().toISOString(),
    };

    try {
      const webAppUrl = "https://evaspace.compassddun.workers.dev/";

      const response = await fetch(webAppUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const text = await response.text();

      if (response.ok && text.includes("success")) {
        form.reset();
        responseMessage.innerHTML = `
          <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>Success!</strong> Your inquiry has been submitted successfully. We'll contact you soon.
          </div>
        `;

        // Scroll to message
        responseMessage.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.error("Error:", error);
      responseMessage.innerHTML = `
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error!</strong> There was a problem submitting your inquiry. Please try again.
        </div>
      `;
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Make an Inquiry";
      }
      isSubmitting = false;
    }
  });

  // Enhanced validation for your specific fields
  const validateForm = () => {
    let isValid = true;

    // Required fields validation
    const requiredFields = [
      { name: "company", label: "Company Name" },
      { name: "name", label: "Your Name" },
      { name: "phone", label: "Phone Number" },
      { name: "email", label: "Email Address" },
      { name: "privacy", label: "Privacy Agreement", type: "checkbox" },
    ];

    requiredFields.forEach((field) => {
      const input = form.querySelector(`[name="${field.name}"]`);
      if (!input) return;

      let hasError = false;

      if (field.type === "checkbox") {
        hasError = !input.checked;
      } else {
        hasError = !input.value.trim();
      }

      if (hasError) {
        input.classList.add("border-red-500");
        isValid = false;
      } else {
        input.classList.remove("border-red-500");
      }
    });

    // Email validation
    const emailInput = form.querySelector('[name="email"]');
    if (emailInput && emailInput.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        emailInput.classList.add("border-red-500");
        isValid = false;
      }
    }

    // Phone validation
    const phoneInput = form.querySelector('[name="phone"]');
    if (phoneInput && phoneInput.value) {
      const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
      if (!phoneRegex.test(phoneInput.value)) {
        phoneInput.classList.add("border-red-500");
        isValid = false;
      }
    }

    return isValid;
  };

  // Real-time validation
  form.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("blur", validateForm);
    input.addEventListener("input", function () {
      if (this.classList.contains("border-red-500")) {
        validateForm();
      }
    });
  });

  // Validate on submit
  form.addEventListener("submit", function (e) {
    if (!validateForm()) {
      e.preventDefault();
      responseMessage.innerHTML = `
        <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Please fill in all required fields correctly.
        </div>
      `;
      responseMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
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
      contactFormSubmition();
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
