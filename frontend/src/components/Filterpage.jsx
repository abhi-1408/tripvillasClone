import React from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import data from './data1.json'
import styles from './css/Filterpage.module.css'
export default class FilterPage extends React.Component {

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


                {/* container fluid */}

                <div className="container-fluid m-4">
                    <div className="row">
                        <div class="col">

                            {/* filter */}
                            <div className="container p-3">
                                <div className="row">
                                    <div className="col">
                                        <button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">APPLY FILTERS</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" class="btn btn-outline-secondary ml-5" data-toggle="modal" data-target="#modify" >MODIFY SEARCH</button>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="m-3">
                                <small className="m-3 text-muted mr-5 ml-3">Total results {data.length}</small>
                                <div style={{ float: "right" }}>
                                    <label for="sortby"><small className="text-muted ">Sort By</small></label>
                                    <select className="ml-1" id="sortby">
                                        <option value="relevance">Relevance</option>
                                        <option value="low">Price (Low to High)</option>
                                        <option value="high">Price (High to low)</option>
                                    </select>
                                </div>
                            </div>

                            {/* datamap */}
                            {
                                data.map(item => {
                                    return (

                                        <div class="card mb-3 shadow-lg p-3 mb-5 bg-white rounded" style={{ maxWidth: "740px" }}>
                                            <div class="row no-gutters">
                                                <div class="col-md-4 mt-4">
                                                    <div style={{ backgroundImage: `url(${item.images_mid_large[0]})`, height: "100%", backgroundSize: "cover" }}></div>
                                                    {/* <img src={item.images_mid_large[0]} class="card-img" alt="..." /> */}
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title"><a style={{ color: "black" }} href="">{item.title}</a></h5>
                                                        <h6><a href="">{item.location_name}</a></h6>
                                                        {
                                                            item.prop_tags.map(item => {
                                                                return <div style={{ float: "left", margin: "10px", border: "1px solid grey", padding: "5px" }}>
                                                                    <small class="text-muted">{item}</small>
                                                                </div>

                                                            })
                                                        }
                                                        <div style={{ clear: "both" }}>
                                                            <p><h5>{item.total_price}</h5></p>
                                                            <small class="text-muted mt-3" style={{ border: "1px solid orange", padding: "5px", textTransform: "uppercase", color: "orange", width: "230px" }}>{item.cancellation_policy_name} CANCELLATION POLICY</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* applyfilter modal */}


                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog  modal-lg" role="document">
                                <div class="modal-content">
                                    <div style={{ padding: "20px", margin: "50px", marginLeft: "90px", height: "1200px" }}>
                                        <div className="row">
                                            <div className="col">
                                                <label class="form-check-label" for="exampleCheck1"><h5>FEATURES</h5></label>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Swimming Pool</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Air Conditioner</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Internet</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Television</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Parking</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Housekeeping</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Functional Kitchen</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Washing Machine</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Dish Washer</label></small>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <label class="form-check-label" for="exampleCheck1">PROPERTY TYPE</label>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Luxury Yacht</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Camping Ground</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">  Farm</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Homestay</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Apartment</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Villa</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Hostel</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Serviced Apartment</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Ryokan (Japanese Inn)</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Bed and Breakfast</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Resort</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Boutique Hotel</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Bungalow</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Caravan</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Chalet</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Guesthouse</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">  Hotel</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">  Cottage</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Castle</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> HouseBoats</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Home</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Room</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">Cabin</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Holiday park</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1">  Lodge</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Condo</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Studio</label></small>
                                                </div>
                                                <div class="form-check m-3">
                                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                                    <small class="text-muted"><label class="form-check-label" for="exampleCheck1"> Tent</label></small>
                                                </div>


                                            </div>

                                            <div className="col">
                                                {/* bedrooms */}
                                                <div>
                                                    <h5>Bedrooms</h5>

                                                    <div className="row">
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />Any</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />1+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />2+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />3+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />4+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />5+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />6+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-5">
                                                    {/* bathroom */}
                                                    <h5>Bathrooms</h5>

                                                    <div className="row">
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />Any</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />1+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />2+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />3+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />4+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />5+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div class="radio">
                                                                <small class="text-muted">
                                                                    <label><input type="radio" name="optradio" checked />6+</label>
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* pricemeter */}

                                                <form className="mt-5">
                                                    <div class="form-group">
                                                        <label for="formControlRange"><h5>Price per Night</h5></label>
                                                        <input type="range" class="form-control-range" id="formControlRange" />
                                                    </div>
                                                </form>
                                            </div>



                                        </div>

                                        {/* filterbutton */}

                                        <div class="modal-footer">
                                            <div>
                                                <button type="button" class="btn btn-outline-secondary">CANCEL</button>
                                            </div>
                                            <div>
                                                <button type="button" class="btn btn-primary btn-md">APPLY</button>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* modify search modal */}
                        <div class="modal fade" id="modify" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">MODIFY SEARCH</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="form-group">
                                                <input type="text" class=" m-3" id={styles.location} placeholder="LOCATION" />
                                                <DatePicker className={styles.datepick} selected={this.state.startDate} onChange={this.handleChange1} />
                                                <DatePicker className={styles.datepick} selected={this.state.endDate} onChange={this.handleChange2} />
                                                <div className="m-3">
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
                                                </div>
                                                <div className="m-3">
                                                    <button type="button" class="btn btn-primary" style={{ borderRadius: "0px" }}>SEARCH</button>

                                                    <button type="button" class="btn btn-secondary ml-3" data-dismiss="modal">CANCEL</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>




                        <div className="col">
                            {/* space for map */}
                        </div>

                    </div>

                </div>


            </div>
        )
    }
}