import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment';
import Link from 'next/link';


export const TableDashboard = (props) => {

    const [datas,setDatas]=useState(null)

    useEffect(()=>{
        axios.get(`${process.env.backendURL}/exam/view_user_exams/${props.user_id}`)
        .then(response=>{
            setDatas(response.data.datas)
        })
    },[])


  return (
    <>
    {datas===null
    ?<center>Loading...</center>
    :
    <table className="table">
        <thead>
            <tr>
            <th scope="col">Exam Name</th>
            <th scope="col">Exam ID</th>
            <th scope="col">Exam Score</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
            <th scope="col"></th>


            </tr>
        </thead>
        <tbody>
            {datas.map((data,key)=>{

                console.log(data)

                if(data.exam_score===undefined){
                    return(
                        <tr key={key}>
                            <td>{data.exam_info.name}</td>
                            <td>{data.student_exam_code}</td>
                            <td>{data.exam_score===undefined?'-':data.exam_score}</td>
                            <td><Moment format="YYYY-MMMM-DD hh:mm:ss A">{data.exam_end_datetime}</Moment></td>
                            <td>
                                -
                            </td>
                            <td>
                                -
                            </td>
                        </tr>
                    )
                }else{
                    return(
                        <tr key={key}>
                            <td>{data.exam_info.name}</td>
                            <td>{data.student_exam_code}</td>
                            <td>{data.exam_score}</td>
                            <td><Moment format="YYYY-MMMM-DD hh:mm:ss A">{data.exam_end_datetime}</Moment></td>
                            <td>
                                <center>
                                    <a className='btn btn-primary btn-sm text-white' href={`${process.env.backendURLPDF}/${data.student_exam_code}.pdf`}>Download Certificate</a>
                                </center> 
                            </td>
                            <td> 
                                <center>
                                    <Link href={`/exam/results?quiz=629f424629f4241b6c5da7ecf6012ad629f4241b6c5da7ecf6012ad1b6c5da7e629f4241b6c5da7ecf6012adcf6012ad&e=${data.exam_id}&u=${data.user_id}`}>
                                        <a className='btn btn-primary btn-sm text-white'>View Result</a>
                                    </Link>

                                    &nbsp;
                                    <a  href={`/certificate?id=${data.student_exam_code}`} className='btn btn-primary btn-sm text-white' target={'_blank'} rel="noreferrer" >View Certificate <img src="https://img.icons8.com/material-outlined/20/0d6ecc/visible--v1.png"/></a>
                                </center> 
                            </td>
                        </tr>
                    )
                }

                
            })}
        </tbody>
    </table>
    }
    
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TableDashboard)