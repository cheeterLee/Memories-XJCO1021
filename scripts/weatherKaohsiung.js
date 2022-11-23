const key = 'c86x8Bkav3rHOtyo7oYCehHuZ0kdGBUa'
const weatherCard = document.querySelector('.weather-card')

window.addEventListener('load', (e) => {
    console.log('page is loaded.')
    weatherCard.innerHTML = `
        <span>Fetching current weather in Kaohsiung...</span>
    `
    updateInfo()
        .then(data => updateUI(data))
        .catch(err => console.log(err))
})

const updateUI = (data) => {
    const { cityDets, weather } = data
    console.log(data)

    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = `${yyyy}.${mm}.${dd}`
    console.log(today)
    
    weatherCard.innerHTML = `
        <span>Today is ${today} -${' '}</span>
        <span>${cityDets.EnglishName}${' '}-${' '}</span>
        <span>${weather.Temperature.Metric.Value} &deg;C  ${weather.WeatherText}</span>
        <span><img src='../assets/icons/${weather.WeatherIcon}.svg' class='filter-white' /></span>
    `
}

const updateInfo = async () => {
    const cityDets = await getCity()
    const weather = await getWeather(cityDets.Key)
    console.log(weather)

    return { cityDets, weather }
}

// get weather information
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${id}?apikey=${key}`

    const response = await fetch(base + query)
    const data = await response.json()

    return data[0]
}

// get city information 
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
    // const query = `?apikey=${key}&q=${city}`


    // fetching information from Kaoosiung
    const query = `?apikey=${key}&q=kaohsiung`

    const response = await fetch(base + query)
    // console.log(response)

    const data = await response.json()

    // console.log(data[0])

    return (data[0])
}