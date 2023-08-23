import React, { useState, useEffect } from 'react'
import Coupons from './Coupons/Coupons'
import AddCoupons from './Coupons/AddCoupons'


const Home = () => {
    const [displayData, setDisplayData] = useState([])
    useEffect(() => {
        getdata()
    }, [])
    const getdata = async () => {
        const response = await fetch("../../data.json")
        const data = await response.json()
        console.log(data)
        setDisplayData()
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Website</h5>
                                {displayData.map((item) => {
                                    <image src={item.html} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Coupons /> */}
        </div>
    )
}

export default Home