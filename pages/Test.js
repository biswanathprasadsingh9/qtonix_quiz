import React, { Component } from 'react'


export class Test extends Component {


    constructor(props){
        super(props)
        this.state={
            name:'Biswanath',
            show:false,
        }
    }


    chnageName=()=>{
        this.setState({
            show:true
        })
    }



  render() {
    return (
      <div>

        {this.state.show
        ?
        <p>{this.state.name}</p>
        :
        <></>
        }

        <button onClick={this.chnageName}>Change Name</button>

      </div>
    )
  }
}

export default Test