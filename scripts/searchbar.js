// $(document).ready(function() {
//     $('#search-bar').on('keyup', function() {
//         let value = $(this).val().trim().toLowerCase()
//         $('#card-container .card').filter(function() {
//             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//         })
//     })
// })

const cards = [...document.querySelectorAll('.card')]
const searchBar = document.getElementById('search-bar')

console.log(cards)

searchBar.addEventListener('keyup', () => {
    let input = searchBar.value.trim().toLowerCase()
    console.log(input)
    cards.forEach((card) => {
        let title = card.querySelector('.card-title')
        let text = card.querySelector('.card-text')
        if (title.innerText.toLowerCase().indexOf(input) > -1 || text.innerText.toLowerCase().indexOf(input) > -1) {
            // aligning elements after filtering
            card.parentElement.style.display = ''
        } else {
            card.parentElement.style.display = 'none'
        }
    })
})


