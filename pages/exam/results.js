import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Auth from '../Auth'
import Body from '../components/Body'
import cookie from 'react-cookies';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import _ from 'lodash';

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
    <Body>

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
                    <div className="students-info-intro__profile">
                        <div>
                            <div className="">
                                <h2>Exam ID: {examinfo.student_exam_code}</h2>
                                <h3>Your Result: {examinfo.exam_score}/{examinfo.exam_question_answer_data.length} points</h3>
                                <p>Total: {examinfo.exam_question_answer_data.length}</p>
                                <p>Answered: {_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined }).length}</p>
                                <p>Unanswerrd: {_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user===undefined }).length}</p>
                                
                                <p>Correct: {_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user===o.answer }).length}</p>
                                <p>Wrong: {_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined }).length-_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user===o.answer }).length}</p>

                                
                                
                                <br/>
                                <br/>
                                <h4>Pass Mark: {examinfo.exam_info.pass_percentage}%</h4>
                                
                                {Math.round(_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined }).length/examinfo.exam_question_answer_data.length*100)>=examinfo.exam_info.pass_percentage
                                ?
                                <>
                                <h4>Pass {Math.round(_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined }).length/examinfo.exam_question_answer_data.length*100)} %</h4>
                                </>
                                :
                                <>
                                <h4>Fail {Math.round(_.filter(examinfo.exam_question_answer_data, function(o) { return o.answer_user!==undefined }).length/examinfo.exam_question_answer_data.length*100)} %</h4>
                                </>
                                }

                                
                            </div>
                        </div>
                        <div>
                            <div className="students-info-intro-end">
                                <div className="enrolled-courses">
                                    <a className='btn btn-primary text-white' href={`${process.env.backendURLPDF}/${examinfo.student_exam_code}.pdf`}>Download Certificate</a>
                                    <a className='btn btn-primary text-white' href={`/certificate?id=${examinfo.student_exam_code}`} target={'_blank'}>View Certificate</a>

                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                </div>
            </div>

            <div className="container">
                <div className="students-info-intro">
                    <div className="">
                        

                        {examinfo.exam_question_answer_data.map((data,key)=>{
                            return(
                                <div className='qbox' key={key}>
                                    <h5>{key+1}- {data.question}</h5>
                                    {data.options.map((optn,okey)=>{

                                        if(data.answer_user===undefined){
                                            return(
                                                <p key={okey}>{okey+1}. <span>{optn}</span></p>
                                            )
                                        }else{

                                            if(data.answer_user===data.answer){
                                                return(
                                                    <p key={okey}>{okey+1}. <span className={okey+1===data.answer_user?`bg-correct`:``}>{optn}</span>  {okey+1===data.answer_user?<span className='textcorrect'>+1 Point</span>:``}</p>
                                                )
                                            }else{
                                                return(
                                                    <p key={okey}>{okey+1}. <span className={okey+1===data.answer_user?`bg-wrong`:``}>{optn}</span></p>
                                                )
                                            }
                                        }
                                    })}
                                    <h6>Ans: {data.options[data.answer-1]}</h6>
                                    
                                    
                                </div>
                            )
                        })}

                        {/* <div className='qbox'>
                            <h5>1- What is your name?</h5>
                            <p>1- John</p>
                            <p><span className='bg-correct'>2- Ron</span></p>
                            <p>3- Sam</p>
                            <p>4- Peter</p>
                            <h6 className='textcorrect'>Score- +1</h6>
                        </div>

                        <div className='qbox'>
                            <h5>1- What is your name?</h5>
                            <p>1- John</p>
                            <p><span className='bg-wrong'>2- Ron</span></p>
                            <p>3- Sam</p>
                            <p>4- Peter</p>
                            <h6 className='textwrong'>Score- 0</h6>

                        </div>

                        <div className='qbox'>
                            <h5>1- What is your name?</h5>
                            <p>1- John</p>
                            <p>2- Ron</p>
                            <p>3- Sam</p>
                            <p>4- Peter</p>
                            <h6 className='textwrong'>Score- 0</h6>

                        </div> */}


                    </div>
                </div>
            </div>
        </section>
        }
        </Auth>



    </Body>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Result)