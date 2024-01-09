import { useState } from "react";


const Home = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <div>
       <div
        style={{
          paddingTop: '70px',
          marginBottom: '10px',
          textAlign: 'center',
          fontSize:35
        }}
      >
        <h6>Create Blog</h6>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '400px', padding: '70px', border: '1px solid #ccc', borderRadius: '5px' ,}}>
        <input
            type="text"
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title"
            style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
          />
          <input
            type="text"
            onChange={(event) => setDesc(event.target.value)}
            placeholder="description"
            style={{ width: '95%', padding: '10px', marginBottom: '20px' }}
          />
         <input type="file" id="folder" />
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
          
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
