import React from 'react'
import styles from './css/Payement.module.css'
import buil from './imgurl/buil.gif'
import { useHistory } from 'react-router'


export const Paymentpage = (props) => {
  let history = useHistory()
  setTimeout(() => {
    history.push('/homepage')
  }, 4000);

  return (
    <div>
      <div className='row'>
        <div className='col-12 p-5 text-center'>
          <div style={{ border: '1px solid black' }}>
            <h2>Thanks for booking with Tripvillas</h2>
            <h2>Order Number is : {props.match.params.id}</h2>
          </div>
        </div>
        <div className='col-12 text-center '>
          <div style={{ height: '20%' }} >
            <img src={buil} />
          </div>
        </div>
      </div>
    </div>
  )
}
