import React, { useState } from 'react';
import Header from '../includes/header'
import Footer from '../includes/footer'
import Timer from "../includes/timer";
import Path from '../includes/path'
import { Link as NavLink, useParams } from 'react-router-dom';
import renderHTML from 'react-render-html';
import Loader from '../includes/loader'

function QuestionAnswer(props) {
    const [data, setData] = React.useState([])
    const [currentQ, setCurrentQ] = React.useState(0)
    const [answer, setAnswer] = React.useState([])
    const [visited, setVisited] = React.useState([])
    const [currentSub, setCurrentSub] = React.useState(null)
    let subjectList = [...new Set(data.map(item => item.subject))];
    const [answerArray, setanswerArray] = React.useState([])
    const [markedArray, setmarkedArray] = React.useState([])
    const [markAnswered, setmarkAnswered] = React.useState(0)
    const paperMarks = props.location.data || 0
    const [lang, sendlang] = React.useState(paperMarks.lang || 0)
    const { set_id } = useParams()
    const [answerTime, setanswerTime] = useState(0)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        let url = 'type=questionsbySetId&set_id=' + set_id

        fetch(Path + url, { method: 'POST' })
            .then(res => res.json())
            .then(function (result) {
                if (result.status == '200') {
                    setData(result.data)
                }
                setLoading(false)
            })
    }, [])

    const countMarkAnswered = () => {
        let check = false
        answerArray.map((e) => {
            markedArray.map((el) => {
                if (e.id == el) {
                    check = true
                }
            }
            )
        })
        //console.log(check)

        if (check == true) {
            setmarkAnswered(markAnswered + 1)
        }
    }
    const getCurrentClass = function (e) {
        let matched = false
        let answered = false
        let marked = false
        visited.map(function (val) {
            if (e == val) {
                matched = true
            }
        })
        answerArray.map(function (elm) {
            if (e == elm.id) {
                answered = true
            }
        })
        markedArray.map(function (elm) {
            if (e == elm) {
                marked = true
            }
        })

        
        if (marked == true && answered == true) {
            return 'marked-answered-active'
        } else if (matched == true) {
            return 'marked-active'
        } else if (answered == false && marked == false && e < currentQ) {
            return 'visited'
        } else if (answered == true) {
            return 'active-answered'      
        }

    }

    const answerObj = (el, val, Qid) => {
        let checking = false
        optionchecked(val, Qid)
        for (var single in answerArray) {
            if (answerArray[single].name == el) {
                answerArray[single].answer = val
                //console.log(answerArray)

                checking = true
                break;
            }
        }
        if (checking == false) {
            let ansObj = {
                id: Qid, name: el,
                answer: val, duration: answerTime
            }
            answerArray.push(ansObj)
            console.log(answerArray)
        }
    }

    const updateValues = (e) => {
        let checking = false
        setCurrentQ(e)
        for (var el of visited) {
            if (el == e) {
                checking = true
                break;

            }
        }
        if (checking == false) {
            visited.push(e)
        }
    }
    const markedQuestion = (e) => {
        let checking = false
        console.log(e)
        for (var el of markedArray) {
            if (el == e) {
                checking = true
                break;

            }
        }
        if (checking == false) {
            markedArray.push(e)
        }
    }
    const nextbutton = () => {
        setCurrentQ(currentQ + 1)
    }

    const optionchecked = (qid, option) => {
        answerArray.map((el) => {
            if (el.id == qid) {
                if (el.answer == option) {
                    return alert('checked')
                }
            }
        })
    }

    return (
        <div>
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
                                    <li onClick={() => setCurrentSub(null)}>All </li>
                                    {subjectList.map(function (sub) {
                                        return (<li onClick={() => setCurrentSub(sub)}>{sub} </li>)
                                    })}

                                </ul>

                                <div class="time_sectin">
                                    <ul>
                                        <li><h3><span>Question Type : MCQ</span></h3></li>
                                        <li><h3>Time Left : <span>{Timer()}</span></h3></li>
                                    </ul>
                                </div>

                                {data.map((singleQA, i) => {
                                    if (i == currentQ) {
                                        if (currentSub == singleQA.subject || currentSub == null) {

                                            if (lang == 0) {
                                                return (
                                                    <div className="question_list">

                                                        <div class="time_sectin question_no">
                                                            <ul>
                                                                <li><h4>Question : {i + 1}</h4></li>
                                                            </ul>
                                                        </div>
                                                        <div class="q_height">
                                                            <div class="question_topic">{renderHTML(singleQA.question_title)}</div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_a" value="A" onClick={(e) => answerObj(e.target.name, e.target.value, i)} />
                                                                <label for="answer_a">{renderHTML(singleQA.option_a)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_b" value="B" onClick={(e) => answerObj(e.target.name, e.target.value, i)} />
                                                                <label for="answer_b">{renderHTML(singleQA.option_b)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_c" value="C" onClick={(e) => answerObj(e.target.name, e.target.value, i)} />
                                                                <label for="answer_c">{renderHTML(singleQA.option_c)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_d" value="D" onClick={(e) => answerObj(e.target.name, e.target.value, i)} />
                                                                <label for="answer_d">{renderHTML(singleQA.option_d)}</label>
                                                            </div>
                                                        </div>

                                                        <div class="questionpaper_btn_botm">
                                                            <div class="mark_btn">
                                                                <button id="next" onClick={() => { markedQuestion(i); countMarkAnswered() }}>Marked for Review</button>
                                                                <button>Clear Response</button>
                                                            </div>


                                                            <div class="submit_btn" onClick={localStorage.setItem('answer', JSON.stringify(answerArray))}> <NavLink to={{
                                                                pathname: '/report/' + set_id,
                                                                data: {
                                                                    setId: set_id,
                                                                    marks: paperMarks.marks,
                                                                    answer: answerArray.length,
                                                                    notAnswer: visited.length - answerArray.length,
                                                                    review: markAnswered,
                                                                    notVisited: data.length - visited.length,

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
                                                                <input type="radio" name={"option" + i} id="answer_a" value="A" onClick={(e) => answerObj(e.target.name, e.target.value, i)} />
                                                                <label for="answer_a">{renderHTML(singleQA.option_a_hi)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_b" value="B" onClick={(e) => answerObj(e.target.name, e.target.value, i)} />
                                                                <label for="answer_b">{renderHTML(singleQA.option_b_hi)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_c" value="C" onClick={(e) => answerObj(e.target.name, e.target.value, i)} />
                                                                <label for="answer_c">{renderHTML(singleQA.option_c_hi)}</label>
                                                            </div>
                                                            <div class="answer_select">
                                                                <input type="radio" name={"option" + i} id="answer_d" value="D" onClick={(e) => answerObj(e.target.name, e.target.value, i)} />
                                                                <label for="answer_d">{renderHTML(singleQA.option_d_hi)}</label>
                                                            </div>
                                                        </div>

                                                        <div class="questionpaper_btn_botm">
                                                            <div class="mark_btn">
                                                                <button id="next" onClick={() => { markedQuestion(i); countMarkAnswered() }}>Marked for Review</button>
                                                                <button>Clear Response</button>
                                                            </div>


                                                            <div class="submit_btn" onClick={localStorage.setItem('answer', answerArray)}> <NavLink to={{
                                                                pathname: '/report/',
                                                                data: {
                                                                    setId: set_id,
                                                                    marks: paperMarks.marks,
                                                                    answer: answerArray.length,
                                                                    notAnswer: visited.length - answerArray.length,
                                                                    review: markAnswered,
                                                                    notVisited: data.length - visited.length,

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

                                        <li className={answer.map((ansCount, i) => { if (currentQ == ansCount) { return ('active') } })}><span>{answerArray.length}</span><h4>Answer</h4></li>
                                        <li><span>{visited.length - answerArray.length}</span><h4>Not Answer</h4></li>
                                        <li><span>{markedArray.length}</span><h4>Marked</h4></li>
                                        <li><span>{data.length - visited.length}</span><h4>Not visited</h4></li>
                                        <li><span>{markAnswered}</span><h4>Answer & Mark for Review</h4></li>
                                    </ul>
                                </div>
                                <div class="questions_Quantitative">
                                    <h2>Quantitative Abilities</h2>
                                    <h4>Choose a Question</h4>
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