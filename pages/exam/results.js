import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Auth from '../Auth'
import QuizBody from '../components/QuizBody'
import cookie from 'react-cookies';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import _ from 'lodash';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Result = (props) => {
    const router = useRouter()
    const [loadingPage,setloadingPage]=useState(true);
    const [userinfo,setUserInfo]=useState(cookie.load('qtonix_quiz_userdata'));
    const [examinfo,setUExaminfo]=useState(null);


    useEffect(()=>{

        console.log(router.query)

        var data={
            user_id:router.query.u,
            exam_id:router.query.e,
        }

        axios.post(`${process.env.backendURL}/exam/view_score`,data)
        .then(response=>{
            if(response.data.response){
                setloadingPage(false)
                setUExaminfo(response.data.data)
            }else{
                router.query.push('/dashboard')
            }
        })
    },[])

  return (
    <QuizBody>

        <Auth>
        {/* Breadcrumb Starts Here */}
        <div className="py-0 mt-5">
            <div className="container">
            <h3>Result</h3>
            </div>
        </div>
        
        {userinfo===undefined || loadingPage===true || examinfo===null
        ?
        <center>
        <img src="https://thumbs.gfycat.com/EnchantingInbornDogwoodtwigborer-size_restricted.gif" alt="asaas" className='myloader' />
        </center>
        :
        <section className="section students-info">
            <div className="container">
                <div className="students-info-intro">
                    <div className=" row">
                        <div className="col-md-6">
                            <div className=" mt-5 ms-3">
                                <h1 className="h4">Exam ID: {examinfo.student_exam_code}</h1>
                                  <br/>
                                <h3 className="h5">Your Result: {examinfo.exam_score} Marks</h3>
                                 <br/>
                                <p>Attempted: {_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined }).length}/{examinfo.exam_question_answer_data.length}</p>
                                {/*<p>Unanswered: {_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user===undefined }).length}</p>*/}
                                
                                <p style={{color:'#00c800'}}>Correct: {_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user===o.answer }).length}</p>
                                <p style={{color:'red'}}>Wrong: {_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined }).length-_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user===o.answer }).length}</p>
                                
                                
                                
                            </div>
                        </div>
                        <div className="col-md-6 pt-5">
                            <center>
                                {/*<div class="progress blue">
                                    <span class="progress-left">
                                           <span class="progress-bar"></span>
                                    </span>
                                    <span class="progress-right">
                                        <span class="progress-bar"></span>
                                    </span>
                                     <div class="progress-value">90%</div>
                                </div>*/}
                                <div style={{ width: 150 }}>
                                {Math.round(_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined && o.answer_user===o.answer }).length/examinfo.exam_question_answer_data.length*100)>=examinfo.exam_info.pass_percentage
                                ?
                                <>
                                    <CircularProgressbar 
                                           
                                        value={Math.round(_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined && o.answer_user===o.answer }).length/examinfo.exam_question_answer_data.length*100)} 
                                        text={`${Math.round(_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined && o.answer_user===o.answer }).length/examinfo.exam_question_answer_data.length*100)}%`} 
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
                                    {/*<div className="students-info-intro-end justify-content-center mt-3">
                                        <div className="enrolled-courses">
                                            <a className='btn btn-primary text-white' href={`${process.env.backendURLPDF}/${examinfo.student_exam_code}.pdf`}>Download Certificate</a>
                                        </div>
                                    </div>*/}

                                    </>:
                                    <>
                                      <CircularProgressbar 
                                            
                                        value={Math.round(_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined && o.answer_user===o.answer }).length/examinfo.exam_question_answer_data.length*100)} 
                                        text={`${Math.round(_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined && o.answer_user===o.answer }).length/examinfo.exam_question_answer_data.length*100)}%`} 
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
                                <div className="students-info-intro-end justify-content-evenly mt-3">
                                    <a  href={`/certificate?id=${examinfo.student_exam_code}`} target={'_blank'} rel="noreferrer" >View Certificate <img src="https://img.icons8.com/material-outlined/20/0d6ecc/visible--v1.png"/></a>
                                    <a  href={`${process.env.backendURLPDF}/${examinfo.student_exam_code}.pdf`} download >Download Certificate <img src="https://img.icons8.com/pastel-glyph/20/0d6ecc/download--v1.png"/></a>

                                </div>
                            </center>
                        </div>
                    </div>
                    <br/>
                    <br/>
                </div>
            </div>

            <div className="container">
                <div className="">
                    <div className="">
                        <h4 className="mb-3"><u>Questions</u></h4>

                        {examinfo.exam_question_answer_data.map((data,key)=>{

                            return(
                                <div className={`qbox students-info-intro p-3 ${data.answer_user===data.answer && data.answer_user!==undefined?'corrent-results':''} ${data.answer_user!==data.answer && data.answer_user!==undefined?'wrong-results':''} ` } key={key}>
                                    <p style={{marginBottom:'10px',textDecoration:'underline'}}>Questions- {key+1}/{examinfo.exam_question_answer_data.length}</p>
                                        <h5 style={{paddingLeft:'30px'}}>{data.question}</h5>
                                        <ul className="disc-list">
                                    {data.options.map((optn,okey)=>{

                                        if(data.answer_user===undefined){
                                            return(
                                               <li> <p key={okey}> <span  className={`bg-trans`} >{optn}</span></p></li> 
                                            )
                                        }else{

                                            if(data.answer_user===data.answer){
                                                return(
                                                   <li>  <p  key={okey}> <span className={okey+1===data.answer_user?`bg-correct`:``} >{optn}  </span>  {okey+1===data.answer_user?<span className='textcorrect'>&nbsp;+1 Mark</span>:``}</p></li>
                                                )
                                            }else{
                                                return(
                                                   <li>  <p  key={okey}> <span className={okey+1===data.answer_user?`bg-wrong`:``}>{optn}</span> </p></li>
                                                )
                                            }
                                        }
                                    })}
                                    </ul>
                                    {data.answer_user===undefined?<p className="text-end"> <span className="bg-wrong"> Not Attempted</span> </p>:``}
                                    
                                </div>
                            )
                        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Result)