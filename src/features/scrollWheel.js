/* eslint-disable no-unused-vars */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const scrollWheel = () => {
  const images = document.querySelectorAll('.img-scroll')
  const containers = document.querySelectorAll('.full')
  const imageLength = images.length

  let scrollPosition = 0
  let currentImageIndex = imageLength - 1
  let isAnimating = false
  let previousImageIndex = null

  gsap.set(images, {
    filter: 'blur(5px)',
  })

  gsap.set(images[images.length - 1], {
    y: '40vh',
    x: '-50vw',
    scale: 3,
    filter: 'blur(0px)',
    duration: 0,
  })

  const animateImages = function (event) {
    return new Promise((resolve) => {
      let tl = gsap.timeline({
        defaults: {
          duration: 1.25,
          ease: 'power2.inOut',
        },
        onStart: () => {
          isAnimating = true
        },
        onComplete: () => {
          isAnimating = false
          resolve()
        },
      })

      gsap.to(images[currentImageIndex], {
        y: '40vh',
        x: '-50vw',
        filter: 'blur(0px)',
        scale: 3,
        ease: 'sine',
      })

      if (previousImageIndex !== null) {
        tl.to(images[previousImageIndex], {
          x: '-120vw',
          opacity: 0,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(images[previousImageIndex], { zIndex: 0 })
          },
        }).to(images[previousImageIndex], {
          opacity: 1,
          filter: 'blur(5px)',
          scale: 1,
          x: 0,
          y: 0,
          duration: 0,
        })
      }

      scrollPosition = 0
      previousImageIndex = currentImageIndex
      currentImageIndex = (currentImageIndex - 1 + imageLength) % imageLength

      gsap.set(images[currentImageIndex], { zIndex: 2 })
    })
  }
}
