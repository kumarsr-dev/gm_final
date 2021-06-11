import React from 'react';
import Frontpage from '../pages/frontpage'
import Allcategories from '../pages/allcategories'
import Listing from '../pages/listing'
import Packages from '../pages/packages'
import QuestionAnswer from '../pages/question_answer'
import Report from '../pages/report'
import ReportSummary from '../pages/summary'
import Finalreport from '../pages/qa_report'
import Cart from '../pages/cart'
import Errorpage from '../pages/404'
import Success from '../modules/payumoney/success'
import Failure from '../modules/payumoney/failure'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Account from '../pages/account'
import History from '../pages/purchase_history'
import Promise from '../pages/promise'
import Instruction from '../pages/instruction'
import Payments from '../pages/payment'
import ReportProblem from '../pages/report-problem'
import Help from '../pages/help'
import Response from '../modules/payumoney/response'


export default function Mainrouting() {
    const [token, setToken] = React.useState(localStorage.getItem('token'))
    if(token == null) {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Frontpage} />
                        <Route exact path="/myaccount" component={Account} />
                        <Route exact path="/purchase_history" component={History} />
                        <Route exact path="/allcategories" component={Allcategories} />
                        <Route exact path="/listing/:package_id" component={Listing} />
                        <Route exact path="/packages/:cat_id" component={Packages} />                        
                        <Route exact path="/cart/:pkgId" component={Cart} />
                        <Route exact path="/payumoney/success" component={Success} />
                        <Route exact path="/payumoney/failure" component={Failure} />
                        <Route exact path="/payments" component={Payments}/>
                        <Route exact path="*" component={Errorpage}/>                        
                    </Switch>
                </div>
            </Router>
        )
    }  else {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Frontpage} />
                        <Route exact path="/myaccount" component={Account} />
                        <Route exact path="/purchase_history" component={History} />
                        <Route exact path="/allcategories" component={Allcategories} />
                        <Route exact path="/listing/:package_id" component={Listing} />
                        <Route exact path="/packages/:cat_id" component={Packages} />
                        <Route exact path="/QuestionAnswer/:set_id" component={QuestionAnswer} />
                        <Route exact path="/cart/:pkgId" component={Cart} />
                        <Route exact path="/response" component={Response} />
                        <Route exact path="/report/:set_id" component={Report} />
                        <Route exact path="/finalreport/:set_id" component={Finalreport} />
                        <Route exact path="/summary/:set_id" component={ReportSummary} />
                        <Route exact path="/instruction/:setid" component={Instruction} />
                        <Route exact path="/promise/:setids" component={Promise} />
                        <Route exact path="/payments" component={Payments}/>
                        <Route exact path="/report-problem" component={ReportProblem}/>
                        <Route exact path="/help" component={Help}/>
                        <Route exact path="*" component={Errorpage}/>                        
                    </Switch>
                </div>
            </Router>
        )
    }
}