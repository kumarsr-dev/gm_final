import React from 'react'
import {NavLink, useParams} from 'react-router-dom'

export default function Instruction(){
    const{setid} = useParams()
    return(
        <div class="english_Instructions">
        <h2 class="Instructions">Instructions</h2>
        <p class="textCenter underline"><b><span class="languageInst">ENGLISH INSTRUCTIONS</span></b></p>
        <p class="textCenter underline"><b>Please read the instructions carefully</b></p>
        <h3>A General Instructions:</h3>
        <ol>
            <li> <strong>Duration</strong> of examination: As specified in the Exam Pattern.</li>
            <li> <strong>Number of questions:</strong> As specified in the Exam pattern.</li>
            <li> All questions are of <strong>objective type</strong>. Four options are given to each question out of which only one will be the correct answer.</li>
            <li> There will be <strong>negative marking</strong> for wrong answers. 1/4th mark will be deducted for every wrong answer.</li>
            <li> <strong><span class="underline">Click on Save and Next button after answering every question to save your answer</span>.</strong> Otherwise your answer will not be saved.</li>
            <li> <strong>Language:</strong> You can view the Question Paper in any of the 2 languages. The instructions and the questions shall be displayed in the language chosen by you from the drop down language list in the instructions page as well as on the top right corner of Question paper. The questions will appear on the screen in the selected language. You can also change the language of the question paper during the exam by selecting the desired language from the drop down list.</li>
            <li> In case of any variation in the content of the question between the English and any other language, the content in English language shall be treated as valid.</li>
            <li> One question will be displayed on the screen at a time.</li>
            <li> 
                Time available for you to complete the examination will be displayed through a countdown timer in the top right hand corner of the screen. It will display the remaining time as <strong>Time Left</strong>. At the beginning of exam, timer will show the specified minutes which will reduce gradually with passage of time. When the timer reaches zero, the examination will end by itself and your examination will be submitted by the system.
            </li>
            <li> This is a Mock Test. The question paper displayed is for practice purposes only and should be taken as a Mock paper.</li>
        </ol>
        <h3>B Question Number Box:</h3>
        <ol>
            <li>
                 Question Number Box displayed on the right side of the screen will show the status of each question using one of the following symbols:
                <div id="QuestionIndicatorIns">
                    <div class="icons"><div class="missedIcon">1</div><div class="text">You have not visited the question yet.</div></div>
                    <div class="icons"><div class="skippedIcon">2</div><div class="text">You have not answered the question.</div></div>
                    <div class="icons"><div class="attemptedIcon">3</div><div class="text">You have answered the question.</div></div>
                    <div class="icons"><div class="reviewIcon">4</div><div class="text">You have NOT answered the question but have marked the question for review.</div></div>
                    <div class="icons"><div class="review_answeredIcon">5</div><div class="text">You have answered the question but marked it for review.</div></div>
                </div>
                The ‘Marked for Review’ status for a question simply indicates that you would like to look at that question again.
    You are advised to familiarise yourself with the above symbols before the actual examination.
            </li>
            <li>
                 You can click on the "&gt;" arrow which appears to the left of question number box to Minimise the question number box. This will enable you to view the question on a bigger area of the screen. To view the question number box again, you can click on "&lt;" arrow which appears on the right side of the screen.
            </li>
            <li>
                 You can click on <span><i class="fa fa-arrow-up" aria-hidden="true"></i></span>to navigate to the bottom and <span><i class="fa fa-arrow-down" aria-hidden="true"></i></span> to navigate to the top of the question area, without scrolling.
            </li>
            <li>
                 <strong>The summary of number of questions answered, not answered, not visited, marked for review and answered and marked for review will be displayed above the question number box.</strong>
            </li>
        </ol>
        <h3>C Answering a Question:</h3>
        <ol class="answaring_questions">
            <li>
                 The questions will appear on the screen in serial order, which can be answered one by one as given below: 
                <ol>
                    <li>To select your answer, click on the button of one of the options</li>
                    <li>To deselect your chosen answer, click on the button of the chosen option again or click on the <strong>Clear Response</strong> button</li>
                    <li>To change your chosen answer, click on the button of option you want to choose.</li>
                    <li><span class="underline"><strong>To save your answer,</strong> you <strong>MUST</strong> click on the <strong>Save &amp; Next button</strong>.</span></li>
                    <li>In case of doubt on the option marked for a question, the question can be marked for review by clicking <strong>Mark for Review &amp; Next button.</strong> In case the marked option is not reviewed, the originally marked option shall be considered for evaluation.</li>
                </ol>
            </li>
            <li> To change your answer to a question that has already been answered, first click on that question number from the question number box and follow the procedure for answering as mentioned at 1 above.</li>
        </ol>
        <h3>D Instruction for enlarging images:</h3>
        <ol>
            To view the image provided in the question in a bigger size, click on the image and rotate the scrolling wheel on the mouse.
        </ol>
        <p class="textCenter"><strong>"ALL THE BEST"</strong></p>
        <div class="next_page">
        <NavLink to={{
                    pathname: '/promise/' + setid
            }} >next {'>>'}</NavLink>
        </div>
    </div>

    )
}