import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import Auth from './Auth'
import Body from './components/Body'
import cookie from 'react-cookies';
import axios from 'axios';
import Link from 'next/link';
import SimpleReactValidator from "simple-react-validator";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


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
            <div className="container bg-white rounded p-3">
            
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
                            <label>Phone Number</label>
                        </div>
                        <div className="form-alert-input">
                            <input type="text" placeholder="Your Phone Number" name='phone' value={data.phone} onChange={handleChange} />
                            <span className='small'>Ex. (508) 555-1234 or 5085551234</span>
                        </div>
                        {simpleValidator.current.message('phone', data.phone, 'required|phone', { className: 'text-danger' })}
                    </div>



                  
                    

                    
                    
                    
                    <div className="form-element">
                        {loading
                        ?<button type="button" className="button button-lg button--primary w-100" disabled>Please wait...</button>
                        :<button type="submit" className="button button-lg button--primary w-100">Update</button>
                        }
                    </div>
                    
                    
                </form>
                
            </div>
        </section>
        }
        </Auth>



    </Body>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)