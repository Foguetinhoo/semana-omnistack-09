import React, { useEffect, useState, useCallback,useMemo } from 'react';
import { Link } from 'react-router-dom'
import { Notification, SpotItem, Content, Info } from './style'

import Header from '../../components/Header/index'

import { Modal, Button,Carousel} from 'react-bootstrap'
import ButtonD from '../../components/Button/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import Message from '../../utils/message'

import socketio from "socket.io-client"

import api from '../../services/api'

export default function Dashboard({ history }) {
  const [username, setUsername] = useState('')
  const [user, setUserID] = useState('')
  const [loading, setLoading] = useState(false)
  const [spotsList, setSpots] = useState([])
  const [requests, setRequestData] = useState([])
  const [show, setShow] = useState(true)

  let notifications;
  const loadSpots =  async id => {
    const spotsF = await api.get('/dashboard', {
      headers: { user_id:id }
     })
    setSpots(spotsF.data)
    setLoading(false)
  }
  const handleClose = () => setShow(false);
  const { _id:id_user }  = JSON.parse(localStorage.getItem('user'))

  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id: id_user}
  }), [id_user])

  const validSession = () => {
    if (!localStorage.getItem('user')) {
      history.push('/')
      return;
    } else {  
      const userData = JSON.parse(localStorage.getItem('user'))
      const { name, _id } = userData
      setUsername(name)
      loadSpots(_id)
    }
    return true;
  }

    useEffect(() => {
      validSession();
      socket.on('booking_request', data => {
        setRequestData([...requests, data])
      })
    }, [requests, socket])

  const rejectBooking = async booking_id => {
    const response = await api.post(`/bookings/${booking_id}/rejections`)
    const { type, message } = response.data
    if (type === 'error') {
      Message(message, type)
      return;
    }
    Message(message,type)
    setRequestData(requests.filter( request => request._id !== booking_id))
  }
  const aprovedBooking = async booking_id => {
    const response = await api.post(`/bookings/${booking_id}/approvals`)
    const { type, message } = response.data
    
    if (type === 'error') {
      Message(message, type)
      return;
    }
    Message(message, type)
    setRequestData(requests.filter(request => request._id !== booking_id))
  }

  function renderList() {
    if (spotsList.length === 0) {
      return (
        <Info>
          <p> nenhum spot encontrado</p>
          <Link to="/new" >Clique aqui para adicionar um novo <FontAwesomeIcon icon={faPlus} /> </Link>
        </Info>)
    }
    
    return (
      <Content>
        
      <Notification>
          {requests.length > 0 ? <Carousel>
            {console.log(notifications)}
            {requests.map((request, index) => (
              <Carousel.Item key={index}>
                <li key={request._id}>
                  <p>
                    O usuário <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong>
                    &nbsp; no dia <strong>{request.date}</strong>
                  </p>
                  <button className="accept" onClick={() => rejectBooking(request._id)}> ACEITAR <FontAwesomeIcon icon={faCheck} /> </button>
                  <button className="reject" onClick={() => aprovedBooking(request._id)}> REJEITAR <FontAwesomeIcon icon={faTimes} /></button>
                </li>
              </Carousel.Item>
            ))}
          </Carousel> : <div/>}
        </Notification>
   
        <Carousel >
          {spotsList.map((spot, index) => (
            <Carousel.Item key={index}>
            <SpotItem key={spot._id}>
              <header>
                <img src={spot.thumbnail_url} alt={5} />
              </header>
              <strong>{spot.company}</strong>
              <span>{spot.price ? `R$${Number(spot.price).toFixed(2)}/dia` : 'Gratuito'}</span>
              </SpotItem>

            </Carousel.Item>
          ))}
        </Carousel>
        <Link to="/new">
          <ButtonD width='100%' text="Cadastrar Spot" icon={<FontAwesomeIcon icon={faPlus} />} />
        </Link>
      </Content>
    )
  }
  return (
    <>
      <Header name={username} history={history} />
      {loading ? <h1 className="loading">carregando...</h1> : renderList()}


    </>
  );
}
