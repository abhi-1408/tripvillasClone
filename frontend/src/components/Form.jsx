import React from 'react'
import styles from './Form.module.css'
import dum3 from './imgurl/dum3.jpeg'

export const Form = () => {
  return (
    <div className='pl-5 pr-5 pb-5 pt-4 mt-3'>
      <div className='row p-2'>
        <div className='col-6 pl-3 pb-3 pr-3'>
          <div
            className='row p-4'
            style={{
              color: 'white',
              backgroundColor: 'rgb(30,135,240)',
            }}
          >
            <h5>Book Tension Free</h5>
            <ul>
              <li className='mt-2'>Your payments are secured by Tripvillas.</li>
              <li className='mt-3'>
                The amounts are released to verified owners in advance while new
                owners are paid post your check-in and confirmation.
              </li>
              <li className='mt-3'>
                <div className='ml-2'>
                  You can contact us if you face any issues during checkin or
                  your stay.
                </div>
              </li>
            </ul>
          </div>

          <div className='row mt-3'>
            <div
              className='col-6'
              style={{
                border: '1px solid black',
                backgroundImage: `url(${dum3})`,
                height: '160.283px',
                width: '300px',
              }}
            >
              {/* image */}
            </div>

            <div className='col-6'>
              <div className='m-1'>
                <small className='text-muted'>Propertyid</small>
                <h3 className='mt-3'>title</h3>
                <small className='text-muted'>Location</small>
                <p>
                  <small className='text-muted'>Location</small>
                </p>
                {/* mapping ammenties */}
              </div>
            </div>
          </div>

          <div className='row mt-3'>
            <div className='col-2 text-center p-3 shadow bg-white rounded'>
              <h2>1</h2>
              <p>
                <small className='text-muted'>checkin </small>
              </p>
            </div>
            <div
              className='col-2 shadow bg-white rounded p-3 text-center'
              style={{ marginLeft: '22px' }}
            >
              {' '}
              <h2>1</h2>
              <p>
                <small className='text-muted'>checkout date </small>
              </p>
            </div>
            <div
              className='col-2 p-3 shadow bg-white rounded  text-center'
              style={{ marginLeft: '22px' }}
            >
              <h2>1</h2>
              <p>
                <small className='text-muted'>units</small>
              </p>
            </div>
            <div
              className='col-2 shadow bg-white rounded p-3 text-center'
              style={{ marginLeft: '22px' }}
            >
              <h2>1</h2>
              <p>
                <small className='text-muted'>Max. Guests </small>
              </p>
            </div>
          </div>
          <div className='row mt-3 '>
            <div className='mt-4'>
              Sub
              Total.....................................................................................................................
            </div>
            <div className='mt-4'>
              Discount.....................................................................................................................
            </div>
            <div className='mt-4'>
              Tax...................................................................................................................................
            </div>

            <div className='mt-4'>
              Total...................................................................................................................................
            </div>
          </div>

          <div className='row mt-3'></div>
        </div>

        {/* filling form */}
        <div className='col-6 pl-3 pr-3 pb-3 '>
          <div
            className='row mr-3 mb-3 ml-3 p-2'
            style={{
              backgroundColor: 'rgb(255,246,238)',
            }}
          >
            <div className='text-center ml-5 p-2' style={{ color: 'orange' }}>
              <b>Book fast.</b> Your dates might get booked by someone else.
            </div>
          </div>

          <div className=' mr-3 mb-3 ml-3 p-2 shadow bg-white rounded'>
            <div>
              <b>Enter your contact information</b>
            </div>
            <hr style={{ color: 'black' }} />
            <form>
              <p>
                <select>
                  <option value='+91'>+91</option>
                  <option value='+1'>+1</option>
                  <option value='+20'>+20</option>
                  <option value='+27'>+27</option>
                  <option value='+30'>+30</option>
                  <option value='+31'>+31</option>
                  <option value='+32'>+32</option>
                  <option value='+33'>+33</option>
                  <option value='+34'>+34</option>
                  <option value='+35'>+35</option>
                  <option value='+36'>+36</option>
                  <option value='+37'>+37</option>
                  <option value='+38'>+38</option>
                </select>
                <input
                  type='text'
                  className='ml-3'
                  placeholder='Mobile Number'
                />
              </p>

              <p>
                <input type='text' placeholder='First Name' />
                <input type='text' placeholder='Last Name' className='ml-2' />
              </p>

              <p>
                <input
                  type='email'
                  class='form-control'
                  placeholder='Email Address'
                />
              </p>
            </form>
          </div>

          <div className=' mr-3 mb-3 ml-3 p-2 shadow bg-white rounded'>
            <div>
              <b>Are there any special requests?</b>
            </div>
            <hr style={{ color: 'black' }} />
            <div className='p-3'>
              <textarea rows='3' cols='45'></textarea>
            </div>
            <p className='text-muted'>
              <small>
                This message will be visible to the owner/manager once she/he
                accepts the booking
              </small>
            </p>
          </div>

          <div className=' mr-3 mb-3 ml-3 p-2 shadow bg-white rounded'>
            <div>
              <b>Are there any special requests?</b>
            </div>
            <hr style={{ color: 'black' }} />
            <div className='p-3'>
              <div
                className='row p-2'
                style={{ border: '5px solid rgb(30,135,240)' }}
              >
                <div className='col-2'>ticl</div>
                <div className='col-10'>
                  <h6 className='mt-3'>Pay using credit/debit card.</h6>

                  <p className='text-muted'>
                    <small>
                      This is 100% Secure.
                      <br />
                      We DO NOT store/save your credit card details. We use
                      Stripe.com. Stripe has been audited by an independent PCI
                      Qualified Security Assessor (QSA) and is certified as a
                      PCI Level 1 Service Provider.{' '}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className=' mr-3 mb-3 ml-3 p-2 shadow bg-white rounded'
            style={{ color: 'grey', fontSize: '15px' }}
          >
            By clicking 'Agree & Continue', you are agreeing to our Terms &
            Conditions, Privacy Policy, Booking policies like cancellation
            policies, house rules.
          </div>

          <div>
            <button
              style={{
                width: '100%',
                height: '60px',
                background: 'rgb(30,135,240)',
                color: 'white',
              }}
            >
              AGREE & CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// export default class Form extends Component{
//     render(){
//     return(
//         <div>
//             <div  style={{float:"left",width:"66.66%",paddingRight:"20px",paddingLeft:"20px"}}>
//                 {/* static card */}
//                 <div className={styles.card}>
//                     <div>Book Tension Free</div>
//                     <div>
//                         <li>Your payments are secured by Tripvillas.</li>
//                         <li>The amounts are released to verified owners in advance while new owners are paid post your check-in and confirmation.</li>
//                         <li>You can contact us if you face any issues during checkin or your stay.</li>
//                     </div>
//                 </div>
//                 {/* cards */}

//                 <div style={{margin:"20px 0px 20px 0px",padding:"10px 10px 10px 10px",boxShadow:"2px 2px 5px 0px"}} >
//                     <div style={{textAlign:"left"}} >
//                         <img src="https://via.placeholder.com/200x100.png"  />
//                     </div>
//                 </div>

//                 <div className="card-group" style={{padding:"10px 10px 10px 10px"}} >
//                         <div class="card">
//                             <div class="card-body">
//                                 Check In
//                             </div>
//                         </div>
//                         <div class="card">
//                             <div class="card-body">
//                             Check Out
//                             </div>
//                         </div>
//                         <div class="card">
//                             <div class="card-body">
//                                 Guests
//                             </div>
//                         </div>
//                         <div class="card">
//                             <div class="card-body">
//                                 Units
//                             </div>
//                         </div>
//                     </div>

//                 <div style={{textAlign:"left",marginTop:"20px",padding:"20px 20px 20px 20px",boxShadow:"2px 2px 5px 0px"}} >
//                     <div>Sub Total...........................................................................................</div>
//                     <div>Discount.............................................................................................</div>
//                     <div>Tax..................................................................................................</div>
//                     <hr/>
//                     <div>Total................................................................................................</div>
//                 </div>

//                 <div style={{padding:"20px 20px 20px 20px"}} >
//                     <div style={{textAlign:"left",fontWeight:"bolder"}} >Rate Plan</div>
//                     <div style={{textAlign:"left"}}>No meals provided (European Plan)</div>

//                     <div style={{textAlign:"left",fontWeight:"bolder",marginTop:"20px"}}>Stringent Cancellation Policy</div>
//                     <div style={{textAlign:"left"}}>No charges will be levied if booking is canceled 61 days prior to check-in. If cancellation is done between 30 to 60 days prior to check-in, 50% of the total booking amount will be charged. Post that, there will be no refund.</div>
//                     <div style={{textAlign:"left",fontWeight:"bolder",marginTop:"20px"}}>House Rules</div>
//                     <div style={{textAlign:"left"}}>Pets not allowed.</div>
//                 </div>

//             </div>

// <div style={{width:"33.33%", float:"right",paddingRight:"20px"}} >
// <form>
//     <p style={{color:"red",backgroundColor:"pink",padding:"10px 0px 10px 0px"}} >Book fast. Your dates might get booked by someone else.</p>
//     <div style={{border:"0px solid black",boxShadow:"2px 2px 5px 0px"}} >
//         <div style={{borderBottom:"1px solid black",height:"50px",paddingLeft:"10px"}}>
//              <div style={{float:"left",padding:"10px 0px 10px 0px",fontSize:"20px"}} ><i class="fas fa-id-badge"></i> <span style={{paddingLeft:"5px"}}>Enter your contact information</span> </div>
//         </div>

//         <div style={{marginTop:"15px",border:"0px solid black",height:"50px"}}>
//             <div style={{float:"left",paddingLeft:"10px"}}>
//                     <select style={{padding:"12px 0px 12px 10px"}}>
//                         <option value="+91">+91</option>
//                         <option value="+1">+1</option>
//                         <option value="+20">+20</option>
//                         <option value="+27">+27</option>
//                         <option value="+30">+30</option>
//                         <option value="+31">+31</option>
//                         <option value="+32">+32</option>
//                         <option value="+33">+33</option>
//                         <option value="+34">+34</option>
//                         <option value="+35">+35</option>
//                         <option value="+36">+36</option>
//                         <option value="+37">+37</option>
//                         <option value="+38">+38</option>
//                     </select>
//                     <input type="text"  placeholder="Mobile Number" style={{paddingLeft:"10px",border:"1px solid black",padding:"10px 0px 10px 10px",marginLeft:"10px"}} />
//             </div>
//         </div>
//         <div style={{border:"0px solid black",marginTop:"15px",height:"50px"}}>
//             <div style={{float:"left",paddingLeft:"10px"}} >
//                 <input placeholder="First Name" style={{padding:"10px 0px 10px 0px"}} />
//                 <input placeholder="Last Name"  style={{padding:"10px 0px 10px 0px",marginLeft:"10px"}} />
//             </div>
//         </div>
//         <div style={{border:"0px solid black",marginTop:"15px",height:"50px"}} >
//             <div style={{float:"left"}}>
//                 <input placeholder="Email Address" style={{padding:"10px 0px 10px 0px",marginLeft:"10px"}} />
//             </div>
//         </div>
//     </div>

//     <div style={{border:"0px solid blue",marginTop:"10px",boxShadow:"2px 2px 5px 0px"}}>
//         <div>
//             <div style={{borderBottom:"1px solid black",padding:"10px 0px 10px 0px",height:"50px"}}>
//                 <div style={{float:"left",paddingLeft:"10px"}}>
//                     <i class="far fa-comment"></i> <span style={{paddingLeft:"10px",fontWeight:"bolder"}}>Are there any special requests?</span>
//                 </div>
//             </div>
//             <div style={{padding:"10px"}}>
//                 <textarea name="" id="" cols="55" rows="2" placeholder="Your message" style={{}} />
//             </div>
//             <p style={{paddingBottom:"10px"}} >This message will be visible to the owner/manager once she/he accepts the booking</p>
//         </div>
//     </div>

//     <div style={{border:"1px solid black",marginTop:"10px",boxShadow:"2px 2px 5px 0px"}} >
//         <div>
//             <div style={{borderBottom:"1px solid black",height:"50px",paddingLeft:"10px"}}>
//                 <div style={{float:"left",padding:"10px 0px 10px 0px",fontSize:"20px"}} ><i class="fas fa-id-badge"></i> <span style={{paddingLeft:"5px"}}>Booking Options</span> </div>
//             </div>
//         </div>
//         <div style={{border:"0px solid black,padding: 5px 5px 5px 5px"}} >
//             <div style={{border:"0px solid black",height:"200px"}}>
//                 <div style={{border:"0px solid green",height:"200px",float:"left"}}>
//                     <div style={{border:"0px solid cyan",}}><i class="fas fa-check" style={{fontSize:"40px",color:"blue"}} ></i> </div>
//                 </div>
//                 <div style={{border:"0px solid red",paddingLeft:"5px 5px 5px 5px"}}>
//                     <div style={{textAlign:"left"}} >
//                         <div>Put your credit/debit card on file.</div>
//                         <div>Since this booking is on 'Request To Book', We will only charge your card once</div>
//                         <div>owner accepts the booking.</div>
//                         <div>This is 100% Secure</div>
//                         <div>We DO NOT store/save your credit card details. We use Stripe.com. Stripe has</div>
//                         <div>been audited by an independent PCI Qualified Security Assessor (QSA) and is</div>
//                         <div>certified as a PCI Level 1 Service Provider.</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>

//     <div style={{backgroundColor:"grey",marginTop:"10px"}}>
//         <p>By clicking 'Agree & Continue', you are agreeing to our Terms & Conditions, Privacy Policy, Booking policies like cancellation policies, house rules.</p>
//     </div>

//     <div>
//         <button style={{width:"600px",height:"60px" ,background:"blue"}} >AGREE & CONTINUE</button>
//     </div>
// </form>
// </div>

// </div>
//         )
//     }
// }
