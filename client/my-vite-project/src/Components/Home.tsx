// File: MyForm.js

import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Check if the selected file type is allowed
      const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
      if (allowedTypes.includes(selectedFile.type)) {
        setFormData({
          ...formData,
          file: selectedFile,
        });
      } else {
        alert('Please select a valid image file (jpg, png, or svg).');
        // Optionally clear the file input
        e.target.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const requestBody = JSON.stringify({
        title: formData.title,
        description: formData.description,
        file: formData.file,
      });
  
      console.log('Request Body:', requestBody);
  
      const response = await fetch('http://localhost:8000/blog/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
  
      console.log('Server Response:', response);
  
      if (response.ok) {
        console.log('Blog successfully uploaded!');
        // Optionally, you can reset the form or perform other actions
      } else {
        const errorMessage = await response.text();
        console.error('Server Error:', errorMessage);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
    }
  };
  
  
  const styles = {
    container: {
      maxWidth: '400px',
      margin: 'auto',
      marginTop: '120px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#f9f9f9',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    label: {
      marginBottom: '8px',
      color: '#333',
    },
    input: {
      marginBottom: '16px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    },
    textarea: {
      marginBottom: '16px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      minHeight: '80px',
    },
    button: {
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      padding: '10px',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="title">
          Title:
        </label>
        <input
          style={styles.input}
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <label style={styles.label} htmlFor="description">
          Description:
        </label>
        <textarea
          style={styles.textarea}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <label style={styles.label} htmlFor="file">
        Choose File (jpg, png, svg):
        </label>
        <input
          style={styles.input}
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png, .svg"
          onChange={handleFileChange}
        />

        <button style={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyForm;
