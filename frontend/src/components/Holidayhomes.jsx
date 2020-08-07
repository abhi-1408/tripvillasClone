import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import styles from './css/Holidayhome.module.css'
import InfiniteCarousel from 'react-leaf-carousel'
import { useState } from 'react'
import dum3 from './imgurl/dum3.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import {

  Load_Filtered_Data,
  Save_Filter,
} from '../Redux/filter/action'
import {
  Load_Recommended_State,
} from '../Redux/recommend/action'
import { Link, useHistory } from 'react-router-dom'
//import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton'

import ReactGa from 'react-ga'

export const Holidayhomes = (props) => {
  console.log('PROPS IN HOLDAY HOME', props)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [flag, setFlag] = useState(true)



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
  let dispatch = useDispatch()
  let com = useSelector((state) => state.common)

  const { recommended_state, recommended_review, filters } = com

  let history = useHistory()

  const handleSearch = () => {
    ReactGa.event({
      category: 'HOLIDAY HOME SEARCH CLICKED',
      action: 'searched by date',
    })
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
    // dispatch(Reset_filter())
    filters['state'] = props.match.params['state']
    filters['start_date'] = startDate
    filters['end_date'] = endDate
    dispatch(Save_Filter(filters))
    dispatch(
      Load_Filtered_Data({
        state: props.match.params['state'],
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
        props.match.params['state'] +
        '&' +
        'check_in=' +
        sd +
        '&check_out=' +
        ed
      history.push('/filterby' + s)
    }, 2000)
  }

  useEffect(() => {
    ReactGa.initialize('UA-173941004-2')

    ReactGa.pageview(window.location.pathname + window.location.search)
    let info = props.match.params
    console.log('params are', info)

    // let timeout = setTimeout(() => {
    //   setFlag(false)
    // }, 1000000)

    if (flag) {
      dispatch(Load_Recommended_State(info))
      // clearTimeout(timeout)
    }
  }, [])

  const title = [
    'delhi',
    'goa',
    'southern_province',
    'phuket',
    'kerala',
    'bali',
    'himachal pradesh',
  ]
  if (recommended_state.length > 0 && recommended_review.length > 0) {
    // return (

    return (
      <div>
        <div
          style={{
            paddingLeft: '60px',
            paddingRight: '60px',
            paddingTop: '45px',
            textAlign: 'center',
          }}
        >
          <div
            className=' text-center shadow p-3 mb-5 bg-white rounded'
            style={{
              padding: '40px',
            }}
          >
            <div>
              <h3 className='text-center' style={{ transform: "capitalize" }}>{props.match.params.state.charAt(0).toUpperCase() + props.match.params.state.slice(1)} Holiday Homes</h3>
              <h4 className='text-center mt-3'>
                <small style={{ color: ' rgb(83, 81, 81)' }}>
                  We have 300 Vacation Rentals - search by dates for
                  availability
                </small>
              </h4>
              <div
                className='row mt-4 mb-5'
                style={{ justifyContent: 'center' }}
              >
                <div className="row border">
                  <div className="col-3 border">
                    <div>
                      <DatePicker
                        id={styles.datp}
                        value={startDate}
                        selected={startDate}
                        minDate={Date.now()}
                        onChange={handleChange1}
                      />
                    </div>
                  </div>
                  <div className="col-3 border">
                    <div>
                      <DatePicker
                        id={styles.datp1}
                        placeholderText='check-out'
                        value={endDate}
                        selected={endDate}
                        onChange={handleChange2}
                      />
                    </div>
                  </div>
                  <div className="col-3 border">
                    <div>
                      <select
                        className='custom-select '
                        style={{
                          width: '150px',
                          borderRadius: '0px',
                          border: 'none',
                          marginLeft: '-11px',
                          fontSize: "14px",

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
                  <div className="col-3 border">
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
        </div>

        <div>
          <h5
            style={{
              paddingLeft: '60px',
              marginTop: '30px',
              marginBottom: '20px',
            }}
          >
            {props.match.params.state.charAt(0).toUpperCase() + props.match.params.state.slice(1)}  holiday homes
          </h5>

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
            slidesToScroll={4}
            slidesToShow={4}
            scrollOnDevice={true}
          >
            {/* map cards */}
            {recommended_state.map((ele) => (
              <div className='col-12' id={styles.pro}>
                <div
                  style={{
                    backgroundImage: `url(${ele['image_medium'][1]})`,
                    backgroundRepeat: 'no-repeat',
                    height: '200px',
                    width: '276px',
                  }}
                ></div>
                <div className='p-3' style={{ height: '200px' }}>
                  <Link to={`/property/${ele['id']}`}>
                    <small className='text-muted mb-2'>
                      Ref Id#{ele['id']}
                    </small>
                    <p style={{ fontSize: '14px' }}>
                      {ele['title']}
                      <p>
                        <p className='text-muted'>{ele['location_name']}</p>
                      </p>
                    </p>

                    <p>
                      <small>
                        {ele['property_type']} | {ele['number_of_bathrooms']}{' '}
                        Bath | {ele['number_of_rooms']} BR | {ele['occupancy']}{' '}
                        Guests
                      </small>
                    </p>
                    <p>
                      INR{ele['total_price']}
                      <small className='text-muted'> pernight</small>
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </InfiniteCarousel>
        </div>

        {/* <div>
          {recommended_state && recommended_state.map(e => (
            <h2>title: {e['title']}</h2>
          ))}
        </div> */}
        {/* Top rated Holidayhomes */}

        <h5
          style={{
            paddingLeft: '60px',
            marginTop: '30px',
            marginBottom: '20px',
          }}
        >
          Top Rated holiday homes
        </h5>

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
          slidesToScroll={4}
          slidesToShow={4}
          scrollOnDevice={true}
        >
          {/* map cards */}
          {recommended_review.map((ele) => {
            return (
              <div className='col-12' id={styles.pro}>
                <div
                  style={{
                    backgroundImage: `url(${ele['image_medium'][1]})`,
                    backgroundRepeat: 'no-repeat',
                    height: '150px',
                    width: '276px',
                  }}
                ></div>
                <div className='p-3' style={{ height: '200px' }}>
                  <Link to={`/property/${ele['id']}`}>
                    <p>
                      <b>Rated {ele['review_rating']}/5</b>
                    </p>
                    <p style={{ fontSize: '14px' }}>{ele['title']}</p>

                    <p className='text-muted'>{ele['location_name']}</p>
                  </Link>
                </div>
              </div>
            )
          })}
        </InfiniteCarousel>


        <h5
          style={{
            paddingLeft: '60px',
            marginTop: '30px',
            marginBottom: '20px',
          }}
        >
          About Location
        </h5>
        <div
          style={{
            paddingLeft: '60px',
            paddingRight: '60px',
            marginTop: '30px',
          }}
        >
          <p>
            <small className='text-muted'>
              Goa is India's smallest state by area and the fourth smallest by
              population. Located on the west coast of India in the region known
              as the Konkan, it is bounded by the state of Maharashtra to the
              north, and by Karnataka to the east and south, while the Arabian
              Sea forms its western coast. Panaji is the state's capital, while
              Vasco da Gama is the largest city. The historic city of Margao
              still exhibits the cultural influence of the Portuguese, who first
              landed in the early 16th century as merchants, and conquered it
              soon thereafter. The Portuguese overseas territory existed for
              about 450 years, until it was annexed by India in 1961. Renowned
              for its beaches, places of worship and world heritage
              architecture, Goa is visited by large numbers of international and
              domestic tourists each year. It also has rich flora and fauna,
              owing to its location on the Western Ghats range, which is
              classified as a biodiversity hotspot.
            </small>
          </p>

          <p>
            <small className='text-muted'>
              Goa has two World Heritage Sites: the Bom Jesus Basilica and a few
              designated convents. The Basilica holds the mortal remains of St.
              Francis Xavier, regarded by many Catholics as the patron saint of
              Goa (the patron of the Archdiocese of Goa is actually the Blessed
              Joseph Vaz). Once every twelve years, the body is taken down for
              veneration and for public viewing. The last such event was
              conducted in 2004. The Velhas Conquistas regions are also known
              for its Goa-Portuguese style architecture. There are many forts in
              Goa such as Tiracol, Chapora, Corjuem, Aguada, Gaspar Dias and
              Cabo de Rama.
            </small>
          </p>
          <p>
            <small className='text-muted'>
              In many parts of Goa, mansions constructed in the Indo-Portuguese
              style architecture still stand, though in some villages, most of
              them are in a dilapidated condition. Fontainhas in Panaji has been
              declared a cultural quarter, showcasing the life, architecture and
              culture of Goa. Some influences from the Portuguese era are
              visible in some of Goa's temples, notably the Mangueshi Temple and
              the Mahalasa Temple, although after 1961, many of these were
              demolished and reconstructed in the indigenous Indian style. Goa
              also has a few museums, the two important ones being Goa State
              Museum and the Naval Aviation Museum. The Aviation museum is the
              only one of its kind in the whole of India. Also, a place not well
              known to tourists is the Goa Science Center, which is located in
              Panjim.
            </small>
          </p>
        </div>

        <h5
          style={{
            paddingLeft: '60px',
            marginTop: '30px',
            marginBottom: '20px',
          }}
        >
          FAQ's
        </h5>
        <div
          style={{
            paddingLeft: '60px',
            paddingRight: '60px',
            marginTop: '30px',
          }}
        >
          <p>
            <small className='text-muted'>
              <b>Can I get a holiday home with swimming pool in Goa?</b>
            </small>
          </p>
          <p>
            <small className='text-muted'>
              Yes. We have close to 197 holiday homes with swimming pool in Goa.
              You can also choose a villa or bungalow with a swimming pool. Each
              vacation rental will have its own swimming pool policies & timings
              though. Make sure you talk to the property manager or the owner
              when you make a reservation.
            </small>
          </p>
          <p>
            <small className='text-muted'>
              <b>What are the most popular destinations in Goa?</b>
            </small>
          </p>
          <p>
            <small className='text-muted'>
              Tripvillas has around 300 of vacation rentals in Goa. Some of the
              most popular destinations are Candolim (62 vacation rentals),
              Calangute (35 vacation rentals), Arpora (32 vacation rentals),
              Baga (13 vacation rentals), Benaulim (12 vacation rentals), Varca
              (11 vacation rentals), Morjim (10 vacation rentals), Anjuna (9
              vacation rentals), Colva (9 vacation rentals), Sinquerim (9
              vacation rentals).
            </small>
          </p>
          <p>
            <small className='text-muted'>
              <b>
                Can I get any accommodation in Goa if I am travelling with my
                family or a group of friends?
              </b>
            </small>
          </p>
          <p>
            <small className='text-muted'>
              You will have to choose number of bedrooms depending on the group
              size. You can go for any of the 91 Apartments, 83 Villas. You can
              go for 46 1BHK, 56 2BHKS, 46 3BHKS, 24 4BHKS, 9 5BHKS holiday
              homes
            </small>
          </p>
          <p>
            <small className='text-muted'>
              <b>
                What are the different types of holiday homes I can get in Goa?
              </b>
            </small>
          </p>
          <p>
            <small className='text-muted'>
              Tripvillas has different types of holiday homes you can choose
              from in Goa. We have 91 Apartments, 5 Cottages, 10 Homestays, 28
              Resorts, 74 Rooms, 83 Villas
            </small>
          </p>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div
          style={{
            paddingLeft: '60px',
            paddingRight: '60px',
            paddingTop: '45px',
            textAlign: 'center',
          }}
        >
          <div
            className=' text-center shadow p-3 mb-5 bg-white rounded'
            style={{
              padding: '40px',
            }}
          >
            <div>
              <h3 className='text-center'>{props.match.params.state.charAt(0).toUpperCase() + props.match.params.state.slice(1)} Holiday Homes</h3>
              <h4 className='text-center mt-3'>
                <small style={{ color: ' rgb(83, 81, 81)' }}>
                  We have 300 Vacation Rentals - search by dates for
                  availability
                </small>
              </h4>
              <div
                className='row mt-4 mb-5'
                style={{ justifyContent: 'center' }}
              >
                {/* {' '}
                <form class='form-inline'>
                  <DatePicker
                    placeholderText='check-in'
                    id={styles.datp}
                    value={startDate}
                    onChange={handleChange1}
                  />
                  <DatePicker
                    id={styles.datp1}
                    placeholderText='check-out'
                    value={endDate}
                    onChange={handleChange2}
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
                </form> */}
              </div>
            </div>
          </div>
        </div>
        <h5
          style={{
            paddingLeft: '60px',
            marginTop: '30px',
            marginBottom: '20px',
          }}
        >
          <Skeleton className='py-2' variant='text' width={250} />
        </h5>

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
          slidesToScroll={4}
          slidesToShow={4}
          scrollOnDevice={true}
        >
          {/* map cards */}
          {Array.from(Array(10), (e, i) => {
            return (
              <div className='col-12' id={styles.pro}>
                {/* <div
                  style={{
                    backgroundImage: `url(${ele['image_medium'][1]})`,
                    backgroundRepeat: 'no-repeat',
                    height: '200px',
                    width: '276px',
                  }}
                ></div> */}
                <Skeleton variant='rect' width={276} height={200} />
                <div style={{ height: '200px' }}>
                  {/* <Link to={`/property/${ele['id']}`}> */}
                  <Skeleton variant='text' width={200} />

                  <Skeleton variant='text' width={100} />

                  <Skeleton variant='rect' width={276} height={40} />

                  <Skeleton variant='text' width={100} />
                  {/* </Link> */}
                </div>
              </div>
            )
          })}
        </InfiniteCarousel>

        <h5
          style={{
            paddingLeft: '60px',
            marginTop: '30px',
            marginBottom: '20px',
          }}
        >
          <Skeleton className='py-2' variant='text' width={250} />
        </h5>

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
          slidesToScroll={4}
          slidesToShow={4}
          scrollOnDevice={true}
        >
          {/* map cards */}
          {Array.from(Array(10), (e, i) => {
            return (
              <div className='col-12' id={styles.pro}>
                {/* <div
                  style={{
                    backgroundImage: `url(${ele['image_medium'][1]})`,
                    backgroundRepeat: 'no-repeat',
                    height: '200px',
                    width: '276px',
                  }}
                ></div> */}
                <Skeleton variant='rect' width={276} height={200} />
                <div style={{ height: '200px' }}>
                  {/* <Link to={`/property/${ele['id']}`}> */}
                  <Skeleton variant='text' width={200} />

                  <Skeleton variant='text' width={100} />

                  <Skeleton variant='rect' width={276} height={40} />

                  <Skeleton variant='text' width={100} />
                  {/* </Link> */}
                </div>
              </div>
            )
          })}
        </InfiniteCarousel>

        {/* {Array.from(Array(item.number_of_rooms), (e, i) => {
                                        return <option value='{i+1} unit'>{i + 1} units</option>
                                    })} */}
        {/* <div class='spinner-border' role='status'>
          <span class='sr-only'>Loading...</span>
        </div> */}
      </div>
    )
  }
}
