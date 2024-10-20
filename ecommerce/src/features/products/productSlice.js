import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import { productService } from "./productService";

export const getAllProducts=createAsyncThunk("product/get",async(thunkAPI)=>{
    try {
        return await productService.getProducts()
    } catch (error) {
       
        return thunkAPI.rejectWithValue(error)
        
    }
})
export const getAProduct=createAsyncThunk("product/getAproduct",async(id,thunkAPI)=>{
    try {
        return await productService.getSingleProducts(id)
    } catch (error) {
       
        return thunkAPI.rejectWithValue(error)
        
    }
})
export const addTowishlist=createAsyncThunk("product/wishlist",async(proid,thunkAPI)=>{
    try {
        return await productService.addTowishlist(proid)
    } catch (error) {
       
        return thunkAPI.rejectWithValue(error)
        
    }
})
const productState={
    product:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const productSlice=createSlice({
    name:"product",
    initialState:productState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.product=action.payload
        }).addCase(getAllProducts.rejected,(state,action)=>{
             state.isError=true
            state.isLoading=false
            state.isSuccess=false
            state.message=action.error
        }).addCase(addTowishlist.pending,(state)=>{
            state.isLoading=true
        }).addCase(addTowishlist.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.addTowishlist=action.payload
            state.message="product added in wishlist !"
        }).addCase(addTowishlist.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        }).addCase(getAProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            state.singleproduct=action.payload
            state.message="product Fetched Successfully !"
        }).addCase(getAProduct.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.error
        })
    }
    
})
export default productSlice.reducer