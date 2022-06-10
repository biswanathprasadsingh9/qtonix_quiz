import React, { useState,useRef } from 'react';
import { connect } from 'react-redux'
import Body from './components/Body'
import SimpleReactValidator from "simple-react-validator";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ClientCaptcha from "react-client-captcha";
import Link from 'next/link';

export const Register = (props) => {
    const router = useRouter()

    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const [loading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState(111);

    const [data, setData] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        cpassword:'',
        captcha:''
    });

    function handleChange(e){
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {

        e.preventDefault();
        
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
          simpleValidator.current.showMessages();
          forceUpdate(1);

        } else {

            if(data.password===data.cpassword){

                if(captcha===data.captcha){

                    setLoading(true)
                    axios.post(`${process.env.backendURL}/user`,data)
                    .then(response=>{
                            setLoading(false)
                            if(response.data.response){
                                router.push(`/login`)
                                toast.success('Success', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }else{
                                toast.error('Email already exist', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }
                    })

                }else{
                    toast.warning('Wrong captcha code', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }


            }else{
                toast.warning('Password and Confirm passwords are not matching', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });  
            }

            




        }
      };


  return (
    <Body>

        {/* SignIn Area Starts Here */}
        <section className="section signup-area signin-area">
        <div className="container">
            <div className="row align-items-center">
            <div className="col-xl-5 order-2 order-xl-0">
                <div className="signup-area-textwrapper">
                    <br />
                    <br />
                    <br />

                <h2 className="font-title--md mb-0">Register</h2>
                <p className="mt-2 mb-lg-4 mb-3">Already have account? <Link href={'/login'}><a className="text-black-50">Login</a></Link></p>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-element">
                        <div className="form-alert">
                            <label>Name</label>
                        </div>
                        <div className="form-alert-input">
                            <input type="text" placeholder="Your name" name='name' value={data.name} onChange={handleChange} />
                        </div>
                        {simpleValidator.current.message('name', data.name, 'required|min:4|max:30', { className: 'text-danger' })}

                    </div>


                    <div className="form-element">
                        <div className="form-alert">
                            <label>Email</label>
                        </div>
                        <div className="form-alert-input">
                            <input type="text" placeholder="Your Email" name='email' value={data.email} onChange={handleChange} />
                        </div>
                        {simpleValidator.current.message('email', data.email, 'required|email', { className: 'text-danger' })}
                    </div>

                    <div className="form-element">
                        <div className="form-alert">
                            <label>Phone Number</label>
                        </div>
                        <div className="form-alert-input">
                            <input type="text" placeholder="Your Phone Number" name='phone' value={data.phone} onChange={handleChange} />
                            <span className='small'>Ex. (508) 555-1234 or 5085551234</span>
                        </div>
                        {simpleValidator.current.message('phone', data.phone, 'required|phone', { className: 'text-danger' })}
                    </div>


                    <div className="form-element">
                        <div className="form-alert">
                            <label>Password</label>
                        </div>
                        <div className="form-alert-input">
                            <input type="password" placeholder="Password" name='password' value={data.password} onChange={handleChange} />
                        </div>
                        {simpleValidator.current.message('password', data.password, 'required|min:5|max:20', { className: 'text-danger' })}

                        <div className="form-alert-input mt-2">
                            <input type="password" placeholder="Confirm Password" name='cpassword' value={data.cpassword} onChange={handleChange} />
                        </div>
                        {simpleValidator.current.message('confirm password', data.cpassword, 'required|min:5|max:20', { className: 'text-danger' })}
                    </div>

                  
                    <div className="form-element">
                        <div className="form-alert">
                        <ClientCaptcha captchaCode={code => setCaptcha(code)} charsCount={8} width={200} />
                        </div>
                        <div className="form-alert-input">
                            <input  placeholder="Your Captcha Code" name='captcha' value={data.captcha} onChange={handleChange} />
                        </div>
                        {simpleValidator.current.message('captcha', data.captcha, 'required', { className: 'text-danger' })}
                    </div>


                    
                    
                    
                    <div className="form-element">
                        {loading
                        ?<button type="button" className="button button-lg button--primary w-100" disabled>Please wait...</button>
                        :<button type="submit" className="button button-lg button--primary w-100">Sign in</button>
                        }
                    </div>
                    
                    
                </form>
                </div>
            </div>
            <div className="col-xl-7 order-1 order-xl-0">
                <div className="signup-area-image">
                <img src="dist/images/signup/Illustration.png" alt="Illustration Image" className="img-fluid" />
                </div>
            </div>
            </div>
        </div>
        </section>
        {/* SignIn Area Ends Here */}


    </Body>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Register)