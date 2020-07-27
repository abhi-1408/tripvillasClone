import React from 'react'
import data from './data.json'
import styles from './css/Propertypage.module.css'
import DatePicker from 'react-datepicker'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { useState, useEffect } from 'react'
import home from './imgurl/home.jpg'
import dum3 from './imgurl/dum3.jpeg'
import dum2 from './imgurl/dum2.jpeg'
import { useDispatch, useSelector } from "react-redux";
import { Load_Specific_Property, Specific_Hotel_Available_On_Date } from '../Redux/common/action'
export const Propertypage = (props) => {
    console.log('props of property page', props)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    let common = useSelector((state) => state.common);
    const { property_data, filters, message, message_flag } = common
    let dispatch = useDispatch()

    useEffect(() => {
        setStartDate(filters['start_date'])
        setEndDate(filters['end_date'])
        dispatch(Load_Specific_Property({ "id": props.match.params.id }))
        let sd = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        let ed = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
        dispatch(Specific_Hotel_Available_On_Date({ "check_in": sd, "check_out": ed, "hotel_id": props.match.params['id'] }))

    }, [])




    const handleChange1 = (date) => {
        if (endDate < date) {
            setEndDate(date)
            setStartDate(date)
        }
        else {

            setStartDate(date)
        }
        let sd = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        let ed = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
        dispatch(Specific_Hotel_Available_On_Date({ "check_in": sd, "check_out": ed, "hotel_id": props.match.params['id'] }))
        console.log('handle 1 clicked date is', startDate)
    }

    const handleChange2 = (date) => {
        if (date >= startDate) {
            setEndDate(date)
        } else {
            setEndDate(startDate)
            setStartDate(date)
        }
        let sd = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        let ed = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
        dispatch(Specific_Hotel_Available_On_Date({ "check_in": sd, "check_out": ed, "hotel_id": props.match.params['id'] }))

    }

    return (
        <div>
            {property_data.map((item) => {
                return (
                    <div className='row'>
                        <div className='col-9'>
                            <div className='m-3 p-4 '>
                                <div>
                                    <small className='text-muted ' style={{ marginTop: '40px' }}>
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
                                                        background: `url(${item.image_medium[0]})`,
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        width: '280px',
                                                        height: '145px',
                                                        border: '1.5px solid white',
                                                        float: 'left',
                                                        background: `url(${item.image_mid_large[0]})`,
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
                                                        background: `url(${item.image_large[1]})`,
                                                        backgroundSize: '100% 125%',
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        width: '280px',
                                                        height: '145px',
                                                        border: '1.5px solid white',
                                                        float: 'left',
                                                        background: `url(${item.image_medium[1]})`,
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        width: '278px',
                                                        height: '145px',
                                                        border: '1.5px solid white',
                                                        float: 'left',
                                                        background: `url(${item.image_mid_large[1]})`,
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
                                                        background: `url(${item.image_large[2]})`,
                                                        backgroundSize: '100% 125%',
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        width: '278px',
                                                        height: '145px',
                                                        border: '2px solid white',
                                                        float: 'left',
                                                        background: `url(${item.image_medium[2]})`,
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        width: '280px',
                                                        height: '145px',
                                                        border: '2px solid white',
                                                        float: 'left',
                                                        background: `url(${item.image_mid_large[2]})`,
                                                    }}
                                                >
                                                    {' '}
                                                </div>
                                            </div>
                                        </Carousel>
                                    </div>
                                </div>

                                {/* location and amenties */}
                                <div class='col-5 pl-5 pr-5 pb-5 '>
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
                                                    border: '1px solid #0275d8 ',
                                                    textTransform: 'uppercase',
                                                    padding: '3px',
                                                }}
                                            >
                                                <small class='p-3' style={{ color: '#0275d8 ' }}>
                                                    {ele}
                                                </small>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {/* navbar */}
                            <div className='m-4'>
                                <ul class='nav'>
                                    <li class='nav-item active'>
                                        <a
                                            class='nav-link active'
                                            href='#'
                                            style={{ color: 'grey' }}
                                        >
                                            OVERVIEW
                        </a>
                                    </li>
                                    <li class='nav-item'>
                                        <a
                                            class='nav-link'
                                            href='#amenties'
                                            style={{ color: 'grey' }}
                                        >
                                            AMENTIES
                        </a>
                                    </li>
                                    <li class='nav-item'>
                                        <a class='nav-link' href='#map' style={{ color: 'grey' }}>
                                            MAP
                        </a>
                                    </li>
                                    <li class='nav-item'>
                                        <a
                                            class='nav-link'
                                            href='#policies'
                                            style={{ color: 'grey' }}
                                        >
                                            POLICIES & FEES
                        </a>
                                    </li>
                                </ul>
                            </div>
                            <hr className='m-4' />
                            <div className='row m-4'>
                                <div className='col-6'>
                                    <div
                                        className='row  shadow  bg-white rounded'
                                        style={{
                                            padding: '40px',
                                        }}
                                    >
                                        <div
                                            className='text-center'
                                            style={{ marginLeft: '120px' }}
                                        >
                                            <h2 className=''>{item.property_type}</h2>
                                            <p>
                                                <small className='text-muted'>Type Of Property </small>
                                            </p>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-6 mt-3 p-4 shadow  bg-white rounded'>
                                            <div className='text-center'>
                                                <h2 className=''>{item.number_of_bathrooms}</h2>
                                                <p>
                                                    <small className='text-muted'>Bathrooms </small>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-6  mt-3  p-4 shadow  bg-white rounded'>
                                            <div className='text-center'>
                                                <h2 className=''>{item.occupancy}</h2>
                                                <p>
                                                    <small className='text-muted'>Max. Guests </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div
                                            className='col-6  mt-3  p-4 shadow  bg-white rounded'
                                            style={{ marginLeft: '110px' }}
                                        >
                                            <div className='text-center'>
                                                <h2 className=''>{item.units}</h2>
                                                <p>
                                                    <small className='text-muted'>
                                                        Total Bookable Units{' '}
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col'>
                                    <div className='m-3'>
                                        <p style={{ color: 'grey', fontSize: '14px' }}>
                                            The winter season has come, this home is open for Guest
                                            who wants to have a great time in Arambol, Looking forward
                                            to your response.
                        </p>
                                        <p style={{ color: 'grey', fontSize: '14px' }}>
                                            The Home is 2mins walks from the golden sand Arambol
                                            beach. Evenings are superb to sit on the beach with
                                            popcorn's or roasted peanuts/grams munching and watch the
                                            Sunset or climb the mountain and get the aerial view of
                                            the beach. Coming to Arambol by train Pernam railway
                                            station is 20kms, and Thivm station is 26kms, we provide
                                            with 6 sitter taxi to the Home with booking in advance
                                            with train or by air flight (Dabolim Airport) arrival date
                                            and time. We provide our guest with the best service and
                                            homely atmosphere which will be remembered always in your
                                            lifetime.
                        </p>
                                        <p style={{ color: 'grey', fontSize: '14px' }}>
                                            <b>Best For</b>
                                        </p>

                                        <div>
                                            <div
                                                style={{
                                                    float: 'left',
                                                    margin: '10px 10px 10px 0px',
                                                    border: '1px solid rgb(190, 190, 190)',

                                                    padding: '5px',
                                                }}
                                            >
                                                <small class='text-muted '>BACK TO NATURE</small>
                                            </div>

                                            <div
                                                style={{
                                                    float: 'left',
                                                    margin: '10px',
                                                    border: '1px solid rgb(190, 190, 190)',

                                                    padding: '5px',
                                                }}
                                            >
                                                <small class='text-muted '>ROMANCE</small>
                                            </div>

                                            <div
                                                style={{
                                                    float: 'left',
                                                    margin: '10px',
                                                    border: '1px solid rgb(190, 190, 190)',

                                                    padding: '5px',
                                                }}
                                            >
                                                <small class='text-muted '>FAMILY GET-TOGETHER</small>
                                            </div>

                                            <div
                                                style={{
                                                    float: 'left',
                                                    margin: '10px 10px 10px 0px',
                                                    border: '1px solid rgb(190, 190, 190)',

                                                    padding: '5px',
                                                }}
                                            >
                                                <small class='text-muted p-1'>ADVENTURE SPORTS</small>
                                            </div>

                                            <div
                                                style={{
                                                    float: 'left',
                                                    margin: '10px',
                                                    border: '1px solid rgb(190, 190, 190)',

                                                    padding: '5px',
                                                }}
                                            >
                                                <small class='text-muted p-1'>BUDGET STAY</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* key amenties */}

                            <div style={{ marginTop: '80px' }} className='ml-4 mr-4'>
                                <h3 id='amenties'>Key Amenities</h3>
                                <hr style={{ marginTop: '40px' }} />

                                <div>
                                    {item.ac ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>AC</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.cook_on_call ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>COOK ON CALL</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.parking ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>PARKING</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.spa ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>SPA</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.internet ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>INTERNET</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.functional_kitchen ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>FUNCTIOINAL KITCHEN</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.pets ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>PETS ALLOWED</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.dish_washer ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>DISH WASHER</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.instant_bookable ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>INSTANT BOOK </small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.premium ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>PREMIUIM</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.gym ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>GYM</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.refrigerator ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>REFRIGERATOR</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.television ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>TELEVISION</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.housekeeping ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>HOUSEKEEPING</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.washing_machine ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>WASHING MACHINE</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}

                                    {item.swimming_pool ? (
                                        <div
                                            style={{
                                                float: 'left',
                                                margin: '10px',
                                                border: '1px solid rgb(190, 190, 190)',

                                                padding: '5px',
                                            }}
                                        >
                                            <small class='text-muted p-4'>SWIMMING POOL</small>
                                        </div>
                                    ) : (
                                            ''
                                        )}
                                    <div style={{ clear: 'both' }}></div>
                                </div>
                            </div>

                            {/* map */}

                            <div style={{ marginTop: '50px' }} className='ml-4 mr-4 '>
                                <h3 id='map'>Map</h3>
                                <hr style={{ marginTop: '40px' }} />
                            </div>

                            {/* policies and fees */}

                            <div style={{ marginTop: '50px' }} className='ml-4 mr-4 '>
                                <h3 id='policies'>Policies & Fees</h3>
                                <hr style={{ marginTop: '40px' }} />
                                <div className='row'>
                                    <div
                                        className='col-6'
                                        style={{ color: 'grey', fontSize: '14px' }}
                                    >
                                        <p>
                                            <b>Default Cancellation Policy</b>
                                        </p>
                                        {item.cancellation_policy_name === 'Stringent' ? (
                                            <p>
                                                <b>Stringent:</b> No charges will be levied if booking
                            is canceled 61 days prior to check-in. If cancellation
                            is done between 30 to 60 days prior to check-in, 50% of
                            the total booking amount will be charged. Post that,
                            there will be no refund.
                                            </p>
                                        ) : (
                                                <p>
                                                    <b>Non Refundable:</b> This is the strictest clause. As
                            soon the booking is confirmed & payment is accepted,
                            booking becomes non-refundable. Zero amount will be
                            refunded to the customer if she or he cancels the
                            booking.{' '}
                                                </p>
                                            )}
                                    </div>
                                    <div
                                        className='col-6'
                                        style={{ color: 'grey', fontSize: '14px' }}
                                    >
                                        <p>
                                            <b>House Rules</b>
                                        </p>
                                        <p>
                                            Unmarried Couples not allowed. Loud Music not allowed.
                                            Pets not allowed. Smoking inside Property not allowed.
                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* sideForm */}
                        <div className='col-3 ' style={{ height: '800px' }}>
                            <div style={{ position: 'fixed' }} className='p-3 '>
                                <h5 className='text-muted'>Starting</h5>
                                <h1>$ {item.total_price}</h1>
                                <h5 className='text-muted'>Pernight</h5>
                                {message_flag ? <h5 style={{ color: 'green' }}>{message}</h5> : <h5 style={{ color: 'red' }}>{message}</h5>}

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
                                    value={startDate}
                                    onChange={handleChange1}
                                />
                                <DatePicker
                                    className={styles.datepick1}
                                    selected={endDate}
                                    value={endDate}
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
                                <div class='text-muted mt-2 mb-2'>
                                    <small>Rateplan:No meals provided (European Plan)</small>
                                </div>

                                <div>
                                    <div style={{ float: 'left', color: 'grey' }}>
                                        <b>Total</b>
                                    </div>
                                    <div
                                        style={{
                                            float: 'right',
                                            marginRight: '20px',
                                            color: 'grey',
                                        }}
                                    >
                                        <b>{item.total_price}</b>
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