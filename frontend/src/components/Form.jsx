import React, { Component } from "react"

export default class Form extends Component{
    render(){
    return(
        <div>

            <div style={{width:"33.33%", float:"right",paddingRight:"20px"}} >
            <form>
                <p style={{color:"red",backgroundColor:"pink",padding:"10px 0px 10px 0px"}} >Book fast. Your dates might get booked by someone else.</p>
                <div style={{border:"0px solid black",boxShadow:"2px 2px 5px 0px"}} >
                    <div style={{borderBottom:"1px solid black",height:"50px",paddingLeft:"10px"}}>
                         <div style={{float:"left",padding:"10px 0px 10px 0px",fontSize:"20px"}} ><i class="fas fa-id-badge"></i> <span style={{paddingLeft:"5px"}}>Enter your contact information</span> </div>
                    </div>
    
                    <div style={{marginTop:"15px",border:"0px solid black",height:"50px"}}>
                        <div style={{float:"left",paddingLeft:"10px"}}>
                                <select style={{padding:"12px 0px 12px 10px"}}>
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                    <option value="+20">+20</option>
                                    <option value="+27">+27</option>
                                    <option value="+30">+30</option>
                                    <option value="+31">+31</option>
                                    <option value="+32">+32</option>
                                    <option value="+33">+33</option>
                                    <option value="+34">+34</option>
                                    <option value="+35">+35</option>
                                    <option value="+36">+36</option>
                                    <option value="+37">+37</option>
                                    <option value="+38">+38</option>
                                </select>
                                <input type="text"  placeholder="Mobile Number" style={{paddingLeft:"10px",border:"1px solid black",padding:"10px 0px 10px 10px",marginLeft:"10px"}} />
                        </div> 
                    </div>
                    <div style={{border:"0px solid black",marginTop:"15px",height:"50px"}}>
                        <div style={{float:"left",paddingLeft:"10px"}} > 
                            <input placeholder="First Name" style={{padding:"10px 0px 10px 0px"}} />
                            <input placeholder="Last Name"  style={{padding:"10px 0px 10px 0px",marginLeft:"10px"}} />
                        </div> 
                    </div>
                    <div style={{border:"0px solid black",marginTop:"15px",height:"50px"}} >
                        <div style={{float:"left"}}>
                            <input placeholder="Email Address" style={{padding:"10px 0px 10px 0px",marginLeft:"10px"}} />
                        </div>
                    </div>
                </div>

                <div style={{border:"0px solid blue",marginTop:"10px",boxShadow:"2px 2px 5px 0px"}}>
                    <div>
                        <div style={{borderBottom:"1px solid black",padding:"10px 0px 10px 0px",height:"50px"}}>
                            <div style={{float:"left",paddingLeft:"10px"}}>
                                <i class="far fa-comment"></i> <span style={{paddingLeft:"10px",fontWeight:"bolder"}}>Are there any special requests?</span>
                            </div>
                        </div>
                        <div style={{padding:"10px"}}>
                            <textarea name="" id="" cols="55" rows="2" placeholder="Your message" style={{}} />
                        </div>
                        <p style={{paddingBottom:"10px"}} >This message will be visible to the owner/manager once she/he accepts the booking</p>
                    </div>
                </div>

                <div style={{border:"1px solid black",marginTop:"10px",boxShadow:"2px 2px 5px 0px"}} >
                    <div>
                        <div style={{borderBottom:"1px solid black",height:"50px",paddingLeft:"10px"}}>
                            <div style={{float:"left",padding:"10px 0px 10px 0px",fontSize:"20px"}} ><i class="fas fa-id-badge"></i> <span style={{paddingLeft:"5px"}}>Booking Options</span> </div>
                        </div>
                    </div>
                    <div style={{border:"0px solid black,padding: 5px 5px 5px 5px"}} >
                        <div style={{border:"0px solid black",height:"200px"}}>
                            <div style={{border:"0px solid green",height:"200px",float:"left"}}>
                                <div style={{border:"0px solid cyan",}}><i class="fas fa-check" style={{fontSize:"40px",color:"blue"}} ></i> </div>
                            </div>
                            <div style={{border:"0px solid red",paddingLeft:"5px 5px 5px 5px"}}>
                                <div style={{textAlign:"left"}} >
                                    <div>Put your credit/debit card on file.</div>
                                    <div>Since this booking is on 'Request To Book', We will only charge your card once</div>
                                    <div>owner accepts the booking.</div>
                                    <div>This is 100% Secure</div>
                                    <div>We DO NOT store/save your credit card details. We use Stripe.com. Stripe has</div>
                                    <div>been audited by an independent PCI Qualified Security Assessor (QSA) and is</div>
                                    <div>certified as a PCI Level 1 Service Provider.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{backgroundColor:"grey",marginTop:"10px"}}>
                    <p>By clicking 'Agree & Continue', you are agreeing to our Terms & Conditions, Privacy Policy, Booking policies like cancellation policies, house rules.</p>
                </div>

                <div>
                    <button style={{width:"600px",height:"60px" ,background:"blue"}} >AGREE & CONTINUE</button>
                </div>
            </form>
            </div>
           
        </div>
        )
    }
}