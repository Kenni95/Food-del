import React, { useContext, useEffect } from 'react'
import './index.css'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
   const {url} = useContext(StoreContext);
   const navigate = useNavigate();

   const verifyPayment = async (params) => {
    const response = await axios.post(url+"/api/order/verify",{success,orderId})
    if(response.data.success){
      navigate("/myOrders")
    }
    else{
      navigate("/")
    }
   }

   useEffect(() => {
    verifyPayment()
   }, [])
   
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
