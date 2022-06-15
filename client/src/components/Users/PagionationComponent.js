import React from 'react'
import './paginateStyle.css'

function PagionationComponent({ currentPage, nextPage, prevPage }) {
  return (
    <div>
      <div className="pagesContainer">
        <div className="prevPage" onClick={() => prevPage()}>
          <i className="fas fa-chevron-left fa-2x"></i>
        </div>
        <div className="currentPage">
          <p className="cPageText">{ currentPage }</p>
        </div>
        <div className="nextPage" onClick={() => nextPage()}>
          <i className="fas fa-chevron-right fa-2x"></i>
        </div>
      </div>
    </div>
  )
}

export default PagionationComponent
