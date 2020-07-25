import React from 'react'
import data from './data.json'
import styles from './css/Propertypage.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DatePicker from "react-datepicker"
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import home from './imgurl/home.jpg'
import dum7 from './imgurl/dum7.jpeg'
import dum6 from './imgurl/dum6.jpeg'
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
        }
        else {
            setEndDate(startDate)
            setStartDate(date)
        }

    }

    return (
        <div>
            {
                data.map(item => {
                    return (

                        <div id={styles.box}>
                            <div id={styles.main}>
                                <div id={styles.top}>


                                </div>
                                <div className={styles.image}>
                                    <div id={styles.pic1} style={{ backgroundImage: `url(${item.image_large[0]})`, backgroundSize: "100% 123%" }}>
                                    </div>
                                    <div id={styles.pic2} style={{ backgroundImage: `url(${item.image_medium[1]})` }}>

                                    </div>
                                    <div id={styles.pic3} style={{ backgroundImage: `url(${item.image_medium[2]})` }}>

                                    </div>
                                </div>

                                <div class="p-4">
                                    <div id={styles.price}>
                                        <h3 >{item.title}</h3>
                                        <p class="text-muted">{item.location_name}</p>
                                    </div>
                                </div>
                                <div style={{ clear: "both" }}>

                                    {/* amenties */}

                                </div>
                            </div>
                            <div style={{ width: "337px", height: "713px", border: "1px solid grey" }} className="p-5 fixed-right">
                                <h4 class="text-muted">Starting</h4>
                                <h2>{item.total_price}</h2>
                                <p class="text-muted">per night</p>
                                <DatePicker className={styles.datepick} selected={startDate} onChange={handleChange1} />
                                <DatePicker className={styles.datepick} selected={endDate} onChange={handleChange2} />
                                <div>
                                    <select class="custom-select" style={{ width: "180px", borderRadius: "0px" }}>
                                        <option selected value="0">Select Guests</option>
                                        <option value="1">1 guest</option>
                                        <option value="2">2 guests</option>
                                        <option value="3">3 guests</option>
                                        <option value="4">4 guests</option>
                                        <option value="5">5 guests</option>
                                        <option value="6">6 guests</option>
                                        <option value="7">7 guests</option>
                                        <option value="8">8 guests</option>
                                        <option value="9">9 guests</option>
                                        <option value="10">10 guests</option>
                                    </select>
                                </div>
                                <p>
                                    <button id={styles.searchbut} type="button" class="btn btn-primary" style={{ borderRadius: "0px" }}>SEARCH</button>
                                </p>
                            </div>

                        </div>
                    )

                })
            }
        </div>
    )
}



