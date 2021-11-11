import { useEffect, useState } from "react"
import { LoginSignup } from "./App/LoginSignup/LoginSignup"
import { Site } from "./App/Site"
import { apiFetch } from "./App/utils/api"


export default function App() {

  const [user, setUser] = useState(null)

  useEffect(function () {
    apiFetch('/api/auth/me')
      .then(setUser)
      .catch(() => setUser(false))
  }, [])

  if (user === null) {
    return null
  }

  return (
    user ? <Site /> : <LoginSignup onConnect={setUser} />
  )
}