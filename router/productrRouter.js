const { products, deleteOne } = require('../controller/productController')
// const router = require('../middleware/multer')
const uploads = require('../middleware/multer')
const router = require('express').Router();

router.post('/products', uploads.array('productImages'), products)
router.put('/products/:id', uploads.array('productImags'), products)
router.delete('/products/:id',deleteOne)

module.exports = router;