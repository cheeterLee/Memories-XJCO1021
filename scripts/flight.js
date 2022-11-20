

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
    
    console.log(aircraft)
    
    const flights = []
    
    for (let flight of aircraft) {
        if (flight[13] === 'TPE') {
            flights.push(flight)
        }
    }
    console.log(flights)
    
    // return all flights of China Airline that landed in Taipei Taoyuan Airport
    return flights
}

getAirline()

// id = '2e43fa37'

getInformation = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '248743b228msh202c84a6b37e296p18e31fjsnb46975402c2d',
            'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
        }
    }

    const response = await fetch(`https://flight-radar1.p.rapidapi.com/flights/detail?flight=2e43fa37`, options)

    const { status, airport, airline } = await response.json()

    const { text } = status // Landed 21:56
    const { short } = airline // China Airline
    const { origin, destination } = airport
    const departureAirport = origin.name
    const arivalAirport = destination.name


    console.log(text, short, departureAirport, arivalAirport)

    return { text, short, departureAirport, arivalAirport }

}


// getInformation()