import React from 'react';
import Header from '../includes/header'
import Footer from '../includes/footer'
import { Link as NavLink, useParams } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Progress from 'react-progressbar';
import { getQuestionsBySetId, getReport } from '../services/api/api.service'

export default function Summary(props) {
    const [data, setData] = React.useState([])
    const [topper, settopper] = React.useState(0)
    const pageMarks = props.location.data || 0
    const { set_id } = useParams()
    const [answerApi, setAnswerApi] = React.useState([])

    React.useEffect(async () => {
        localStorage.removeItem('persist:root')
        async function getResult() {
            let getCustomerId = await localStorage.getItem('customer_id')
            const setid = localStorage.getItem('setid')
            getQuestionsBySetId(setid)
                .then(result => {
                    if (result.data.status == '200') {
                        setData(result.data.data)
                    }
                })
            getReport(set_id, getCustomerId)
                .then(result => {
                    if (result.data.status == '200') {
                        settopper(result.data)
                        setAnswerApi(result.data.data)
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
            if (e.correctAnswer == e.answer_send)
                count += parseInt(e.duration)
        })
        return (count)
    }

    console.log(correctAnswerTime())

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
    const answer_bar_chart = {
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [
            {
                labels: [],
                data: [12, 19, 3, 5],
                maxBarThickness: 120,
                backgroundColor: [
                    '#1e90ff',
                    '#ffc000',
                    '#dc3912',
                    '#00db05',
                ],
                borderWidth: 0,
            },
        ],
    };



    const answer_dist_chart = {
        labels: ['Correct', 'Incorrect', 'Un Answered'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: [
                    '#43a800',
                    '#ff3100',
                    '#ff9900'
                ],
                borderWidth: 0,
            },
        ],
    };

    const answer_time_chart = {
        labels: ['Correct', 'Incorrect', 'Un Answered'],
        datasets: [
            {
                label: '# of Votes',
                data: [1, 9, 20],
                backgroundColor: [
                    '#1e90ff',
                    '#dc3912',
                    '#cccccc'
                ],
                borderWidth: 0,
            },
        ],
    }
    return (
        <div>

            <Header />
            <div class="container-fluid report-block">

                <div class="report_view">
                    <div class="graph">
                        <div class="report_btn">
                            <div class="inner_div">
                                <NavLink activeClassName='active' to={{
                                    pathname: '/finalreport/' + set_id,
                                    data: {
                                        setId: pageMarks.set_id,

                                    }
                                }}>Solutions</NavLink>
                                <NavLink activeClassName='active' to={{
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
                                    <h6>Score ({data.length})</h6>
                                </span>
                                    <Progress completed={75} color={'#ff0000'} />
                                </div>

                            </div>
                            <div class="score_bord">
                                <div class="score_titel"><span>
                                    <h6>Time ({(totalTime() / 60).toFixed(2)})</h6>
                                </span></div>
                                <Progress completed={75} color={'#1e90ff'} />
                            </div>
                            <div class="score_bord">
                                <div class="score_titel"><span>
                                    <h6>Percentile ({(correctAnswer() * 100 / (correctAnswer() + wrongAnswer())).toFixed(2)})</h6>
                                </span></div>
                                <Progress completed={75} color={'#ff9900'} />
                            </div>
                        </div>
                        <div class="compair_btn">
                            <div class="inside_div">
                                <a>Topers comprehension</a>

                            </div>
                            <div class="topers">
                                <div class="comprehension">
                                    <div class="score_titel"><span>
                                        <h6>Time ({topper.topper_time})</h6>

                                    </span></div>
                                    <Progress completed={parseInt(topper.topper_time)} color={'#121146'} />
                                </div>
                                <div class="comprehension">
                                    <div class="score_titel"><span>
                                        <h6>Percentile ({topper.topper_accuracy})</h6>

                                    </span></div>
                                    <Progress completed={parseInt(topper.topper_accuracy)} color={'#ff9900'} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="chart">
                        <div class="chart_left">
                            <h2>Answer Distribution</h2>
                            <Doughnut data={answer_dist_chart} />
                        </div>
                        <div class="chart_right">
                            <h2>Time Spent</h2>
                            <Doughnut data={answer_time_chart} />
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

                    </div>

                    <div class="time_distribution">
                        <h2>Subject Comparision</h2>
                        <Bar data={answer_bar_chart} />
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
}

