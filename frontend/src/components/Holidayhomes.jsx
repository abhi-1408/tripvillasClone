import React from 'react'
import DatePicker from 'react-datepicker'
import styles from './css/Homepage.module.css'
import InfiniteCarousel from 'react-leaf-carousel'
import { useState } from 'react'
import dum3 from './imgurl/dum3.jpeg'

export const Holidayhomes = () => {
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
                onChange={handleChange1}
              />
              <DatePicker
                className={styles.datepick}
                selected={endDate}
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

          <div class='card ' style={{ width: '15rem' }}>
            <img class='card-img-top' src={dum3} alt='Card image cap' />
            <div class='card-body'>
              <h5 class='card-title'>Card title</h5>
              <p class='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>

          <div
            class='card shadow  bg-white rounded '
            style={{ width: '15rem' }}
          >
            <img class='card-img-top' src={dum3} alt='Card image cap' />
            <div class='card-body'>
              <h5 class='card-title'>Card title</h5>
              <p class='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>

          <div
            class='card shadow  bg-white rounded '
            style={{ width: '15rem' }}
          >
            <img class='card-img-top' src={dum3} alt='Card image cap' />
            <div class='card-body'>
              <h5 class='card-title'>Card title</h5>
              <p class='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>

          <div
            class='card shadow  bg-white rounded '
            style={{ width: '15rem' }}
          >
            <img class='card-img-top' src={dum3} alt='Card image cap' />
            <div class='card-body'>
              <h5 class='card-title'>Card title</h5>
              <p class='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>

          <div
            class='card shadow  bg-white rounded '
            style={{ width: '15rem' }}
          >
            <img class='card-img-top' src={dum3} alt='Card image cap' />
            <div class='card-body'>
              <h5 class='card-title'>Card title</h5>
              <p class='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>

          <div
            class='card shadow  bg-white rounded '
            style={{ width: '15rem' }}
          >
            <img class='card-img-top' src={dum3} alt='Card image cap' />
            <div class='card-body'>
              <h5 class='card-title'>Card title</h5>
              <p class='card-text'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </InfiniteCarousel>
      </div>

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

        <div class='card ' style={{ width: '15rem' }}>
          <img class='card-img-top' src={dum3} alt='Card image cap' />
          <div class='card-body'>
            <h5 class='card-title'>Card title</h5>
            <p class='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>

        <div class='card shadow  bg-white rounded ' style={{ width: '15rem' }}>
          <img class='card-img-top' src={dum3} alt='Card image cap' />
          <div class='card-body'>
            <h5 class='card-title'>Card title</h5>
            <p class='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>

        <div class='card shadow  bg-white rounded ' style={{ width: '15rem' }}>
          <img class='card-img-top' src={dum3} alt='Card image cap' />
          <div class='card-body'>
            <h5 class='card-title'>Card title</h5>
            <p class='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>

        <div class='card shadow  bg-white rounded ' style={{ width: '15rem' }}>
          <img class='card-img-top' src={dum3} alt='Card image cap' />
          <div class='card-body'>
            <h5 class='card-title'>Card title</h5>
            <p class='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>

        <div class='card shadow  bg-white rounded ' style={{ width: '15rem' }}>
          <img class='card-img-top' src={dum3} alt='Card image cap' />
          <div class='card-body'>
            <h5 class='card-title'>Card title</h5>
            <p class='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>

        <div class='card shadow  bg-white rounded ' style={{ width: '15rem' }}>
          <img class='card-img-top' src={dum3} alt='Card image cap' />
          <div class='card-body'>
            <h5 class='card-title'>Card title</h5>
            <p class='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </InfiniteCarousel>
    </div>
  )
}
