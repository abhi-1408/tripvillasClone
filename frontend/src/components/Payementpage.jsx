import React from 'react'
import styles from './css/Payement.module.css'
import buil from './imgurl/buil.gif'
export const Payement = () => {
  return (
    <div>
      <div className='row'>
        <div className='col-12 p-5 text-center'>
          <div style={{ border: '1px solid black' }}>
            <h2>Thanks for booking with Tripvillas</h2>
          </div>
        </div>
        <div className='col-12 text-center '>
          <div style={{ height: '20%', backgroundColor: 'blue' }}>
            <img src={buil} />
          </div>
        </div>
      </div>
    </div>
  )
}
