import { useState } from "react"
import { auth } from "../config/firebase"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"

export const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log(auth?.currentUser?.email)
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error(error)
        }
    }

  

    return (
        <div>
            <input placeholder="Email ..." onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="password ..." type="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={signIn}>Submit</button>
            
        </div>
    )
}