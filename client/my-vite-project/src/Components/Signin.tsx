import  { useState } from 'react';

const Signin = () => {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

  const handleSignup = async () => {
     try {
      const response = await fetch('http://localhost:8000/user/signin', {
        method: 'POST',
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
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        console.error('Error creating user:', errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
              backgroundColor: '#f79b3c',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              
             
            }}
            onClick={handleSignup}
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
