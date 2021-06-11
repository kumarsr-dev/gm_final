import React from 'react';
import Header from '../includes/header'
import Footer from '../includes/footer'
import Path from '../includes/path'
import { Link as NavLink, useParams } from 'react-router-dom';

export default function Summary(props) {
    const [data, setData] = React.useState([])
    const [topper, settopper] = React.useState(0)
    const pageMarks = props.location.data || 0
    const { set_id } = useParams()
    const [answerApi, setAnswerApi] = React.useState([])


    React.useEffect(async () => {

        async function getResult() {

            let getCustomerId = await localStorage.getItem('customer_id')

            const setid = localStorage.getItem('setid')
            let url = 'type=questionsbySetId&set_id=' + set_id

            fetch(Path + url, { method: 'POST', })
                .then(res => res.json())
                .then(result => {
                    if (result.status == '200') {
                        console.log(result)
                        setData(result.data)
                    }
                })

                let url_result='type=getReport&customer_id=' + getCustomerId + '&set_id=' + set_id
            fetch(Path + url_result, { method: 'POST', })
                .then(res => res.json())
                .then(result => {
                    if (result.status == '200') {
                        settopper(result)
                        setAnswerApi(result.data)
                        console.log(result.data)
                    }
                })
                .catch(err => console.log(err))
        }

        getResult()

    }, [])

    const totalTime = () => {
        let duration = 0
        answerApi.map((e) => {
            duration += parseInt(e.duration)
        })
        return (duration)
    }
    const correctAnswerTime = () => {
        let count = 0
        answerApi.map((e) => {
            //console.log(e.duration)
            if (e.correctAnswer == e.answer_send)
                count += parseInt(e.duration)
            //console.log(e)
        })
        return (count)
    }
    const wrongAnswerTime = () => {
        let count = 0
        answerApi.map((e) => {
            if (e.correctAnswer != e.answer_send)
                count += parseInt(e.duration)
        })
        return (count)
    }
    const correctAnswer = () => {
        let count = 0
        answerApi.map((e) => {
            //console.log(e.duration)
            if (e.correctAnswer == e.answer_send)
                count += 1
            //console.log(e)
        })
        return (count)
    }
    const wrongAnswer = () => {
        let count = 0
        answerApi.map((e) => {
            //console.log(e.duration)
            if (e.correctAnswer != e.answer_send)
                count += 1
            //console.log(e)
        })
        return (count)
    }
    return (
        <div>

            <Header />
            <div class="container-fluid report-block">

                <div class="report_view">
                    <div class="graph">
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
                        <div class="compair">
                            <div class="score_bord">
                                <div class="score_titel"><span>
                                    <h6>score</h6>
                                    <p>{correctAnswer() + wrongAnswer()}/200</p>
                                </span></div>
                                <div class="progress">
                                    <div class="child"></div>
                                </div>
                            </div>
                            <div class="score_bord">
                                <div class="score_titel"><span>
                                    <h6>Time</h6>
                                    <p>{(totalTime() / 60).toFixed(2)}/60 M</p>
                                </span></div>
                                <div class="progress">
                                    <div class="child"></div>
                                </div>
                            </div>
                            <div class="score_bord">
                                <div class="score_titel"><span>
                                    <h6>Accuracy</h6>
                                    <p>{(correctAnswer() * 100 / (correctAnswer() + wrongAnswer())).toFixed(2)}</p>
                                </span></div>
                                <div class="progress">
                                    <div class="child"></div>
                                </div>
                            </div>
                        </div>
                        <div class="compair_btn">
                            <div class="inside_div">
                                <a>Topers comprehension</a>

                            </div>
                            <div class="topers">
                                <div class="comprehension">
                                    <div class="score_titel"><span>
                                        <h6>Time({topper.topper_time})</h6>

                                    </span></div>
                                    <div class="progress">
                                        <div class="child"></div>
                                    </div>
                                </div>
                                <div class="comprehension">
                                    <div class="score_titel"><span>
                                        <h6>Accuracy({topper.topper_accuracy})</h6>

                                    </span></div>
                                    <div class="progress">
                                        <div class="child"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="chart">
                        <div class="chart_left">
                            <div id="donutchart"></div>
                        </div>
                        <div class="chart_right">
                            <div id="result"></div>
                        </div>
                        <div class="table_box">
                            <div class="table">
                                <div class="marks">
                                    <ul>
                                        <li>
                                            <h4>Sections</h4>
                                        </li>
                                        <li>
                                            <h4>Score</h4>
                                        </li>
                                        <li>
                                            <h4>Time spant</h4>
                                        </li>
                                    </ul>

                                    <ul>
                                        <li>
                                            <h4>Total</h4>
                                        </li>
                                        <li>
                                            <h4>{correctAnswer() + wrongAnswer()}/200</h4>
                                        </li>
                                        <li>
                                            <h4>{(totalTime() / 60).toFixed(2)} min.</h4>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="time_distribution">

                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
}

