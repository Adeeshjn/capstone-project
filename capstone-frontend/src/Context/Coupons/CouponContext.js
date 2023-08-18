import { createContext, useState } from "react";

export const CouponContext = createContext();

const CouponContextProvider = ({ children }) => {
    const [coupons, setCoupons] = useState([]);

    const getCoupons = async () => {
        const response = await fetch("http://localhost:5000/api/coupons/fetchallcoupons",
            {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'auth-token': localStorage.getItem('token')
                }
            });
        const data = await response.json();
        setCoupons(data);
    }

    const addCoupon = async (coupon) => {
        const response = await fetch("http://localhost:5000/api/coupons/addcoupon",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(coupon)
            });
        const json = await response.json();
        console.log(json);
        setCoupons([...coupons, coupon]);
    }

    const updateCoupon = async (id, coupon) => {
        const response = await fetch(`http://localhost:5000/api/coupons/updatecoupon/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(coupon)
            });
        const json = await response.json();
        console.log(json);
        for (let i = 0; i < coupons.length; i++) {
            if (coupons[i]._id === id) {
                coupons[i] = coupon;
                break;
            }
        }
    }

    const deleteCoupon = async (id) => {
        const response = await fetch(`http://localhost:5000/api/coupons/deletecoupon/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
        const json = await response.json();
        console.log(json);
        for (let i = 0; i < coupons.length; i++) {
            if (coupons[i]._id === id) {
                coupons.splice(i, 1);
                break;
            }
        }
    }

    return (
        <CouponContext.Provider value={{ coupons, getCoupons, addCoupon, deleteCoupon, updateCoupon }}>
            {children}
        </CouponContext.Provider>
    )
}

export default CouponContextProvider;