import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

const propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
}

const NotificationModal = (props) => {
  const {show, body, title} = props
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  )
}


NotificationModal.defaultProps = {
  show: false,
  title: 'Modal Title Goes Here',
  body: 'Modal Body Goes Here'
}
NotificationModal.propTypes = propTypes
export default NotificationModal
