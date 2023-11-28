import React, { FC } from 'react'

interface Props {
  error: string
}

const ErrorAlert:FC<Props> = (props) => {
  const { error } = props
  return (
    <div className="alert alert-danger">{error}</div>
  )
}

export default ErrorAlert