const openModalButton = document.querySelector('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const shuffle = document.querySelector('.shuffle')

openModalButton.addEventListener('click', () => {
    const modal = document.querySelector(openModalButton.dataset.modalTarget)
    openModal(modal)
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

const openModal = (modal) => {
    if (!modal) return
    modal.classList.add('active')
    overlay.classList.add('active')
    shuffle.classList.add('active')
}

const closeModal = (modal) => {
    if (!modal) return
    shuffle.classList.remove('active')
    modal.classList.remove('active')
    overlay.classList.remove('active')
}