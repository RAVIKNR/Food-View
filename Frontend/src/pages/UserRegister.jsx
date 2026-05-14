import React, { useState } from 'react'
import AuthPage from './AuthPage'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'


const UserRegister = () => {
  const [name, setname] = useState('')
  const [countryCode, setCountryCode] = useState('India (+91)')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/

    if (!name.trim() || !contactNumber.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }

    if (!phoneRegex.test(contactNumber)) {
      setError('Mobile number must be exactly 10 digits.')
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
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/registration',
        {
          name,
          countryCode,
          contactNumber,
          email,
          password,
        },
        { withCredentials: true }
      )

      console.log(response.data)
      navigate('/')
    } catch (err) {
      setError('Registration failed. Please try again.')
      console.error(err)
    }
  }

  return (
    <AuthPage
      title="Create New Account"
      subtitle="Create your account to order food effortlessly."
      submitLabel="Create account"
      heroImage="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80"
      fields={[
        {
          label: 'Full Name',
          name: 'name',
          type: 'text',
          placeholder: 'Jane Doe',
          value: name,
          onChange: (e) => setname(e.target.value),
        },
        {
          label: 'Contact number',
          name: 'contactNumber',
          type: 'phone',
          placeholder: 'Enter your phone number',
          value: contactNumber,
          onChange: (e) => setContactNumber(e.target.value),
          countryValue: countryCode,
          onCountryChange: (e) => setCountryCode(e.target.value),
        },
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
          placeholder: 'Create a password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
        },
      ]}
      hintText="Already have an account?"
      hintLink={{ to: '/user/login', label: 'Sign in' }}
      extraContent={error ? <p className="form-error">{error}</p> : null}
      onSubmit={handleSubmit}
    />
  )
}

export default UserRegister
