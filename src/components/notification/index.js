import React from 'react'
import ReactDOM from 'react-dom'
import CSS from './Notification.css'

export function sendNotification(message) {
  const el = document.createElement('div')
  const close = function() {
    el.remove()
  }

  setTimeout(close, 3000)
  document.getElementById('notificationsRoot').appendChild(el)

  ReactDOM.render(
    (
      <Notification message={message} onClose={close}/>
    ),
    el
  )
}

export function Notification(props){
  return (
    <div onClick={props.onClose} className={`${CSS.notification}`}>
      {props.message}
    </div>
  )
}