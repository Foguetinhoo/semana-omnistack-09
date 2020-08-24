import React, { useState,useEffect } from 'react';
import{ Link} from 'react-router-dom'
import { HeaderS, User, ButtonLogout,Logo } from './style'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faSignOutAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'


import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

// import Logo from '../Logo/index'
import logoImg from '../../assets/logo.png'

export default function Header({name,history}){
const [show,setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Logout = () => {
    localStorage.removeItem('user')
    history.push('/')

  }
  

  return (
    <>
      <HeaderS>
        <Link to="/dashboard">
          <User>
            <FontAwesomeIcon icon={faUserCircle} /> {name}
          </User>
        </Link>
        <Logo src={logoImg} />
        <ButtonLogout  onClick={handleShow}> Sair  <FontAwesomeIcon icon={faSignOutAlt} /> </ButtonLogout>
      </HeaderS>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Exit</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-3">Deseja realmente sair?</Modal.Body>
        <Modal.Footer >
          <Button variant="danger" onClick={handleClose}>
            Cancelar <FontAwesomeIcon icon={faTimes} />
          </Button>
          <Button variant="success" onClick={Logout}>
            Sair <FontAwesomeIcon icon={faCheck} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}
