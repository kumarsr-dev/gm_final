
import Header from '../includes/header'
import Footer from '../includes/footer'
import React from 'react'
import { Link as NavLink} from 'react-router-dom';
import Loginpopup from "../component/popup";
import renderHTML from 'react-render-html';
import Path from '../includes/path'
const fetch = require('node-fetch');


export default function Frontpage(props) {
    const [checkLogin, setCheckLogin] = React.useState(null)
    const [data, setdata] = React.useState([])
    const [cateId,setcateId]=React.useState(1)
   const [pkgdata,setpkgdata]=React.useState([])

    React.useEffect(() => {
        setCheckLogin(localStorage.getItem('token'))
        try {
            const url = 'http://greatmocks.com/admin/api/great-mocks-apis.php?type=categories'
            fetch(url, { method: 'GET', })
            .then(res => res.json())
            .then(function (result) {
                console.log(result)
                setdata(result.data)            
            })
        } catch(err) {
           console.log(err)
          }let cateurl = 'type=packagebyCatId&category_id=' + cateId       
          fetch(Path + cateurl, { method: 'GET', })
              .then(res => res.json())
              .then(function(result) {
                  //console.log(result)
                  if(result.status == '200') {
                      console.log(result)
                      setpkgdata(result.data)
                  }else{
                      return 'Package Not Found'
                  }                
              })
          
          },
        
         [])


    const packages=(id)=>{
        let cateurl = 'type=packagebyCatId&category_id=' + id       
        fetch(Path + cateurl, { method: 'GET', })
            .then(res => res.json())
            .then(function(result) {
                //console.log(result)
                if(result.status == '200') {
                    console.log(result)
                    setpkgdata(result.data)
                }else{
                    setpkgdata([])
                }              
            })
            .catch(err=>console.log(err))
    }
    return (
        <div>
            <Header />
            <div class="container_fluid">
                <div class="banner"><img src="images/banner.jpg" alt="banner" />
                    <div class="container">
                        <div class="banner_text">
                            <h1> Onine Test Series</h1>
                            <h4><span>Everything You Need For Your Exam Preparation</span></h4>
                            <a href="/allcategories">Join Now</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid gray">
                <div class="container">
                    <div class="mba_option">
                        <ul>
                            {data.slice(0,5).map((category, i)=>{
                               return <li key={i}>
                                    <NavLink to={'/packages/' + category.id}>
                                        <h2>{category.name}</h2>
                                        <span>{renderHTML(category.description)}</span>
                                        <br/><i class="fa fa-chevron-down arodown" aria-hidden="true"></i>
                                    </NavLink>
                                </li> 
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="container">
                    <div class="upcomingtext">
                        <h2><span>Upcoming Tests Series</span> & Mock Tests </h2>
                        <h5>Click to view test series and mock tests for all exams</h5>
                        <ul>
                            {data.slice(0,5).map((category, i)=>{
                               return <li key={i} onClick={()=>packages(category.id)}>
                                    <button>{renderHTML(category.name)}</button>
                                </li>
                                
                            })}
                        </ul>
                        
                    </div>
                    <div class="upcomingtext_service">
                        <ul>
                            {pkgdata.map((em)=>{
                                if(em==''){
                                    return (console.log('adfasdfasdf'))
                                }else{
                                    return(<li>
                                        <h2>{renderHTML(em.title)}</h2>
                                        <p>{renderHTML(em.description)}</p>
                                        {checkLogin ? <NavLink to={"/packages/"+cateId} >View Test</NavLink> : <Loginpopup name="Buy Now" />}
                                    </li>)
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </div>


            <div class="container-fluid">
                <div class="container">
                    <div class="features">
                        <h2><span>Features of Mock Portal</span> Online Test Seriess</h2>
                        <ul>
                            <li class="firstleft"><a>
                                <i class="fa fa-book" aria-hidden="true"></i>
                                <h2>Innovative Exam</h2>
                                <p>ALLEN's OnlineTestSeries has come from a robust system of test practice built over 30+years. </p>
                            </a></li>
                            <li><a>
                                <i class="fa fa-book" aria-hidden="true"></i>
                                <h2>Innovative Exam</h2>
                                <p>ALLEN's OnlineTestSeries has come from a robust system of test practice built over 30+years. </p>
                            </a></li>
                            <li><a>
                                <i class="fa fa-book" aria-hidden="true"></i>
                                <h2>Innovative Exam</h2>
                                <p>ALLEN's OnlineTestSeries has come from a robust system of test practice built over 30+years. </p>
                            </a></li>
                            <li class="firstleft"><a>
                                <i class="fa fa-book" aria-hidden="true"></i>
                                <h2>Innovative Exam</h2>
                                <p>ALLEN's OnlineTestSeries has come from a robust system of test practice built over 30+years. </p>
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>


            <div class="container-fluid">
                <div class="mock_portal">
                    <img src="images/mock-portal_01.jpg" alt="mock service" />
                    <div class="container">
                        <div class="mock_contant">
                            <h3>Welcome to</h3>
                            <h2>MOCK <span>PORTAL</span></h2>
                            <h4>Are you looking for a Powerful Online Exam Portal or a Complete Online Test Series, then you are at the right place.</h4>

                            <p>Toppersexam.com has successfully conducted Thousands of Online Exams till date. Preparing for Online Competitive Exams has now been made easy.</p>

                            <p>Toppersexam.com is for the people who Aspire to Score High Marks in General Competitive Exams as well as Entrance Exams, at very nominal cost. This site will be your practice ground. You can write various model online tests available here and evaluate yourself based on your score. Questions are collected from various competitive exams and presented here for your Self Training.</p>
                        </div>
                    </div>

                </div>
            </div>


            <div class="container-fluid gray">
                <div class="container">
                    <div class="reviews">
                        <h2><span>Hear from other</span> Gradians</h2>
                        <div class="item">
                            <h3>Kanika Chauhan</h3>
                            <p>"The best app ever made! It really helps you in your everyday preparation with never ending small,full quizzes and study material. The mentors will bring you closer to your dreams! Download it now and start using diligently :)"</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid red">
                <div class="container">
                    <div class="total_enquari_counting">
                        <ul>
                            <li><h2>14000 +</h2><p>OnlineTest Series Users</p></li>
                            <li><h2>12000 +</h2><p>Questions Solved</p></li>
                            <li><h2>8000 +</h2><p>App Downloads</p></li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}