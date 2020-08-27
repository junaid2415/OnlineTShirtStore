const Category = require('../models/category')

exports.getCategoryById = (req, res ,next ,id )=>{
    Category.findById(id).exec((err, cate)=>
    {
        if(err)
        {
            return res.status(400).json({
                error: "Category not found"
            })
        }
        req.Category = cate;
        next();
    })

}


exports.createCategory= (req, res )=>{
    const category = new Category(req.body);
    category.save((err, category) =>{
        if(err)
        {
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        }
        res.json({category});
    })
}


exports.getCategory = (req, res)=>{
    return res.json(req.Category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, items)=>
    {
        if(err)
        {
            return res.status(400).json({
                error: "No Cateory found"
            })
        }
        res.json(items);
    })
};


exports.updateCategory =(req, res)=>{
    const category = req.Category;
    category.name = req.body.name;

    category.save((err, updatedcategory)=>{
        if(err)
        {
            console.log(err)
            return res.status(400).json({
                err : 'Failed to update category'
            })
        }
        res.json(updatedcategory);

    })
}


exports.removeCategory =(req, res)=>{
    const category =req.Category;

    category.remove((err, cate)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete this category"
            })
        }
        res.json({
            Message : cate.name + " successfullly removed"
        })
    })

}