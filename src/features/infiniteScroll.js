import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(Observer)

document.querySelectorAll('.album_item').forEach(function (item) {
  let parent = item.parentNode
  let clonedItem = item.cloneNode(true)
  clonedItem.classList.add('cloned')
  parent.appendChild(clonedItem)
})

document.querySelectorAll('.album_item.cloned').forEach(function (clonedItem) {
  let parent = clonedItem.parentNode
  let clonedCopy = clonedItem.cloneNode(true)
  parent.appendChild(clonedCopy)
})

// Create timeline
let tl = gsap.timeline({
  paused: true,
})
tl.to('.album_item', { y: '0%', ease: 'none', duration: 1, stagger: 1 })
tl.to(
  '.album_item',
  { y: '-70%', scale: 0.4, ease: 'none', duration: 3, stagger: 1 },
  1
)
tl.to(
  '.album_item',
  { opacity: 0, ease: 'none', duration: 0.3, stagger: 1 },
  3.7
)
tl.progress(0.333333333)

// Observer
let object = {
  value: 1,
}

Observer.create({
  target: window,
  type: 'wheel,pointer,touch',
  wheelSpeed: -1,
  onChangeY: (self) => {
    let v = self.velocityY * 0.0000006
    v = v * -1
    let progress = tl.progress() + v
    if (progress >= 0.6296) {
      progress = 0.333333333
    } else if (progress <= 0.333333333) {
      progress = 0.6296
    }

    gsap.set(object, {
      value: progress,
      onUpdate: () => {
        tl.progress(object.value)
      },
    })
  },
})
