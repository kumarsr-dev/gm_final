import React from 'react';
import Header from '../includes/header'
import Footer from '../includes/footer'
import Path from '../includes/path'
import { Link as NavLink, useParams} from 'react-router-dom';
import renderHTML from 'react-render-html';

export default function Summary(props) {
    const [data, setData] = React.useState([])
    const [answerApi, setAnswerApi] = React.useState([])
    const [currentQ, setCurrentQ] = React.useState(1)
    const [lang, sendlang] = React.useState(0)
    const {set_id}=useParams()
    const pageMarks = props.location.data || 0

    React.useEffect(() => { 

        async function getResult() {      

            let getCustomerId = await localStorage.getItem('customer_id')
    
            let url = 'type=questionsbySetId&set_id=' + set_id

            fetch(Path + url, { method: 'POST', })
            .then(res => res.json())
            .then(function (result) {
                if(result.status == '200') {
                    setData(result.data)
                }  
            })


            let url_result='type=getReport&customer_id=' + getCustomerId + '&set_id=' + set_id
            fetch(Path + url_result, { method: 'POST', })
            .then(res => res.json())
            .then(result=>{
                if(result.status == '200') {
                    setAnswerApi(result.data)
                    console.log(result)
                }  
            })
            .catch(err=>console.log(err))

        }

        getResult()


    },[])


    const getCorrectAnswer = (id) => {
        
        let correntAnswer = null
        answerApi.map(function(anslist){
            if(id == anslist.question_id) {
                console.log(id + '-' + anslist.correctAnswer)
                correntAnswer = anslist.correctAnswer
            }
        })
        return correntAnswer
    }
    const detailedSolution=(id)=>{
        let solution=null
        answerApi.map((single)=>{
            if(id==single.question_id){
                console.log(single.solution)
            solution=single.solution
        }

        })
        return solution
    }
    
    // const answerStatus=()=>{
    //     let count=0
    //     answerApi.map((e)=>{
    //         if(currentQ==e.question_id){
    //             if(e.correctAnswer!=e.answer_send){
    //                 count="Wrong"
    //             }else if(e.correctAnswer==e.answer_send){
    //                 count="Correct"
    //             }
    //         }
    //     }
    //     )
    //     return(count)
    // }
    const answerStatuscolor=(id)=>{
        let count=0
        answerApi.map((e)=>{
            if(id==e.question_id){
                if(e.correctAnswer!=e.answer_send){
                    count="Wrong"
                }else if(e.correctAnswer==e.answer_send){
                    count="Correct"
                }
            }
        })
        return(count)
    }
    return (
      <div>
            <Header />
             
                <div class="container-fluid report-block">
                <div class="report_btn">
            <div class="inner_div">
            <NavLink to={{
            pathname: '/finalreport/' + set_id,
            data: {
            setId:pageMarks.set_id,

            }
            }}>Solutions</NavLink>
            <NavLink to={{
            pathname: '/summary/' + set_id,
            data: {
            setId:pageMarks.set_id,

            }
            }}>Report</NavLink>
            </div>
        </div>                   
 
<div class="solution_report">
    <div class="answer_view">
        <div class="selected_option">
            <div class="question_hestory">
                <span class="number_of_q">1</span>
                <span class="gight_or_wrong">{answerStatuscolor(currentQ)}</span>
                <span class="time_taken">time taken:</span>
                <span class="time_taken">{answerApi.map((e)=>{if(e.question_id == currentQ){return(parseInt(e.duration))}})} sec</span>
    
            </div>
            <div class="question_id">
 
                <span> <select onChange={(e) => sendlang(e.target.value)}>
                            <option value="0">English</option>
                            <option value="1">Hindi</option>
                        </select>
                </span>
            </div>
            {data.map((singleQA, i) => {
                if(i == currentQ) {
                    if (lang == 0) {
                        return (
                            <div>
                                <div class="question">
                                    
                                    <p>{renderHTML(singleQA.question_title)}</p>
                                </div>
                                <div class="right_solution">
                                    <ul>
                                        <li><span>A</span><a>{renderHTML(singleQA.option_a)}</a></li>
                                        <li><span>B</span><a>{renderHTML(singleQA.option_b)}</a></li>
                                        <li><span>C</span><a>{renderHTML(singleQA.option_c)}</a></li>
                                        <li><span>D</span><a>{renderHTML(singleQA.option_d)}</a></li>
                                    </ul>
                                </div>
                                <div class="corract_answer_option">
                                    <span>the correct answer is : <a>{getCorrectAnswer(singleQA.question_id)}</a></span>
                                </div>
                                <div class="solution_of_question">
                                    <p>DETAILED SOLUTION</p>
                                    <p>{renderHTML(singleQA.solution)}</p>

                                </div>
                            </div>
                        )
                    
                    }else{
                        return (
                            <div>
                                <div class="question">
                                    
                                    <p>{renderHTML(singleQA.question_title_hi)}</p>
                                </div>
                                <div class="right_solution">
                                    <ul>
                                        <li><span>A</span><a>{renderHTML(singleQA.option_a_hi)}</a></li>
                                        <li><span>B</span><a>{renderHTML(singleQA.option_b_hi)}</a></li>
                                        <li><span>C</span><a>{renderHTML(singleQA.option_c_hi)}</a></li>
                                        <li><span>D</span><a>{renderHTML(singleQA.option_d_hi)}</a></li>
                                    </ul>
                                </div>
                                <div class="corract_answer_option">
                                    <span>the correct answer is : <a>{getCorrectAnswer(singleQA.question_id)}</a></span>
                                </div>
                                <div class="solution_of_question">
                                    <p>DETAILED SOLUTION</p>
                                    <p>{renderHTML(singleQA.solution_hi)}</p>
                                </div>
                            </div>
                            )
                        }
                    }
                    })}
        </div>
        <div class="options_chack">
            <p>all sections</p>
            <ul>
                {data.map(function(singleQA, i) {
                        return ( <li className={answerStatuscolor(i+1)}><a onClick={() => setCurrentQ(i+1)}>{i+1}</a></li> )     
                })}
            </ul> 
        </div>
    </div>
</div>
</div>
 

            <Footer />
        </div>
    );
  }
  
 