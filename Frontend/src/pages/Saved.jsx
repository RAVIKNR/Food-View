import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/saved.css';
import axios from 'axios';

const Saved = () => {
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/savefood", {
        withCredentials: true,
      })
      .then((response) => {
        const savedFoods = response.data.getfood.map((item) => ({
          id: item.food._id,
          description: item.food.description,
          videoUrl: item.food.video,
          likeCount: item.food.likeCount,
          saveCount: item.food.saveCount,
          partner: item.food.partner,
        }));

        setSavedItems(savedFoods);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="saved-page">

      {/* HERO */}
      <section className="saved-hero">
        <div>
          <span className="saved-label">Saved</span>
          <h1>Your saved items</h1>
          <p>All your bookmarked food videos in one place.</p>
        </div>
      </section>

      {/* GRID */}
      <section className="saved-grid">

        {savedItems.length === 0 ? (
          <div className="saved-empty">
            <h3>No saved items yet</h3>
            <p>Items you save will appear here.</p>
          </div>
        ) : (
          savedItems.map((item) => (
            <article key={item.id} className="saved-card">

              {/* VIDEO */}
              <div className="saved-video-wrapper">
                {item.videoUrl && (
                  <video
                    src={item.videoUrl}
                    controls
                    className="saved-video"
                  />
                )}
              </div>

              {/* INFO */}
              <div>
                <h3 className="saved-item-title">
                  {item.title}
                </h3>

                <p className="saved-item-partner">
                  {item.partner}
                </p>
              </div>

              {/* ACTION */}


            </article>
          ))
        )}

      </section>

      {/* BOTTOM NAV */}
      <nav className="saved-bottom-nav">

        <button
          className="nav-link"
          onClick={() => navigate('/')}
        >
          🏠 Home
        </button>

        <button className="nav-link active">
          🔖 Saved
        </button>

      </nav>

    </main>
  );
};

export default Saved;