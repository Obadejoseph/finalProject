const productModel = require('../model/product');
const cloudinary = require('../config/cloudinary');
const fs = require('fs')


exports.products =async (req,res) => {
    try {
        
        const{productName} = req.body;
        const files = req.files;
        let response;
        let listOfProducts = [];
        let product = {}
                console.log(files);
        


        if (files && files.length > 0 ) {
            for (const file of files) {
                response = await cloudinary.uploader.upload(file.path);
                product = {
                    publicId:response.public_id,
                    imageUrl: response.secure_url
                }
                listOfProducts.push(product);
                fs.unlinkSync(file.path)
            }

            
        }
        const products = new productModel({
            productName,
            productImages: listOfProducts
        })
        await products.save()
        res.status(201).json({
            message:`products created successfully`,
            data: products
        })
    } catch (error) {
        res.status(500).json({
            message:`internal server Error`,
            error:error.message
        })
    }
    
}

exports.update = async (req,res) => {
    try {
        const {productName} = req.body;
        const {id} = req.params;
         const products  = await productModel.findById(id);
         const files = req.files;
         let listOfProducts = [];
         let product = {}
         if (!products){
            return res.status(404).json(
                'product not found'
            )
         }
         if (files && files.length > 0) {
            for (const product of products.productImages){
                await cloudinary.uploader.destroy(product.publicId)
            };
            for (const file of files) {
                response = await cloudinary.uploader.upload(file.path);
                product = {
                    imageUrl: response.secure_url,
                    publicId:response.public_id
                };
                listOfProducts.push(product)
                fs.unlinkSync(file.path);
            }
         }

         const data = {
            productName: productName ?? product. productName,
            productImages: listOfProducts
         }
         const update = await productModel.findByIdAndUpdate(products._id, data,{new: true});
         res.status(200).json({
            message:`product updated successfully`,
            data:update
         })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:`internal server error`,
            error:error.message
        })
        
    }
    
}

exports.deleteOne = async (req,res) => {
    try {
        const{id} =req.params;
        const removeOne = await productModel.findByIdAndDelete(id)
        if (!removeOne) {
            return res.status(404).json({
                message:`user with the id not found`
            })
            
        }

        res.status(200).json({
            message:`data deleted successfully`,
            data:removeOne
        })
    } catch (error) {
      res.status(500).json({
        message:`internal server error`,
        error:error.message
      })  
    }
}
