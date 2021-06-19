import React from 'react';
import Header from '../includes/header'
import Footer from '../includes/footer'
import { Link as NavLink, useParams } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { getQuestionsBySetId, getReport } from '../services/api/api.service'

export default function Summary(props) {
    const [data, setData] = React.useState([])
    const [answerApi, setAnswerApi] = React.useState([])
    const [currentQ, setCurrentQ] = React.useState(1)
    const [lang, sendlang] = React.useState(0)
    const { set_id } = useParams()
    const pageMarks = props.location.data || 0

    React.useEffect(() => {
        localStorage.removeItem('persist:root')
        async function getResult() {
            let getCustomerId = await localStorage.getItem('customer_id')
            getQuestionsBySetId(set_id)
                .then(function (result) {
                    console.log(result.data)
                    if (result.data.status == '200') {
                        setData(result.data.data)
                    }
                })
            getReport(set_id, getCustomerId)
                .then(result => {
                    console.log(result.data)
                    if (result.data.status == '200') {
                        setAnswerApi(result.data.data)
                    }
                })
                .catch(err => console.log(err))
        }

        getResult()


    }, [])

    console.log(answerApi)
    const getCorrectAnswer = (id) => {
        let correntAnswer = null
        answerApi.map(function (anslist) {
            if (id == anslist.question_id) {

                correntAnswer = anslist.correctAnswer
            }
        })
        return correntAnswer
    }
    const detailedSolution = (id) => {
        let solution = null
        answerApi.map((single) => {
            if (id == single.question_id) {

                solution = single.solution
            }

        })
        return solution
    }


    const answerStatuscolor = (id) => {
        let count = 0
        answerApi.map((e) => {
            if (id == e.question_id) {
                if (e.correctAnswer != e.answer_send) {
                    count = "Wrong"
                } else if (e.correctAnswer == e.answer_send) {
                    count = "Correct"
                }
            }
        })
        return (count)
    }

    const checkAnswer = (id, options) => {
        let answerClass = null;
        answerApi.map((anslist) => {
            if (id == anslist.question_id && options == anslist.correctAnswer) {
                //     console.log(id == anslist.question_id && options == anslist.correctAnswer)            
                answerClass = 'correct_answer'
            } else if (id == anslist.question_id && options == anslist.answer_send) {
                answerClass = 'attemp_answer'
            }
        })
        console.log(answerClass)
        return answerClass
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
                                setId: pageMarks.set_id,

                            }
                        }}>Solutions</NavLink>
                        <NavLink to={{
                            pathname: '/summary/' + set_id,
                            data: {
                                setId: pageMarks.set_id,

                            }
                        }}>Report</NavLink>
                    </div>
                </div>

                <div class="solution_report">
                    <div class="answer_view">
                        <div class="selected_option">
                            <div class="question_hestory">
                                <span class="number_of_q">{currentQ}</span>
                                <span class="gight_or_wrong">{answerStatuscolor(currentQ)}</span>
                                <span class="time_taken">time taken:</span>
                                <span class="time_taken">{answerApi.map((e) => { if (e.question_id == currentQ) { return (parseInt(e.duration)) } })} sec</span>

                            </div>
                            <div class="question_id">

                                <span> <select onChange={(e) => sendlang(e.target.value)}>
                                    <option value="0">English</option>
                                    <option value="1">Hindi</option>
                                </select>
                                </span>
                            </div>
                            {data.map((singleQA, i) => {
                                //console.log(singleQA)
                                if (parseInt(singleQA.question_id) == currentQ) {
                                    if (lang == 0) {
                                        return (
                                            <div>
                                                <div class="question">

                                                    <p>{renderHTML(singleQA.question_title)}</p>
                                                </div>
                                                <div class="right_solution">
                                                    <ul>
                                                        <li class={checkAnswer(singleQA.question_id, 'A')}><span>A</span><a>{renderHTML(singleQA.option_a)}</a></li>
                                                        <li class={checkAnswer(singleQA.question_id, 'B')}><span>B</span><a>{renderHTML(singleQA.option_b)}</a></li>
                                                        <li class={checkAnswer(singleQA.question_id, 'C')}><span>C</span><a>{renderHTML(singleQA.option_c)}</a></li>
                                                        <li class={checkAnswer(singleQA.question_id, 'D')}><span>D</span><a>{renderHTML(singleQA.option_d)}</a></li>
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

                                    } else {
                                        return (
                                            <div>
                                                <div class="question">

                                                    <p>{renderHTML(singleQA.question_title_hi)}</p>
                                                </div>
                                                <div class="right_solution">
                                                    <ul>
                                                        <li className={checkAnswer(singleQA.question_id, 'A')}><span>A</span><a>{renderHTML(singleQA.option_a_hi)}</a></li>
                                                        <li className={checkAnswer(singleQA.question_id, 'B')}><span>B</span><a>{renderHTML(singleQA.option_b_hi)}</a></li>
                                                        <li className={checkAnswer(singleQA.question_id, 'C')}><span>C</span><a>{renderHTML(singleQA.option_c_hi)}</a></li>
                                                        <li className={checkAnswer(singleQA.question_id, 'D')}><span>D</span><a>{renderHTML(singleQA.option_d_hi)}</a></li>
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
                                {data.map(function (singleQA, i) {
                                    return (<li className={answerStatuscolor(i + 1)}><a onClick={() => setCurrentQ(i + 1)}>{i + 1}</a></li>)
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

