import React, { useState,useRef } from 'react';
import { connect } from 'react-redux'
import Body from './components/Body'
import SimpleReactValidator from "simple-react-validator";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'react-cookies';
import Link from 'next/link';
import { LogIn, Eye, EyeOff, } from 'react-feather';
import {publicIp, publicIpv4, publicIpv6} from 'public-ip';
import QuizBody from './components/QuizBody';

export const Login = (props) => {
    const router = useRouter()

    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email:'',
        password:'',
    });
    const [eyePassword, setEyePassword] = useState(false);


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
            setLoading(true)
            axios.post(`${process.env.backendURL}/user/login`,data)
                .then(response=>{
                    setLoading(false)
                    if(response.data.response){

                        console.log(response.data)

                        toast.success('Login Success', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        cookie.remove('qtonix_quiz_userdata', { path: '/' })
                        cookie.remove('qtonix_quiz_userid', { path: '/' })
    
                        var expires = new Date();
                        expires.setSeconds(21600);
                        cookie.save('qtonix_quiz_userdata', response.data.data, { path: '/',expires });
                        cookie.save('qtonix_quiz_userid', response.data.data._id, { path: '/',expires });

                        router.push(`/dashboard`)

    
                    }else{
                        toast.error('Wrong credentials', {
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
        }
      };


      console.log(publicIpv4());


  return (
    <QuizBody>

        {/* SignIn Area Starts Here */}
        <section className="section">
        <div className="container">
            <div className="row align-items-center">
            <div className="col-md-6 offset-md-3 p-5" style={{backgroundColor: 'rgb(55, 134, 157)'}}>
                <div className="signup-area-textwrapper">
                <h2 className="font-title--md mb-0 text-white" >Login</h2>
                {/* <p className="mt-2 mb-lg-4 mb-3">Don&apos;t have account? <Link href={'/register'}><a className="text-black-50">Register</a></Link></p> */}
                <form onSubmit={handleSubmit}>
                    
                   
                    <div className="form-element">
                        <div className="form-alert">
                            <label className='text-white'>Email</label>
                        </div>
                        <div className="form-alert-input">
                            <input type="text" placeholder="Your Email" name='email' id='email' value={data.email} onChange={handleChange} />
                        </div>
                        {simpleValidator.current.message('email', data.email, 'required|email', { className: 'text-danger' })}
                    </div>


                    <div className="form-element">
                        <div className="form-alert">
                            <label className='text-white'>Password</label>
                            <Link href={'/forgetpassword'}><a className="text-primary fs-6 text-white">Forget Password</a></Link>
                        </div>
                        <div className="form-alert-input">
                            <input type={eyePassword?`text`:`password`} placeholder="Your Password" name='password' id='password' value={data.password} onChange={handleChange} />
                        
                            {eyePassword
                            ?
                            <div className="form-alert-icon cursor-pointer">
                                <EyeOff onClick={()=>setEyePassword(false)} />
                            </div>
                            :
                            <div className="form-alert-icon cursor-pointer">
                                <Eye onClick={()=>setEyePassword(true)} />
                            </div>
                            }
                        </div>
                        {simpleValidator.current.message('password', data.password, 'required|min:5|max:20', { className: 'text-danger' })}

                    </div>
                    
                    
                    <div className="form-element">
                        {loading
                        ?<button type="button" className="button button-lg bg-222 w-100" disabled>Please wait...</button>
                        :<button type="submit" className="button button-lg bg-222 w-100" id='submit'><LogIn size={16} /> Login</button>
                        }
                    </div>
                    
                    <br />
                    <br />

                </form>
                </div>
            </div>
            {/* <div className="col-xl-7 order-1 order-xl-0">
                <div className="signup-area-image">
                <img src="dist/images/signup/Illustration.png" alt="Illustration Image" className="img-fluid" />
                </div>
            </div> */}
            </div>
        </div>
        </section>
        {/* SignIn Area Ends Here */}


    </QuizBody>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Login)