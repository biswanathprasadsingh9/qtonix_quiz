import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Auth from './Auth'
import Body from './components/Body'
import cookie from 'react-cookies';
import axios from 'axios';
import Link from 'next/link';

export const Account = (props) => {
    const [loadingPage,setloadingPage]=useState(true);
    const [examfound,setExamFound]=useState(false);
    const [userinfo,setUserInfo]=useState(cookie.load('qtonix_quiz_userdata'));
    const [examinfo,setUExaminfo]=useState(null);
    const [questions,setQuestions]=useState(null);


    useEffect(()=>{
      axios.post(`${process.env.backendURL}/exam/latestexam`)
     .then(response=>{
       console.log(response.data)

        if(response.data.examinfo){
          setUExaminfo(response.data.examinfo);
          setQuestions(response.data.questions);
          setloadingPage(false);
          setExamFound(true);
        }else{
          setloadingPage(false);
          setExamFound(false);
        }
     })
    },[])

  return (
    <Body>

<Auth>
  {/* Breadcrumb Starts Here */}
  <div className="py-0 mt-5">
    <div className="container">
      <h3>Dashboard</h3>
    </div>
  </div>
 
 {userinfo===undefined || loadingPage===true
 ?
 <center>
   <img src="https://thumbs.gfycat.com/EnchantingInbornDogwoodtwigborer-size_restricted.gif" alt="asaas" className='myloader' />
 </center>
 :
  <section className="section students-info">
    <div className="container">
      <div className="students-info-intro">
        {/* profile Details   */}
        <div className="students-info-intro__profile">
          <div>
            <div className="students-info-intro-start">
              <div className="image">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Student" />
              </div>
              <div className="text">
                <h5>{userinfo.name}</h5>
                <p>{userinfo.email}</p>
              </div>
            </div>
          </div>
          <div>
            {examfound
            ?
            <div className="students-info-intro-end">
              <div className="enrolled-courses">
                <div className="enrolled-courses-icon">
                  <svg width={28} height={26} viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.625H8.8C10.1791 1.625 11.5018 2.15764 12.477 3.10574C13.4521 4.05384 14 5.33974 14 6.68056V24.375C14 23.3694 13.5891 22.405 12.8577 21.6939C12.1263 20.9828 11.1343 20.5833 10.1 20.5833H1V1.625Z" stroke="#1089FF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M27 1.625H19.2C17.8209 1.625 16.4982 2.15764 15.523 3.10574C14.5479 4.05384 14 5.33974 14 6.68056V24.375C14 23.3694 14.4109 22.405 15.1423 21.6939C15.8737 20.9828 16.8657 20.5833 17.9 20.5833H27V1.625Z" stroke="#1089FF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="enrolled-courses-text">
                  <p className="fs-6 mt-1"><Link href={'/exam'}>Click here to start exam</Link></p>
                </div>
              </div>
            </div>
            :
            <div className="students-info-intro-end">
              <div className="enrolled-courses">
                <h3>No exam found</h3>
              </div>
            </div>
            }
            
          </div>
        </div>
        {/* Nav  */}
        <br/>
        <br/>

      </div>
      
     <br/>
    </div>
  </section>
  }
</Auth>



    </Body>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Account)