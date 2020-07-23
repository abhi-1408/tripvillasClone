import React from 'react'

import GoogleLogin from 'react-google-login'


export default function Navbar() {
    return (
        <div>
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
                                <a class="dropdown-item" data-toggle="modal" data-target="#exampleModal">SIGNIN</a>
                                <a class="dropdown-item" data-toggle="modal" data-target="#exampleModal1">SIGNUP</a>
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



            {/* sign in modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-center" id="exampleModalLabel">Sign In</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <button type="submit" class="btn btn-primary m-2" style={{ float: "left" }}>Sign in</button>
                                <div>
                                    <GoogleLogin
                                        clientId="222606975118-9e6c9p3ek68d8ei2in3i1l6ator9ait5.apps.googleusercontent.com"
                                        buttonText="Login"
                                        // onSuccess={this.responseGoogle}
                                        // onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            {/* signup */}
            <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="phone">Phone no.</label>
                                    <input type="tel" class="form-control" />
                                    <small class="form-text text-muted">Only digits allowed.</small>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" />
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">First and last name</span>
                                    </div>
                                    <input type="text" aria-label="First name" class="form-control" />
                                    <input type="text" aria-label="Last name" class="form-control" />
                                </div>
                                <button type="submit" class="btn btn-primary m-3">Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}