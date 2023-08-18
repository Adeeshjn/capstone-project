import React, { useState, useContext } from 'react'
import { CouponContext } from '../../Context/Coupons/CouponContext'

const AddCoupons = () => {
    const { addCoupon } = useContext(CouponContext);
    const [coupon, setcoupon] = useState({
        code: '',
        discount_type: '',
        discount: '',
        expiry: ''
    });
    const handleChange = (e) => {
        console.log(e.target.value);
        setcoupon({ ...coupon, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addCoupon(coupon);
    }
    return (
        <div>
            <h2 className='mx-4 my-3'>Add Coupons</h2>
            <div className="card mx-4 my-3" >
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mx-3">
                        <label htmlFor="code" className="form-label">Coupon Code</label>
                        <input type="text" className="form-control" name="code" id="code" onChange={handleChange} />
                    </div>
                    <div className="mb-3 mx-3">
                        <label htmlFor="couponType" className="form-label">Discount Type</label>
                        <fieldset>
                            <input type="radio" className='' name="discount_type" value="Percentage" onChange={handleChange} /> <label htmlFor="Percentage" className='form-check-label'>Percentage</label>
                            <input type="radio" name="discount_type" value="Fixed" onChange={handleChange} /> <label htmlFor='Fixed' className="form-check-label">Fixed</label>
                        </fieldset>
                    </div>
                    <div className="mb-3 mx-3">
                        <label htmlFor="discount" className="form-label">Coupon Discount</label>
                        <input type="number" className="form-control" name="discount" onChange={handleChange} />
                    </div>
                    <div className="mb-3 mx-3">
                        <label htmlFor="expiry" className="form-label">Coupon Expiry</label>
                        <input type="date" className="form-control" name="expiry" onChange={handleChange} />
                    </div>
                    <hr />
                    <button type="submit" className="btn btn-primary mx-4 mb-3">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddCoupons