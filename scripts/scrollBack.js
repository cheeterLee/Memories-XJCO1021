const scrollBackButton = document.querySelector('.scroll-back')

window.onscroll = () => scrollFunc()

scrollBackButton.addEventListener('click', () => {
    scrollBackToTop()
})

const scrollFunc = () => {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        scrollBackButton.classList.remove('visually-hidden')
    } else {
        scrollBackButton.classList.add('visually-hidden')
    }
}


const scrollBackToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}