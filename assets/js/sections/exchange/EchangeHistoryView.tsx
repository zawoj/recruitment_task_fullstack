import React from 'react'
import { useLocation } from 'react-router-dom';

const EchangeHistoryView = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code')

  console.log(location)

  return (
    <div>dasdasd{code}</div>
  )
}

export default EchangeHistoryView