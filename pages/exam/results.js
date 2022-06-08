import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Auth from '../Auth'
import Body from '../components/Body'
import cookie from 'react-cookies';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'

export const Result = (props) => {
    const router = useRouter()
    const [loadingPage,setloadingPage]=useState(true);
    const [examfound,setExamFound]=useState(false);
    const [userinfo,setUserInfo]=useState(cookie.load('qtonix_quiz_userdata'));
    const [examinfo,setUExaminfo]=useState(null);
    const [questions,setQuestions]=useState(null);


    useEffect(()=>{

        console.log(router.query)

        var data={
            user_id:router.query.u,
            exam_id:router.query.e,
        }

        console.log(data)

      
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
        
        {userinfo===undefined || loadingPage===true
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
                                <h3>Your Result: 15/100 points</h3>
                                <p>Total: 100</p>
                                <p>Answered: 100</p>
                                <p>Unanswerrd: 100</p>
                                <br/>
                                <br/>
                                <h3>Pass (30%)</h3>
                            </div>
                        </div>
                        <div>
                            <div className="students-info-intro-end">
                                <div className="enrolled-courses">
                                    <h3 className='text-center'>Download Certificate</h3>
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
                        

                        <div className='qbox'>
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

                        </div>


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