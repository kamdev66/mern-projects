import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate=useNavigate();
  const onLogout=()=>{
    localStorage.removeItem('authToken');
    navigate('/login');
  }
  return (
    <div>
      <h1>Home</h1>
    <Button onClick={onLogout}>Logout</Button>
    </div>
  )
}

export default Home