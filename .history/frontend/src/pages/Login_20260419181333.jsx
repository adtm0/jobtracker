import { useState } from "react";
import { Link } from "react-router-dom"

export default function Login() {
  const [form, setForm] = useState({username: '', password: ''})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      console.log('logging in with', form)
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}