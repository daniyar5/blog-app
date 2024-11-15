import React, { useState, useEffect } from 'react'
import axios from "axios";
import '../App.css'
import { Link } from 'react-router-dom';

function View() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []);


  async function handleClick(id) {
    try {
        await axios.delete(`http://localhost:3000/posts/${id}`)
        setPosts(posts.filter(post => post.id !== id))
        console.log('Post successfully deleted')
    } catch (error) {
        console.log('Error deleting post: ', error)
    }
  }


  return (
    <div className="view">
      <div className="view-inner">
        <div className="blog">
          <h1>My blog</h1>
        </div>
        <Link className='new-btn' to={`posts/new`}>New Post</Link>
        <div className="posts">

          {posts.length === 0 ? <h3>Zero posts bro</h3> : 
          posts
          .toReversed()
          .map((post) => (
            <div key={post.id} className="post">
              <h2 className='title'>{post.title}</h2>
              <p className='date'>{post.date}</p>
              <p className='content'>{post.content}</p>
              <p className='author'>By: {post.author}</p>
              <div className="btns">
                <Link className='edit-btn' to={`posts/${post.id}`}>Edit</Link>
                <button className='delete-btn' onClick={() => handleClick(post.id)}>Delete</button>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default View
