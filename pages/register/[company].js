import React, { useState,useRef } from 'react';
import { connect } from 'react-redux'
import Body from '../components/Body'
import SimpleReactValidator from "simple-react-validator";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ClientCaptcha from "react-client-captcha";
import Link from 'next/link';
import { Eye, EyeOff, UserPlus } from 'react-feather';
import { useEffect } from 'react';
import QuizBody from '../components/QuizBody';



export const Register = (props) => {
    const router = useRouter()

    const simpleValidator = useRef(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const [pageloading, setPageLoading] = useState(true);

    const [loading, setLoading] = useState(false);
    const [captcha, setCaptcha] = useState(111);

    const [eyePassword, setEyePassword] = useState(false);
    const [reyePassword, setReyePassword] = useState(false);

    const [company, setCompany] = useState(false);



    const [data, setData] = useState({
        company_id:'',
        name:'',
        email:'',
        phone:'',
        password:'',
        cpassword:'',
        captcha:''
    });


    useEffect(()=>{
        axios.post(`${process.env.backendURL}/company/check`,{register_url:router.query.company})
        .then(response=>{
            console.log(response.data)
            if(response.data.response){
                setData({
                    ...data,
                    company_id:response.data.data._id
                })
                setPageLoading(false)
                setCompany(response.data.data)
            }else{

            }

        })
    },[])

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

      console.log(data)

  return (
    <QuizBody>
        {pageloading
            ?
            <center>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif' />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </center>
            :
        <section className="section bg-white" style={{marginTop:'-100px'}}>
            {company!==null
            ?
            <div className="container">
                <div className="row">
                <div className='col-xl-12 p-5'>
                    <center>
                      {company.logo===''
                      ?
                      <></>
                      :
                      <>
                      <img src={`${company.logo}?tr=h-100,q-100`} />
                      </>
                      }
                    </center>
                    <center className="mt-5">
                        <h1 className='h1-responsive'>{company.form_heading}</h1>
                        <p>{company.form_subheading}</p>
                    </center>
                    
                </div>
                <div className="col-lg-7 p-5">
                    <div className="">
                    
                    <div className='mt-4'>
                        <div dangerouslySetInnerHTML={{__html: company.form_body}}></div>
                    </div>
                    {/* <h2 className="font-title--md mb-0">{company!==null?company.form_heading:''}</h2>
                    <h4>{company!==null?company.form_subheading:''}</h4>

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
                                <input type="text" placeholder="Ex. (508) 555-1234 or 5085551234" name='phone' value={data.phone} onChange={handleChange} />
                                
                            </div>
                            {simpleValidator.current.message('phone', data.phone, 'required|phone', { className: 'text-danger' })}
                        </div>


                        <div className="form-element">
                            <div className="form-alert">
                                <label>Password</label>
                            </div>
                            <div className="form-alert-input">
                                <input type={eyePassword?`text`:`password`} placeholder="Password" name='password' value={data.password} onChange={handleChange} />
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

                            <div className="form-alert-input mt-2">
                            <input type={reyePassword?`text`:`password`} placeholder="Confirm Password" name='cpassword' value={data.cpassword} onChange={handleChange} />
                            {reyePassword
                                ?
                                <div className="form-alert-icon cursor-pointer">
                                    <EyeOff onClick={()=>setReyePassword(false)} />
                                </div>
                                :
                                <div className="form-alert-icon cursor-pointer">
                                    <Eye onClick={()=>setReyePassword(true)} />
                                </div>
                                }
                            </div>
                            {simpleValidator.current.message('password', data.password, 'required|min:5|max:20', { className: 'text-danger' })}

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
                            :<button type="submit" className="button button-lg button--primary w-100"><UserPlus size={16} /> Sign in</button>
                            }
                        </div>
                        
                        
                        </form> */}
                    </div>
                </div>
                <div className="col-lg-5 p-5" style={{backgroundColor:'#37869d'}}>
                    <div className='mt-2'>
                        <h4 className='text-white'>Register for the Webinar</h4>

                    </div>
                    <div className='mt-4'>
                        <p className='text-white'>Date: Tuesday, June 17th, 2014</p>
                        <p className='text-white'>Time: 11am PT / 2pm ET / 6pm GMT</p>
                        <p className='text-white'>Duration: 1 Hour</p>
                    </div>
                    <div className='mt-4'>
                    <form onSubmit={handleSubmit}>
                        
                        <div className="form-element">
                            <div className="form-alert">
                                <label className='text-white'>Name</label>
                            </div>
                            <div className="form-alert-input">
                                <input type="text" placeholder="Your name" name='name' value={data.name} onChange={handleChange} />
                            </div>
                            {simpleValidator.current.message('name', data.name, 'required|min:4|max:30', { className: 'text-danger' })}

                        </div>


                        <div className="form-element">
                            <div className="form-alert">
                                <label className='text-white'>Email</label>
                            </div>
                            <div className="form-alert-input">
                                <input type="text" placeholder="Your Email" name='email' value={data.email} onChange={handleChange} />
                            </div>
                            {simpleValidator.current.message('email', data.email, 'required|email', { className: 'text-danger' })}
                        </div>

                        <div className="form-element">
                            <div className="form-alert">
                                <label className='text-white'>Phone Number</label>
                            </div>
                            <div className="form-alert-input">
                                <input type="text" placeholder="Ex. (508) 555-1234 or 5085551234" name='phone' value={data.phone} onChange={handleChange} />
                                
                            </div>
                            {simpleValidator.current.message('phone', data.phone, 'required|phone', { className: 'text-danger' })}
                        </div>


                        <div className="form-element">
                            <div className="form-alert">
                                <label className='text-white'>Password</label>
                            </div>
                            <div className="form-alert-input">
                                <input type={eyePassword?`text`:`password`} placeholder="Password" name='password' value={data.password} onChange={handleChange} />
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

                            <div className="form-alert-input mt-2">
                            <input type={reyePassword?`text`:`password`} placeholder="Confirm Password" name='cpassword' value={data.cpassword} onChange={handleChange} />
                            {reyePassword
                                ?
                                <div className="form-alert-icon cursor-pointer">
                                    <EyeOff onClick={()=>setReyePassword(false)} />
                                </div>
                                :
                                <div className="form-alert-icon cursor-pointer">
                                    <Eye onClick={()=>setReyePassword(true)} />
                                </div>
                                }
                            </div>
                            {simpleValidator.current.message('password', data.password, 'required|min:5|max:20', { className: 'text-danger' })}

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
                            ?<button type="button" className="button button-lg bg-222 w-100" disabled>Please wait...</button>
                            :<button type="submit" className="button button-lg bg-222 w-100"><UserPlus size={16} /> Sign in</button>
                            }
                        </div>
                        
                        
                        </form> 
                    </div>
                </div>
                </div>
            </div>
            :
            <center>
                Loading...
            </center>
            }
            
            
        
        </section>
        }


    </QuizBody>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Register)