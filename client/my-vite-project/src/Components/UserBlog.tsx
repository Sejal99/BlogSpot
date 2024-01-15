import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Edit } from '../Logo';

const UserBlog = () => {

    const [userData, setUserData] = useState({});
 const [edit,setEdit]=useState('')

  const BlogId=useParams();
  console.log(BlogId.blogId);
  

  useEffect(() => {
    const fetchUserBlog = async () => {
      try {
        const response = await fetch(`http://localhost:8000/blog/userBlog/${BlogId.blogId}`,{
          method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
          // Handle error responses
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const userData = await response.json();
        console.log(userData);
        
        setUserData(userData);

      } catch (error) {
       
      }
    };

    fetchUserBlog();

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
    },
    image: {
      width: '100%',
    height: '50%',
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
    <div style={styles.blogItem}>
          <img src={`http://localhost:8000${userData.imageUrl}`}  style={styles.image} />
          <h3 style={styles.title}>{userData.title}</h3>
          <p style={styles.description}>{userData.description}</p>
          <div style={{display: 'flex', justifyContent: 'flex-end' ,marginTop:80}}>
          <Edit/>
          </div>
          
        </div>
    
  </div>
  )
}

export default UserBlog
