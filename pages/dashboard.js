import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Auth from './Auth'
import QuizBody from './components/QuizBody'
import cookie from 'react-cookies';
import axios from 'axios';
import Link from 'next/link';
import moment from 'moment'
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import TableDashboard from './components/TableDashboard';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Check, Edit3, Eye, X } from 'react-feather';
import {osName,osVersion,browserName,browserVersion,deviceType,mobileVendor,mobileModel,fullBrowserVersion,isAndroid,isDesktop,isIOS,isMacOs,isMobile,isSmartTV,isTablet,isWearable,isWinPhone,isWindows } from 'react-device-detect';

export const Account = (props) => {
  const router = useRouter()

    const [loadingButton,setloadingButton]=useState(false);
    const [loadingPage,setloadingPage]=useState(true);
    const [examfound,setExamFound]=useState(false);
    const [userinfo,setUserInfo]=useState(cookie.load('qtonix_quiz_userdata'));
    const [examinfo,setUExaminfo]=useState(null);
    const [userexaminfo,setUserExaminfo]=useState(null);
    const [showHideModal,setSshowHideModal]=useState(false);
    const [ipinfo, setIpInfo]=useState(null)


    useEffect(()=>{
      axios.post(`${process.env.backendURL}/exam/userdashboard`,{userinfo:cookie.load('qtonix_quiz_userdata')})
     .then(response=>{


        axios.get('https://json.geoiplookup.io')
        .then(response=>{
          setIpInfo(response.data)
        })


        
        if(response.data.examinfo){
          setUExaminfo(response.data.examinfo);
          // setQuestions(response.data.questions);
          setUserExaminfo(response.data.user_examinfo)
          setloadingPage(false);
          setExamFound(true);
        }else{
          setloadingPage(false);
          setExamFound(false);
        }
     })
    },[])



    const startExam=()=>{
    


      if(moment().isAfter(examinfo.start_time)===true && moment().isBefore(examinfo.end_time)){
        
        setloadingButton(true)
        
          axios.post(`${process.env.backendURL}/exam/latestexam`,{userinfo:cookie.load('qtonix_quiz_userdata')})
          .then(response=>{
              if(response.data.response){

                  var create_exam_for_user={
                      user_id:cookie.load('qtonix_quiz_userdata')._id,
                      company_id:cookie.load('qtonix_quiz_userdata').company_id,
                      exam_id:response.data.examinfo._id,
                      exam_info:response.data.examinfo,
                      exam_question_answer_data:response.data.questions,
                      exam_start:true,
                      exam_start_time:Date.now(),
                      exam_start_datetime:moment().format(),
                      ip_info:ipinfo,
                      device_info:{
                        osName:osName,
                        osVersion:osVersion,
                        isDesktop:isDesktop,
                        isAndroid:isAndroid,
                        isIOS:isIOS,
                        isMacOs:isMacOs,
                        isMobile:isMobile,
                        isSmartTV:isSmartTV,
                        isTablet:isTablet,
                        isWearable:isWearable,
                        isWinPhone:isWinPhone,
                        isWindows:isWindows,
                        mobileVendor:mobileVendor,
                        mobileModel:mobileModel,
                        deviceType:deviceType,
                        browserName:browserName,
                        browserVersion:browserVersion,
                        fullBrowserVersion:fullBrowserVersion,
                      }
                  }

                  //create exam under user
                  axios.post(`${process.env.backendURL}/exam/exam_create_view`,create_exam_for_user)
                  .then(response1=>{
                      router.push('/exam')
                  })

              }else{
                  
              }
              
          })





      }else{
        setloadingButton(false)

        setSshowHideModal(true)
      }

    }







  return (
    <QuizBody>

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
      <>
        <section className="section students-info">
          <div className="container">
            <div className="students-info-intro p-5">
              {/* profile Details   */}
                <div className="row">
                {examfound
                  ?<>
                  <div className="col-md-7">
                   {/* <div className="image">
                      <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Student" />
                    </div>*/}
                    <div className="text">
                      <h4>{examinfo.name}</h4>
                      <br/>
                       <p>Duration: {examinfo.duration} min</p>
                       <p>State Date: <Moment format="YYYY-MMMM-DD hh:mm:ss A">{examinfo.start_time}</Moment></p>
                       <p>End Date: <Moment format="YYYY-MMMM-DD hh:mm:ss A">{examinfo.end_time}</Moment></p>

                       <p>Pass: {examinfo.pass_percentage} %</p>

                      {/* <p>{userinfo.email}</p> */}
                    </div>
                  </div>
                    <div className="col-md-5">
                    <div className="enrolled-courses">

                      <div className="enrolled-courses-text">

                        {userexaminfo
                        ?
                          userexaminfo.exam_score===undefined
                          ?
                          <center>
                            <button className='btn btn-primary text-white me-5 mt-5' onClick={startExam} id='continueexam'><Edit3  size={18} disabled={loadingButton} />{loadingButton?`Please wait...`:`Continue Exam`} </button>
                          </center>
                          :
                          <>
                               <center>
                                <div style={{ width: 150 }}>
                                {Math.round(_.filter(userexaminfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined && o.answer_user===o.answer }).length/userexaminfo.exam_question_answer_data.length*100)>=userexaminfo.exam_info.pass_percentage
                                ?
                                <>
                                    <CircularProgressbar 
                                           
                                        value={Math.round(_.filter(userexaminfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined && o.answer_user===o.answer }).length/userexaminfo.exam_question_answer_data.length*100)} 
                                        text={`${Math.round(_.filter(userexaminfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined && o.answer_user===o.answer }).length/userexaminfo.exam_question_answer_data.length*100)}%`} 
                                        styles={{ 
                                            text: {
                                              fill: '#0ecd0e',
                                              fontSize: '16px',
                                            },
                                            background: {
                                              fill: '#0ecd0e',
                                            },
                                            path: {
      
                                                  stroke: `#0ecd0e`,
                                            },
                                        }}
                                     />
                                     <h4 style={{color: "#0ecd0e",marginTop: '10%'}} >Pass </h4>

                                    </>:
                                    <>
                                      <CircularProgressbar 
                                            
                                        value={Math.round(_.filter(userexaminfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined && o.answer_user===o.answer }).length/userexaminfo.exam_question_answer_data.length*100)} 
                                        text={`${Math.round(_.filter(userexaminfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined && o.answer_user===o.answer }).length/userexaminfo.exam_question_answer_data.length*100)}%`} 
                                        styles={{ 
                                            text: {
                                              fill: '#ff5151',
                                              fontSize: '16px',
                                            },
                                            background: {
                                              fill: '#ff5151',
                                            },
                                            path: {
      
                                                  stroke: `#ff5151`,
                                            },
                                        }}
                                     />
                                         <h4 style={{color: "#ff5151",marginTop: '10%'}}>Fail </h4>
                                        
                                    </>}
                                </div>
                                 <Link href={`/exam/results?quiz=629f424629f4241b6c5da7ecf6012ad629f4241b6c5da7ecf6012ad1b6c5da7e629f4241b6c5da7ecf6012adcf6012ad&e=${userexaminfo.exam_id}&u=${userexaminfo.user_id}`}>
                                        <a className='btn btn-primary btn-sm text-white mt-4'><Eye size={18} /> View Full Result</a>

                                    </Link>
                            </center>
                             
                          </>

                        :
                         <center className="mt-5">
                          <button className='btn btn-primary text-white me-5 mt-5' onClick={startExam} id='startexam'><Check size={18} disabled={loadingButton} />{loadingButton?`Please wait...`:`Start Exam`}</button>
                        </center>

                        }

                      </div>

                      


                    </div>
                  </div>
                    </>

                  :

                     <div className="col-md-12">
                    <div className="enrolled-courses text-center">
                      <h3>No exam found</h3>
                    </div>
                  </div> 




                }
                  
                 
                 
                  
                </div>

                  



              {/* Nav  */}
              <br/>
              <br/>

            </div>
            
          <br/>
          </div>



          <div className="modal" style={{display:showHideModal?'block':'none'}}>
            <div className="modal-dialog">
              <div className="modal-content">
                {examinfo!==null
                ?
                <div className="modal-body">
                  <br />
                  <h3>You can not start the exam.</h3>
                  <br/>
                  <p><b>Exam start time:</b> <Moment format="YYYY-MMMM-DD hh:mm:ss A">{examinfo.start_time}</Moment></p>
                  <p><b>Exam end time:</b> <Moment format="YYYY-MMMM-DD hh:mm:ss A">{examinfo.end_time}</Moment></p>


                  <br />

                  <button type="button" className="btn btn-danger float-end text-white" data-bs-dismiss="modal" onClick={()=>setSshowHideModal(false)}><X size={16} /> Close</button>

                </div>
                :
                <></>
                }

                
              </div>
            </div>
          </div>



        </section>
       
          <section className="section students-info" style={{marginTop:'-16rem'}}>
          <div className="container">
            <div className="students-info-intro p-4">
        
              <div className="students-info-intro__profile">
              <TableDashboard user_id={userinfo._id} />

              </div>
            </div>
          </div>
          </section>

        
        </>
        }
      </Auth>



    </QuizBody>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Account)