import { React, useState } from 'react'
import './style.css'

function SnackbarComponent({ text }) {
  return (
    <div>
      <div className="snackbarContainer">
        <div className="iconContainer">
          <i class="fas fa-check"></i>
        </div>
        <p className="snackText">{ text }</p>
      </div>
    </div>
  )
}

export default SnackbarComponent
