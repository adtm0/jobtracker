import { useState } from "react";
import { Link } from "react-router-dom";
export default function Register() {
  const [form, setForm] = useState({username: '', email: '', password: ''})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async  (e) => {
    e.preventDefault();
    setError('');
    setLoading(true)

    try {
      console.log('registering with', form)
    } catch {
      setError('Something went wrong. Try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9f9f8'
    }}>
      <div style={{width: '100%', maxWidth: 380}}>
        
        <div style={{textAlign: 'center', marginBottom: 32}}>
          
        </div>
      </div>
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submimt">Create account</button>
      </form>
    </div>
  );
}
