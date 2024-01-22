const images = gsap.utils.toArray('.slide-item')
const imgReverse = Array.from(images).reverse()
const allContainers = document.querySelectorAll('.page-scroll')
const labels = document.querySelectorAll('.label-per-project')

images.forEach((item, index) => {
  item.addEventListener('mouseover', () => {
    labels[index].style.display = 'block'
  })
  item.addEventListener('mouseout', () => {
    labels[index].style.display = 'none'
  })
})

allContainers.forEach((container, index) => {
  const currentImage = imgReverse[index % imgReverse.length]
  let scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 250%',
      end: 'bottom +=50',
      scrub: 2,
      ease: 'none',
    },
  })

  scrollTl
    .to(currentImage, {
      y: '0vh',
      x: '0vw',
      scale: 1,
      autoAlpha: 0.6,
      filter: 'blur(10px)',
    })
    .to(currentImage, {
      scale: 1.5,
      x: '-10vw',
      autoAlpha: 0.7,
      transformOrigin: '50% 50%',
    })
    .to(currentImage, {
      y: '30vh',
      x: '-35vw',
      scale: 2.5,
      filter: 'blur(4px)',
      autoAlpha: 0.8,
      transformOrigin: '50% 50%',
    })
    .to(currentImage, {
      scale: 4,
      y: '32vh',
      x: '-50vw',
      filter: 'blur(0px)',
      autoAlpha: 1,
      transformOrigin: '50% 50%',
    })
    .to(currentImage, {
      x: '-120vw',
      ease: 'power1.in',
    })
})

function updateTime() {
  const now = new Date()
  const options = {
    timeZone: 'America/Los_Angeles',
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
  }
  const formattedTime = now.toLocaleTimeString('en-US', options)

  document.getElementById('time').textContent = formattedTime
}

updateTime()

setInterval(updateTime, 1000)

function updateMonthYear() {
  const now = new Date()
  const options = { month: 'long', year: 'numeric' }
  const formattedMonthYear = now.toLocaleDateString('en-US', options)

  document.getElementById('currentMonthYear').textContent = formattedMonthYear
}

updateMonthYear()

setInterval(updateMonthYear, 1000)

function resetWebflow(data) {
  let parser = new DOMParser()
  let dom = parser.parseFromString(data.next.html, 'text/html')
  let webflowPageId = $(dom).find('html').attr('data-wf-page')
  $('html').attr('data-wf-page', webflowPageId)
  window.Webflow && window.Webflow.destroy()
  window.Webflow && window.Webflow.ready()
  window.Webflow && window.Webflow.require('ix2').init()
}

let clonedImg = null

function initializeAnimations() {
  document.querySelectorAll('.grid-link').forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault()

      const imgSlide = this.querySelector('.visual-wrap')

      if (imgSlide) {
        const rect = imgSlide.getBoundingClientRect()
        const clonedImg = imgSlide.cloneNode(true)

        const newPage = this.getAttribute('href')

        document.body.appendChild(clonedImg)

        gsap.set(clonedImg, {
          position: 'fixed',
          top: rect.top + 'px',
          left: rect.left + 'px',
          width: rect.width + 'px',
          height: rect.height + 'px',
          zIndex: 9999,
        })
        gsap.to(clonedImg, {
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
        })
        gsap.to(clonedImg, {
          duration: 1,
          width: '91vw',
          height: '91vh',
          ease: 'none',
          onComplete: function () {
            barba.go(newPage)
          },
        })
      }
    })
  })
}

barba.hooks.after((data) => {
  $(data.next.container).removeClass('fixed')
  $('.active-flip-item').removeClass('active-flip-item')
  $(window).scrollTop(0)
  resetWebflow(data)
})
barba.init({
  transitions: [
    {
      name: 'default-transition',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
        })
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
        })
      },
      after() {
        if (clonedImg) {
          document.body.removeChild(clonedImg)
          clonedImg = null
        }
      },
      beforeEnter({ current, next }) {
        initializeAnimations()
      },
    },
  ],
})

initializeAnimations()

const contentItems = document.querySelectorAll('.content-item')
const hoverTrigger = document.querySelectorAll('.hover-trigger')
const brandName = document.querySelectorAll('.brand-name')
const workServices = document.querySelectorAll('.work-services')
const contentHover = document.querySelector('.content-hover-wrapper')
const contentImages = document.querySelectorAll('.hover-content-item')

hoverTrigger.forEach((item, index) => {
  item.addEventListener('mouseover', () => {
    contentHover.style.display = 'flex'
    contentImages[index].style.display = 'block'
    brandName.forEach((brandItem, brandIndex) => {
      if (brandIndex === index) {
        brandItem.children[0].style.width = '19px'
        brandItem.children[1].style.fontStyle = 'italic'
        brandItem.children[1].style.color = '#122280'
      } else {
        brandItem.children[1].style.color = 'rgba(13, 26, 96, 0.25)'
      }
    })

    workServices.forEach((workItem, workIndex) => {
      if (workIndex === index) {
        Array.from(workItem.children).forEach((child) => {
          child.style.fontStyle = 'italic'
          child.style.color = '#122280'
        })
      } else {
        Array.from(workItem.children).forEach((child) => {
          child.style.color = 'rgba(13, 26, 96, 0.25)'
        })
      }
    })

    contentItems.forEach((border, borderIndex) => {
      if (borderIndex !== index) {
        border.style.borderTop = '1px solid rgba(13, 26, 96, 0.25)'
      }
    })
  })

  item.addEventListener('mouseout', () => {
    contentHover.style.display = 'none'
    contentImages[index].style.display = 'none'
    brandName[index].children[0].style.width = '0px'
    brandName[index].children[1].style.fontStyle = 'normal'

    workServices.forEach((workItem) => {
      Array.from(workItem.children).forEach((child) => {
        child.style.fontStyle = 'normal'
        child.style.color = '#162BA0'
      })
    })
    brandName.forEach((brandItem) => {
      brandItem.children[1].style.color = '#162BA0'
    })
    contentItems.forEach((border) => {
      border.style.borderTop = '1px solid #162BA0'
    })
  })
})

window.addEventListener('DOMContentLoaded', (event) => {
  // Split text into spans
  let typeSplit = new SplitType('[text-split]', {
    types: 'words, chars',
    tagName: 'span',
  })

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top bottom',
      onLeaveBack: () => {
        timeline.progress(0)
        timeline.pause()
      },
    })

    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top 60%',
      onEnter: () => timeline.play(),
    })
  }

  $('[letters-slide-up-header]').each(function (index) {
    let tl = gsap.timeline({ paused: true })
    tl.from($(this).find('.char'), {
      yPercent: 100,
      duration: 1,
      ease: 'back.out',
      stagger: { amount: 0.2 },
    })
    createScrollTrigger($(this), tl)
  })

  $('[letters-slide-up]').each(function (index) {
    let tl = gsap.timeline({ paused: true })
    tl.from($(this).find('.char'), {
      yPercent: 100,
      duration: 0.5,
      ease: 'power1.inOut',
      stagger: { amount: 0.6 },
    })
    createScrollTrigger($(this), tl)
  })
  // Avoid flash of unstyled content
  gsap.set('[text-split]', { opacity: 1 })
})
