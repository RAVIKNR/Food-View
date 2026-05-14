import React, { useState } from 'react'
import AuthPage from './AuthPage'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setError('')

    try {
      const response = await axios.post("http://localhost:3000/api/auth/user/login",{
        password,
        email
      },{ withCredentials: true })
      console.log(response.data)
      navigate("/")
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.')
      console.error(err)
    }
  }

  return (
    <AuthPage
      title="Welcome back"
      subtitle="Access your account and continue ordering quickly."
      submitLabel="Sign in"
      heroImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
      fields={[
        {
          label: 'Email address',
          name: 'email',
          type: 'email',
          placeholder: 'you@example.com',
          value: email,
          onChange: (e) => setEmail(e.target.value),
        },
        {
          label: 'Password',
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
        },
      ]}
      hintText="Need a new account?"
      hintLink={{ to: '/user/register', label: 'Create one' }}
      extraContent={error ? <p className="form-error">{error}</p> : null}
      onSubmit={handleSubmit}
    />
  )
}

export default UserLogin
