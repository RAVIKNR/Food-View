import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import PartnerRegister from './pages/PartnerRegister'
import PartnerLogin from './pages/PartnerLogin'
import Home from './general/Home'
import Saved from './pages/Saved'
import CreateFoodPartner from './food-parner/CreateFoodPartner'
import Profile from './food-parner/Profile'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/partner/register" element={<PartnerRegister />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-food" element={<CreateFoodPartner />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/store/:id" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
