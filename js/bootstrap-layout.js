let windowHeightPrev = sessionStorage.getItem('windowHeight')
if (windowHeightPrev == null) {
  let windowHeight = window.innerHeight
  sessionStorage.setItem('windowHeight', windowHeight)
  windowHeightPrev = sessionStorage.getItem('windowHeight')
}
window.addEventListener('resize', () => {
  let vh = windowHeightPrev * 0.01
  document.documentElement.style.setProperty('--calc-vh', `${vh}px`)
})
