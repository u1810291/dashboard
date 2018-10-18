import React from 'react'
import ReactDOM from 'react-dom'
import CSS from './Notification.css'

export function sendNotification(message, timeout = 3000) {
  const el = document.createElement('div')
  const close = function() {
    el.remove()
  }

  setTimeout(close, timeout)
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