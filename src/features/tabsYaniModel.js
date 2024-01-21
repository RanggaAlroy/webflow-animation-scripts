const tabs = document.querySelectorAll('.tabs-detail_menu')
const tabContents = document.querySelectorAll('.tabs-content-wrapper > div')
const tabTexts = document.querySelectorAll('.tabs-detail-text')
const tabDigital = document.querySelector('.tabs-detail_digital')
const textDigital = document.querySelector('.tabs-digital')

const init = () => {
  tabContents.forEach((item, index) => {
    if (index === 0) {
      item.style.display = 'block'
      tabTexts[0].style.fontWeight = 'bold'
    }
    tabTexts.forEach((text, textIndex) => {
      if (textIndex !== 0) {
        text.style.fontWeight = 200
      }
    })
    tabContents.forEach((content, indexContent) => {
      if (indexContent !== 0) {
        content.style.display = 'none'
      }
    })
  })
}

init()

tabDigital.addEventListener('click', init)

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabContents[index].style.display = 'block'
    tabTexts[index].style.fontWeight = 'bold'

    tabContents.forEach((content, indexContent) => {
      if (indexContent !== index) {
        content.style.display = 'none'
      }

      tabTexts.forEach((text, textIndex) => {
        if (textIndex !== index) {
          text.style.fontWeight = 200
        }
      })
    })
  })
})
