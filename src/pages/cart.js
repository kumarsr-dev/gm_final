import React, { useEffect, useState } from 'react'
import Header from '../includes/header'
import Footer from '../includes/footer'
import { NavLink, useParams } from 'react-router-dom';
import Payu from '../modules/payumoney/payu'
import { saveOrder } from '../services/api/api.service'

export default function Cart(props) {

    const { pkgId } = useParams()
    const pageProp = props.location.data || 0
    const [orderId, setOrderId] = useState(null)
    const [orderAmount, setOrderAmount] = useState(null)    
    const [productinfo, setProductInfo] = useState(null)

    useEffect(() => {
        setProductInfo(pageProp.pkgName)
        checkout()
    }, [])

    const checkout = async () => {
        const customer_id = await localStorage.getItem('customer_id')
        await saveOrder(customer_id, pkgId)
            .then(function (response) {
                if (response.data.status == '200') {     
                    setOrderId(response.data.purchase_id)
                    setOrderAmount(response.data.amount)
                } else {
                    alert('Please Try Again')
                }
            })
    }

    const pkg = function () {
        if (pageProp.pkgName == undefined) {

            const packdata = localStorage.getItem('pkgdata')
            const data = JSON.parse(packdata)

            return (<div class="packeg_id">
                <span class="">Package ID - {data[0].pkgId}</span>
                <h2>{data[0].package_name}</h2>
            </div>)
        } else {
            return (<div class="packeg_id">
                <span class="">Package ID - {pkgId}</span>
                <h2>{pageProp.pkgName}</h2>
            </div>)
        }

    }

    const pkgamount = function () {
        if (pageProp.pkgName == undefined) {

            const packdata = localStorage.getItem('pkgdata')
            const data = JSON.parse(packdata)

            return (<div class="totalprice">
                <span>Total Payable:</span>
                <span class="price">{data[0].pkgPrice}</span>
            </div>)
        } else {
            return (<div class="totalprice">
                <span>Total Payable:</span>
                <span class="price">{pageProp.pkgPrice}</span>
            </div>)
        }

    }

    return (
        <div>
            <Header />
            <div class="container_fluid">
                <div class="banner"><img src={process.env.PUBLIC_URL + "/images/inner_banner.jpg"} alt="banner" /></div>
            </div>
            <div class="container_fluid">
                <div class="container">
                    <div class="payment_form">
                        <div class="Checkouttext TextDark">
                            <h2>Checkout to place order</h2>
                            <h4>Product in your cart:</h4>
                            {pkg()}

                        </div>
                        <div class="purchaseDetails">




                            <div class="price_details">
                                <h2>Price Details</h2>
                                <div class="packeg_id">
                                    {pkgamount()}
                                </div>
                            </div>

                            <div class="checkoutheading">
                                <span>Contact Informations</span>
                            </div>

                            <Payu amount={orderAmount} />

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
