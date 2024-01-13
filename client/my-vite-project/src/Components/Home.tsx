// // File: MyForm.js

// import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// const MyForm = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage]= useState<any>([])
//   const [error, setError]= useState('')
//   const navigate = useNavigate();
 
//   // useEffect(()=> {
  
//   //   const fun = async()=> {
//   //     try{
//   //       const res= await fetch('http://localhost:3002/blog/all',{
//   //       method:"GET",
//   //       credentials:"include", //This is very important in the case when we want to send cookies with the request
//   //       headers:{
//   //         'Content-Type': 'application/json'
//   //       }
//   //     })
//   //     if(!res.ok){
//   //       throw new Error('Network Error!')
//   //     }
//   //     //console.log(Cookies.get('token'));
//   //     const data= await res.json()
//   //     //console.log(data);
//   //      setImage(data)
//   //     }catch(err){
//   //       console.log(err); 
//   //     }   
//   //   }
//   //   fun()
//   // },[])


//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files !== null && e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];
//       const allowedExtensions = ["png", "jpeg", "jpg", "svg","webp"];
//       const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
  
      
//       if (fileExtension && allowedExtensions.includes(fileExtension)) {
//         setFile(selectedFile);
//         setError('')
//       } else {      
//         console.error("Invalid file type. Please select a .png, .jpg, or .svg file.");
//         setError("Invalid file type. Please select a .png, .jpg, .svg or webp file.")
//         // Optionally, you can reset the file input to clear the selection
//         e.target.value = '';
//       }
//     }
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
  
//     // Update the corresponding state variable based on the input name
//     if (name === 'title') {
//       setTitle(value);
//     } else if (name === 'description') {
//       setContent(value);
//     }
//   };
  


//   const handleSubmit = async (e:FormEvent)=> {
//     e.preventDefault()
//     const formData= new FormData()
//     if(file){
//       formData.append('file', file)
//     }
//     formData.append('title', title)
//     formData.append('description', content)

//     try{
//       const res= await fetch('http://localhost:8000/blog/', {
//         method:"POST",
//         credentials: "include",
//         body:formData
//       })

//       if(!res.ok){
//         throw new Error('Network problem while creating blog!');
//       }
//       const data= await res.json()
//       console.log(data);
      
//       navigate('/all');
      
//     }catch(err){
//       console.log(err);
//       
//     }  
//   }
  
  
  
//   const styles = {
//     container: {
//       maxWidth: '400px',
//       margin: 'auto',
//       marginTop: '120px',
//       border: '1px solid #ddd',
//       borderRadius: '8px',
//       padding: '20px',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       background: '#f9f9f9',
//       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     },
//     form: {
//       display: 'flex',
//       flexDirection: 'column',
//       width: '100%',
//     },
//     label: {
//       marginBottom: '8px',
//       color: '#333',
//     },
//     input: {
//       marginBottom: '16px',
//       padding: '10px',
//       border: '1px solid #ccc',
//       borderRadius: '4px',
//       fontSize: '14px',
//     },
//     textarea: {
//       marginBottom: '16px',
//       padding: '10px',
//       border: '1px solid #ccc',
//       borderRadius: '4px',
//       fontSize: '14px',
//       minHeight: '80px',
//     },
//     button: {
//       backgroundColor: '#4caf50',
//       color: '#fff',
//       border: 'none',
//       cursor: 'pointer',
//       padding: '10px',
//       borderRadius: '4px',
//       fontSize: '16px',
//       fontWeight: 'bold',
//     },
//     buttonHover: {
//       backgroundColor: '#45a049',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <form style={styles.form}         onSubmit={handleSubmit}
//  >
//         <label style={styles.label} htmlFor="title">
//           Title:
//         </label>
//         <input
//           style={styles.input}
//           type="text"
//           id="title"
//           name="title"
//           value={title}
//           onChange={handleInputChange}
  
//         />

//         <label style={styles.label} htmlFor="description">
//           Description:
//         </label>
//         <textarea
//           style={styles.textarea}
//           id="description"
//           name="description"
//           value={content}
//          onChange={handleInputChange}
//         />

//         <label style={styles.label} htmlFor="file">
//         Choose File (jpg, png, svg):
//         </label>
//         <input
//           style={styles.input}
//           type="file"
//           id="file"
//           name="file"
//           accept=".jpg, .jpeg, .png, .svg"
//           onChange={handleFileChange}
//         />

//         <button style={styles.button} type="submit"  
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MyForm;
