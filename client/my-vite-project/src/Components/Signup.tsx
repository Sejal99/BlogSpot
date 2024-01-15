import  { useState } from 'react';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fullName,
            email,
            password,
           
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User created successfully:', data);
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        console.error('Error creating user:', errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: 'red', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    
      <div
        style={{
          paddingTop: '60px',
          marginBottom: '10px',
          textAlign: 'center',
          fontSize:35
        }}
      >
        <h6>Welcome to Blogify. Sign up below</h6>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <input
            type="text"
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Name"
            style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
          />
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
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
