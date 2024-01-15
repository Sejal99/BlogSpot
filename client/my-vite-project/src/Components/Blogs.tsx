import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    blogItem: {
      width: '250px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
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
  };

  return (
    <div style={styles.container}>
      {images.map((image, index) => (
        <div key={index} style={styles.blogItem}>
          <img src={`http://localhost:8000${image.imageUrl}`} alt={`Image ${index}`} style={styles.image} />
          <h3 style={styles.title}>{image.title}</h3>
          <p style={styles.description}>{image.description}</p>
          <button style={{ cursor: 'pointer',
      padding: '5px 5px',
      borderRadius: '5px',}} onClick={()=>{
        navigate(`/userBlog/${image._id}`)
      }}>View</button>
        </div>
        
      ))}
    </div>
  );
};

export default Blogs;
