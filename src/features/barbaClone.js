let clonedImg = null

// Function to initialize animations and event listeners
function initializeAnimations() {
  // Initialize your other animations here
  // ...

  // Initialize the zooming transition
  document.querySelectorAll('.marquee-logos_item').forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault()
      const img = this.querySelector('.marquee-logos_image')
      const rect = img.getBoundingClientRect()
      clonedImg = img.cloneNode(true)
      const newPage = this.getAttribute('href')

      document.body.appendChild(clonedImg)

      gsap.set(clonedImg, {
        position: 'fixed',
        top: rect.top + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        zIndex: 9999,
        backgroundColor: 'white',
        borderRadius: '1em',
      })

      gsap.to(clonedImg, {
        duration: 1,
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        width: '100vw',
        height: '100vh',
        ease: 'none',
        onComplete: function () {
          barba.go(newPage)
        },
      })
    })
  })
}

// Initialize Barba.js
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
        // Re-initialize your animations and event listeners
        initializeAnimations()
      },
    },
  ],
})

// Initialize animations when the page first loads
initializeAnimations()
