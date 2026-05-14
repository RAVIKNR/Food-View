import React, { useState, useRef, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/home.css'

const Home = () => {
  const navigate = useNavigate()
  // Sample food videos data - replace with API data
  const [videos, setVideos] = useState([])

  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current)
      
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollTop = container.scrollTop
        const containerHeight = container.clientHeight
        const snapIndex = Math.round(scrollTop / containerHeight)
        
        setCurrentIndex(Math.min(snapIndex, videos.length - 1))
        
        container.scrollTo({
          top: snapIndex * containerHeight,
          behavior: 'smooth'
        })
      }, 150)
    }

    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeoutRef.current)
    }
  }, [videos.length])
  
  useEffect(()=>{
       axios.get('http://localhost:3000/api/food/',{withCredentials:true})
       .then(response =>{
           
        setVideos(response.data.menu)
       })
  },[])

      async function likeVideo(video) {
        const response = await axios.post("http://localhost:3000/api/food/like", { foodId: video._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === video._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === video._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
}
      async function saveVideo(video) {
        const response = await axios.post("http://localhost:3000/api/food/save", { foodId: video._id }, {withCredentials: true})

        if(response.data.save){
            console.log("Video saved");
            setVideos((prev) => prev.map((v) => v._id === video._id ? { ...v, saveCount: v.saveCount + 1 } : v))
        }else{
            console.log("Video unsaved");
            setVideos((prev) => prev.map((v) => v._id === video._id ? { ...v, saveCount: v.saveCount - 1 } : v))
        }
}
        

  const truncateDescription = (text, maxLines = 2) => {
    const lines = text.split('\n')
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + '...'
    }
    
    if (text.length > 100) {
      return text.substring(0, 100) + '...'
    }
    
    return text
  }

  return (
    <div className="home-reels-page">
      <aside className="side-panel left-panel">
        <div className="side-card">
          <span className="side-label">Trending</span>
          <h3>Chef Special Picks</h3>
          <p>Explore premium meals that are currently topping the menu. Swipe through the reels to discover new favorites.</p>
        </div>
      </aside>

      <div className="home-reels-container">
        <div className="reels-viewport" ref={scrollContainerRef}>
          {videos.map((video) => (
            <div key={video._id} className="reel-slide">
              <video
                className="reel-video"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={video.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="reel-gradient-overlay" />

              <div className="reel-content">
                <div className="reel-description-section">
                  <p className="reel-description">
                    {truncateDescription(video.description, 2)}
                  </p>
                </div>
              </div>

             <div className="reel-side-actions">

  <div className="reel-action-card">
    <span onClick={()=>likeVideo(video)} className="reel-action-circle">❤</span>
    <span className="reel-action-count">
      {video.likeCount ?? 0}
    </span>
  </div>

  <div className="reel-action-card">
    <span className="reel-action-circle">💬</span>
    <span className="reel-action-count">
      {video.comments ?? 0}
    </span>
  </div>

  <div className="reel-action-card">
    <span onClick={()=>saveVideo(video)} className="reel-action-circle">🔖</span>
    <span className="reel-action-count">
      {video.saveCount ?? video.bookmarks ?? 0}
    </span>
  </div>

</div>

              <button
                className="visit-store-btn"
                onClick={() => navigate(`/store/${video.foodPartner}`)}
              >
                Visit {video.storeName}
              </button>
            </div>
          ))}
        </div>

        <div className="reel-indicators">
          {videos.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                scrollContainerRef.current?.scrollTo({
                  top: index * scrollContainerRef.current.clientHeight,
                  behavior: 'smooth'
                })
              }}
            />
          ))}
        </div>

        <nav className="bottom-nav">
          <button type="button" className="nav-link active">
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </button>
          <button type="button" className="nav-link" onClick={() => navigate('/saved')}>
            <span className="nav-icon">🔖</span>
            <span>Saved</span>
          </button>
        </nav>
      </div>

      <aside className="side-panel right-panel">
        <div className="side-card">
          <span className="side-label">Quick Info</span>
          <h3>Swipe & Discover</h3>
          <p>Tap through food reels and enjoy a clean, distraction-free view on the video with extra details on the sides.</p>
        </div>
      </aside>
    </div>
  )
}

export default Home
