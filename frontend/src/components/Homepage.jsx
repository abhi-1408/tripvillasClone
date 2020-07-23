//this is homepage

import React from 'react'
import InfiniteCarousel from 'react-leaf-carousel';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Navbar from './Navbar'
import styles from './css/Homepage.module.css'
import dum1 from './imgurl/dum1.jpeg'
import dum2 from './imgurl/dum2.jpeg'
import dum3 from './imgurl/dum3.jpeg'
import dum4 from './imgurl/dum4.jpeg'
import dum5 from './imgurl/dum5.jpeg'
import dum6 from './imgurl/dum6.jpeg'
import dum7 from './imgurl/dum7.jpeg'

export default class Homepage extends React.Component {
  // responseGoogle = (response) => {
  //   console.log(response);
  //   console.log(response.profileObj);
  // }

  state = {

    startDate: new Date(),

    endDate: new Date()

  }

  handleChange1 = (date) => {

    this.setState({

      startDate: date

    })

  }

  handleChange2 = (date1) => {

    this.setState({

      endDate: date1

    })

  }




  render() {
    const arr = [dum1, dum2, dum3, dum4, dum5, dum6, dum7]
    return (
      <div>
        {/* adding searchbar and larger image */}

        <div id={styles.largeimg} style={{ height: "480px", width: "100%", border: "1px solid black" }}>

          <div style={{ padding: "10%", marginLeft: "30px", color: "white" }}>
            <h3>Book <strike>Hotels</strike> Vacation Rentals</h3>
            <h3>Top Holiday Homes - Villas, Apartments & Homestays</h3>
            <form class="form-inline text-center" role="form" style={{ padding: "10px", border: "1px solid black", backgroundColor: "white" }}>
              <div class="form-group">
                <label class="sr-only" for="searchZipcode">Zipcode</label>
                <input type="text" class="form-control input-lg input-search" placeholder="location" />

                <DatePicker className={styles.datepick} selected={this.state.startDate} onChange={this.handleChange1} />
                <DatePicker className={styles.datepick} selected={this.state.endDate} onChange={this.handleChange2} />



                {/* <input type="text" class="form-control input-lg input-search" placeholder="checkin checkout" /> */}

                <select class="custom-select" style={{ width: "180px", borderRadius: "0px" }}>
                  <option selected>Select Guests</option>
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
                <button id={styles.searchbut} type="button" class="btn btn-primary" style={{ borderRadius: "0px" }}>SEARCH</button>
              </div>
            </form>
          </div>

        </div>


        {/* Top destination cards */}
        <div className={styles.topdes}>
          <div className={styles.head}><div style={{ fontSize: "25px" }}>Top Destinations</div></div>
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
              sidesOpacity={.5}
              sideSize={.1}
              slidesToScroll={4}
              slidesToShow={4}
              scrollOnDevice={true}
            >

              {
                arr.map(item => (
                  <div>
                    <div className="text-center" style={{ color: "white", backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${item})`, height: "170px", width: "240px", backgroundRepeat: "no-repeat" }}>
                      <h1 id={styles.smallcard}>Image titile</h1>
                    </div>
                  </div>
                ))
              }
            </InfiniteCarousel>

          </div>
        </div>

        {/* manage cards */}

        <div >

          <div className="row container-fluid">
            <div className="col p-5 ">
              <div class="card shadow-lg p-3 mb-5 bg-white rounded " style={{ width: "28rem", height: "400px", marginLeft: "90px" }}>
                <div class="card-body">
                  <h5 class="card-title text-center">Fully Managed Communities By Tripvillas</h5>
                  {/* static icons */}
                </div>
              </div>
            </div>

            <div class="col" style={{ border: "1px solid black" }}>

            </div>
          </div>

        </div>


        {/* two static card */}

        <div className="container p-5">
          <div className="row">
            <div class="col ">
              <div class="card " style={{ width: "30rem" }}>
                <div class="card-body">
                  <h5 class="card-title text-center">Holiday Home Investment Opportunities</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <div className="text-center">
                    <button type="button" class="btn btn-primary">EXPLORE INVESTMENT OPPORTUNITIES</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col ">
              <div class="card " style={{ width: "30rem" }}>
                <div class="card-body">
                  <h5 class="card-title text-center">Are you a holiday home owner/manager?</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <div className="text-center">
                    <button type="button" class="btn btn-primary">LIST YOUR PROPERTY</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* vacation ideas */}

        <div className={styles.topdes}>
          <div className={styles.head}><div style={{ fontSize: "25px" }}>Vacation Ideas</div></div>
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
              sidesOpacity={.5}
              sideSize={.1}
              slidesToScroll={4}
              slidesToShow={4}
              scrollOnDevice={true}
            >

              {
                arr.map(item => (
                  <div>
                    <div className="text-center" style={{ fontSize: "10px", color: "white", backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${item})`, height: "170px", width: "240px", backgroundRepeat: "no-repeat" }}>
                      <h1 id={styles.smallcard}>Image titile</h1>
                    </div>
                  </div>
                ))
              }
            </InfiniteCarousel>

          </div>
        </div>


        {/* footer */}

        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Asia</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Europe</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">North America</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">South America </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Africa </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Oceania </a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
          <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
        </div>

        <DatePicker selected={this.state.startDate} onChange={this.handleChange1} />
        <DatePicker selected={this.state.endDate} onChange={this.handleChange2} />

      </div>
    )
  }
}



