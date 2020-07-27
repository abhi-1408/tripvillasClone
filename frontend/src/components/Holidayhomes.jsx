import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import styles from './css/Homepage.module.css'
import InfiniteCarousel from 'react-leaf-carousel'
import { useState } from 'react'
import dum3 from './imgurl/dum3.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import { Load_Recommended_State, Load_Filtered_Data, Save_Filter } from '../Redux/common/action'
import { Link, useHistory } from 'react-router-dom'


export const Holidayhomes = (props) => {
  console.log('PROPS IN HOLDAY HOME', props)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleChange1 = (date) => {
    if (endDate < date) {
      setEndDate(date)
      setStartDate(date)
    }
    else {

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
  let com = useSelector(state => state.common)

  const { recommended_state,
    recommended_review, filters } = com


  let history = useHistory()


  const handleSearch = () => {
    console.log('handle search clicked')
    let sd = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
    let ed = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
    // dispatch(Reset_filter())
    filters['state'] = props.match.params['state']
    filters['start_date'] = startDate
    filters['end_date'] = endDate
    dispatch(Save_Filter(filters))
    dispatch(Load_Filtered_Data({ "state": props.match.params['state'], "check_in": sd, "check_out": ed }))
    // return <Redirect to='/filterby' />
    setTimeout(() => {
      let s = ''
      s = s + '?state=' + props.match.params['state'] + '&' + 'check_in=' + sd + '&check_out=' + ed;
      history.push('/filterby' + s)

    }, 2000)
  }


  useEffect(() => {
    let info = props.match.params
    console.log('params are', info)
    dispatch(Load_Recommended_State(info))
  }, [])

  const title = ['delhi', 'goa', 'southern_province', 'phuket', 'kerala', 'bali', 'himachal pradesh']
  if (recommended_state.length > 0 && recommended_review.length > 0) {

    return (
      <div>
        <div
          style={{
            width: '100%',
            height: '330px',
            padding: '50px',
          }}
          className='container text-center mt-5 shadow  bg-white rounded'
        >
          {/* searchbox */}

          <div>
            <h2>item holiday homes</h2>
            <p style={{ fontSize: '25px' }}>
              We have totalitem Vacation Rentals - search by dates for
              availability
            </p>

            <form
              class='form-inline text-center '
              role='form'
              style={{
                padding: '10px',
                backgroundColor: 'white',
                marginLeft: '150px',
              }}
            >
              <div class='form-group '>
                <DatePicker
                  className={styles.datepick}
                  selected={startDate}
                  value={startDate}
                  onChange={handleChange1}
                />
                <DatePicker
                  className={styles.datepick}
                  selected={endDate}
                  value={endDate}
                  onChange={handleChange2}
                />

                {/* <input type="text" class="form-control input-lg input-search" placeholder="checkin checkout" /> */}

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
              </div>
            </form>
          </div>
        </div>
        <div>
          <h3 className='m-4 mt-5'>City holiday homes</h3>

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
            slidesToScroll={4}
            slidesToShow={4}
            scrollOnDevice={true}
          >
            {/* map cards */}
            {
              recommended_state.map(ele => (

                <div class='card ' style={{ width: '15rem', height: "400px" }}>
                  <img class='card-img-top' style={{ width: "200px", height: "200px", objectFit: "contain" }} src={ele['image_medium'][1]} alt='Card image cap' />
                  <div class='card-body'>
                    <h5 class='card-title'>#id <Link to={`/property/${ele['id']}`} >{ele['id']}</Link></h5>
                    <h5 class='card-title'>Price: {ele['total_price']}</h5>
                    <p class='card-text'>
                      {ele['title']}
                    </p>
                  </div>
                </div>
              ))
            }



          </InfiniteCarousel>
        </div>

        {/* <div>
          {recommended_state && recommended_state.map(e => (
            <h2>title: {e['title']}</h2>
          ))}
        </div> */}
        {/* Top rated Holidayhomes */}

        <h3 className='m-4 mt-5'>Top Rated holiday homes</h3>

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
          slidesToScroll={4}
          slidesToShow={4}
          scrollOnDevice={true}
        >
          {/* map cards */}
          {
            recommended_review.map(ele => {
              return (
                <div class='card ' style={{ width: '15rem', height: "400px" }}>
                  <img class='card-img-top' style={{ width: "200px", height: "200px", objectFit: "contain" }} src={ele['image_medium'][1]} alt='Card image cap' />
                  <div class='card-body'>
                    <h5 class='card-title'>#id <Link to={`/property/${ele['id']}`} >{ele['id']}</Link></h5>
                    <h5 class='card-title'>Rating: {ele['review_rating']}</h5>
                    <p class='card-text'>
                      {ele['title']}
                    </p>
                  </div>
                </div>)
            })
          }





        </InfiniteCarousel>

        {/* <div>
          {recommended_review && recommended_review.map(e => (
            <h2>title: {e['title']}</h2>
          ))}
        </div> */}
      </div>
    )
  }
  else {
    return <div
      style={{
        width: '100%',
        height: '330px',
        padding: '50px',
      }}
      className='container text-center mt-5 shadow  bg-white rounded'
    >
      {/* searchbox */}

      <div>
        <h2>item holiday homes</h2>
        <p style={{ fontSize: '25px' }}>
          We have totalitem Vacation Rentals - search by dates for
          availability
      </p>

        <form
          class='form-inline text-center '
          role='form'
          style={{
            padding: '10px',
            backgroundColor: 'white',
            marginLeft: '150px',
          }}
        >
          <div class='form-group '>
            <DatePicker
              className={styles.datepick}
              selected={startDate}
              value={startDate}
              onChange={handleChange1}
            />
            <DatePicker
              className={styles.datepick}
              selected={endDate}
              value={endDate}
              onChange={handleChange2}
            />

            {/* <input type="text" class="form-control input-lg input-search" placeholder="checkin checkout" /> */}

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
          </div>
        </form>
      </div>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  }

}

