import React from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron } from 'react-bootstrap'

const Home = () => (
  <Jumbotron>
    <h3>PayPal Bingo</h3>
    <p>Please open Player and Admin pages on separate windows</p>
    <Link to="/user">Player Screen</Link>
    &nbsp; &nbsp; &nbsp; &nbsp;
    <Link to="/admin" target="_blank">Admin Screen</Link>
  </Jumbotron>
)

export default Home
