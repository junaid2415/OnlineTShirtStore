const User = require('../models/user');
const Order = require('../models/order');

exports.getUserById = (req, res , next, id )=>
{
    
     User.findById(id).exec( (err, user)=>{
        if(err || !user)
        {
            return res.status(400).json({
                error : 'No user found'
            })
        }
        req.profile = user
        next();
     })
}


exports.getUser = (req, res )=>
{
    //  todo getback here for password // tada its done
    req.profile.salt = undefined;
    // jus making undefined in req body not in DB!!!
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile)
}

exports.updateUser = (req, res) =>
{
    User.findByIdAndUpdate(
        { _id : req.profile._id},
        { $set : req.body},
        {new: true ,},
        (err , user)=>
        {
            if(err || !user){
                return res.status(400).json(
                    { error : "Failed to Update"}
                )
            }
            user.salt = undefined;
            // jus making undefined in user returned by callback not in DB!!!
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            return res.send(user);
            }
    )    
}


exports.getUserOrders = (req, res) => 
{
    //  check if you need to send samr thing in find to populate also
    Order.find({ user : req.profile._id}).Populate('user',"_id name").exec((err, order)=>
    {
        if(err)
        {
            return res.status(400).json({
                error:" NO order in this account "
            })
        }
        return res.json(order);
    })
}


exports.pushOrderInPurchaseList =(req, res, next)=>{
    let purchases = []
    req.body.order.products.forEach(product  => {
        purchases.push(
            {
                _id : product._id,
                name : product.name,
                description : product.description,
                category : product.category,
                quantity : product.quantity,
                amount : req.body.order.amount,
                transaction_id : req.body.order.transaction_id
            }
        )
    });

    // store in db

    User.findOneAndUpdate(
        { _id : req.profile._id},
        {$push : { purchases : purchases}},
        {new : true},
        (err, purchase)=>{
            if(err)
            {
                return res.status(400).json(
                    {
                        error : "Unable to save purchase list"
                    }
                )
            }
            next();
        }
    )
}