import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import './PlaceOrder.css'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const PlaceOrder = () => {
  
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHanlder = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place", orderData,{headers:{token}});
    if (response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
   if(!token){
    navigate('/cart')
   }
   else if(getTotalCartAmount() ===0)
   {
    navigate('/cart')
   }
  }, [token])
  

  return (
    <form onSubmit={placeOrder} className='place-order' >
      <div className="place-order-left">
       <p className='title'>Delivery Information</p>
       <div className="multi-fields">
        <input 
        name='firstName'
        onChange={onChangeHanlder}
        value={data.firstName}
        type="text"
        required
        placeholder='First Name' />
        <input 
        name='lastName'
        onChange={onChangeHanlder}
        value={data.lastName}
        type="text" 
        required
        placeholder='Last Name'/>
       </div>
       <input
       name='email'
       onChange={onChangeHanlder}
       value={data.email}
       type="email"
       required
       placeholder='Email' />
        <input 
        name='street'
        onChange={onChangeHanlder}
        value={data.street}
        type="text"
        required
        placeholder='Street'/>
        <div className="multi-fields">
        <input 
        name='city'
        onChange={onChangeHanlder}
        value={data.city}
        type="text"
        required
        placeholder='City' />
        <input 
        name='state'
        onChange={onChangeHanlder}
        value={data.state}
        type="text" 
        required
        placeholder='State'/>
        </div>
        <div className="multi-fields">
        <input 
        name='zipcode'
        onChange={onChangeHanlder}
        value={data.zipcode}
        type="text" 
        required
        placeholder='Zip codee' />
        <input
        name='country'
        onChange={onChangeHanlder}
        value={data.country}
        type="text" 
        required
        placeholder='Country'/>
       </div>
       <input 
       name='phone'
       onChange={onChangeHanlder}
       value={data.phone}
       type="text" 
       required
       placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
    <h2>Cart Total</h2>

    <div className="cart-total-details">

        <p>Subtotal</p>
        <p>R{getTotalCartAmount()}</p>
      </div>
      <hr />
      <div className="cart-total-details">
        <p>Delivery Fee</p>
        <p>R{getTotalCartAmount()===0?0:15}</p>
      </div>
      <hr />
      <div className="cart-total-details">
        <b>Total</b>
        <b>R{getTotalCartAmount()===0?0:getTotalCartAmount()+15}</b>
        </div>
        <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
