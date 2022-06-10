import { useState } from "react"
import "./time.css"

export const Time = () => {
    let time = new Date().toLocaleTimeString()
    let date = new Date().toDateString()
    const [currentTime, setCurrentTime] = useState(time)

    const UpdateTime = () => {
        time = new Date().toLocaleTimeString()
        setCurrentTime(time)
    }

    setInterval(()=>{
        UpdateTime()
    },1000)

    return(
        <div className="time-date_container">
          <h1 className="current-time">{currentTime}</h1>
          <h2 className="current-date">{date}</h2>
        </div>
    )
}