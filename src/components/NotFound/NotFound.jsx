import React from 'react'
import notFound from '../../Assets/images/error.svg'

export default function NotFound() {
  return (
    <>
    <div className="w-50 mx-auto my-3 text-center">
      <h2 className="my-3">Not Found</h2>
      <img src={notFound} alt="Not found image" className='my-5' />
    </div>
    </>
  )
}
