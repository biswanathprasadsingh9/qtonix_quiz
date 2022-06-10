import axios from 'axios'
import Router  from 'next/router'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import QRCode from "react-qr-code";

export class certificate extends Component {

 constructor(props){
     super(props)
     this.state={
         pageLoading:true,
         wrongPage:false,
         examinfo:null,
         userinfo:null
     }
 }


 componentDidMount(){
    console.log(Router.query.id)

    if(Router.query.id===undefined){
        this.setState({pageLoading:false,wrongPage:true})
    }else{

     axios.get(`${process.env.backendURL}/exam/viewcertificate/${Router.query.id}`)
     .then(response=>{
         if(response.data.response){
            this.setState({pageLoading:false,wrongPage:false,userinfo:response.data.userinfo,examinfo:response.data.examinfo})

         }else{
            this.setState({pageLoading:false,wrongPage:true})
         }
     })

        

    }


 }

  render() {
    return (
      <div className='container mt-5'>
          {this.state.pageLoading
          ?
          <center>
              <h3>Loading....</h3>
          </center>
          :
          <>

        {this.state.wrongPage
          ?
            <>
            <center>
                <br/>
                <br/>
                <br/>
                <br/>

              <h3>Wrong URL</h3>
            </center>
            </>
        :
            <>

            <center>
            <h1>Certificate of Completion</h1>
            <h6 className='mt-5'>This is to certify that</h6>
            <h3 className='mt-5'>{this.state.userinfo.name}</h3>
            <h5 className='mt-5'>has completed the course</h5>

            <br />
            <br />
            <br />



            <QRCode value={`${process.env.backendURLPDF}/${this.state.examinfo.student_exam_code}.pdf`} title='Scan to download PDF' size={100} fgColor={'#082dfb'} />
            <p>Scan To Download PDF</p>
            </center>

            
            </>}



           
          </>
          }


          
         
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(certificate)