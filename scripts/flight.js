

const modalTitle = document.querySelector('.modal-title')
const modalBody = document.querySelector('.modal-body')

// window.addEventListener('load', (e) => {
//     console.log('page is loaded')
//     updateInfo()
//         .then(details => updateUI(details))
//         .catch(err => console.log(err))
// })

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
    
    console.log(flights)
    
    
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


    console.log(text, short, departureAirport, arivalAirport)

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

    console.log(details)

    return details      
}

updateInfo()

const renderUI = async (details) => {
    for (let detail of details) {
        const { text, short, departureAirport, arivalAirport } = detail
        let flight = documet.createElement('div')
        div.innerHTML = `
            <p><i class="fa-solid fa-plane"></i> status-${text}<p>
            <p>From ${departureAirport} to ${arivalAirport} - ${short}<p>
        `
        modalBody.append(flight)
    }
}