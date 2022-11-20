const modalTitle = document.querySelector('.modal-title')
const modalBody = document.querySelector('.modal-body')

window.addEventListener('load', (e) => {
    console.log('page is loaded')
    updateInfo()
        .then(details => renderUI(details))
        .catch(err => console.log(err))
})

const renderUI = async (details) => {
    for (let detail of details) {
        const { text, short, departureAirport, arivalAirport } = detail
        let flight = document.createElement("div")
        flight.innerHTML = `
            <p class='text-warning'><i class="fa-solid fa-plane text-warning"></i> status: ${text}<p>
            <p><span class='text-success'>From</span> ${departureAirport} <span class='text-success'>to</span> ${arivalAirport} - ${short}<p>
        `
        modalBody.appendChild(flight)
    }

    const today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    const time = today.toLocaleTimeString()
    modalTitle.innerText = `
        Currently ${yyyy}.${mm}.${dd} ${time}
    `
}

const getAirline = async () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '248743b228msh202c84a6b37e296p18e31fjsnb46975402c2d',
            'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
        }
    }
    
    const response = await fetch('https://flight-radar1.p.rapidapi.com/flights/list-by-airline?airline=CAL', options)
    
    const { aircraft } = await response.json()
    
    // console.log(aircraft)
    
    const flights = []
    
    
    for (let flight of aircraft) {
        if (flight[13] === 'TPE') {
            flights.push(flight[0])

            // will get a http status code of 429 if fetch more than 5 times
            if (flights.length > 4) {
                break
            }
        }
    }
    
    // console.log(flights)
    
    
    // return id of all flights of China Airline that landed in Taipei Taoyuan Airport
    return flights
}

getInformation = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '248743b228msh202c84a6b37e296p18e31fjsnb46975402c2d',
            'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
        }
    }

    const response = await fetch(`https://flight-radar1.p.rapidapi.com/flights/detail?flight=${id}`, options)

    const { status, airport, airline } = await response.json()

    const { text } = status // Landed 21:56
    const { short } = airline // China Airline
    const { origin, destination } = airport
    const departureAirport = origin.name
    const arivalAirport = destination.name


    // console.log(text, short, departureAirport, arivalAirport)

    return { text, short, departureAirport, arivalAirport }

}


const updateInfo = async () => {
    const flights = await getAirline()
    const details = []

    const flightDetailsRequests = flights.map(async (flight, i) => {
        let detail = await getInformation(flight)
        details.push(detail)
    })

    await Promise.all(flightDetailsRequests)

    // console.log(details)

    return details      
}
