import React, { useContext, useEffect, useRef, useState } from 'react'
import { CouponContext } from '../../Context/Coupons/CouponContext'
import AddCoupons from './AddCoupons';

const Coupons = () => {
    const ref = useRef(null);
    const closeRef = useRef(null);
    const { coupons, getCoupons, addcoupon, deleteCoupon, updateCoupon } = useContext(CouponContext);
    useEffect(() => {
        getCoupons();
    }, [])

    const [coupon, setcoupon] = useState({
        website: '',
        code: '',
        discount_type: '',
        discount: '',
        expiry: ''
    });
    const handleChange = (e) => {
        setcoupon({ ...coupon, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = await updateCoupon(coupon);
        if (status === 200) {
            alert("Coupon Added Successfully");
            closeRef.current.click();
            e.target.reset();
        }
    }

    const handleDelete = (id) => {
        deleteCoupon(id);
    }


    const handleUpdate = (coupon) => {
        const exp = coupon.expiry.split('T')[0];
        
        setcoupon({...coupon, expiry: exp});
        ref.current.click();

    }



    return (
        <div>

            <button type="button" className="btn btn-primary" hidden ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Coupon</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 mx-3">
                                <label htmlFor="website" className="form-label">Coupon Website</label>
                                <input type="text" className="form-control" name="website" id="website" value={coupon.website} onChange={handleChange} />
                            </div>
                            <div className="mb-3 mx-3">
                                <label htmlFor="code" className="form-label">Coupon Code</label>
                                <input type="text" className="form-control" name="code" id="code" value={coupon.code} onChange={handleChange} />
                            </div>
                            <div className="mb-3 mx-3">
                                <label htmlFor="couponType" className="form-label">Discount Type</label>
                                <fieldset>
                                    <select name="discount_type" className='form-select' defaultValue={coupon.discount_type} onChange={handleChange}>
                                        <option value="Percentage">Percentage</option>
                                        <option value="Fixed">Fixed</option>
                                    </select>

                                </fieldset>
                            </div>
                            <div className="mb-3 mx-3">
                                <label htmlFor="discount" className="form-label">Coupon Discount</label>
                                <input type="number" className="form-control" name="discount" value={coupon.discount} onChange={handleChange} />
                            </div>
                            <div className="mb-3 mx-3">
                                <label htmlFor="expiry" className="form-label">Coupon Expiry</label>
                                <input type="date" className="form-control" name="expiry" value={coupon.expiry} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={closeRef} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update Coupon</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddCoupons />
            <hr />
            <h1 className='mx-4 my-3'>Coupons</h1>
            <div className="card mx-4 my-3" >


                <table className="table">
                    <thead>
                        <tr>
                            <th>Website</th>
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
                                    <td>{coupon.website}</td>
                                    <td>{coupon.code}</td>
                                    <td>{coupon.discount}{coupon.discount_type === "Percentage" ? "%" : "Rupees"}</td>
                                    <td>{new Date(coupon.expiry.split('T')[0]).toLocaleDateString()}</td>

                                    <td>
                                        <button className="btn btn-primary mx-1" onClick={() => handleUpdate(coupon)}>Update</button>
                                        <button className="btn btn-danger mx-1" onClick={() => handleDelete(coupon._id)}>Delete</button>
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