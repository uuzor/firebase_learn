import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from './components/auth'
import { signInWithPopup , signOut} from "firebase/auth"
import { auth, googleProvider } from './config/firebase'
import { db } from "./config/firebase"
import { getDocs , collection} from "firebase/firestore"

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")
  const [movie, setMovie] = useState([]);
  const movieCollectionRef = collection(db, "movies")
  useEffect(()=> {
    getMovie()
  }, [])

  const getMovie =async () => {
      try {
        const data = await getDocs(movieCollectionRef)
        const filteredData = data.docs.map((d)=>({...d.data(), id: d.id}));
        console.log(filteredData)
      } catch (error) {
        console.error(error)
      }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error(error)
    }
  }  

  const logOut = async () => {
    if (!auth.currentUser) return;
    try {
        await signOut(auth)
        setMessage("You are logged in")
    } catch (e) {
        console.error(e)
    }
}
  
  return (
    <>
      <div>
        {!auth?.currentUser?.email && <Auth />
        }

        <div>{auth?.currentUser?.email}</div>
        
        <button onClick={signInWithGoogle}>Google</button>
      </div>
      <button onClick={logOut} >Sign Out</button>
    </>
  )
}

export default App
