import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Home - Welcome to the Tornadoes Website!</h1>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/user'>User</Link></li>
        <li><Link to='/admin'>Admin</Link></li>
      </ul>
    </nav>

  </div>
)

export default Home
