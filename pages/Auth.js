// import React, { Component } from 'react'
// import cookie from 'react-cookies'

// export class Auth extends Component {

//     componentDidMount(){
//         const user = cookie.load('qtonix_quiz_userdata');
//         if(user===undefined){

//         }
//     }

//   render() {
//     return (
//       <div>Auth</div>
//     )
//   }
// }

// export default Auth


import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import cookie from 'react-cookies';


export default function Auth(props) {
    const router = useRouter()

    
    useEffect(()=>{
        const user = cookie.load('qtonix_quiz_userdata');
        if(user===undefined){
            router.push('/login')
        }
    },[router])

  return (
    <>
      {cookie.load('qtonix_quiz_userdata')===undefined
      ?
      <center>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h5>Loading...</h5>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

      </center>
      :
        props.children
      }  
    </>
  )
}
