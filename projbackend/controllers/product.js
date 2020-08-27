const Product = require("../models/product");
const formidable = require("formidable");
const _ =require("lodash");
const fs = require("fs");


//  hitesh used populate with category but im getting errors:(
exports.getProductById = (req, res, next, id) => {
    
    Product.findById(id)
    .exec((err, product)=>{
        if(err)
        {
            return res.status(400).json(
                {
                    error : 'NO products found'                                                
                }
            )
        }
        req.product = product;
        next();
    })
}

exports.createProduct = (req, res)=>
{
    
    let form = new formidable.IncomingForm();
    
    form.keepExtensions =true;

    form.parse(req , (err , feilds, file) =>
    {
        if(err)
        {
            return res.status(400).json({
                error : "Problem with image"
            })
        }

        // destructuring the feilds
        const {price, name , description , category , stock } = feilds

        if(
            !name ||
            !description ||
            !price ||
            !stock ||
            !category
        ){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }


        // todo restrictions on feild
        let product = new Product(feilds);
        
        // handle file here
        if(file.photo)
        {
            if(file.photo.size > 3000000)
            {
                return res.status(400).json({
                    error: ' File size is too big '
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }

        // console.log(product)

        product.save((err, product)=>{
            if(err)
            {
                // console.log(err)  helps to find where the actual error is
                return res.status(400).json({
                    error:"Saving file to db failed"
                })
            }
            res.json(product);
        })


    })

}


exports.getProduct= (req, res)=>{
    req.product.photo = undefined;
    return res.json(req.product);
}


// middleware
exports.photo = (req, res, next)=>{
    if(req.product.photo.data)
    {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

exports.deleteProduct =(req, res)=>{
    let product = req.product;
    product.remove((err, deletedproduct)=>
    {
        if(err){
            return res.status(400).json({
                error:'Failed to delete ', deletedproduct
            })
        }
        res.json({
            message : "Succesfully deleted", deletedproduct
        })
    })
}


exports.updateProduct = (req, res )=>{
    // what can we update in a product?? think!!!!
    // we can definitely change price, stock and photo
    let form = new formidable.IncomingForm();   
    console.log("djedjebfebfhbb")
    
    form.keepExtensions =true;

    form.parse(req , (err , feilds, file) =>
    {
        if(err)
        {
            return res.status(400).json({
                error : "Problrm with image"
            })
        }
        // updation code
        let product = req.product
// lodash has a method extends which takes original product and extendts it 
// with new feilds ie updates existing product
        product = _.extend(product, feilds)
        
        // handle file here
        if(file.photo)
        {
            if(file.photo.size > 3000000)
            {
                return res.status(400).json({
                    error: ' File size is too big '
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type

        }

        // console.log(product)

        product.save((err, product)=>{

            if(err)
            {
                // console.log(err)  helps to find where the actual error is
                 res.status(400).json({
                    error:"Updation of product failed"
                })
            }
            res.json(product);
        })


    })

}

//  product listing 
exports.getAllProducts = (req, res)=>
{
     
    let limit = req.query.limit ? parseInt(req.query.limit) : 8; 
    let sortBy = req.query.sortBy ? req.query.sortBy  : "_id";


    Product.find()
    .sort([[sortBy, "asc"]])
    .populate("category")
    .select("-photo")
    .limit(limit)
    .exec((err, products)=>
    {
        if(err)
        {
            return res.status(400).json({
                error : "No product found"
            })
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories = (req, res) =>{
    Product.distinct("category", {}, (err, category)=>
    {
        if(err)
        {
            return res.status(400).json({
                error : "No Category Found"
            })
        }
        res.json(category)
    })
}

exports.updateStock = (req, res , next ) =>{
    let myOps = req.body.order.products.map(prod =>{
        return {
            updateOne : {
                filter : { _id : prod._id},
                update : {$inc : { stock : -prod.count, sold : +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOps, {} , (err, products) => {

        if(err)
        {
            return res.status(400).json(
                { error : "Bulk Write Failed"}
            )
        }
    })

    next();

}