import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const propTypes = {
  label: PropTypes.string.isRequired
}

const Header = (props) => {
  const {label} = props
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography type="title" color="inherit" style={{margin: '0 auto', marginTop: '10px'}}>
          {label}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = propTypes
export default Header
