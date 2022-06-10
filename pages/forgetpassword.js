import React, { useState,useRef } from 'react';
import { connect } from 'react-redux'
import Body from './components/Body'
import SimpleReactValidator from "simple-react-validator";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'react-cookies';
import Link from 'next/link';

export const Forgetpassword = (props) => {
    const router = useRouter()

    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email:'',
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
            setLoading(true)
            axios.post(`${process.env.backendURL}/user/forgetpassword`,data)
                .then(response=>{
                    setLoading(false)
                    if(response.data.response){

                        console.log(response.data)

                        toast.success('Please check your email inbox', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        router.push(`/login`)

    
                    }else{
                        toast.error('This email is not registrated', {
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


  return (
    <Body>

        {/* SignIn Area Starts Here */}
        <section className="section signup-area signin-area">
        <div className="container">
            <div className="row align-items-center">
            <div className="col-xl-5 order-2 order-xl-0">
                <div className="signup-area-textwrapper">
                <h2 className="font-title--md mb-0">Forget Passowrd</h2>
                <p className="mt-2 mb-lg-4 mb-3">Don&apos;t have account? <Link href={'/register'}><a className="text-black-50">Register</a></Link></p>
                <form onSubmit={handleSubmit}>
                    
                   
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
                        {loading
                        ?<button type="button" className="button button-lg button--primary w-100" disabled>Please wait...</button>
                        :<button type="submit" className="button button-lg button--primary w-100">Reset Password</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Forgetpassword)