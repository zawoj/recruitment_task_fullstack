import React from 'react'

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner" data-testid="spinner"></div>
      </div>
  )
}

export default Spinner