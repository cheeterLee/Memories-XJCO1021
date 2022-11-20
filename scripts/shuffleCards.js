$('.shuffle').click(() => {
    console.log('start shuffling')
    let cards = $('.row > .card-container').remove().toArray()
    for (let i = 0; i < cards.length; i++) {
        let j = Math.floor(Math.random() * (i + 1))
        let tempi = cards[i]
        let tempj = cards[j]
        cards[i] = tempj
        cards[j] = tempi
    }
    $('.row').append(cards)
})
