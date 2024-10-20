const express=require('express')
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon } = require('../controller/couponController')
const { authmiddleware, isAdmin } = require('../middleware/authmiddlware')
const router=express.Router()

router.post('/',authmiddleware,isAdmin,createCoupon)
router.get('/',authmiddleware,isAdmin,getAllCoupon)
router.put('/:id',authmiddleware,isAdmin,updateCoupon)
router.delete('/:id',authmiddleware,isAdmin,deleteCoupon)
module.exports=router