import React, { useEffect, useState } from 'react';
import Path from '../includes/path'
import { Link as NavLink, Redirect, useParams} from 'react-router-dom';

export default function Report(props, {navigation} ) {
    const [ansLocal,setAnsLocal]=useState([])
    const [answerArray,setanswerArray]=useState([])
    const {set_id}=useParams()
    const pageMarks = props.location.data || 0
    const auth_token = localStorage.getItem('token')  
    console.log(answerArray)
 
    useEffect(()=>{
        function getAnswerData() {
            let currentAns = localStorage.getItem('answer')            
            let changeAns = JSON.parse(currentAns)
            setAnsLocal(changeAns)       
            ansLocal.map(function(eachAns){                
                answerArray.push({"question_id": eachAns.id,"answer_send": eachAns.answer,"duration": eachAns.duration})
            })    
 
        }
        getAnswerData()
        
    },[answerArray])

    const sendAnswerarray=()=>{
        let sendData = {
            "customer_id": 6,
            "package_id": 1,
            "total_time_taken": 20,
            "set_id" : pageMarks.setId,
            "questionList":answerArray
        }
        console.log(sendData)
        let url='type=saveTest'
        fetch(Path + url,{method:'POST',
            headers: {Accept: 'application/json' },
            body: JSON.stringify(sendData)
        })
        .then(res=>res.json())
        .then(function(result){
            if(result.status == '200') {
                alert('Test Submitted Successfully')
                props.history.push('/finalreport/' + pageMarks.setId)
            }
        })
        .catch(err=> alert('Test Not Submitted, Plese Submit Again') )
    }

    return (
        <div>
            {/*<Header />
             <div class="container_fluid">
                        <div class="banner"><img src={process.env.PUBLIC_URL + "/images/inner_banner.jpg"} alt="banner" /></div>
                </div> */}
            <div class="container-fluid">
                 
                <div class="container-fluid">
                    <div class="container">
                        <div class="number_system_chart">
                            <h2>Staff Selection Commision <img src={process.env.PUBLIC_URL + "/images/ssc.png"} alt="SSC" /></h2>
                            <p>Read the following Instruction carefully</p>
                            <p>Maximum Marks: 30  |  Duration: 30 minutes</p>
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
                                <li>{pageMarks.answer}</li>
                                <li>{pageMarks.notAnswer}</li>
                                <li>{pageMarks.review}</li>
                                <li>{pageMarks.notVisited}</li>
                            </ul>
                            </div>
                            
                            
                            <p>Your answers shall be updated and saved on a server periodically and also at the end of examination.</p>

                           
                            {/* <NavLink to={'/QuestionAnswer/'+pageMarks.setId}>Back</NavLink> */}
                            <button onClick={() => sendAnswerarray()}>Submit Paper</button> 
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}