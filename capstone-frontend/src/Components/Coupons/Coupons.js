import React, { useContext, useEffect } from 'react'
import { CouponContext } from '../../Context/Coupons/CouponContext'
import AddCoupons from './AddCoupons';

const Coupons = () => {
    const { coupons, getCoupons, addcoupon, deleteCoupon, updateCoupon } = useContext(CouponContext);
    useEffect(() => {
        getCoupons();
    }, [])

    const handleDelete = (id) => {
        deleteCoupon(id);
    }

    const handleUpdate = (coupon) => {
        updateCoupon(coupon._id, coupon);
    }



    return (
        <div>
            {/* implementing a modal to call add coupon */}
            <div className="modal fade" id="addCouponModal" tabIndex="-1" aria-labelledby="addCouponModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <AddCoupons />
                    </div>
                </div>
            </div>


            <h1 className='mx-4 my-3'>Coupons</h1>
            <div className="card mx-4 my-3" >
                <button type="button" className="btn btn-primary mx-4 my-3" data-bs-toggle="modal" data-bs-target="#addCouponModal">
                    Add Coupon
                </button>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Coupon Code</th>
                            <th>Coupon Discount</th>
                            <th>Coupon Expiry</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            coupons.map(coupon => (
                                <tr key={coupon._id}>
                                    <td>{coupon.code}</td>
                                    <td>{coupon.discount}{coupon.discount_type === "Percentage" ? "%" : "Rupees"}</td>
                                    <td>{coupon.expiry}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleUpdate(coupon)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(coupon._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Coupons