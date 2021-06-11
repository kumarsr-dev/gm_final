import React, { useState }  from 'react'
import Header from '../includes/header'
import Footer from '../includes/footer'
import {Link as NavLink, useParams} from 'react-router-dom';
import Loginpopup from "../component/popup";
import Loading from "../component/loader";
import { getSetsbyPackageId, getVendorToken } from '../services/api/api.service'


export default function Listingpage(props) {
    const { package_id } = useParams()
    const [checkLogin, setCheckLogin] = React.useState(null)
    const [data, setData] = React.useState([])
    const [ownedpkg,setownedpkg]=React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [x,setx]=useState(1)
    const package_name = props.location.data || 0


    React.useEffect(() => {
        setLoading(true)
        getSetsbyPackageId(package_id)  
            .then(function(result) {
                if(result.data.status == '200') {
                    setData(result.data.data)
                }
                setLoading(false)
                
            })
        setCheckLogin(localStorage.getItem('token'))
        getVendorToken(checkLogin)
            .then((result)=>{
                if(result.data.status == '200') {
                    setownedpkg(result.data.packageOwned)

                }                
            })
    }, [])
    const ownedChecking=()=>{
        let check=false
        let expire=false
        for(var single of ownedpkg){
            if(single.pkgId==package_id){
                check=true
            }
        }if(check==true){
            return 'Take Test'
        }else{
            return 'Buy Now'
        }
    }
    const ownedRouting=(setId)=>{
        let check=false
        for(var single of ownedpkg){
            if(single.pkgId==package_id){
                check=true
            }
        }if(check==true){
            return '/instruction/' + setId
        }else{
           // return '/cart/'+package_id
           return '/instruction/' + setId
        }
    }
    const pkg=function(){
        console.log(package_name.package_name)
        if(package_name.package_name==undefined){
            console.log('fsdfsdfsdfsdfsdfs')

           const packdata=localStorage.getItem('pkgdata')
           const data=JSON.parse(packdata)
           
           return(<h2>{data[0].package_name}</h2>)
        }else{
            return(<h2>{package_name.package_name}</h2>)
        }

    }
    
    const reportapi=(id)=>{
        localStorage.setItem('setid',id)        
    }

    return (
        <div>
            <Header />
 
            <div class="container-fluid">
            {loading == true ? <Loading /> :  null }

                <div class="container">
                    <div class="test_list">
                        {pkg()}
                        <div class="list_tab">
                            <ul class="nav nav-tabs tabList">
                                <li class="">
                                    <a>Paid<span class="TextHeilight"> ({data.length}) </span></a>
                                </li>

                                <li class="">
                                    <a>My Tests<span class="TextHeilight"> ({ownedpkg.map(e=>{if(package_id==e.pkgId){
                                        
                                        return data.length-e.count
                                    }})}) </span></a>
                                </li>

                                <li class="">
                                    <a>Attempted<span class="TextHeilight"> ({ownedpkg.map(e=>{if(package_id==e.pkgId){
                                        
                                        return e.count
                                    }})}) </span></a>
                                </li>

                            </ul>
                        </div>
                        <div class="listing_courses">

                            {data.map(function(listData){
                                return (
                                    
                                    <div class="testItem  Card">
                                        
                                        <h3 class="H3Color">{listData.set_name}</h3>
                                        <div class="testdetailaction testflexbox">
                                            <div class="testdetailscore testflexbox">
                                                <div class="testdetail testflexbox">
                                                    <div class="teststats testflexbox">
                                                        <div><span class="TextDark">{listData.set_id} </span><span class="TextLight">Set Id</span></div>
                                                        <div><span class="TextDark">{listData.qmarks} </span><span class="TextLight">Marks</span></div>
                                                        <div><span class="TextDark">{listData.duration} </span><span class="TextLight">Minutes</span></div>
                                                    </div>
                                                    <div class="testattempts">
                                                    </div>
                                                </div>
                                                <div class="NotValied shortreport testflexbox">
                                                    
                                                    <div class="Percentage NotValied">
                                                    </div>
                                                </div>


                                            </div>
                                            <div class="testaction" onClick={()=>reportapi(listData.set_id)}>
                                                <NavLink class="NotValied btn btn-primary-alt" to='/report-problem'>Report</NavLink>
                                                
                                            </div>
                                                <div class="take_test">
                                                {checkLogin ? <NavLink to={{
                                                                            pathname: ownedRouting(listData.set_id),//'/QuestionAnswer/' + ,
                                                                            data: {
                                                                                marks : listData.qmarks,
                                                                                pkgName:package_name.package_name,
                                                                                pkgPrice:package_name.pkgPrice,
                                                                                packageId: package_id
                                                                            }
                                                }} >{ownedChecking()}</NavLink> : <Loginpopup name="Unlock Test" />}

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            
 
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}


