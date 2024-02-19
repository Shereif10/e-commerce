import React from 'react'

export default function Footer() {
  return (
    <>
    <footer className='py-5 bg-main-light'>
        <div className="container">
            <h1>Get the FreshCart app</h1>
            <p>We will send you a link, open it in your phone to download the app</p>
            <div className="row">
                <div className="col-md-9">
                    <input type="text" className='form-control' placeholder='Email..' />
                </div>
                <div className="col-md-3">
                    <button className='btn bg-main text-white form-control'>Share app link</button>
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}
