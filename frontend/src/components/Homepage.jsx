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
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export const Homepage = (props) => {
  // responseGoogle = (response) => {
  //   console.log(response);
  //   console.log(response.profileObj);
  // }

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [search_location, setSearchLocation] = useState('')
  const [search_location1, setSearchLocation1] = useState('')
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

  const [coordinate, setCoordinates] = useState({ "lat": null, "lng": null })
  const handleLocnSelect = async (value) => {
    const results = await geocodeByAddress(value)
    setSearchLocation(results[0]['formatted_address'])
    setSearchLocation1(results[0]['address_components'][0]['long_name'].toLowerCase())
    console.log('resul', results)
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
    filters['state'] = search_location1
    filters['start_date'] = startDate
    filters['end_date'] = endDate
    dispatch(Save_Filter(filters))
    dispatch(
      Load_Filtered_Data({
        state: search_location1,
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
        search_location1 +
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



  return (
    <div>
      {/* adding searchbar and larger image */}

      <div id={styles.largeimg}
        style={{
          paddingLeft: "15%",
          paddingRight: "15%",
          paddingTop: "10%",
          paddingBottom: "10%"

        }}>
        <div className="row">
          <div className="col-12">

            <h3 className='mt-3' style={{ color: "white" }}>
              Book <strike>Hotels</strike> Vacation Rentals
          </h3>
          </div>
          {/* <br /> */}
          <div className="col-12">

            <h3 style={{ color: "white" }}>Top Holiday Homes - Villas, Apartments & Homestays</h3>
          </div>
        </div>
        <div>



          <div class="row p-2"
            style={{ backgroundColor: "white", border: "1px solid black" }}
          >
            <div class="col-4 border ">
              <div className="pt-2">

                {/* <input
                  type='text'
                  id={styles.kol}
                  class=' input-search input-lg text-muted '

                  value={search_location}
                  style={{ paddingRight: "120px" }}
                  onChange={(e) => handleLocationChg(e)}
                /> */}
                <PlacesAutocomplete style={{ width: "100%%", height: "47px" }} className="form-control" value={search_location} onChange={setSearchLocation} onSelect={handleLocnSelect} debounce={500}>

                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (<div style={{ color: "black" }}>
                    <input {...getInputProps({ placeholder: "Location" })} />
                    <div>
                      {loading ? <div>...loading</div> : null}
                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active ? "grey" : "white"
                        }
                        // console.log('suggestions*******', suggestion)
                        return <div {...getSuggestionItemProps(suggestion, { style })}>
                          hello{suggestion.description}</div>
                      })}
                    </div>
                  </div>)}

                </PlacesAutocomplete>
              </div>
            </div>

            <div class="col-2 border">
              <div >
                <DatePicker
                  placeholderText='check In'
                  id={styles.datp}
                  value={startDate}
                  selected={startDate}
                  minDate={Date.now()}
                  onChange={handleChange1}
                />
              </div>
            </div>
            <div class="col-2 border">
              <div >
                <DatePicker
                  id={styles.datp1}
                  selected={endDate}
                  value={endDate}
                  onSelect={handleChange2}
                />
              </div>
            </div>
            <div class="col-2 border ">
              <div className="pt-2">
                <select
                  className='custom-select '
                  style={{
                    width: '150px',
                    borderRadius: '0px',
                    border: 'none',
                    marginLeft: '-11px',
                    fontSize: "14px",
                    marginTop: "-5px"
                  }}
                >
                  <option selected value='0' >
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

              </div>
            </div>
            <div class="col-2 border">
              <div>
                <button
                  type='button'
                  class='btn btn-primary pl-5 '
                  style={{ borderRadius: '0px', marginLeft: "-15px", paddingTop: "10px", paddingRight: "60px", paddingBottom: "11px", fontSize: "12px" }}
                  onClick={handleSearch}
                >
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* <h3 className='mt-3' id={styles.searchele}>
            Book <strike>Hotels</strike> Vacation Rentals
          </h3>
          <h3>Top Holiday Homes - Villas, Apartments & Homestays</h3> */}

      {/* <div
        className='row'
        style={{
          padding: '10px',
          border: '1px solid black',
          backgroundColor: 'white',
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
      </div> */}

      {/* <div className='row  mt-3'>
          <div
            className='col-12 '
            style={{
              border: '1px solid black',
              backgroundColor: 'white',
              color: 'black',
            }}
          >
            <div className='row '>
              <div className='col-4  p-2 ' style={{ border: '1px solid #666' }}>
                <div>
                  <i
                    class='fa fa-search mr-3 text-muted'
                    aria-hidden='true'
                  ></i>

                  <input
                    style={{ border: 'none' }}
                    type='text'
                    class=' input-search input-lg text-muted'
                    value={search_location}
                    onChange={(e) => handleLocationChg(e)}
                    placeholder='location'
                  />
                </div>
              </div>
              <div className='col-2 ' style={{ border: '1px solid #666' }}>
                <i class='fas fa-door-open text-muted'></i>
                <DatePicker
                  placeholderText='check In'
                  id={styles.datp}
                  onChange={handleChange1}
                />
              </div>
              <div className='col-2 ' style={{ border: '1px solid #666' }}>
                <i class='fas fa-door-closed text-muted'></i>
                <DatePicker
                  placeholderText='check Out'
                  onChange={handleChange2}
                  id={styles.datp}
                />
              </div>

              <div className='col-2' style={{ border: '1px solid #666' }}>
                <select
                  className='custom-select'
                  style={{
                    width: '160px',
                    borderRadius: '0px',
                    border: 'none',
                    marginLeft: '-11px',
                  }}
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
              </div>

              <div className='col-2' style={{ border: '1px solid grey' }}>
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
            </div>
          </div>
        </div>
      </div> */}

      {/* Top destination cards */}
      <div className={styles.topdes}>
        <div className={styles.head}>
          <div style={{ fontSize: '22px' }}>Top Destinations</div>
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
            dots={false}
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
                  className=' col-11 '
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
                        textTransform: 'capitalize',
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
          className='col-4 mt-5 '

        > <div className="text-center p-3 shadow  bg-white rounded" style={{
          marginLeft: '65px',
        }}>
            <div style={{ fontSize: '19.2px', color: " rgb(53, 51, 51)", fontWeight: "unset" }}>
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
        </div>

        <div className='col-8 mt-5' >
          <div className="row" >
            <div className="col-3">
              <div

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

            <div className="col-3">
              <div

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

            <div className="col-3">
              <div

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

            <div className="col-3">
              <div

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


          <div className="row mt-5" >
            <div className="col-3">
              <div
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


            <div className="col-3">
              <div
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

            <div className="col-3">
              <div

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

            <div className="col-3">
              <div

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




          <div className="row mt-5">
            <div className="col-3">
              <div

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

            <div className="col-3">
              <div

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
            <div className="col-3">
              <div

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
            <div className="col-3">
              <div

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

        </div >
      </div >

      {/* two static card */}
      <div>
        <div className='row ml-5 mt-5 mr-5'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 p-3'>
            <div

              className='p-5 text-center shadow  bg-white rounded'
            >
              <h6 style={{ color: " rgb(53, 51, 51)", fontWeight: "lighter", fontSize: "19px" }}>Holiday Home Investment Opportunities</h6>
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

              </div>

              <div className="row mt-3">
                <div className="col-12" >
                  <button
                    type='button'
                    class='btn btn-primary p-2 pr-4 pl-4'
                    style={{
                      borderRadius: '0px',

                      fontSize: "12px",

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
              <h6 style={{ color: " rgb(53, 51, 51)", fontWeight: "lighter", fontSize: "19px" }}>Are you a holiday home owner/manager?</h6>
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
              </div>

              <div className="row mt-3">
                <div className="col-12" >
                  <button
                    type='button'
                    class='btn btn-primary p-2 pl-4 pr-4'
                    style={{
                      borderRadius: '0px',
                      fontSize: "12px",

                    }}
                  >
                    LIST YOUR PROPERTIES
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
          <div style={{ fontSize: '22px' }}>Vacation Ideas</div>
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
            dots={false}
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
                  className=' col-11 '
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
                        textTransform: "capitalize",
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



      {/* <DatePicker selected={this.state.startDate} onChange={this.handleChange1} />
      <DatePicker selected={this.state.endDate} onChange={this.handleChange2} /> */}
    </div >
  )
}




