import axios from "axios";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import Auth from "../Auth";
import QuizBody from "../components/QuizBody";
import cookie from 'react-cookies';
import _, { each } from 'lodash';
import moment from 'moment';
export class index extends Component {

 constructor(props){
     super(props)
     this.state={
        loadingPage:true,
        exam_info:null,
        exam_question_answer_data:null,
        showQuestion:1,
        exam_timer:0,
        exam_start:true,
        exam_timeout:false,
        exam_score:0,
        exam_start_time:'',
        showTimer:true
     }
 }
 componentDidMount(){
     axios.post(`${process.env.backendURL}/exam/latestexam`)
     .then(response=>{
         if(response.data.response){

            var create_exam_for_user={
                user_id:cookie.load('qtonix_quiz_userdata')._id,
                exam_id:response.data.examinfo._id,
                exam_info:response.data.examinfo,
                exam_question_answer_data:response.data.questions
            }


            //create exam under user
            axios.post(`${process.env.backendURL}/exam/exam_create_view`,create_exam_for_user)
            .then(response1=>{
                
                console.log(response.data.examinfo)

                    /* let questions=response1.data.datas.exam_question_answer_data;
                    questions.map((question,index) =>{
                            question.marked_for_review==undefined?question.marked_for_review=false:true; 
                            question.skipped==undefined?question.skipped=false:true; 
                     })
                    this.setState({
                        loadingPage:false,
                        exam_info:response1.data.datas.exam_info,
                        exam_question_answer_data:response1.data.datas.exam_question_answer_data,
                        exam_start:true,
                        exam_start_time:response1.data.datas.exam_start_time,
                        exam_timeout:false,
                    })
*/



                    //////
              
                if(response1.data.datas.exam_timeout || response1.data.datas.exam_finished){
                    Router.push(`/exam/results?quiz=629f424629f4241b6c5da7ecf6012ad629f4241b6c5da7ecf6012ad1b6c5da7e629f4241b6c5da7ecf6012adcf6012ad&e=${response.data.examinfo._id}&u=${cookie.load('qtonix_quiz_userdata')._id}`)
                }else{

                     let questions=response1.data.datas.exam_question_answer_data;
                    questions.map((question,index) =>{
                            question.marked_for_review==undefined?question.marked_for_review=false:true; 
                            question.skipped==undefined?question.skipped=false:true; 
                     })
                    this.setState({
                        loadingPage:false,
                        exam_info:response1.data.datas.exam_info,
                        exam_question_answer_data:response1.data.datas.exam_question_answer_data,
                        exam_start:response1.data.datas.exam_start,
                        exam_start_time:response1.data.datas.exam_start_time,
                        exam_timeout:response1.data.datas.exam_timeout,
                    })
                }

                
            })

         }else{
            Router.push('/account')
         }
         
     })
 }



 startExam=()=>{
     
    var temp_data={
        exam_id:this.state.exam_info._id,
        user_id:cookie.load('qtonix_quiz_userdata')._id,
        exam_start:true,
        exam_start_time:Date.now(),
    }


    axios.post(`${process.env.backendURL}/exam/start_exam`,temp_data)
    .then(response=>{
        if(response.data.response){
            this.setState({
                exam_start:true,
                exam_start_time:temp_data.exam_start_time,
            })
        }
    })


 }


 handleCheckClick=(value,keys)=>{
     console.log(this.state.showQuestion-1)
     console.log(value);
     console.log(keys+1);

    var datas=this.state.exam_question_answer_data;
    datas[this.state.showQuestion-1].answer_user=keys+1;
    datas[this.state.showQuestion-1].skipped=false;
    this.setState({
        exam_question_answer_data:datas
    })

    console.log(datas)


    var temp_data={
        exam_id:this.state.exam_info._id,
        user_id:cookie.load('qtonix_quiz_userdata')._id,
        exam_question_answer_data:datas,
    }


    //update data on checkbox click
    axios.post(`${process.env.backendURL}/exam/start_exam`,temp_data)
    .then(response=>{
        console.log('success')
    })
    

 }
 unReviewCurrentQuestion=()=>{

    var datas=this.state.exam_question_answer_data;
    datas[this.state.showQuestion-1].marked_for_review=false;

    this.setState({
        exam_question_answer_data:datas
    })

     var temp_data={
        exam_id:this.state.exam_info._id,
        user_id:cookie.load('qtonix_quiz_userdata')._id,
        exam_question_answer_data:datas,
    }


    //update data on checkbox click
    axios.post(`${process.env.backendURL}/exam/start_exam`,temp_data)
    .then(response=>{
        console.log('success')
    })
    

 }
  reviewCurrentQuestion=()=>{

    var datas=this.state.exam_question_answer_data;
    datas[this.state.showQuestion-1].marked_for_review=true;

    this.setState({
        exam_question_answer_data:datas
    })
     var temp_data={
        exam_id:this.state.exam_info._id,
        user_id:cookie.load('qtonix_quiz_userdata')._id,
        exam_question_answer_data:datas,
    }


    //update data on checkbox click
    axios.post(`${process.env.backendURL}/exam/start_exam`,temp_data)
    .then(response=>{
        console.log('success')
    })
    

 }


    // Renderer callback with condition
   /* renderer = ({ hours, minutes, seconds, completed }) => {
        //console.log('coming');
        if (completed) {
            return <ExamTimeOut />;
           

        } else {
        // Render a countdown

         let digit1hours=Math.floor(hours / 10);
            let digit2hours=hours % 10;
            let digit1minutes=Math.floor(minutes / 10);
            let digit2minutes=minutes % 10;
            let digit1seconds=Math.floor(seconds / 10);
            let digit2seconds=seconds % 10;
            return <span > Time Remaining <p className="timer_digit">  <span>{digit1hours}</span> <span>{digit2hours}</span> : <span>{digit1minutes}</span> <span>{digit2minutes}</span> : <span>{digit1seconds}</span> <span>{digit2seconds}</span> </p> </span>;
        //return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };


    examTimeout=()=>{
        var temp_data={
            exam_id:this.state.exam_info._id,
            user_id:cookie.load('qtonix_quiz_userdata')._id,
            exam_timeout:true,
        }
        axios.post(`${process.env.backendURL}/exam/start_exam`,temp_data)
        .then(response=>{
        
        //////
         this.setState({
                exam_timeout:true
            })
        })
    }


    onMountTimeout=({ hours, minutes, seconds, completed })=>{
        if(completed){
            var temp_data={
                exam_id:this.state.exam_info._id,
                user_id:cookie.load('qtonix_quiz_userdata')._id,
                exam_timeout:true,
            }
            axios.post(`${process.env.backendURL}/exam/start_exam`,temp_data)
            .then(response=>{
              
              //////
                this.setState({
                    exam_timeout:true
                })
            })
        }
    }*/
    handleExamTimeout=(value)=>{
        console.log(value);
        this.setState({
            exam_timeout:value
        })
    }
    handleSkipQuestion=()=>{

         var datas=this.state.exam_question_answer_data;
        datas[this.state.showQuestion-1].skipped=true;

        this.setState({
            exam_question_answer_data:datas,
            showQuestion:this.state.showQuestion+1
        })

         var temp_data={
                exam_id:this.state.exam_info._id,
                user_id:cookie.load('qtonix_quiz_userdata')._id,
                exam_question_answer_data:datas,
            }


            //update data on checkbox click
            axios.post(`${process.env.backendURL}/exam/start_exam`,temp_data)
            .then(response=>{
                console.log('success')
            })

        
    }

    handleSubmitExam=()=>{

        var score=0;

        // console.log(this.state.exam_question_answer_data)


        this.state.exam_question_answer_data.forEach(element => {

            if(element.answer_user!==undefined){
                // console.log(element);
                // console.log(element.answer_user);
                // console.log(element.answer);

                if(element.answer_user===element.answer){
                    score=score+1
                }
            }
        });
        this.setState({
            exam_score:score
        })


        var temp_data={
            exam_id:this.state.exam_info._id,
            user_id:cookie.load('qtonix_quiz_userdata')._id,
            exam_finished:true,
            exam_score:score,
            exam_end_datetime:moment().format()
        }
        axios.post(`${process.env.backendURL}/exam/submit_exam`,temp_data)
        .then(response=>{
            this.setState({
                exam_timeout:true
            })
            Router.push(`/exam/results?quiz=629f424629f4241b6c5da7ecf6012ad629f4241b6c5da7ecf6012ad1b6c5da7e629f4241b6c5da7ecf6012adcf6012ad&e=${temp_data.exam_id}&u=${temp_data.user_id}`)
        })

        
    }


  render() {
    return (
      <QuizBody state_data={this.state}  handleExamTimeout={(value)=>{ this.handleExamTimeout(value); }}>
        <Auth>
        {/* <div className="py-0 mt-5">
            <div className="container">
            <h3>{this.state.exam_info===null?'':this.state.exam_info.name}</h3>
            </div>
        </div> */}

        

        {this.state.loadingPage
        ?
        <center>
        <img src="https://thumbs.gfycat.com/EnchantingInbornDogwoodtwigborer-size_restricted.gif" alt="asaas" className='myloader' />
        </center>
        :
        <section className="section students-info">
            <div className="container">
              
                <div className="row">
                    {this.state.exam_start
                    ?
                    <>

                        {this.state.exam_timeout
                        ?
                        <>
                        <div className="col-md-12  show-time-out">
                            <center>
                                <h2>Time Out</h2>
                                <br/>
                                <p>Total: {this.state.exam_question_answer_data.length}</p>
                                <p>Attempted: {_.filter(this.state.exam_question_answer_data, function(o) { return o.answer_user!==undefined }).length}</p>
                                <p>Unattempted: {_.filter(this.state.exam_question_answer_data, function(o) { return o.answer_user===undefined }).length}</p>
                                <br/>
                                <button className="btn btn-primary text-white" onClick={this.handleSubmitExam}>Submit</button>
                            </center>
                        </div>
                        </>
                        :
                        <>
                        {/*<div className="col-md-4 offset-md-8 mb-2">
                            <center>
                                <Countdown
                                    date={Number(this.state.exam_start_time) + Number(this.state.exam_info.duration)*60*1000}
                                    renderer={this.renderer}
                                    onComplete={this.examTimeout}
                                    onMount={this.onMountTimeout}
                                />                              

                            </center>
                        </div>*/}
                        <div className="col-md-8">
                            <div className="heading-container">
                                    <h5 className="p-3"> <p style={{fontSize:'14px',marginBottom:'10px'}}>Question {this.state.showQuestion}/{this.state.exam_question_answer_data.length}</p>{this.state.exam_question_answer_data[this.state.showQuestion-1].question}</h5>    
                                </div>
                            <div className="students-info-intro m2">
                                
                                
                                <br/>
                                {this.state.exam_question_answer_data[this.state.showQuestion-1].options.map((optn,keys)=>{
                                    return(
                                         <div className="form-check p-3 ps-5" style={{marginTop:'10px',marginLeft:'20px',backgroundColor: this.state.exam_question_answer_data[this.state.showQuestion-1].answer_user===keys+1?'#d2e9ff':'#f8f8f8'}} key={keys} onClick={()=>this.handleCheckClick(optn,keys)}>
                                           <input className="form-check-input cursor-pointer" type="radio" checked={this.state.exam_question_answer_data[this.state.showQuestion-1].answer_user===keys+1?true:false} onChange={()=>true}/>
                                           <label className="form-check-label cursor-pointer" htmlFor={this.state.exam_question_answer_data[this.state.showQuestion-1]._id+'_'+keys}>
                                           {optn}
                                           </label>
                                        </div>
                                    )
                                })}
                                

                                <br/>
                                <br/>
                                
                                <br/>
                                <div className=" row">
                                <div className="col-4">
                                {this.state.showQuestion===1
                                ?<></>
                                :
                                <button className="btn btn-primary text-white" onClick={()=>this.setState({showQuestion:this.state.showQuestion-1})}>Prev</button>
                                }
                                </div>
                                <div className="col-4 text-center">
                                
                                
                                <>
                                    {
                                        this.state.exam_question_answer_data[this.state.showQuestion-1].marked_for_review===false?
                                          <button className="btn btn-primary text-white" onClick={()=>this.reviewCurrentQuestion()}> Mark for Review</button>
                                         :<button className="btn btn-primary text-white" onClick={()=>this.unReviewCurrentQuestion()}> Remove review mark</button>
                                    }
                                    </>

                                 </div>
                                
                                <div className="col-4">
                                {this.state.showQuestion===this.state.exam_question_answer_data.length
                                ?
                                <><button className="btn btn-primary text-white"  style={{float:'right'}} onClick={()=>this.handleSubmitExam()}>Submit</button></>
                                :  <>
                                    {
                                        this.state.exam_question_answer_data[this.state.showQuestion-1].answer_user===undefined?
                                       <button className="btn btn-primary text-white" style={{float:'right'}} onClick={()=>this.handleSkipQuestion()}>Skip</button>
                                     :<button className="btn btn-primary text-white" style={{float:'right'}} onClick={()=>this.setState({showQuestion:this.state.showQuestion+1})}>Next</button>
                                    }
                                    </>
                                }
                                 </div>
                                </div>
                                
                            

                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="question-index-container">
                                    <h5 className="p-3">Questions</h5>  
                                </div>
                            <div className="students-info-intro m2 students-info-heading">
                                <div className=" question-info-intro pt-1">
                                    {this.state.exam_question_answer_data.map((exd,key)=>{

                                        if(exd.answer_user===undefined && exd.skipped==false){
                                            return(
                                            
                                               <p key={key} className={`${exd.answer_user===undefined?'test_11':'test_11a'} ${key===this.state.showQuestion-1?'current-question':''} ${exd.skipped===true?'skipped-question':''} ${exd.marked_for_review===true?'review-question':''} `}>{key+1}</p>
                                            )
                                        }else{
                                            return(
                                            
                                                <p key={key} className={`${exd.answer_user===undefined?'test_11':'test_11a'}  ${key===this.state.showQuestion-1?'current-question':''} ${exd.skipped===true?'skipped-question':''}  ${exd.marked_for_review===true?'review-question':''} `} style={{cursor:'pointer'}} onClick={()=>this.setState({showQuestion:key+1})}>{key+1}</p>
                                            )
                                        }
                                        
                                    })}
                                </div>
                                <hr/>
                                {/*<p>Total: {this.state.exam_question_answer_data.length}</p>
                                <p>Answered: {_.filter(this.state.exam_question_answer_data, function(o) { return o.answer_user!==undefined }).length}</p>*/}
                                <p className="test_12">Unanswered Answered: {_.filter(this.state.exam_question_answer_data, function(o) { return o.answer_user===undefined }).length}</p>
                                <br/>
                                <div className="font-13 question-legend row">
                                    <p className="col-6"><span id="not-answered-element" className="me-1"></span> Not Answered </p>
                                    <p className="col-6"><span id="answered-element" className="me-1"></span> Answered </p>
                                    <p className="col-6"><span id="answered-review-element" className="me-1"></span> Marked for Review </p>
                                    <p className="col-6"><span id="skipped-element" className="me-1"></span> Skipped Question </p>
                                    <p className="col-6"><span id="current-element" className="me-1"></span> Current Question </p>
                                </div>
                                <button className="btn btn-primary text-white mt-2 w-100"  onClick={()=>this.handleSubmitExam()}>Submit</button>
                            </div>
                        </div>
                        </>
                        }
                        
                    </>
                    :
                    <>
                        <center>
                            {/* <button className="btn btn-primary text-white" onClick={()=>this.startExam()}>Start Exam</button> */}
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>

                            <h1>Wrong URL</h1>
                            <br/>
                            <br/>
                            <br/>

                        </center>
                        
                    </>
                    }

                    
                    
                </div>
            </div>
        </section>
        }
        
        </Auth>
      </QuizBody>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
