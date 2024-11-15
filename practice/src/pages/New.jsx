import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function New() {

  const [error, setError] = useState(null);
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: ""
  });

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    try {
        await axios.post(`http://localhost:3000/posts/`, post)
        navigate('/')
    } catch (error) {
        setError("Error posting post")
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div  className="modify">
        <div className="view-inner">
            <div className="blog">
                <h1>Edit blog</h1>
            </div>
            {error && <p>{error}</p>}
            <form className="update" onSubmit={handleSubmit}>
                <input
                onChange={handleChange}
                value={post.title}
                type="text"
                name="title"
                placeholder="Title"
                />
                <textarea
                onChange={handleChange}
                value={post.content}
                type="text"
                name="content"
                placeholder="Content"
                />
                <input
                onChange={handleChange}
                value={post.author}
                type="text"
                name="author"
                placeholder="Author"
                />
                <button className="update-btn" type="submit">Post</button>
            </form>
        </div>
    </div>
  );
};

export default New;
