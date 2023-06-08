import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from './components/auth'
import { signInWithPopup , signOut} from "firebase/auth"
import { auth, googleProvider } from './config/firebase'
import { db } from "./config/firebase"
import { getDocs , collection, addDoc } from "firebase/firestore"
import { storage } from './config/firebase'
import {ref, uploadBytes} from "firebase/storage"

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")
  const [movie, setMovie] = useState([]);
  const [Files, setFiles] = useState([]);
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

  const onSubmitMovie = async () => {
    try {
      await addDoc(movieCollectionRef, {title: "hey", date: "2001", premium: true, amount: 200})
      getMovie();
    } catch (error) {
      console.log(error)
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
  const upLoadFile = async () => {
const files = ref(storage, `mini/${File.name}`)
 try {
  await uploadBytes(files, File)
 } catch (error) {
  
 }
  }
  return (
    <>
      <div>
        {!auth?.currentUser?.email && <Auth />
        }
        <input type="checkbox" />
        <input type="text" placeholder='title'/>
        <input type="file" onChange={(e)=>setFiles(e.target.files)}/>
        <input type='submit' onClick={upLoadFile}/>
        <input type="text" placeholder='date' />
        <input type='submit' onClick={onSubmitMovie}/>
        <div>{auth?.currentUser?.email}</div>
        
        <button onClick={signInWithGoogle}>Google</button>
      </div>
      <button onClick={logOut} >Sign Out</button>
    </>
  )
}

export default App
