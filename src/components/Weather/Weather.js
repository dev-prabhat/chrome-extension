import { useEffect , useState} from "react"
import axios from "axios"
import "./weather.css"

export const Weather = () => {
    const [coordinates, setCoordinates] = useState({latitude:0,longitude:0})
    const [weather, setWeather] = useState({})
    const {name,temp} = weather

    useEffect(()=>{
      navigator.geolocation.getCurrentPosition((position)=>setCoordinates({
        latitude:position?.coords?.latitude,
        longitude:position?.coords?.longitude
      }))
    },[])

    useEffect(()=>{
      (async()=>{
        try {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
            const {name,main:{temp}} = data
            setWeather({name,temp})
        } catch (error) {
            console.log(error)
        }
      })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[coordinates])


    const convertFahrenheitToCelsius = temp => (temp - 273.15).toFixed(2)

    return(
        <div className="weather__report">
            <h2 className="city">{name}</h2>
            <h3 className="temp">{convertFahrenheitToCelsius(temp)}&deg;</h3>
        </div>
    )
}