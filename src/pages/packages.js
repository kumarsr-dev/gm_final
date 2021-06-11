import React from 'react';
import Header from '../includes/header'
import Footer from '../includes/footer'
import { Link as NavLink, useParams } from 'react-router-dom';
import Loginpopup from "../component/popup";
import Path from '../includes/path'
import Loading from "../component/loader";
import 'react-render-html'
import renderHTML from 'react-render-html';
import { getAllPackagesById, getVendorToken } from '../services/api/api.service'

export default function Courses(props) {

    const { cat_id } = useParams()
    const [data, setData] = React.useState([])
    const [checkLogin, setCheckLogin] = React.useState(null)
    const [ownedpkg, setownedpkg] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(async () => {

        setCheckLogin(localStorage.getItem('token'))
        setLoading(true)
        getAllPackagesById(cat_id)
            .then(function (result) {
                if (result.data.status == '200') {
                    setData(result.data.data)
                }
                setLoading(false)
            })

        getVendorToken(checkLogin)
            .then(function (result) {
                if (result.data.status == '200') {
                    setownedpkg(result.data.data)
                }
            })

    }, [checkLogin])

    const ownedChecking = (Id) => {
        let check = false
        for (var single of ownedpkg) {
            if (single.pkgId == Id) {
                check = true
            }
        } if (check == true) {
            return 'Take Test'
        } else {
            return 'Buy Now'
        }
    }
    const ownedRouting = (Id) => {
        let check = false
        for (var single of ownedpkg) {
            if (single.pkgId == Id) {
                check = true
            }
        } if (check == true) {
            return '/listing/' + Id
        } else {
            return '/cart/' + Id
        }
    }
    //{ownedpkg.map(e=>{if(e.pkgId==packageData.id){return'Take Test'}else{return 'Buy Now'}})}
    return (
        <div>
            <Header />

            <div class="container-fluid relative_loading">
                {loading == true ? <Loading /> : null}
                <div class="container-fluid callpink">
                    <div class="container">
                        <div class="package_box">
                            {/* <h2> {categoryname} </h2> */}

                            {data.length == 0 ?
                                <div class="notfound">
                                    <h2>Packages Not Found</h2>
                                    <p>Sorry, There is not packages in this category, Please try another category</p>
                                    <NavLink to="/allcategories">View all Category <i class="fa fa-arrow-right" aria-hidden="true"></i></NavLink>
                                </div>
                                : null}

                            <ul>


                                {data.map(function (packageData) {
                                    return (
                                        <li>
                                            <div class="box1">
                                                <h3>{packageData.title}</h3>
                                                <div class="price">
                                                    <span class="cross"><i class="fa fa-inr" aria-hidden="true"></i> {packageData.price}</span>
                                                    <span class="ok"><i class="fa fa-inr" aria-hidden="true"></i> {packageData.offer_price}</span>
                                                </div>
                                                <div class="topbtn" onClick={() => localStorage.setItem('pkgdata', JSON.stringify([{
                                                    package_name: packageData.title,
                                                    pkgPrice: packageData.offer_price,
                                                    pkgId: packageData.id
                                                }]))}>{checkLogin ? <NavLink to={{
                                                    pathname: ownedRouting(packageData.id),
                                                    data: {
                                                        pkgid: packageData.id,
                                                        pkgName: packageData.title,
                                                        pkgPrice: packageData.offer_price
                                                    }
                                                }} class="butten-crsavl">{ownedChecking(packageData.id)} </NavLink> : <Loginpopup name='Buy Now' />}</div>
                                                <div class="about">

                                                    {renderHTML(packageData.description)}

                                                </div>
                                                <div class="explorbtn" onClick={() => localStorage.setItem('pkgdata', JSON.stringify([{
                                                    package_name: packageData.title,
                                                    pkgPrice: packageData.offer_price,
                                                    pkgId: packageData.id
                                                }]))}>
                                                    <NavLink to={{
                                                        pathname: '/listing/' + packageData.id,
                                                        data: {
                                                            package_name: packageData.title,
                                                            pkgPrice: packageData.offer_price
                                                        }
                                                    }}>
                                                        Explore <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                                    </NavLink> </div>
                                            </div>
                                            <div class="lastbtn" onClick={() => localStorage.setItem('pkgdata', JSON.stringify([{
                                                package_name: packageData.title,
                                                pkgPrice: packageData.offer_price,
                                                pkgId: packageData.id
                                            }]))}>{checkLogin ? <NavLink to={{
                                                pathname: ownedRouting(packageData.id),
                                                data: {
                                                    package_name: packageData.title,
                                                    pkgid: packageData.id,
                                                    pkgName: packageData.title,
                                                    pkgPrice: packageData.offer_price
                                                }
                                            }} class="butten-crsavl">
                                                {ownedChecking(packageData.id)} </NavLink> : <Loginpopup name='Buy Now' />}
                                            </div>
                                        </li>

                                    )
                                })}





                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}