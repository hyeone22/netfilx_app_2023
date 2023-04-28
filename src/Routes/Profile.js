import { authService } from 'fbase'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'styles/Profile.css'

function Profile() {
  const navigate = useNavigate();

  const onLogOutClick = (e) => {
    authService.signOut();
    navigate('/')
  } 

  return (
    <div className='profile_name'>
    <button onClick={onLogOutClick} className='profile_logout'>로그아웃</button>
    </div>
  )
}

export default Profile