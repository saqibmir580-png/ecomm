import axios from 'axios'
import { base_url, config } from '../../utils/axiosConfig'
const  getProducts=async()=>{
    const response=await axios.get(`${base_url}product`,config)
    if(response.data){
        return response.data
    }
}
const  getSingleProducts=async(id)=>{
    const response=await axios.get(`${base_url}product/${id}`,config)
    if(response.data){
        return response.data
    }
}
const  addTowishlist=async(proid)=>{
    const response=await axios.put(`${base_url}product/wishlist`,proid,config)
    if(response.data){
        return response.data
    }
}


export const productService={
   getProducts,
   addTowishlist,
   getSingleProducts
}