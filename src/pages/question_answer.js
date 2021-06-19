import React, { useRef, useState } from 'react';
import { Timer } from "../includes/timer";
import { Link as NavLink, useParams } from 'react-router-dom';
import renderHTML from 'react-render-html';
import Loader from '../includes/loader'
import { getQuestionsBySetId } from '../services/api/api.service'
import { visitedAction, markedAction, asnwerAction, clearAnswer } from '../redux/marks.action'
import { useDispatch, useSelector } from 'react-redux';


function QuestionAnswer(props) {
    const [data, setData] = React.useState([])
    const [currentQ, setCurrentQ] = React.useState(0)
    const [visited, setVisited] = React.useState([])
    const [currentSub, setCurrentSub] = React.useState(null)
    let subjectList = [...new Set(data.map(item => item.subject))];
    const [answerArray, setanswerArray] = React.useState([])
    const [markAnswered, setmarkAnswered] = React.useState(0)
    const propData = props.location.data || 0
    const [lang, sendlang] = React.useState(propData.lang || 0)
    const { set_id } = useParams()
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    
    // Get All Question for API
    React.useEffect(() => {
        setLoading(true)
        getQuestionsBySetId(set_id)
        .then(function (result) {
            if (result.data.status == '200') {
                setData(result.data.data)
            }
            setLoading(false)
        })
    }, [])


    // Get ALl State
    const getState = useSelector((state)=>{
        return {
            marksReducer : state.marksReducer
        }
    })     
    console.log(getState.marksReducer)

    // Update State Visited on Click of Save and NExt BUtton
    const nextbutton = () => {        
        let push = true
        for (var id of getState.marksReducer) {
            if(id.question_id == currentQ) {
                push = false
            }
        }
        setCurrentQ(currentQ + 1)
        if(push == true) {
            dispatch(visitedAction(currentQ))
        }        
    }

    // Update State Visited When click of Number
    const updateValues = (e) => {
        let dublicate = false
        setCurrentQ(e)
        for (var id of getState.marksReducer) {
            if(id.question_id == e) {
                dublicate = true
                break
            }
        }
        if (dublicate == false) {
            dispatch(visitedAction(currentQ))
        }
    }

    // Mark when click the marked button
    const markedQuestion = (e) => {        
        let dublicate = false
        for (var id of getState.marksReducer) {
            if(id.question_id == e) {
                dublicate = true
                break
            }
        }
        if(dublicate == false) {
            dispatch(markedAction(e))
        }
        setCurrentQ(currentQ + 1)
    }


    // Set Answer of Each Question
    const answerObj = (el, val, question_id) => {
        let markedAns = false
        let dub = false
        for (var id of getState.marksReducer) {
            if(id.question_id == question_id && id.answer_send !== null) {
                markedAns = true
                dub = true
                break
            }
        }
        if(dub == true) {
            dispatch(clearAnswer(question_id))
        }
        dispatch(asnwerAction(question_id, val, markedAns))
    }

    // Add class on based of Response
    const getCurrentClass = function (e) {   
       // console.log(e)    
        let currentClass = '' 
        for(var item of getState.marksReducer) {
            if(item.question_id == e) {
                if(item.visited == true && item.marked == false && item.answer_send == null) {
                    currentClass = 'visited'
                } else if(item.visited == true && item.marked == true && item.answer_send == null){
                    currentClass = 'marked'
                } else if(item.visited == false && item.marked == false && item.answer_send !== null){
                    currentClass = 'answered'
                } else if(item.visited == false && item.marked == true && item.answer_send !== null){
                    currentClass = 'answered-marked'
                }
            }
        }
        return currentClass
    }

    // Count Value
    const count = (val) => {
        let total = 0
        for(var count of getState.marksReducer) {
            if(count[val] == true) {
                total += 1
            }
        }
        return total
    }

    // Count Answer
    const countAnswer = () => {
        let total = 0
        for(var count of getState.marksReducer) {
            if(!(count['answer_send'] == null)) {
                total += 1
            }
        }
        return total
    }

    // Clear Response
    const clearResponse = (e) => {
        let clear = false
        for (var id of getState.marksReducer) {
            if(id.question_id == e) {
                clear = true
                break
            }
        }
        if(clear == true) {
            dispatch(clearAnswer(e))
        }
    }

    // Get Current Checked Value
    const getCheckedValue = (id, options) => {
        for(var mark of getState.marksReducer) {
            if(mark.question_id == id && mark.answer_send == options) {
                return true
            }
        }        
    }


    const getCurrentSub = async (e) => {
 
    }    

    return (
        <div id="test_paper">
            {loading ? <Loader /> : null}
            <div class="bg_question">
                <div class="containerfluid ">
                    <div class="container_full">
                        <div class="outer_area">
                            <div class="number_system_questionpaper">
                                <div class="top_bar">
                                    <div class="top_question">
                                        <h3>Staff Selection Commision <img src={process.env.PUBLIC_URL + "/images/ssc.png"} alt="SSC" /></h3>
                                        <select onChange={(e) => sendlang(e.target.value)}>
                                            <option value="0">English</option>
                                            <option value="1">Hindi</option>
                                        </select>
                                    </div>
                                </div>
                                <ul class="sub_type_tab">
                                    <li onClick={() => getCurrentSub(null)}>All </li>
                                    {subjectList.map(function (sub, i) {
                                        return (<li key={i} onClick={() => getCurrentSub(sub)}>{sub} </li>)
                                    })}

                                </ul>

                                <div class="time_sectin">
                                    <ul>
                                        <li><h3><span>Question Type : MCQ</span></h3></li>
                                        <li><h3>Time Left : <span><Timer time={propData.duration} set_id={set_id} /></span></h3></li>
                                    </ul>
                                </div>

                                {data.map((singleQA, i) => {
                                    if (i == currentQ) {

                                        if (currentSub == singleQA.subject || currentSub == null) {
                                            //console.log(currentSub + '' + singleQA.subject)
                                            if (lang == 0) {
                                                return (
                                                    <div className="question_list"  key={i}>

                                                        <div class="time_sectin question_no">
                                                            <ul>
                                                                <li><h4>Question : {i + 1}</h4></li>
                                                            </ul>
                                                        </div>
                                                        <div class="q_height">
                                                            <div class="question_topic">{renderHTML(singleQA.question_title)}</div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_a" value="A" onClick={(e) => answerObj(e.target.name, e.target.value, i)} checked={getCheckedValue(i, "A")} />
                                                                <label for="answer_a">{renderHTML(singleQA.option_a)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_b" value="B" onClick={(e) => answerObj(e.target.name, e.target.value, i)} checked={getCheckedValue(i, "B")} />
                                                                <label for="answer_b">{renderHTML(singleQA.option_b)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_c" value="C" onClick={(e) => answerObj(e.target.name, e.target.value, i)} checked={getCheckedValue(i, "C")} />
                                                                <label for="answer_c">{renderHTML(singleQA.option_c)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_d" value="D" onClick={(e) => answerObj(e.target.name, e.target.value, i)} checked={getCheckedValue(i, "D")} />
                                                                <label for="answer_d">{renderHTML(singleQA.option_d)}</label>
                                                            </div>
                                                        </div>

                                                        <div class="questionpaper_btn_botm">
                                                            <div class="mark_btn">
                                                                <button id="next" onClick={() => markedQuestion(i)}>Marked for Review</button>
                                                                <button onClick={() => clearResponse(i)}>Clear Response</button>
                                                            </div>


                                                            <div class="submit_btn" onClick={localStorage.setItem('answer', JSON.stringify(answerArray))}> <NavLink to={{
                                                                pathname: '/report/' + set_id,
                                                                data: {
                                                                    setId: set_id,
                                                                    questions_total: data.length,
                                                                    packageId: propData.packageId,
                                                                    duration: propData.duration,
                                                                    marks: propData.marks
                                                                }
                                                            }}> Submit</NavLink>
                                                            </div>
                                                            <div class="next_btn">
                                                                <button type='button' onClick={() => nextbutton()}>Save & Next</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )

                                            } else {
                                                return (
                                                    <div className="question_list">

                                                        <div class="time_sectin question_no">
                                                            <ul>
                                                                <li><h4>Question : {i + 1}</h4></li>
                                                            </ul>
                                                        </div>
                                                        <div class="q_height">
                                                            <div class="question_topic">{renderHTML(singleQA.question_title_hi)}</div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_a" value="A" onClick={(e) => answerObj(e.target.name, e.target.value, i)} checked={getCheckedValue(i, "A")} />
                                                                <label for="answer_a">{renderHTML(singleQA.option_a_hi)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_b" value="B" onClick={(e) => answerObj(e.target.name, e.target.value, i)} checked={getCheckedValue(i, "B")} />
                                                                <label for="answer_b">{renderHTML(singleQA.option_b_hi)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_c" value="C" onClick={(e) => answerObj(e.target.name, e.target.value, i)} checked={getCheckedValue(i, "C")} />
                                                                <label for="answer_c">{renderHTML(singleQA.option_c_hi)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_d" value="D" onClick={(e) => answerObj(e.target.name, e.target.value, i)} checked={getCheckedValue(i, "D")} />
                                                                <label for="answer_d">{renderHTML(singleQA.option_d_hi)}</label>
                                                            </div>
                                                        </div>

                                                        <div class="questionpaper_btn_botm">
                                                            <div class="mark_btn">
                                                                <button id="next" onClick={() => markedQuestion(i)}>Marked for Review</button>
                                                                <button onClick={() => clearResponse(i)}>Clear Response</button>
                                                            </div>


                                                            <div class="submit_btn" onClick={localStorage.setItem('answer', answerArray)}> <NavLink to={{
                                                                pathname: '/report/',
                                                                data: {
                                                                    setId: set_id,
                                                                    questions_total: data.length,
                                                                    packageId: propData.packageId,
                                                                    duration: propData.duration,
                                                                    marks: propData.marks
                                                                }
                                                            }}> Submit</NavLink>
                                                            </div>
                                                            <div class="next_btn">
                                                                <button type='button' onClick={() => nextbutton()}>Save & Next</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                    }
                                }
                                )}
                            </div>
                            <div class="user_quest_no">
                                <div class="user_info">
                                    <span>R</span> Rohit Verma
                                </div>
                                <div class="questions_details">
                                    <ul>

                                        <li><span>{countAnswer()}</span><h4>Answer</h4></li>
                                        <li><span>{count('visited')}</span><h4>Not Answer</h4></li>
                                        <li><span>{count('marked')}</span><h4>Marked</h4></li>
                                        <li><span>{data.length - countAnswer() - count('visited')}</span><h4>Not visited</h4></li>
                                        <li><span>{markAnswered}</span><h4>Answer & Mark for Review</h4></li>
                                    </ul>
                                </div>
                                <div class="questions_Quantitative">
                                    <h2>{currentSub || 'Choose a Question'}</h2>

                                    <ul>
                                        {data.map(function (singleQA, i) {
                                            if (currentSub == singleQA.subject || currentSub == null) {
                                                return (<li className={getCurrentClass(i)} onClick={() => updateValues(i)}><span>{i + 1}</span></li>)
                                            }
                                        })}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionAnswer;