import React from "react";
import PostCard from "../components/PostCard";
import { useFetchPosts } from "../utils/FetchData";
import usePageTransition from "../utils/usePageTransition";
import Loading from "../loading/Loading";
import "./gym.css";

const Gym = () => {
  const { posts } = useFetchPosts();

  const gymPosts = posts?.data;
  
  const { isPending, showContent } = usePageTransition(1000);
  if (!showContent || isPending) return <Loading />;

  return (
    <section className="member-gym">
      <h1>Gym Posts</h1>
      <div className="gym-posts__container">
        <div className="gym-posts">
          {gymPosts?.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gym;
