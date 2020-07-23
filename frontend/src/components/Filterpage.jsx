import React from 'react'
import data from './data.json'
export default class FilterPage extends React.Component {

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
                                        <button type="button" class="btn btn-outline-secondary">MODIFY SEARCH</button>
                                    </div>
                                </div>
                            </div>

                            {/* datamap */}
                            {
                                data.map(item => {
                                    return (
                                        <div class="card mb-3" style={{ width: "600px", height: "300px" }}>
                                            <div class="row no-gutters">
                                                <div class="col-md-4">
                                                    <img src={item.images_mid_large[0]} class="card-img" height="300px" alt="..." />
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title">{item.title}</h5>
                                                        <h6><a href="">{item.location_name}</a></h6>
                                                        {
                                                            item.prop_tags.map(item => {
                                                                return <div>
                                                                    <div style={{ float: "left", margin: "10px", border: "1px solid grey", padding: "5px" }}>
                                                                        <small class="text-muted">{item}</small>
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                        <div class="card-text m-3">
                                                            <h5>{item.total_price}</h5>
                                                        </div>
                                                        <div style={{ border: "1px solid orange", padding: "5px", textTransform: "uppercase", width: "230px" }}>
                                                            <small class="text-muted">{item.cancellation_policy_name} CANCELLATION POLICY</small>
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


                        <div className="col">
                            {/* space for map */}
                        </div>

                    </div>

                </div>


            </div>
        )
    }
}