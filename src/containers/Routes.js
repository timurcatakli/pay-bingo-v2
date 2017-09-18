import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Grid, Col, Row } from 'react-bootstrap'
import Home from './Home'
import User from './User'
import Admin from './Admin'

const style = {
  main: {
    paddingBottom: '40px',
    paddingTop: '10px',
    backgroundColor: '#dddddd',
    textAlign: 'center',
    margin: '0 auto'
  }
}
const Routes = () => (
  <main style={style.main}>
    <Grid>
      <Row>
        <Col md={12} className="text-right">
          <img
            style={{marginBottom: '4px', marginRight: '6px'}}
            width="84"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/PayPal_2014_logo.svg/800px-PayPal_2014_logo.svg.png"
            alt="PayPal" />
            Bingo Game | Timur Catakli
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/user" component={User}/>
            <Route path="/admin" component={Admin}/>
          </Switch>
        </Col>
      </Row>
    </Grid>
  </main>
)

export default Routes
