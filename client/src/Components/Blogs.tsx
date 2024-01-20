import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from '../assets/blue.jpg';
interface BlogImage {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  // Add any other properties if present in your API response
}

const Blogs = () => {
  const [images, setImages] = useState<BlogImage[]>([]);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const BlogId=useParams();

  console.log('bbbbb',BlogId.blogId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/blog/all', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
console.log('ppppppp',res);

        if (!res.ok) {
          throw new Error('Network Error!');
        }

        const data = await res.json();
        console.log('Fetched Data:', data);

        setImages(data);
      } catch (err) {
        console.error('Fetch Error:', err);
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:8000/comment/${BlogId.blogId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!res.ok) {
          throw new Error('Network Error!');
        }
  
        const data = await res.json(); // Extract data from the response
  
        setComments(data); // Set the comments state with the fetched data
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Handle error on the frontend as needed
      }
    };
  
    fetchComments();
  }, []);
  

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',

     
    },
    blogItem: {
      width: '350px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      background:'#F8DFF6',
      marginTop:'10px'
    },
    image: {
      width: '100%',
      height: '40%',
      borderRadius: '4px',
      marginBottom: '10px',
    },
    title: {
      fontSize: '18px',
      marginBottom: '8px',
      color: '#333',
    },
    description: {
      fontSize: '14px',
      color: '#555',
    },
    title1:{
      fontSize: '18px',
      marginBottom: '8px',
      color: '#333',
    
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', height:'100vh',
  }}>
    <div style={styles.container}>
      {images.map((image, index) => (
        <div key={index} style={styles.blogItem}>
          <img src={`http://localhost:8000${image.imageUrl}`} alt={`Image ${index}`} style={styles.image} />
          <h3 style={styles.title}>{image.title}</h3>
          <p style={styles.description}>{image.description}</p>
        
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
  <button
    style={{
      cursor: 'pointer',
      padding: '5px 5px',
      borderRadius: '5px',
      marginBottom: '10px', // Add margin at the bottom if needed
    }}
    onClick={() => {
      navigate(`/userBlog/${image._id}`);
    }}
  >
    View
  </button>
  <h3 style={styles.title}>CreatedBy: {image.createdBy.fullName}</h3>
</div>

        </div>
        
      ))}
    </div>
    </div>
  );
};

export default Blogs;
