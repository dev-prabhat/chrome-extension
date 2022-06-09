import { useState, useEffect} from "react"
import axios from "axios"
import { Time , Weather } from "./components"
import "./styles.css"

function App() {
  const [imageURL, setImageURL] = useState("")
  const [name, setName] = useState("")
  const [focus, setFocus] = useState("")
  const [details, setDetails] = useState(JSON.parse(localStorage.getItem("userDetails")) ?? {})

  
  const submitName = (e) => {
    e.preventDefault()
    setDetails(prev => ({...prev,name:name}))
    setName("")
  } 

  const submitFocus = (e) => {
    e.preventDefault()
    setDetails(prev => ({...prev,focus:focus}))
    setFocus("")
  }

  useEffect(()=>{
    (async()=>{
      try {
        const { data } = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&&orientation=landscape&&query=stars%20dark`)
        setImageURL(data?.urls?.regular)
      } catch (error) {
        console.log(error)
      }
    })()
  },[])

  useEffect(()=>{
    localStorage.setItem("userDetails",JSON.stringify(details))
  },[details])

  return (
      <main className="main__container" style={{backgroundImage:`url(${imageURL})`, backgroundSize:"cover"}}>
      {
        details.name ? 
            <form className="details__container" onSubmit={submitFocus}>
              <p className="greeting">Welcome , {details.name}</p>
              <p className="focus-label">What is your main focus for today?</p>
              <input 
                type="text"
                className="focus-field"
                placeholder="write focus here.."
                onChange={(e)=>setFocus(e.target.value)}
                value={focus}
                required
                />
            </form>
        : (
          <form className="name__container" onSubmit={submitName}> 
            <p className="question"> Hello, What is your name? </p> 
            <input 
                type="text" 
                placeholder="write here..." 
                className="input-field"
                onChange={(e)=>setName(e.target.value)}
                value={name}
                required
                />
            <button className="submit-btn">Continue</button>
          </form>
        )
      }
      {
        details.name && <Time/>
      }
      {
        details.focus && <p className="focus">{details.focus}</p>
      }
      <Weather/>
    </main> 
  );
}

export default App;
