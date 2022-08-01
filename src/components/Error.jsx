import React from 'react'

const Error = ({message}) => {
  return (
    <div className="bg-red-500 text-white font-bold uppercase text-center p-2 mb-2">
      <p>{message}</p>
    </div>
  )
}

export default Error
