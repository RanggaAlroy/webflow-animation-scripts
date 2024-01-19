const sliderContainers = document.querySelectorAll(".slider-container");

sliderContainers.forEach((slider, index) => {
  const swiperView = new Swiper(slider.querySelector(".swiper.is-slider"), {
    direction: "horizontal",
    loop: true,
    slidesPerView: "auto",
    keyboard: true,
    freeMode: true,
    mousewheel: {
      sensitivity: 1,
    },
    effect: "creative",
    creativeEffect: {
      next: {
        translate: [0, 0, 0],
        origin: "right top",
        opacity: 0,
        easing: "easeInOutQuad",
      },
      prev: {
        translate: ["-200%", 0, 0],
        easing: "easeInOutQuad",
      },
    },
  });

  const swiperBg = new Swiper(slider.querySelector(".swiper.is-bg-vertical"), {
    direction: "vertical",
    loop: true,
    slidesPerView: "auto",
    keyboard: true,
    freeMode: true,
    mousewheel: {
      sensitivity: 1,
    },
  });
});

const containers = document.querySelectorAll(".is-swiper-container");
const images = document.querySelectorAll(".home-img");

containers.forEach((container) => {
  const allContainers = [...container.children];
  allContainers.forEach((cont, index) => {
    const currentImage = images[index];
    let scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: cont,
        start: `top 250%`,
        end: "bottom 100%",
        scrub: true,
        ease: "linear",
        markers: true,
      },
    });
    scrollTl
      .to(currentImage, {
        y: "0vh",
        x: "0vw",
        scale: 1,
        autoAlpha: 0.3,
        filter: "blur(10px)",
      })
      .to(currentImage, {
        y: "40vh",
        x: "-23vw",
        scale: 2,
        filter: "blur(4px)",
        autoAlpha: 1,
        transformOrigin: "50% 30%",
      })
      .to(currentImage, {
        y: "30vh",
        x: "-40vw",
        scale: 2.5,
        filter: "blur(0px)",
        autoAlpha: 1,
        transformOrigin: "50% 30%",
      })
      .to(currentImage, {
        x: "-120vw",
        opacity: 1,
        ease: "power1.in",
        onComplete: () => {
          gsap.set(currentImage, { autoAlpha: 0, x: 0, y: 0, scale: 1 });
        },
      });
  });
});
