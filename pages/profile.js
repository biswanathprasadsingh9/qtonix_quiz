import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import Auth from './Auth'
import QuizBody from './components/QuizBody'
import cookie from 'react-cookies';
import axios from 'axios';
import Link from 'next/link';
import SimpleReactValidator from "simple-react-validator";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Loader, Save } from 'react-feather';


export const Profile = (props) => {
    const router = useRouter()

    const simpleValidator = useRef(new SimpleReactValidator());
    const [loadingPage,setloadingPage]=useState(true);
    const [, forceUpdate] = useState();
    const [loading, setLoading] = useState(false);
    const [userinfo,setUserInfo]=useState(cookie.load('qtonix_quiz_userdata'));
    const [data, setData] = useState({
        _id:cookie.load('qtonix_quiz_userdata')!==undefined?cookie.load('qtonix_quiz_userdata')._id:'',
        name:cookie.load('qtonix_quiz_userdata')!==undefined?cookie.load('qtonix_quiz_userdata').name:'',
        phone:cookie.load('qtonix_quiz_userdata')!==undefined?cookie.load('qtonix_quiz_userdata').phone:'',
        password:cookie.load('qtonix_quiz_userdata')!==undefined?cookie.load('qtonix_quiz_userdata').password:'',

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

            // if(data.password===data.cpassword){

          

                    setLoading(true)
                    axios.put(`${process.env.backendURL}/user/${data._id}`,data)
                    .then(response=>{
                            setLoading(false)
                            if(response.data.response){
                                cookie.remove('qtonix_quiz_userdata', { path: '/' })
            
                                var expires = new Date();
                                expires.setSeconds(21600);
                                cookie.save('qtonix_quiz_userdata', response.data.data, { path: '/',expires });

                                router.push(`/dashboard`)


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

                


            // }else{
            //     toast.warning('Password and Confirm passwords are not matching', {
            //         position: "top-right",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     });  
            // }
        }
      };



      const handleSubmitPassword = e => {

        e.preventDefault();
        
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
          simpleValidator.current.showMessages();
          forceUpdate(1);

        } else {

            if(data.password===data.old_password){

                if(data.new_password===data.rnew_password){

                    data.password=data.new_password;

                    console.log(data)

                    setLoading(true)
                    axios.put(`${process.env.backendURL}/user/${data._id}`,data)
                    .then(response=>{
                            setLoading(false)
                            if(response.data.response){
                                cookie.remove('qtonix_quiz_userdata', { path: '/' })
                                var expires = new Date();
                                expires.setSeconds(21600);
                                cookie.save('qtonix_quiz_userdata', response.data.data, { path: '/',expires });
                                router.push(`/dashboard`)
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
                                toast.error('Failed', {
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
                    toast.warning('New password and confirm password is not matching', {
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
    <QuizBody>

        <Auth>
        {/* Breadcrumb Starts Here */}
        <div className="py-0 mt-5">
            <div className="container">
            <h3>Profile</h3>
            </div>
        </div>
        
        {userinfo===undefined
        ?
        <center>
        <img src="https://thumbs.gfycat.com/EnchantingInbornDogwoodtwigborer-size_restricted.gif" alt="asaas" className='myloader' />
        </center>
        :

        <section className="section students-info">
            <div className="container">
                <div className="row">
                    <div className="col-md-6  ">
                        <form onSubmit={handleSubmit} className="bg-white rounded p-3">
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
                                    <label>Phone Number</label>
                                </div>
                                <div className="form-alert-input">
                                    <input type="text" placeholder="Ex. (508) 555-1234 or 5085551234" name='phone' value={data.phone} onChange={handleChange} />
                                    
                                </div>
                                {simpleValidator.current.message('phone', data.phone, 'required|phone', { className: 'text-danger' })}
                            </div>
                            <div className="form-element">
                                {loading
                                ?<button type="button" className="button button-lg button--primary w-100 btn-sm" disabled><Loader size={18} /> Please wait...</button>
                                :<button type="submit" className="button button-lg button--primary w-100 btn-sm"><Save size={18} /> Update Account Information</button>
                                }
                            </div>
                        </form>
                    </div>


                    <div className="col-md-6">
                        <form onSubmit={handleSubmitPassword} className="bg-white rounded p-3">
                            <div className="form-element">
                                <div className="form-alert">
                                    <label>Old password</label>
                                </div>
                                <div className="form-alert-input">
                                    <input type="text" placeholder="Old Password" name='old_password' value={data.old_password} onChange={handleChange} />
                                </div>
                                {simpleValidator.current.message('old_password', data.old_password, 'required|min:4|max:30', { className: 'text-danger' })}
                            </div>


                            <div className="form-element">
                                <div className="form-alert">
                                    <label>New password</label>
                                </div>
                                <div className="form-alert-input">
                                    <input type="text" placeholder="New Password" name='new_password' value={data.new_password} onChange={handleChange} />
                                </div>
                                {simpleValidator.current.message('new_password', data.new_password, 'required|min:4|max:30', { className: 'text-danger' })}
                            </div>


                            <div className="form-element">
                                <div className="form-alert">
                                    <label>Re-enter new password</label>
                                </div>
                                <div className="form-alert-input">
                                    <input type="text" placeholder="Re-enter New Password" name='rnew_password' value={data.rnew_password} onChange={handleChange} />
                                </div>
                                {simpleValidator.current.message('rnew_password', data.rnew_password, 'required|min:4|max:30', { className: 'text-danger' })}
                            </div>
                            
                            <div className="form-element">
                                {loading
                                ?<button type="button" className="button button-lg button--primary w-100" disabled><Loader size={18} /> Please wait...</button>
                                :<button type="submit" className="button button-lg button--primary w-100"><Save size={18} /> Update Password</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        }
        </Auth>



    </QuizBody>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)