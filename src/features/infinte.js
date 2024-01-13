import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const infinte = () => {
  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  const images = document.querySelectorAll('.img-item')
  const allContainers = document.querySelectorAll('.full')

  allContainers.forEach((container, index) => {
    const currentImage = images[index]
    let scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: `top 250%`,
        end: 'bottom 100%',
        scrub: true,
        ease: 'linear',
        markers: true,
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
