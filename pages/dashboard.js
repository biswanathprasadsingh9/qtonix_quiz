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


export const Account = (props) => {
  const router = useRouter()

    const [loadingPage,setloadingPage]=useState(true);
    const [examfound,setExamFound]=useState(false);
    const [userinfo,setUserInfo]=useState(cookie.load('qtonix_quiz_userdata'));
    const [examinfo,setUExaminfo]=useState(null);
    const [userexaminfo,setUserExaminfo]=useState(null);
    const [showHideModal,setSshowHideModal]=useState(false);


    


    useEffect(()=>{
      axios.post(`${process.env.backendURL}/exam/userdashboard`,{user_id:cookie.load('qtonix_quiz_userdata')._id})
     .then(response=>{
       console.log(response.data)

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
    

      console.log(moment().isAfter(examinfo.start_time))
      console.log(moment().isBefore(examinfo.end_time))

      if(moment().isAfter(examinfo.start_time)===true && moment().isBefore(examinfo.end_time)){
        

        
      axios.post(`${process.env.backendURL}/exam/latestexam`)
     .then(response=>{
         if(response.data.response){

            var create_exam_for_user={
                user_id:cookie.load('qtonix_quiz_userdata')._id,
                exam_id:response.data.examinfo._id,
                exam_info:response.data.examinfo,
                exam_question_answer_data:response.data.questions,
                exam_start:true,
                exam_start_time:Date.now(),
                exam_start_datetime:moment().format()
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
                      {/* <div className="enrolled-courses-icon">
                        <svg width={28} height={26} viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.625H8.8C10.1791 1.625 11.5018 2.15764 12.477 3.10574C13.4521 4.05384 14 5.33974 14 6.68056V24.375C14 23.3694 13.5891 22.405 12.8577 21.6939C12.1263 20.9828 11.1343 20.5833 10.1 20.5833H1V1.625Z" stroke="#1089FF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M27 1.625H19.2C17.8209 1.625 16.4982 2.15764 15.523 3.10574C14.5479 4.05384 14 5.33974 14 6.68056V24.375C14 23.3694 14.4109 22.405 15.1423 21.6939C15.8737 20.9828 16.8657 20.5833 17.9 20.5833H27V1.625Z" stroke="#1089FF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div> */}

                      <div className="enrolled-courses-text">
                        {/* <p className="fs-6 mt-1"><Link href={'/exam'}>Go to exam</Link></p> */}

                        <p>Name: {examinfo.name}</p>
                        <p>Duration: {examinfo.duration}</p>

                        {userexaminfo
                        ?
                          userexaminfo.exam_score===undefined
                          ?
                          <button className='btn btn-primary text-white mt-3' onClick={startExam}>Continue Exam</button>
                          :
                          <>
                              <Link href={`/exam/results?quiz=629f424629f4241b6c5da7ecf6012ad629f4241b6c5da7ecf6012ad1b6c5da7e629f4241b6c5da7ecf6012adcf6012ad&e=${userexaminfo.exam_id}&u=${userexaminfo.user_id}`}>
                                        <a className='btn btn-primary btn-sm text-white'>View Result</a>
                                    </Link>
                          </>

                        :
                        <button className='btn btn-primary text-white mt-3' onClick={startExam}>Start Exam</button>
                        }

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


          <div className="modal" style={{display:showHideModal?'block':'none'}}>
            <div className="modal-dialog">
              <div className="modal-content">
                
                <div className="modal-body">
                  <br />

                  <p>Exam start time: <Moment format="YYYY-MMMM-DD hh:mm:ss A">{examinfo.start_time}</Moment></p>
                  <p>Exam end time: <Moment format="YYYY-MMMM-DD hh:mm:ss A">{examinfo.end_time}</Moment></p>


                  <br />

                  <button type="button" className="btn btn-secondary float-end" data-bs-dismiss="modal" onClick={()=>setSshowHideModal(false)}>Close</button>

                </div>
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