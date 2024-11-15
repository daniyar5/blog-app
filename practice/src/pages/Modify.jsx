import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Modify(){
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: ""
  });

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost({
          title: response.data.title,
          content: response.data.content,
          author: response.data.author
        });
      } catch (error) {
        setError("Post not found");
      }
    };

    fetchPost();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:3000/posts/${id}`, post);
      setPost(response.data);
      navigate('/')
    } catch (error) {
      setError("Error updating post");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
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
                />
                <textarea
                onChange={handleChange}
                value={post.content}
                type="text"
                name="content"
                />
                <input
                onChange={handleChange}
                value={post.author}
                type="text"
                name="author"
                />
                <button className="update-btn" type="submit">Update Post</button>
            </form>
        </div>
    </div>
  );
};

export default Modify;
