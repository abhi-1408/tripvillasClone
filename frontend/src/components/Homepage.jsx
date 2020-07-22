//this is homepage
import React from 'react'
import GoogleLogin from 'react-google-login'
import InfiniteCarousel from 'react-leaf-carousel';
import styles from './css/Homepage.module.css'
import dum1 from './imgurl/dum1.jpeg'
import dum2 from './imgurl/dum2.jpeg'
import dum3 from './imgurl/dum3.jpeg'
import dum4 from './imgurl/dum4.jpeg'
import dum5 from './imgurl/dum5.jpeg'
import dum6 from './imgurl/dum6.jpeg'
import dum7 from './imgurl/dum7.jpeg'

export default class Homepage extends React.Component {
  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  }
  render() {
    const arr = [dum1, dum2, dum3, dum4, dum5, dum6, dum7]
    return (
      <div>
        {/* navbar code */}
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">tripvillas</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
              </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">SIGNUP</a>
                  <a class="dropdown-item" href="#">SIGNIN</a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  AED
              </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>

                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
              </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>

                </div>
              </li>
            </ul>
          </div>
        </nav>


        {/* googleauth */}

        <div>
          <GoogleLogin
            clientId="222606975118-9e6c9p3ek68d8ei2in3i1l6ator9ait5.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}

          />
        </div>


        {/* adding searchbar and larger image */}

        <div style={{ height: "450px", width: "100%", border: "1px solid black" }}>

          <div style={{ padding: "10%", marginLeft: "30px" }}>
            <h3>Book <strike>Hotels</strike> Vacation Rentals</h3>
            <h3>Top Holiday Homes - Villas, Apartments & Homestays</h3>
            <form class="form-inline" role="form" style={{ padding: "10px", border: "1px solid black" }}>
              <div class="form-group">
                <label class="sr-only" for="searchZipcode">Zipcode</label>
                <input type="text" class="form-control input-lg input-search" placeholder="location" />
                <input type="text" class="form-control input-lg input-search" placeholder="checkin checkout" />

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
                  <div><img src={item} height="150px" alt="" /></div>
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
                  <div><img src={item} height="150px" alt="" /></div>
                ))
              }
            </InfiniteCarousel>

          </div>
        </div>







      </div>
    )
  }
}




