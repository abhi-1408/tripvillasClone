import React, { useEffect } from 'react'
import InfiniteCarousel from 'react-leaf-carousel'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Navbar from './Navbar'
import styles from './css/Homepage.module.css'
import dum1 from './imgurl/dum1.jpeg'
import dum2 from './imgurl/dum2.jpeg'
import dum3 from './imgurl/dum3.jpeg'
import dum4 from './imgurl/dum4.jpeg'
import dum5 from './imgurl/dum5.jpeg'
import dum6 from './imgurl/dum6.jpeg'
import dum7 from './imgurl/dum7.jpeg'
import ho1 from './imgurl/ho1.svg'
import ho2 from './imgurl/ho2.svg'
import ho3 from './imgurl/ho3.svg'
import ho4 from './imgurl/ho4.svg'
import s1 from './imgurl/s1.svg'
import s2 from './imgurl/s2.svg'
import s3 from './imgurl/s3.svg'
import s4 from './imgurl/s4.svg'
import s5 from './imgurl/s5.svg'
import s6 from './imgurl/s6.svg'
import s7 from './imgurl/s7.svg'
import s8 from './imgurl/s8.svg'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Login_Fetch, Logout_User } from '../Redux/login/action'
import {
  Load_Filtered_Data,
  Reset_filter,
  Save_Filter,
} from '../Redux/common/action'
import { Redirect, useHistory, Link } from 'react-router-dom'
import { Reset_All } from '../Redux/common/action'
import $ from 'jquery'

export const Homepage = (props) => {
  // responseGoogle = (response) => {
  //   console.log(response);
  //   console.log(response.profileObj);
  // }

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [search_location, setSearchLocation] = useState('delhi')
  const [guest, setGuest] = useState(0)
  // const [location, setLocation] = useState('')

  const handleChange1 = (date) => {
    if (endDate < date) {
      setEndDate(date)
      setStartDate(date)
    } else {
      setStartDate(date)
    }
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

  const handleGuestChg = (e) => {
    console.log('select', e.target.value)
    setGuest(e.target.value)
  }

  const handleLocationChg = (e) => {
    console.log('locn chng', e.target.value)
    setSearchLocation(e.target.value)
  }

  let dispatch = useDispatch()
  let history = useHistory()
  let com = useSelector((state) => state.common)
  const { filters } = com

  const handleSearch = () => {
    console.log('handle search clicked')
    let sd =
      startDate.getFullYear() +
      '-' +
      (startDate.getMonth() + 1) +
      '-' +
      startDate.getDate()
    let ed =
      endDate.getFullYear() +
      '-' +
      (endDate.getMonth() + 1) +
      '-' +
      endDate.getDate()
    dispatch(Reset_filter())
    filters['state'] = search_location
    filters['start_date'] = startDate
    filters['end_date'] = endDate
    dispatch(Save_Filter(filters))
    dispatch(
      Load_Filtered_Data({
        state: search_location,
        check_in: sd,
        check_out: ed,
      })
    )
    // return <Redirect to='/filterby' />
    setTimeout(() => {
      let s = ''
      s =
        s +
        '?state=' +
        search_location +
        '&' +
        'check_in=' +
        sd +
        '&check_out=' +
        ed
      history.push('/filterby' + s)
    }, 2000)
  }

  // let log = useSelector((state) => state.login);
  // let { user_loggedin, auth_logged, error_logged, message_logged } = log
  // let dispatch = useDispatch()
  // const handleLogout = () => {
  //   dispatch(Logout_User())
  // }
  useEffect(() => {
    dispatch(Reset_All())
  }, [])

  const arr = [dum1, dum2, dum3, dum4, dum5, dum6, dum7]
  const title = [
    'delhi',
    'goa',
    'southern province',
    'phuket',
    'kerala',
    'bali',
    'himachal pradesh',
  ]

  const modal = () => {
    window.$('#loadingModal').modal('show')
    setTimeout(() => {
      console.log('completed')
      window.$('#loadingModal').modal('hide')
    }, 3000)
  }

  $(document).ready(function () {
    window.$('#loadingModal').modal({
      show: false,
      backdrop: 'static',
    })
  })

  return (
    <div>
      {/* adding searchbar and larger image */}

      <div id={styles.largeimg} style={{ height: '450px' }}>
        <div style={{ padding: '10%', marginLeft: '30px', color: 'white' }}>
          <h3 className='mt-3' id={styles.searchele}>
            Book <strike>Hotels</strike> Vacation Rentals
          </h3>
          <h3>Top Holiday Homes - Villas, Apartments & Homestays</h3>
          {/* <form
            class='form-inline text-center '
            role='form'
            style={{
              padding: '10px',
              border: '1px solid black',
              backgroundColor: 'white',
            }}
          >
            <div class='form-group'>
              <input
                type='text'
                class='form-control input-lg input-search'
                value={search_location}
                onChange={(e) => handleLocationChg(e)}
                placeholder='location'
              />

              <DatePicker
                selected={startDate}
                id={styles.datp}
                onChange={handleChange1}
              />
              <DatePicker
                selected={endDate}
                onChange={handleChange2}
                id={styles.datp}
              />


              <select
                class='custom-select'
                onChange={(e) => handleGuestChg(e)}
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
              <button
                id={styles.searchbut}
                type='button'
                class='btn btn-primary'
                style={{ borderRadius: '0px' }}
                onClick={handleSearch}
              >
                SEARCH
              </button>
            </div>
          </form> */}

          <div
            className='row'
            style={{
              padding: '10px',
              border: '1px solid black',
              backgroundColor: 'white',
              width: '97%',
            }}
          >
            <form class='form-inline'>
              <input
                type='text'
                class='form-control input-lg input-search'
                value={search_location}
                onChange={(e) => handleLocationChg(e)}
                placeholder='location'
              />

              <div>
                <DatePicker
                  selected={startDate}
                  id={styles.datp}
                  onChange={handleChange1}
                />
              </div>
              <DatePicker
                selected={endDate}
                onChange={handleChange2}
                id={styles.datp}
              />
              <select
                class='custom-select'
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
              <button
                id={styles.searchbut}
                type='button'
                class='btn btn-primary'
                style={{ borderRadius: '0px' }}
                onClick={handleSearch}
              >
                SEARCH
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Top destination cards */}
      <div className={styles.topdes}>
        <div className={styles.head}>
          <div style={{ fontSize: '25px' }}>Top Destinations</div>
        </div>
        <div className={styles.cara}>
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
            ]}
            dots={true}
            showSides={true}
            sidesOpacity={0.5}
            sideSize={0.1}
            slidesToScroll={1}
            slidesToShow={5}
            scrollOnDevice={true}
          >
            {arr.map((item, ind) => (
              <div>
                <div
                  className=' col-12 '
                  style={{
                    color: 'white',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${item})`,
                    height: '150px',
                    width: '214.8px',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <p id={styles.smallcard}>
                    <Link
                      class='text-light  text-center'
                      style={{
                        textDecoration: 'none',
                        fontSize: '18px',
                        textTransform: 'uppercase',
                      }}
                      to={`/holiday/${title[ind]}`}
                    >
                      {title[ind]}
                    </Link>

                    <p>
                      <small>Vacation Rentals</small>
                    </p>
                  </p>
                </div>
              </div>
            ))}
          </InfiniteCarousel>
        </div>
      </div>

      {/* manage cards */}
      <div className='row'>
        <div
          className='col-3 mt-5 text-center pt-4 pl-5  pb-5  pr-5 shadow  bg-white rounded'
          style={{
            marginLeft: '65px',
          }}
        >
          <div style={{ fontSize: '19.2px' }}>
            Fully Managed Communities By Tripvillas
          </div>
          <div className='row mt-5'>
            <div className='col-6'>
              <img src={ho1} height='50px' width='50px' />
              <p className='mt-3 text-muted'>
                <small>High Quality housekeeping</small>
              </p>
            </div>

            <div className='col-6'>
              <img src={ho2} height='50px' width='50px' />
              <p className='mt-3 text-muted'>
                <small>Comfortable Linen and Toiletries</small>
              </p>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-6'>
              <img src={ho3} height='50px' width='50px' />
              <p className='mt-3 text-muted'>
                <small>Quality Furniture & Fittings</small>
              </p>
            </div>

            <div className='col-6'>
              <img src={ho4} height='50px' width='50px' />
              <p className='mt-3 text-muted'>
                <small>Food Delivery Or Central Restaurant</small>
              </p>
            </div>
          </div>
        </div>

        <div className='col-8 mt-5'>
          <div className='row'>
            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',

                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum1})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    Sparsh Resort
                    <p>
                      <small>Karjat, Maharastra</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',

                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum2})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    Lavasa
                    <p>
                      <small>lavasa, Maharastra</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',

                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum3})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    Tata Rio De Goa
                    <p>
                      <small>Dabolim,Goa</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',
                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum4})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    Puravankara Goa
                    <p>
                      <small>Dabolim,Goa</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',

                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum5})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    White villas
                    <p>
                      <small>Shahpur, Maharastra</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',

                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum6})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    White Villas
                    <p>
                      <small>kasara, Maharastra</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',

                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum7})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    Kenisha Holiday
                    <p>
                      <small>Pawasalawadi,Maharastra</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',
                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum1})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    Umiya Serene
                    <p>
                      <small>Nerul,Goa</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',

                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum2})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    Oasis Alibaug
                    <p>
                      <small>Alibaug, Maharastra</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',

                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum3})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    Dreamz Shiroda
                    <p>
                      <small>Shiroda, Maharastra</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',

                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum3})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    Pristine Bay
                    <p>
                      <small>Tamilnadu</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>

            <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <div
                className='m-3'
                style={{
                  height: '150px',
                  width: '172.25px',
                  color: 'white',
                  backgroundImage: `linear-gradient( rgba(34, 34, 34, 0.6),rgba(34, 34, 34, 0.6)),url(${dum4})`,
                }}
              >
                <Link
                  class='text-light  text-center'
                  style={{ textDecoration: 'none' }}
                >
                  <p id={styles.smallcard}>
                    Ampelon
                    <p>
                      <small>Karnataka</small>
                    </p>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* two static card */}
      <div>
        <div className='row ml-5 mt-5 mr-5'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 p-3'>
            <div
              style={{ marginLeft: '-16px' }}
              className='p-5 text-center shadow  bg-white rounded'
            >
              <h5>Holiday Home Investment Opportunities</h5>
              <div className='row'>
                <div className='col-3 mt-4 text-center'>
                  <img src={s1} height='40px' width='40px' />
                  <p className='mt-3'>
                    <small className='text-muted '>
                      Low Cost High Appreciation
                    </small>
                  </p>
                </div>

                <div className='col-3 mt-4 text-center'>
                  <img src={s2} height='40px' width='40px' />
                  <p className='mt-3'>
                    <small className='text-muted '>
                      Professionally Managed
                    </small>
                  </p>
                </div>

                <div className='col-3 mt-4 text-center'>
                  <img src={s3} height='40px' width='40px' />
                  <p className='mt-3'>
                    <small className='text-muted '>
                      Guaranteed To Produce Income
                    </small>
                  </p>
                </div>

                <div className='col-3 mt-4 text-center'>
                  <img src={s4} height='40px' width='40px' />
                  <p className='mt-3'>
                    <small className='text-muted '>
                      We Designed Floor Plans
                    </small>
                  </p>
                </div>
                <div className=' mt-3' style={{ marginLeft: '100px' }}>
                  <button
                    type='button'
                    class='btn btn-primary '
                    style={{
                      borderRadius: '0px',
                      width: '350px',
                    }}
                  >
                    EXPLORE INVESTMENT OPPORTUNITIES
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-12 col-md-6 col-lg-6 '>
            <div
              style={{ marginLeft: '-16px' }}
              className='p-5 text-center mt-3 ml-4 shadow  bg-white rounded'
            >
              <h5>Are you a holiday home owner/manager?</h5>
              <div className='row'>
                <div className='col-3 mt-4 text-center'>
                  <img src={s5} height='40px' width='40px' />
                  <p className='mt-3'>
                    <small className='text-muted '>Get Bookings</small>
                  </p>
                </div>

                <div className='col-3 mt-4 text-center'>
                  <img src={s6} height='40px' width='40px' />
                  <p className='mt-3'>
                    <small className='text-muted '>
                      Dashboard - Total Control
                    </small>
                  </p>
                </div>

                <div className='col-3 mt-4 text-center'>
                  <img src={s7} height='40px' width='40px' />
                  <p className='mt-3'>
                    <small className='text-muted '>Instant Book</small>
                  </p>
                </div>

                <div className='col-3 mt-4 text-center'>
                  <img src={s8} height='40px' width='40px' />
                  <p className='mt-3'>
                    <small className='text-muted '>
                      Both iOS & Android App
                    </small>
                  </p>
                </div>
                <div
                  className=' mt-3'
                  style={{
                    marginLeft: '180px',
                    borderRadius: '0px',
                    width: '200px',
                  }}
                >
                  <button
                    type='button'
                    class='btn btn-primary '
                    style={{
                      borderRadius: '0px',
                      width: '250px',
                      marginLeft: '-45px',
                    }}
                  >
                    LIST YOUR PROPERTY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* vacation ideas */}

      <div className={styles.topdes}>
        <div className={styles.head}>
          <div style={{ fontSize: '25px' }}>Vacation Ideas</div>
        </div>
        <div className={styles.cara}>
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
            ]}
            dots={true}
            showSides={true}
            sidesOpacity={0.5}
            sideSize={0.1}
            slidesToScroll={1}
            slidesToShow={5}
            scrollOnDevice={true}
          >
            {arr.map((item, ind) => (
              <div>
                <div
                  className=' col-12 '
                  style={{
                    color: 'white',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${item})`,
                    height: '150px',
                    width: '214.8px',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <p id={styles.smallcard}>
                    <Link
                      class='text-light  text-center'
                      style={{
                        textDecoration: 'none',
                        fontSize: '18px',
                        textTransform: 'uppercase',
                      }}
                      to={`/holiday/${title[ind]}`}
                    >
                      {title[ind]}
                    </Link>

                    <p>
                      <small>Vacation Rentals</small>
                    </p>
                  </p>
                </div>
              </div>
            ))}
          </InfiniteCarousel>
        </div>
      </div>

      {/* footer */}

      <ul class='nav nav-tabs' id='myTab' role='tablist'>
        <li class='nav-item'>
          <a
            class='nav-link active'
            id='home-tab'
            data-toggle='tab'
            href='#home'
            role='tab'
            aria-controls='home'
            aria-selected='true'
          >
            Asia
          </a>
        </li>
        <li class='nav-item'>
          <a
            class='nav-link'
            id='profile-tab'
            data-toggle='tab'
            href='#profile'
            role='tab'
            aria-controls='profile'
            aria-selected='false'
          >
            Europe
          </a>
        </li>
        <li class='nav-item'>
          <a
            class='nav-link'
            id='contact-tab'
            data-toggle='tab'
            href='#contact'
            role='tab'
            aria-controls='contact'
            aria-selected='false'
          >
            North America
          </a>
        </li>

        <li class='nav-item'>
          <a
            class='nav-link'
            id='contact-tab'
            data-toggle='tab'
            href='#contact'
            role='tab'
            aria-controls='contact'
            aria-selected='false'
          >
            South America{' '}
          </a>
        </li>
        <li class='nav-item'>
          <a
            class='nav-link'
            id='contact-tab'
            data-toggle='tab'
            href='#contact'
            role='tab'
            aria-controls='contact'
            aria-selected='false'
          >
            Africa{' '}
          </a>
        </li>
        <li class='nav-item'>
          <a
            class='nav-link'
            id='contact-tab'
            data-toggle='tab'
            href='#contact'
            role='tab'
            aria-controls='contact'
            aria-selected='false'
          >
            Oceania{' '}
          </a>
        </li>
      </ul>
      <div class='tab-content' id='myTabContent'>
        <div
          class='tab-pane fade show active'
          id='home'
          role='tabpanel'
          aria-labelledby='home-tab'
        >
          ...
        </div>
        <div
          class='tab-pane fade'
          id='profile'
          role='tabpanel'
          aria-labelledby='profile-tab'
        >
          ...
        </div>
        <div
          class='tab-pane fade'
          id='contact'
          role='tabpanel'
          aria-labelledby='contact-tab'
        >
          ...
        </div>
      </div>

      {/* <DatePicker selected={this.state.startDate} onChange={this.handleChange1} />
      <DatePicker selected={this.state.endDate} onChange={this.handleChange2} /> */}

      <button type='button' class='btn btn-primary' onClick={modal}>
        loader
      </button>

      <div class='modal fade' id='loadingModal' tabindex='-1' role='dialog'>
        <div
          class='modal-dialog modal-dialog-centered d-flex justify-content-center'
          role='document'
        >
          <div class='spinner-border' role='status'>
            <span class='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
