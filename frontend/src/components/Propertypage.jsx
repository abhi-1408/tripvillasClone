import React from 'react'
import data from './data.json'
import styles from './css/Propertypage.module.css'
import DatePicker from 'react-datepicker'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { useState } from 'react'
import home from './imgurl/home.jpg'
import dum3 from './imgurl/dum3.jpeg'
import dum2 from './imgurl/dum2.jpeg'
export const Propertypage = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleChange1 = (date) => {
    setStartDate(date)
    console.log('handle 1 clicked date is', startDate)
  }

  const handleChange2 = (date) => {
    if (date >= startDate) {
      setEndDate(date)
    } else {
      setEndDate(startDate)
      setStartDate(date)
    }
  }

  return (
    <div>
      {data.map((item) => {
        return (
          <div className='row'>
            <div className='col-9'>
              <div className='m-3 p-4 '>
                <div>
                  <small className='text-muted'>
                    <a href=''>{item.country}</a> / <a href=''>{item.state}</a>{' '}
                    / <a href=''>{item.city}</a>{' '}
                  </small>
                </div>
              </div>
              <hr />
              <div className='row m-3'>
                {/* image */}
                <div class='col-7'>
                  <div
                    style={{
                      width: '558px',
                      height: '446px',
                      border: '1px solid black',
                    }}
                  >
                    <Carousel>
                      <div>
                        <div
                          style={{
                            width: '558px',
                            height: '298px',
                            border: '1.5px solid white',
                            background: `url(${item.image_large[0]})`,
                            backgroundSize: '100% 125%',
                          }}
                        ></div>
                        <div
                          style={{
                            width: '278px',
                            height: '145px',
                            border: '1.5px solid white',
                            float: 'left',
                            background: `url(${dum3})`,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '278px',
                            height: '145px',
                            border: '1.5px solid white',
                            float: 'right',
                            background: `url(${dum3})`,
                          }}
                        >
                          {' '}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            width: '558px',
                            height: '298px',
                            border: '1.5px solid white',
                            background: `url(${home})`,
                            backgroundSize: '100% 125%',
                          }}
                        ></div>
                        <div
                          style={{
                            width: '278px',
                            height: '145px',
                            border: '1.5px solid white',
                            float: 'left',
                            background: `url(${dum3})`,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '278px',
                            height: '145px',
                            border: '1.5px solid white',
                            float: 'left',
                            background: `url(${dum3})`,
                          }}
                        >
                          {' '}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            width: '558px',
                            height: '298px',
                            border: '1.5px solid white',
                            background: `url(${home})`,
                            backgroundSize: '100% 125%',
                          }}
                        ></div>
                        <div
                          style={{
                            width: '278px',
                            height: '145px',
                            border: '2px solid white',
                            float: 'left',
                            background: `url(${dum3})`,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '278px',
                            height: '145px',
                            border: '2px solid white',
                            float: 'right',
                            background: `url(${dum3})`,
                          }}
                        >
                          {' '}
                        </div>
                      </div>
                    </Carousel>
                  </div>
                </div>

                {/* location and amenties */}
                <div class='col-5 p-5'>
                  <h3>{item.title}</h3>
                  <div className='text-muted'>{item.location_name}</div>
                  <hr />
                  {/* map amenties */}
                  {item.prop_tags.map((ele) => {
                    return (
                      <div
                        style={{
                          float: 'left',
                          margin: '10px',
                          border: '1px solid aqua',

                          padding: '5px',
                        }}
                      >
                        <small class='text-muted'>{ele}</small>
                      </div>
                    )
                  })}
                </div>
              </div>
              qerqe eewfewfw ewfrfe fcef fee fe
              <pre>dwf dsf dsfs dfsdf dsfds</pre>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
              <p>ljljlj jhkjhjkh4 jhjkhkjh kjhkjh</p>
            </div>

            {/* sideForm */}
            <div className='col-3 '>
              <div style={{ position: 'fixed' }} className='p-4 mt-4'>
                <h5 className='text-muted'>Strating</h5>
                <h1>{item.total_price}</h1>
                <h5 className='text-muted mt-4'>Pernight</h5>
                <select
                  class='custom-select '
                  style={{
                    width: '180px',
                    borderRadius: '0px',
                    width: '260px',
                    marginTop: '100px',
                  }}
                >
                  <option selected value='0'>
                    Select Units
                  </option>
                  <option value='1 unit'>1 units</option>
                  <option value='2 units'>2 units</option>
                  <option value='3 units'>3 units</option>
                </select>

                <DatePicker
                  className={styles.datepick}
                  selected={startDate}
                  onChange={handleChange1}
                />
                <DatePicker
                  className={styles.datepick}
                  selected={endDate}
                  onChange={handleChange2}
                />

                <select
                  class='custom-select mt-4'
                  style={{ width: '180px', borderRadius: '0px' }}
                >
                  <option selected value='0'>
                    Select Guests
                  </option>
                  <option value='1'>1 guest</option>
                  <option value='2'>2 guests</option>
                  <option value='3'>3 guests</option>
                  <option value='4'>4 guests</option>
                  <option value='5'>5 guests</option>
                  <option value='6'>6 guests</option>
                  <option value='7'>7 guests</option>
                  <option value='8'>8 guests</option>
                  <option value='9'>9 guests</option>
                  <option value='10'>10 guests</option>
                </select>
                <div class='text-muted m-2'>
                  <small>Rateplan:</small>
                </div>

                <div>
                  <div style={{ float: 'left' }}>
                    <b>Total</b>
                  </div>
                  <div style={{ float: 'right', marginRight: '20px' }}>
                    <b>Price</b>
                  </div>
                  <div style={{ clear: 'both' }} className='text-muted'>
                    <small style={{ float: 'left' }}>
                      {' '}
                      Includes taxes & <br />
                      fees
                    </small>
                    <small style={{ float: 'right', marginRight: '20px' }}>
                      <a href=''>veiw details</a>
                    </small>
                    <button
                      id={styles.searchbut}
                      type='button'
                      class='btn btn-primary mt-3'
                      style={{ borderRadius: '0px' }}
                    >
                      INSTANT BOOK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
