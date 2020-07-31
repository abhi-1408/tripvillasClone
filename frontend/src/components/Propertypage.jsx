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
import { WrappedStaticMap } from './StaticMap'
import { useDispatch, useSelector } from 'react-redux'
import {
    Load_Specific_Property,
    Specific_Hotel_Available_On_Date,
    LoadBookingData,
    Recommend_By_Specific_Hotel
} from '../Redux/common/action'
import { useHistory } from 'react-router'
import ReactGa from 'react-ga'
import { Skeleton, Rating } from '@material-ui/lab';
import InfiniteCarousel from 'react-leaf-carousel'
import { Link } from 'react-router-dom'




export const Propertypage = (props) => {
    console.log('props of property page', props)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [unitsVal, setUnits] = useState(1)

    let log = useSelector((state) => state.login);
    let { auth_logged } = log
    let common = useSelector((state) => state.common);
    const { property_data, filters, message, message_flag, specific_property_flag, recommend_specific_flag, recommended_specific } = common
    let dispatch = useDispatch()

    useEffect(() => {
        ReactGa.initialize('UA-173941004-2')

        ReactGa.pageview(window.location.pathname + window.location.search)
        setStartDate(filters['start_date'])
        setEndDate(filters['end_date'])
        dispatch(Load_Specific_Property({ "id": props.match.params.id }))
        let sd = filters['start_date'].getFullYear() + "-" + (filters['start_date'].getMonth() + 1) + "-" + filters['start_date'].getDate();
        let ed = filters['end_date'].getFullYear() + "-" + (filters['end_date'].getMonth() + 1) + "-" + filters['end_date'].getDate();
        dispatch(Specific_Hotel_Available_On_Date({ "check_in": sd, "check_out": ed, "hotel_id": props.match.params['id'] }))
        dispatch(
            Recommend_By_Specific_Hotel({
                check_in: sd,
                check_out: ed,
                hotel_id: props.match.params['id'],

            })
        )
    }, [props.match.params.id])

    // useEffect(() => {
    //     if (!auth_logged) {
    //         console.log('NOT LOGGED IN')
    //         window.$('#exampleModal').modal('open')
    //         // alert('hi')
    //     }
    // })


    // const loadRazorpay = () => {
    //     return new Promise((resolve => {

    //         const script = document.createElement('script')
    //         script.src = "https://checkout.razorpay.com/v1/checkout.js"
    //         script.onload = () => {
    //             resolve(true)
    //         }
    //         script.onerror = () => {
    //             resolve(false)
    //         }
    //         document.body.appendChild(script)
    //     }))


    // }

    // async function displayRazorpay() {

    //     const res = await loadRazorpay()

    //     if (!res) {
    //         alert('RAZOR PAY NOT AVAILABLE')
    //         return
    //     }

    //     const data = await fetch('http://c562fcfe8d0c.ngrok.io/admin/rorder', { method: 'POST' }).then(t => t.json())
    //     console.log('got data from razor pay as', data)
    //     var options = {
    //         "key": "rzp_test_yGOdC4iCgylsNj", // Enter the Key ID generated from the Dashboard
    //         "amount": property_data['total_price'], // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         "currency": data['currency'],
    //         "name": "Trip Villas ",
    //         "description": "Property id:" + props.match.params.id.toString(),
    //         "order_id": data['id'], //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         "handler": function (response) {
    //             alert(response.razorpay_payment_id);
    //             // alert(response.razorpay_order_id);
    //             // alert(response.razorpay_signature)
    //         },
    //         "prefill": {
    //             "name": "Gaurav Kumar",
    //             "email": "gaurav.kumar@example.com",
    //             "contact": "9999999999"
    //         },
    //         "notes": {
    //             "address": "Razorpay Corporate Office"
    //         },
    //         "theme": {
    //             "color": "#F37254"
    //         }
    //     };
    //     var rzp1 = new window.Razorpay(options);
    //     rzp1.open()
    // }

    let history = useHistory()

    const handleBook = () => {
        if (!auth_logged) {
            console.log('NOT LOGGED IN')
            window.$('#exampleModal').modal('show')

            // alert('hi')
        }
        else {

            let sd = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
            let ed = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();

            dispatch(LoadBookingData([{
                "property": property_data[0], "check_in": sd,
                "check_out": ed,
                "guests": 1,
                "units": unitsVal,
                "total_cost": {
                    "sub_total": property_data[0]['total_price'],
                    "discount": "0",
                    "tax": "1500",
                    "cleaning_tax": "400",
                    "total": property_data[0]['total_price'] + 1500 + 400
                }
            }]))
            history.push('/book/' + props.match.params.id)
        }
    }


    const handleChange1 = (date) => {
        if (endDate < date) {
            setEndDate(date)
            setStartDate(date)
        } else {
            setStartDate(date)
        }
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
        dispatch(
            Specific_Hotel_Available_On_Date({
                check_in: sd,
                check_out: ed,
                hotel_id: props.match.params['id'],
            })
        )
        dispatch(
            Recommend_By_Specific_Hotel({
                check_in: sd,
                check_out: ed,
                hotel_id: props.match.params['id'],

            })
        )
        console.log('start date clicked date is', startDate)
    }

    const handleChange2 = (date) => {
        if (date >= startDate) {
            setEndDate(date)
        } else {
            setEndDate(startDate)
            setStartDate(date)
        }
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
        dispatch(
            Specific_Hotel_Available_On_Date({
                check_in: sd,
                check_out: ed,
                hotel_id: props.match.params['id'],
            })
        )
        dispatch(
            Recommend_By_Specific_Hotel({
                check_in: sd,
                check_out: ed,
                hotel_id: props.match.params['id'],

            })
        )
        console.log('end date clicked')
    }


    const handleUnitChg = e => {
        console.log('unit changed ', e, e.target.value)
        setUnits(parseInt(e.target.value) + 1)
    }
    // let history = useHistory()
    const handlePath = e => {
        console.log('handle path clicked', e.target.name)
        history.push('/property/' + e.target.name)
    }


    // useEffect(() => {
    //     let sd = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
    //     let ed = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
    //     dispatch(Specific_Hotel_Available_On_Date({ "check_in": sd, "check_out": ed, "hotel_id": props.match.params['id'] }))

    // }, startDate)
    if (specific_property_flag == false) {
        return (
            <div>
                {Array.from(Array(1), (e, i) => {
                    return (
                        <div className='row'>
                            <div className='col-9'>
                                <div className='m-3 p-4 '>
                                    <div>
                                        <small className='text-muted ' style={{ marginTop: '40px' }}>
                                            <Skeleton variant="text" width={150} />
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
                                            <Skeleton variant="rect" width={558} height={298} />
                                            <div
                                                style={{
                                                    width: '278px',
                                                    height: '145px',
                                                    border: '1.5px solid white',
                                                    float: 'left',

                                                }}
                                            >
                                                <Skeleton variant="rect" width={275} height={145} /></div>
                                            <div
                                                style={{
                                                    width: '280px',
                                                    height: '145px',
                                                    border: '1.5px solid white',
                                                    float: 'left',

                                                }}
                                            >
                                                <Skeleton variant="rect" width={275} height={145} /></div>

                                        </div>
                                    </div>

                                    {/* location and amenties */}
                                    <div class='col-5 pl-5 pr-5 pb-5 '>
                                        <Skeleton variant="rect" width={276} height={20} />
                                        <Skeleton variant="text" width={200} />
                                        <hr />
                                        {/* map amenties */}
                                        {Array.from(Array(5), (e, i) => {
                                            return (
                                                <div
                                                    style={{
                                                        float: 'left',
                                                        margin: '10px',

                                                        textTransform: 'uppercase',
                                                        padding: '3px',
                                                    }}
                                                >
                                                    <Skeleton variant="text" width={60} />
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
                                        <li class='nav-item'>
                                            <a
                                                class='nav-link'
                                                href='#recommend'
                                                style={{ color: 'grey' }}
                                            >
                                                RECOMMENDED
                        </a>
                                        </li>
                                    </ul>
                                </div>
                                <hr className='m-4' />
                                <div className='row m-4'>
                                    <div className='col-6'>
                                        <Skeleton variant="rect" width={500} height={200} />

                                        <div className='row'>
                                            <div className='col-6 mt-3 p-4 shadow  bg-white rounded'>
                                                <Skeleton variant="rect" width={208} height={200} />
                                            </div>
                                            <div className='col-6  mt-3  p-4 shadow  bg-white rounded'>
                                                <Skeleton variant="rect" width={208} height={200} />
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div
                                                className='col-6  mt-3  p-4 shadow  bg-white rounded'
                                                style={{ marginLeft: '110px' }}
                                            >
                                                <div className='text-center'>
                                                    <Skeleton variant="rect" width={200} height={100} />
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

                                                {Array.from(Array(5), (e, i) => {
                                                    return (
                                                        <div
                                                            style={{
                                                                float: 'left',
                                                                margin: '10px',

                                                                padding: '5px',
                                                            }}
                                                        >
                                                            <Skeleton variant="text" width={60} />

                                                        </div>)
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* key amenties */}

                                <div style={{ marginTop: '80px' }} className='ml-4 mr-4'>
                                    <h3 id='amenties'>Key Amenities</h3>
                                    <hr style={{ marginTop: '40px' }} />

                                    <div>
                                        {Array.from(Array(10), (e, i) => {
                                            return (
                                                <div
                                                    style={{
                                                        float: 'left',
                                                        margin: '10px',

                                                        padding: '5px',
                                                    }}
                                                >
                                                    <Skeleton variant="text" width={60} />

                                                </div>
                                            )
                                        })}
                                        < div style={{ clear: 'both' }
                                        }></div>
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
                                            {true === 'Stringent' ? (
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
                                    <Skeleton variant="text" className="py-4" width={40} />
                                    <h5 className='text-muted'>Pernight</h5>
                                    <Skeleton variant="text" className="py-4" width={40} />

                                    <Skeleton variant="rect" width={276} height={100} />

                                    <div className='row'>
                                        <div className='col-6'>
                                            <Skeleton variant="text" width={100} />
                                        </div>
                                        <div className='col-6'>
                                            <Skeleton variant="text" width={100} />
                                        </div>
                                    </div>

                                    <Skeleton variant="text" width={200} />
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
                                            <Skeleton variant="text" width={20} />
                                        </div>
                                        <div style={{ clear: 'both' }} className='text-muted'>
                                            <small style={{ float: 'left' }}>
                                                {' '}
                          Includes taxes & <br />
                          fees
                        </small>
                                            <small style={{ float: 'right', marginRight: '20px' }}>

                                            </small>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div >
        )
    }
    else {

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
                        / <a href=''>{item.city}</a> / Property #
                        <a href=''>{item.id}</a>{' '}
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
                                        {item.review_count > 0 ? (<>
                                            <div style={{ color: 'blue' }}>
                                                {item.review_count} reviews
                                            </div>
                                            <Rating value={parseFloat(item.review_rating)} readOnly precision={0.1} />
                                        </>
                                        ) : (
                                                ''
                                            )}
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

                                <div style={{ marginTop: '50px' }} className='ml-4 mr-4 ' id="map">
                                    <h3>Maps</h3>
                                    {/* <h3 id='map'><WrappedStaticMap {...mapdata} googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcS0j7hDpSs-F4xDi2q6AkTD_sWqECR9M"}
                                        loadingElement={<div style={{ height: "100%" }} />}
                                        containerElement={<div style={{ height: "100%" }} />}
                                        mapElement={<div style={{ height: "100%" }} />} /></h3>
                                    <hr style={{ marginTop: '40px' }} /> */}
                                    <h3>
                                        <div style={{ width: "60vw", height: "100vh" }}>
                                            <WrappedStaticMap {...{ "lat": item['lat'], "lng": item['lng'] }} googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcS0j7hDpSs-F4xDi2q6AkTD_sWqECR9M"}
                                                loadingElement={<div style={{ height: "100%" }} />}
                                                containerElement={<div style={{ height: "100%" }} />}
                                                mapElement={<div style={{ height: "100%" }} />}
                                            />
                                        </div>
                                    </h3>

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
                                {/* recommended hotel */}
                                <div style={{ marginTop: '50px' }} className='ml-4 mr-4 '>

                                    <h3 id='recommend'>Recommended</h3>
                                    <hr style={{ marginTop: '40px' }} />

                                    {/* {recommend_specific_flag ? <><h1>flagistrue</h1>
                                        {recommend_specific.map((eee) => {
                                            return <h1>eleis{eee.id}</h1>
                                        })}</>
                                        : "flag false"} */}
                                    {recommend_specific_flag ? <>
                                        {/* <h2>flag is true</h2><div>{recommended_specific.map((ee) => {
                                        return (<h2>id#{ee.id}</h2>)
                                    })}</div> */}
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
                                            {recommended_specific && recommended_specific.map((ele) => (

                                                <div className='col-12' id={styles.pro}>
                                                    <div
                                                        style={{
                                                            backgroundImage: `url(${ele['image_medium'][1]})`,
                                                            backgroundRepeat: 'no-repeat',
                                                            height: '180px',
                                                            width: '180px',
                                                        }}
                                                    ></div>
                                                    <div className='p-3' style={{ height: '250px' }}>
                                                        <Link to={`/property/${ele['id']}`}>
                                                            <small className='text-muted mb-2'>
                                                                {/* <button name={`${ele['id']}`} onClick={e => handlePath(e)}> */}
                                                                Ref Id#{ele['id']}
                                                                {/* </button> */}
                                                            </small>
                                                        </Link>
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
                                                            ${ele['total_price']}
                                                            <small className='text-muted'> pernight</small>
                                                        </p>

                                                    </div>
                                                </div>
                                            )
                                            )}
                                        </InfiniteCarousel>
                                    </>
                                        :
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

                                            {Array.from(Array(5), (e, i) => {
                                                return (
                                                    <div className='col-12' id={styles.pro}>


                                                        <Skeleton variant="rect" width={180} height={200} />
                                                        <div style={{ height: '200px' }}>

                                                            <Skeleton variant="text" width={150} />

                                                            <Skeleton variant="text" width={100} />

                                                            <Skeleton variant="rect" width={150} height={40} />

                                                            <Skeleton variant="text" width={100} />

                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </InfiniteCarousel>
                                    }
                                </div>

                                <div style={{ marginTop: '50px', marginBottom: "100px" }} className='ml-4 mr-4 '></div>
                            </div>


                            {/* sideForm */}
                            <div className='col-3' style={{ height: '800px' }}>
                                <div style={{ position: 'fixed' }} className='p-3'>
                                    <h5 className='text-muted'>Starting</h5>
                                    <h1>$ {item.total_price}</h1>
                                    <h5 className='text-muted'>Pernight</h5>
                                    {!message_flag ? (
                                        <div
                                            className='row ml-1 mr-5'
                                            style={{
                                                backgroundColor: 'rgb(254,244,246) ',
                                            }}
                                        >
                                            <div className='text-center m-2 p-3' style={{ color: 'rgb(240,80,110) ' }}>
                                                <b><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></b> {message}
                                            </div>
                                            <div>{/* BOOKING FLAG {booking_flag ? "true" : "false"} */}</div>
                                        </div>
                                    ) : (
                                            <div
                                                className='row ml-1 mr-5'
                                                style={{
                                                    backgroundColor: 'rgb(237,251,246) ',
                                                }}
                                            >
                                                <div className='text-center m-2 p-2' style={{ color: 'rgb(59,212,155)' }}>
                                                    <b><i class="fa fa-check" aria-hidden="true"></i></b> {message}
                                                </div>
                                                <div>{/* BOOKING FLAG {booking_flag ? "true" : "false"} */}</div>
                                            </div>
                                        )}
                                    <div className="row">
                                        <div className="col-12">
                                            <select
                                                class='custom-select '
                                                style={{
                                                    width: '180px',
                                                    borderRadius: '0px',
                                                    width: '260px',
                                                    marginTop: '50px',
                                                }}
                                                onChange={e => handleUnitChg(e)}
                                            >
                                                <option selected value='0'>
                                                    Select Units
                                                </option>
                                                {}
                                                {Array.from(Array(item.number_of_rooms), (e, i) => {
                                                    return <option value={`${i}`}>{i + 1} units</option>
                                                })}

                                                {/* <option value='2 units'>2 units</option>
                                        <option value='3 units'>3 units</option> */}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='row pt-4'>
                                        {/* <div className="col-1"></div> */}
                                        <div className="row px-4 ">

                                            <div className='col-5 border' style={{ marginLeft: "5px" }}>
                                                <DatePicker
                                                    className={styles.datepick1}
                                                    // id={styles.datp}
                                                    selected={startDate}
                                                    value={startDate}
                                                    minDate={Date.now()}
                                                    onSelect={handleChange1}

                                                />
                                            </div>

                                            <div className='col-5 border' style={{}}>
                                                <DatePicker
                                                    popperPlacement="bottom-end"
                                                    className={styles.datepick2}
                                                    // id={styles.datp1}
                                                    minDate={Date.now()}
                                                    selected={endDate}
                                                    value={endDate}
                                                    onSelect={handleChange2}
                                                />
                                            </div>
                                        </div>

                                    </div>



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
                                                <a href='#'>view details</a>
                                            </small>
                                            <button
                                                id={styles.searchbut}
                                                type='button'
                                                class='btn btn-primary mt-3'
                                                style={{ borderRadius: '0px' }}
                                                disabled={!message_flag}
                                                onClick={handleBook}
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
}

