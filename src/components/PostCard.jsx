import React from "react";
import logo from "../assets/24-fitcamp-logo.png";
import "./postCard.css";

const PostCard = ({ post }) => {
    
  return (
    <div className="post-card__container" key={post.id}>
      <div className="post-card-detail">
        <div className="post-info">
          <img src={logo} alt="24-fit camp logo" loading="lazy" />
          <div className="post-card-details">
            <p>{post.author}</p>
            <p className="post-card-date">{post.currDate}</p>
          </div>
        </div>
      </div>
      <div className="post-cards">
        <span>{post.post}</span>
      </div>
    </div>
  );
};

export default PostCard;
