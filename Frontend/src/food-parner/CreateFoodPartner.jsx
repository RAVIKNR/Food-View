import React, { useEffect, useState } from 'react'
import '../styles/CreateFoodPartner.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CreateFoodPartner = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [store, setStore] = useState('')
  const [video, setVideo] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || !description.trim() || !store.trim() || !video) {
      setError('Please fill in all fields and select a video.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('storeName', store)
      formData.append('file', video)

      const response = await axios.post('http://localhost:3000/api/food/', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      console.log(response.data)
      navigate('/')
    } catch (err) {
      setError('Upload failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (file && file.type.startsWith('video/')) {
      setVideo(file)
      setError('')
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setVideo(null)
      setPreviewUrl('')
      setError('Please select a valid video file.')
    }
  }

  return (
    <main className="create-food-page">
      <section className="create-food-card">
        <div className="create-food-actions">
          <button type="button" className="page-action-button" onClick={() => navigate('/')}>Home</button>
          <button type="button" className="page-action-button secondary" onClick={() => navigate('/profile')}>Profile</button>
        </div>

        <div className="create-food-banner">
          <div className="create-food-banner-copy">
            <span className="create-food-pill">Partner dashboard</span>
            <h1>Feature your next signature dish</h1>
            <p>
              Use a beautiful video, strong storytelling, and your store details to make the menu item pop.
            </p>
          </div>
          <div className="create-food-banner-stats">
            <div>
              <p>Menu score</p>
              <strong>92%</strong>
            </div>
            <div>
              <p>Engagement</p>
              <strong>27K views</strong>
            </div>
          </div>
        </div>

        <div className="create-food-body">
          <form className="create-food-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <span>Food Name</span>
              <input
                type="text"
                className="input"
                placeholder="Enter dish name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-field">
              <span>Description</span>
              <textarea
                className="textarea"
                placeholder="Describe your dish in a few tasty sentences"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label className="form-field form-field-flex">
                <span>Store</span>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter store name"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                />
              </label>

              <label className="form-field form-field-flex file-field">
                <span>Video</span>
                <div className="file-input">
                  <div className="file-input-label">
                    <span className="file-input-icon">🎬</span>
                    <span>{video ? video.name : 'Select a video'}</span>
                  </div>
                  <input type="file" accept="video/*" onChange={handleFileChange} />
                </div>
              </label>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish dish'}
            </button>
          </form>

          <aside className="preview-panel">
            <div className="preview-card">
              <div className="preview-header">
                <span className="create-food-pill">Live preview</span>
                <span className="preview-badge">Mobile-first</span>
              </div>

              {previewUrl ? (
                <video
                  className="preview-video"
                  src={previewUrl}
                  controls
                  playsInline
                />
              ) : (
                <div className="preview-placeholder">
                  <p>Upload a video to preview the dish here.</p>
                </div>
              )}

              <div className="preview-meta">
                <p className="preview-title">{name || 'Dish title'}</p>
                <p className="preview-store">{store || 'Store name'}</p>
                <p className="preview-description">
                  {description || 'Add a short, mouthwatering description for your menu item.'}
                </p>
              </div>
            </div>

            <div className="preview-note">
              <h2>Pro tip</h2>
              <p>
                A strong opening line and an easy-to-read store name make your dish stand out to customers.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default CreateFoodPartner
