//this is homepage
import React from 'react'
import GoogleLogin from 'react-google-login'
import styles from './css/Homepage.module.css'
import logo from './imgurl/logo.png'
import profile from './imgurl/profile.png'
export default class Homepage extends React.Component {
  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  }
  render() {
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

          <div style={{ padding: "10%", marginLeft: "100px" }}>
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









      </div>
    )
  }
}




// <input type="text" />
// <input type="text" />
