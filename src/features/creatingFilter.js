const talentItems = document.querySelectorAll('.talent-item')
const filterCategories = document.querySelectorAll('.filter-btn input')
const filterTexts = document.querySelectorAll('.filter-text-category')
const filterAlphabets = document.querySelectorAll('.alphabet-radio input')
const textAlphabets = document.querySelectorAll('.filter-text')

let selectedCategory = 'All'

const init = () => {
  filterTexts[0].style.fontWeight = 700
  filterTexts[0].style.borderBottom = '1px solid #000'
}

init()

const updateTalentItemsDisplay = () => {
  talentItems.forEach((item) => {
    const category = item.getAttribute('category')
    if (selectedCategory === 'All' || selectedCategory === category) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
}

const categoryFilterTextStyles = (selectedIndex) => {
  filterTexts.forEach((text, index) => {
    if (index === selectedIndex) {
      text.style.fontWeight = 700
      text.style.borderBottom = '1px solid #000'
    } else {
      text.style.fontWeight = 200
      text.style.borderBottom = 'none'
    }
  })
}

const getFilteredItemsByCategory = (category) => {
  return Array.from(talentItems).filter((item) => {
    const itemCategory = item.getAttribute('category')
    return category === 'All' || category === itemCategory
  })
}

filterCategories.forEach((filter, index) => {
  filter.addEventListener('change', () => {
    if (filter.checked) {
      selectedCategory = filter.value
      updateTalentItemsDisplay()
      categoryFilterTextStyles(index)
    }
  })
})

filterAlphabets.forEach((filter, index) => {
  filter.addEventListener('change', () => {
    const selectedAlphabet = filter.value.toLowerCase()
    const filteredItems = getFilteredItemsByCategory(selectedCategory)
    filteredItems.forEach((item) => {
      const name = item.getAttribute('talent-name').toLowerCase()
      if (selectedAlphabet === 'all' || name.startsWith(selectedAlphabet)) {
        item.style.display = 'block'
        textAlphabets[index].style.fontWeight = 700
        textAlphabets[index].style.borderBottom = '1px solid #000'
      } else {
        item.style.display = 'none'
      }
    })
    textAlphabets.forEach((text, i) => {
      if (i !== index) {
        text.style.fontWeight = 200
        text.style.borderBottom = 'none'
      }
    })
  })
})
