import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/saved.css'

const savedItems = [
  {
    id: '1',
    title: 'Smoky Paneer Tikka',
    partner: 'Spice Atelier',
    description: 'Saved for a flavorful evening. Great for groups and weekend cravings.',
  },
  {
    id: '2',
    title: 'Truffle Mushroom Bowl',
    partner: 'Urban Eats',
    description: 'A premium pick for a fancy dinner. Rich, savory, and memorable.',
  },
  {
    id: '3',
    title: 'Sunrise Smoothie',
    partner: 'Fresh Fuel',
    description: 'Healthy, refreshing, and perfect for busy mornings.',
  },
]

const Saved = () => {
  const navigate = useNavigate()

  return (
    <main className="saved-page">
      <section className="saved-hero">
        <div>
          <span className="saved-label">Saved Collections</span>
          <h1>Your favorite dishes</h1>
          <p>Keep the most tempting meals ready to order. This page is designed to feel professional, polished, and easy to scan on any device.</p>
        </div>
      </section>

      <section className="saved-grid">
        {savedItems.map((item) => (
          <article key={item.id} className="saved-card">
            <div className="saved-card-top">
              <div className="saved-badge">Saved</div>
              <span className="saved-item-title">{item.title}</span>
            </div>
            <p className="saved-item-partner">{item.partner}</p>
            <p className="saved-item-description">{item.description}</p>
            <button type="button" className="saved-action" onClick={() => navigate('/')}>Browse similar</button>
          </article>
        ))}
      </section>

      <nav className="saved-bottom-nav">
        <button type="button" className="nav-link" onClick={() => navigate('/')}>
          <span className="nav-icon">🏠</span>
          <span>Home</span>
        </button>
        <button type="button" className="nav-link active">
          <span className="nav-icon">🔖</span>
          <span>Saved</span>
        </button>
      </nav>
    </main>
  )
}

export default Saved
