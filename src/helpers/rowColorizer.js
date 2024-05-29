export default function rowColorizer() {
  const items = document.querySelectorAll('.item')
  items.forEach((item, index) => {
    item.classList.remove('highlight')
    if (index % 2 === 0) {
      item.classList.add('highlight')
    }
  })
}
