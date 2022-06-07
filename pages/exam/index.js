import axios from "axios";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import Auth from "../Auth";
import Body from "../components/Body";
import cookie from 'react-cookies';
import _ from 'lodash'
import Countdown from 'react-countdown';

export class Exam extends Component {

 constructor(props){
     super(props)
     this.state={
        loadingPage:true,
        exam_info:null,
        exam_question_answer_data:null,
        showQuestion:1,
        exam_timer:0,
        exam_start:false
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
                this.setState({
                    loadingPage:false,
                    exam_info:response1.data.datas.exam_info,
                    exam_question_answer_data:response1.data.datas.exam_question_answer_data,
                    exam_start:response1.data.datas.exam_start,
                    exam_start_time:response1.data.datas.exam_start_time,
                })
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

    this.setState({
        exam_question_answer_data:datas
    })

    console.log(datas)

    

 }


  render() {
    return (
      <Body>
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
                        <div className="col-md-12">
                            <center>
                                <Countdown date={Number(this.state.exam_start_time) + 60*60*1000}>
                                    <p>Completed</p>
                                </Countdown>
                            </center>
                        </div>
                        <div className="col-md-8">
                            <div className="students-info-intro m2">
                                
                                <h5>{this.state.showQuestion}- {this.state.exam_question_answer_data[this.state.showQuestion-1].question}</h5>
                                <br/>
                                {this.state.exam_question_answer_data[this.state.showQuestion-1].options.map((optn,keys)=>{
                                    return(
                                        <div style={{marginTop:'10px',marginLeft:'20px'}} key={keys} onClick={()=>this.handleCheckClick(optn,keys)}>
                                            <input type="radio" 
                                                
                                                checked={this.state.exam_question_answer_data[this.state.showQuestion-1].answer_user===keys+1?true:false}
                                            />&nbsp;&nbsp;
                                            <label>{optn}</label>
                                        </div>
                                    )
                                })}
                                {}
                                

                                <br/>
                                <br/>
                                <center>{this.state.showQuestion}/{this.state.exam_question_answer_data.length}</center>
                                <br/>
                                {this.state.showQuestion===1
                                ?<></>
                                :
                                <button className="btn btn-primary text-white" onClick={()=>this.setState({showQuestion:this.state.showQuestion-1})}>Prev</button>
                                }
                                
                                

                                {this.state.showQuestion===this.state.exam_question_answer_data.length
                                ?
                                <></>
                                :<button className="btn btn-primary text-white" style={{float:'right'}} onClick={()=>this.setState({showQuestion:this.state.showQuestion+1})}>Next</button>
                                }
                                
                            

                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="students-info-intro m2">
                                {this.state.exam_question_answer_data.map((exd,key)=>{
                                    return(
                                        
                                        <p className={exd.answer_user===undefined?`test_11`:`test_11a`} style={{cursor:'pointer'}} onClick={()=>this.setState({showQuestion:key+1})}>{key+1}</p>
                                    )
                                })}

                                <br/>
                                <br/>
                                <br/>
                                <p>Total: {this.state.exam_question_answer_data.length}</p>
                                <p>Answered: {_.filter(this.state.exam_question_answer_data, function(o) { return o.answer_user!==undefined }).length}</p>
                                <p>Unanswerrd: {_.filter(this.state.exam_question_answer_data, function(o) { return o.answer_user===undefined }).length}</p>

                            </div>
                        </div>
                    </>
                    :
                    <>
                        <center>
                            <button className="btn btn-primary text-white" onClick={()=>this.startExam()}>Start Exam</button>
                        </center>
                    </>
                    }

                    
                    
                </div>
            </div>
        </section>
        }
        
        </Auth>
      </Body>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Exam);
