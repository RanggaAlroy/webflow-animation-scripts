<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.4/swiper-bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/Flip.min.js"></script>
<script src="https://unpkg.com/@barba/core"></script>

let mySlider;
function createSwiper() {
  mySlider = new Swiper(".swiper", {
    direction: "horizontal",
    slidesPerView: 1,
    keyboard: true,
    freeMode: true,
    centeredSlides: true,
    mousewheel: true,
    breakpoints: {
      480: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      }
    },
    speed: 300
  });
  mySlider.on("progress", function (e) {
    $(".progress-bar_fill").css("width", e.progress * 100 + "%");
  });
}
createSwiper();

function resetWebflow(data) {
  let parser = new DOMParser();
  let dom = parser.parseFromString(data.next.html, "text/html");
  let webflowPageId = $(dom).find("html").attr("data-wf-page");
  $("html").attr("data-wf-page", webflowPageId);
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
}

function makeItemActive() {
  let cmsPageName = $(".cms-page").find(".item-name").text();
  $(".w-dyn-item").each(function (index) {
    if ($(this).find(".item-name").text() === cmsPageName) {
      $(this).addClass("active-flip-item");
    }
  });
}

function flip(outgoing, incoming) {
  let state = Flip.getState(outgoing.find(".visual"));
  incoming.find(".visual").remove();
  outgoing.find(".visual").appendTo(incoming);
  Flip.from(state, { duration: 0.5, ease: "power1.inOut" });
}

barba.hooks.after((data) => {
  $(data.next.container).removeClass("fixed");
  $(".active-flip-item").removeClass("active-flip-item");
  $(window).scrollTop(0);
  resetWebflow(data);
});

barba.init({
  preventRunning: true,
  transitions: [
    {
      sync: true,
      from: { namespace: ["grid-page"] },
      to: { namespace: ["cms-page"] },
      enter(data) {
        makeItemActive();
        $(data.next.container).addClass("fixed");
        flip($(".active-flip-item"), $(".cms-page_img-wrap"));
        return gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
      }
    },
    {
      sync: true,
      from: { namespace: ["cms-page"] },
      to: { namespace: ["grid-page"] },
      enter(data) {
        makeItemActive();
        createSwiper();
        mySlider.slideTo($(".active-flip-item").index(), 0);
        $(data.next.container).addClass("fixed");
        flip($(".cms-page_img-wrap"), $(".active-flip-item .visual_wrap"));
        return gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
      }
    }
  ]
});