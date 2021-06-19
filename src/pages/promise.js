import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

export default function Promisepage(props) {
    const { setids } = useParams();
    const [lang, sendlang] = React.useState(0)
    const setid = localStorage.getItem('setid')
    const urlData = props.location.data

    let [checkbox, setcheckbox] = useState(false)
    const checkbutton = () => {
        let check = document.getElementById('check')

        if (check.checked == true) {

            setcheckbox(true)
        } else {
            console.log('plese click on checkbox')
        }
    }


    return (
        <div class="container-fluid other_important_Instructions">
            <div class="instruction_heading">
                <h2 class="Instructions">other important Instructions</h2>
                <p>please take the test and report the wrong question / answers by raiise issue feature</p>
            </div>
            <div class="conditions">
                <ol>
                    <li>
                        <p>Choose your defoult language </p>
                        <select onChange={(e) => sendlang(e.target.value)}>
                            <option value="0">English</option>
                            <option value="1">Hindi</option>
                        </select>
                    </li>
                    <li>
                        <p class="text_color_red">please note your questions will appear in your defoult language. this language
                            can be changed for a particular question later on.</p>
                    </li>
                    <li>

                        <p><input type="checkbox" id='check' onClick={() => checkbutton()} /> i have read and understood the instructions.all computer hardwares allotted to me are in proper
                            working condition. i agree that i am not carrying any prohibited gadget like mobile phone etc./any
                            prohibitedmaterial with me into the exam hall. i agree that in case of not adhering to the
                            instructions i will be disqualifide from takeing the exam.</p>
                    </li>

                </ol>
                <div class="begin_button"><button>{checkbox == true ? <NavLink to={{
                    pathname: '/QuestionAnswer/' + setids,
                    data: { 
                        lang: lang,
                        marks : urlData.marks,
                        pkgName:urlData.pkgName,
                        pkgPrice:urlData.pkgPrice,
                        packageId: urlData.packageId,
                        packageId: urlData.packageId,
                        duration: urlData.duration
                     }
                }}>i am ready to begin</NavLink> : <>i am ready to begin</>}</button></div>
            </div>
        </div>
    )
}