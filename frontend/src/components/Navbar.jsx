import React from 'react'
import GoogleLogin from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Register_Fetch } from '../Redux/register/action'
import { Login_Fetch, Login_Google_Fetch } from '../Redux/login/action'
import { Logout_User } from '../Redux/login/action'

export const Navbar = () => {
    const [r_email, setREmail] = useState("")
    const [r_password, setRPassword] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [mobile, setMobile] = useState("")
    let reg = useSelector((state) => state.register);
    let { auth, error, message } = reg
    let dispatch = useDispatch()


    const handleChgRegister = (e) => {
        if (e.target.name == "r_email") {
            setREmail(e.target.value)
        }
        else if (e.target.name == "r_password") {
            setRPassword(e.target.value)
        }
        else if (e.target.name == "first_name") {
            setFirstName(e.target.value)
        }
        else if (e.target.name == "last_name") {
            setLastName(e.target.value)
        }
        else if (e.target.name == "mobile") {
            setMobile(e.target.value)
        }
    }

    const handleClickRegister = () => {
        console.log('register clicked')
        dispatch(Register_Fetch({ "email": r_email, "password": r_password, "first_name": first_name, "last_name": last_name, "mobile": mobile }))
    }

    const [l_email, setLEmail] = useState("")
    const [l_password, setLPassword] = useState("")
    let log = useSelector((state) => state.login);
    let { user_loggedin, auth_logged, error_logged, message_logged } = log
    const handleChgLogin = (e) => {
        if (e.target.name == "l_email") {
            setLEmail(e.target.value)
        }
        else if (e.target.name == "l_password") {
            setLPassword(e.target.value)
        }
    }

    const handleClickLogin = () => {
        console.log('login clicked', l_email, l_password)
        dispatch(Login_Fetch({ "email": l_email, "password": l_password }))
    }

    const responseGoogle = (response) => {
        console.log('GOOGLE RESPONSE', typeof (JSON.stringify(response)))
        dispatch(Login_Google_Fetch(response))
    }


    //let log = useSelector((state) => state.login);
    // let { user_loggedin, auth_logged, error_logged, message_logged } = log
    // let dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(Logout_User())
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: "black" }}>
                <a class="navbar-brand" href="/homepage">tripvillas</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Profile
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


                        <li>
                            {auth_logged ? <div><h6 style={{ color: "white", float: "left", marginLeft: "700px", marginTop: "10px" }} >Hi {user_loggedin}</h6>  <button className="btn btn-secondary ml-3" onClick={handleLogout} >LOGOUT</button></div> : ""}
                            {/* {error_logged ? <h4>${message_logged}</h4> : ""} */}

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
                            {/* <form> */}
                            <div class="form-group">
                                {/* logged in user:
                                {auth_logged ? <h2>{user_loggedin}</h2> : ""} */}
                                {error_logged ? <div className="text-center p-2" style={{ border: "1px solid red", color: "red", backgroundColor: "pink" }}>{message_logged}</div> : ""}
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" name="l_email" value={l_email} onChange={(e) => handleChgLogin(e)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" name="l_password" value={l_password} onChange={(e) => handleChgLogin(e)} class="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" onClick={handleClickLogin} class="btn btn-primary m-2" style={{ float: "left" }}>Sign in</button>
                            <div>
                                <GoogleLogin
                                    clientId="222606975118-9e6c9p3ek68d8ei2in3i1l6ator9ait5.apps.googleusercontent.com"
                                    buttonText=""
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    style={{ textAlign: "center" }}
                                />
                            </div>
                            {/* </form> */}
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
                            {/* <form> */}
                            <div class="form-group">
                                <label for="phone">Phone no.</label>
                                <input type="tel" name="mobile" value={mobile} onChange={(e) => handleChgRegister(e)} class="form-control" />
                                <small class="form-text text-muted">Only digits allowed.</small>
                            </div>

                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" name="r_email" value={r_email} onChange={(e) => handleChgRegister(e)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" name="r_password" value={r_password} onChange={(e) => handleChgRegister(e)} class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">First and last name</span>
                                </div>
                                <input type="text" name="first_name" value={first_name} onChange={(e) => handleChgRegister(e)} aria-label="First name" class="form-control" />
                                <input type="text" name="last_name" value={last_name} onChange={(e) => handleChgRegister(e)} aria-label="Last name" class="form-control" />
                            </div>
                            <button type="submit" onClick={handleClickRegister} class="btn btn-primary m-3">Sign up</button>
                            <div class="form-group">
                                MESSAGE:
                                    {auth ? <h2>{message}</h2> : ""}
                                {error ? <h2>{message}</h2> : ""}
                            </div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}