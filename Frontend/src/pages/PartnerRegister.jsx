import React, { useState } from 'react'
import AuthPage from './AuthPage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PartnerRegister = () => {
  const [partnerName, setPartnerName] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [countryCode, setCountryCode] = useState('India (+91)')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [restaurantAddress, setRestaurantAddress] = useState('')
  const [restaurantLogo, setRestaurantLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid logo image.')
      return
    }

    setRestaurantLogo(file)
    setLogoPreview(URL.createObjectURL(file))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/

    if (
      !partnerName.trim() ||
      !restaurantName.trim() ||
      !restaurantAddress.trim() ||
      !contactNumber.trim() ||
      !email.trim() ||
      !password.trim() ||
      !restaurantLogo
    ) {
      setError('Please fill in all fields and upload your restaurant logo.')
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
      const formData = new FormData()
      formData.append('partnerName', partnerName)
      formData.append('restaurantName', restaurantName)
      formData.append('address', restaurantAddress)
      formData.append('countryCode', countryCode)
      formData.append('contactNumber', contactNumber)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('logo', restaurantLogo)

      const response = await axios.post(
        'http://localhost:3000/api/auth/partner/registration',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      console.log(response.data)
      navigate('/create-food')
    } catch (err) {
      setError('Registration failed. Please try again.')
      console.error(err)
    }
  }

  return (
    <AuthPage
      title="Partner Registration"
      subtitle="Join the platform to manage your menu and orders."
      submitLabel="Create partner account"
      heroImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
      fields={[
        {
          label: 'Partner name',
          name: 'partnerName',
          type: 'text',
          placeholder: 'Your name or brand',
          value: partnerName,
          onChange: (e) => setPartnerName(e.target.value),
        },
        {
          label: 'Restaurant name',
          name: 'restaurantName',
          type: 'text',
          placeholder: 'Restaurant name',
          value: restaurantName,
          onChange: (e) => setRestaurantName(e.target.value),
        },
        {
          label: 'Restaurant address',
          name: 'restaurantAddress',
          type: 'textarea',
          placeholder: 'Enter your restaurant address',
          value: restaurantAddress,
          onChange: (e) => setRestaurantAddress(e.target.value),
        },
        {
          label: 'Restaurant logo',
          name: 'restaurantLogo',
          type: 'file',
          accept: 'image/*',
          placeholder: restaurantLogo ? restaurantLogo.name : 'Upload a logo',
          fileName: restaurantLogo ? restaurantLogo.name : '',
          onChange: handleLogoChange,
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
      hintText="Already registered?"
      hintLink={{ to: '/partner/login', label: 'Sign in' }}
      extraContent={
        <>
          {error ? <p className="form-error">{error}</p> : null}
          {logoPreview ? (
            <div className="logo-preview">
              <img src={logoPreview} alt="Logo preview" />
            </div>
          ) : null}
        </>
      }
      onSubmit={handleSubmit}
    />
  )
}

export default PartnerRegister
