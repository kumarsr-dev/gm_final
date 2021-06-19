import React, { useEffect, useState } from 'react';
import Path from '../includes/path'
import { Link as NavLink, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveTest } from '../services/api/api.service'


export default function Report(props, { navigation }) {
    const { set_id } = useParams()
    const pageMarks = props.location.data || 0
 


    const getState = useSelector((state) => {
        return {
            marksReducer: state.marksReducer
        }
    })

    // Get Total Answer
    const totalAnswer = () => {
        let totalAns = 0
        for(var eachMarks of getState.marksReducer) {
            if(eachMarks.answer !== null) {
                totalAns += 1
            }
        }
        return totalAns
    }

    const totalNotAnswer = () => {
        let totalAns = 0
        for(var eachMarks of getState.marksReducer) {
            if(eachMarks.visited == true) {
                totalAns += 1
            }
        }
        return totalAns
    }

    const totalMarked = () => {
        let totalAns = 0
        for(var eachMarks of getState.marksReducer) {
            if(eachMarks.marked == true) {
                totalAns += 1
            }
        }
        return totalAns
    }

    
 

    const sendAnswerarray = async() => {
        let answerData = await getState.marksReducer.map((obj)=>{
            delete obj['marked']
            delete obj['visited']
            obj.duration = 0
            return obj
        })
        let sendData = {
            customer_id: localStorage.getItem('customer_id'),
            package_id: pageMarks.packageId,
            total_time_taken: 20,
            set_id: set_id,
            questionList: answerData
        }
       // console.log(sendData)

        saveTest(sendData)
        .then(function (result) {
            console.log(result)
            if (result.status == '200') {
                alert('Test Submitted Successfully')
               props.history.push('/finalreport/' + pageMarks.setId)
            }
        })
        .catch(err => alert('Test Not Submitted, Plese Submit Again'))
    }

    return (
        <div>
            <div class="container-fluid">

                <div class="container-fluid">
                    <div class="container">
                        <div class="number_system_chart">
                            <h2>Staff Selection Commision <img src={process.env.PUBLIC_URL + "/images/ssc.png"} alt="SSC" /></h2>
                            <p>Read the following Instruction carefully</p>
                            <p>Maximum Marks: {pageMarks.duration}  |  Duration: {pageMarks.duration} minutes</p>
                            <div class="table_report">
                                <ul class="head">
                                    <li>S.No</li>
                                    <li>Name</li>
                                    <li>Answer</li>
                                    <li>Not Answer</li>
                                    <li>Mark for Review</li>
                                    <li>Not Visited</li>
                                </ul>
                                <ul>
                                    <li>1</li>
                                    <li>Total Question</li>
                                    <li>{totalAnswer()}</li>
                                    <li>{totalNotAnswer()}</li>
                                    <li>{totalMarked()}</li>
                                    <li>{pageMarks.questions_total - (totalAnswer() + totalNotAnswer())}</li>
                                </ul>
                            </div>


                            <p>Your answers shall be updated and saved on a server periodically and also at the end of examination.</p>


                            {/* <NavLink to={'/QuestionAnswer/'+pageMarks.setId}>Back</NavLink> */}
                            <div class="yes_no">
                                <button onClick={() => sendAnswerarray()}>Yes</button>
                                <button>No</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}