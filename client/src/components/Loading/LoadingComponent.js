import React from 'react'
import './style.css'

function LoadingComponent(props) {
  return (
    <div>
      <div className="loadingContainer" style={{ marginTop: props.marginFix }}>
        <p className="loadingText">Content is loading, please wait..</p>
      </div>
    </div>
  )
}

export default LoadingComponent
