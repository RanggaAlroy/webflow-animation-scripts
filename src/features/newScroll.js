import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const newScroll = () => {
  const images = document.querySelectorAll('.img-item')
  const imgReverse = Array.from(images).reverse()
  const allContainers = document.querySelectorAll('.full')

  const scroller = new Lenis({
    el: document.querySelector('.full'),
    smooth: true,
  })

  allContainers.forEach((container, index) => {
    const currentImage = imgReverse[index % imgReverse.length]
    let scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: `top 250%`,
        end: 'bottom 100%',
        scrub: true,
        ease: 'linear',
        markers: true,
        onUpdate: (self) => {
          // Update ScrollTrigger progress based on Lenis scroll position
          self.progress =
            scroller.scroll.y / (scroller.limit - window.innerHeight)
        },
      },
    })

    scrollTl
      .to(currentImage, {
        y: '0vh',
        x: '0vw',
        scale: 1,
        autoAlpha: 0.3,
        filter: 'blur(10px)',
      })
      .to(currentImage, {
        y: '40vh',
        x: '-23vw',
        scale: 2,
        filter: 'blur(4px)',
        autoAlpha: 1,
        transformOrigin: '50% 30%',
      })
      .to(currentImage, {
        y: '30vh',
        x: '-40vw',
        scale: 2.5,
        filter: 'blur(0px)',
        autoAlpha: 1,
        transformOrigin: '50% 30%',
      })
      .to(currentImage, {
        x: '-120vw',
        opacity: 1,
        ease: 'power1.in',
        onComplete: () => {
          gsap.set(currentImage, { autoAlpha: 0, x: 0, y: 0, scale: 1 })
        },
      })
  })
}
