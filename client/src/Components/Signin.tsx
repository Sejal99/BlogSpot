import  { useState } from 'react';
 import Cookies from 'js-cookie';
 import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

  const handleSignin = async () => {
     try {
      const response = await fetch('http://localhost:8000/user/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
            email,
            password,
           
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User signedin successfully:', data);
        const token = Cookies.get('token');
        console.log('kkkkkkkkkkkkkkkkkkk',token);

        if (token) {
          navigate('/home');
        }
      
      } else {
        const errorData = await response.json();
        console.error('Error creating user:', errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{backgroundColor: '#e3f8ff',minHeight: '100vh'}}>
      <div
        style={{
          paddingTop: '150px',
          marginBottom: '10px',
          textAlign: 'center',
          fontSize:35
        }}
      >
        <h6>Welcome Back. Sign In below</h6>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
       
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
          />
          <button
            style={{
              width: '30%',
              padding: '15px',
              borderRadius: '5px',
              backgroundColor: '#8242e3',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              
             
            }}
            onClick={handleSignin}
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
