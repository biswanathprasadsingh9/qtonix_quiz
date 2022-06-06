import React, { useState,useRef } from 'react';
import { connect } from 'react-redux'
import Body from './components/Body'
import SimpleReactValidator from "simple-react-validator";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


export const register = (props) => {
    const router = useRouter()

    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name:'',
        email:'',
        password:'',
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
                <h2 className="font-title--md mb-0">Register</h2>
                <p className="mt-2 mb-lg-4 mb-3">Don't have account? <a href="signup.html" className="text-black-50">Sign up</a></p>
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
                            <label>Password</label>
                        </div>
                        <div className="form-alert-input">
                            <input type="password" placeholder="Your Password" name='password' value={data.password} onChange={handleChange} />
                        </div>
                        {simpleValidator.current.message('password', data.password, 'required|min:5|max:20', { className: 'text-danger' })}
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

export default connect(mapStateToProps, mapDispatchToProps)(register)