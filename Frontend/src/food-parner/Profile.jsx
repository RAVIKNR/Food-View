import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {

  if (!id) return;

  axios
    .get(`http://localhost:3000/api/store/${id}`, {
      withCredentials: true,
    })
    .then((response) => {

      setProfile(response.data.foodPartner);

      setVideos(
        response.data.foodPartner.foodItems
      );
    })

    .catch((err) => {
      console.error(err);
    });

}, [id]);

  return (
    <main className="profile-page">
      <section className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-brand-card">
            <img
              src={profile?.logo}
              alt="Restaurant Logo"
              className="profile-logo"
            />
          </div>

          <div className="profile-title-panel">
            <span className="profile-label">
              Restaurant Profile
            </span>

            <h1>{profile?.restaurantName}</h1>

            <p className="profile-address">
              {profile?.address}
            </p>

            <div className="profile-pill-row">
              <span className="profile-pill">
                Open Now
              </span>

              <span className="profile-pill">
                Fine Dining
              </span>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="profile-stat-strip">
          <div className="profile-stat-box">
            <p className="profile-stat-label">
              Total Meals
            </p>

            <strong className="profile-stat-value">
              {profile?.totalMeal}
            </strong>
          </div>

          <div className="profile-stat-box">
            <p className="profile-stat-label">
              Customers Served
            </p>

            <strong className="profile-stat-value">
              {profile?.customerServe}
            </strong>
          </div>
        </div>

        <div className="profile-divider"></div>

        {/* VIDEOS */}
        <div className="profile-video-grid">
          {videos.map((video, index) => (
            <article
              key={index}
              className="profile-video-card"
            >
              <video
                className="profile-video"
                src={video.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />

              {/* Desktop Description */}
              <div className="profile-video-overlay">
                <div className="profile-video-text">
                  <p>{video.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* BUTTON */}
        <div className="profile-actions">
          <button
            type="button"
            className="profile-button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </section>
    </main>
  );
};

export default Profile;