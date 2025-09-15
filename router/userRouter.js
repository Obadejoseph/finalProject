const { register, getOne } = require('../controller/controller');
const uploads = require ('../middleware/multer')

const router = require('express').Router()

router.post("/create", uploads.single('profilePicture') ,register);
router.get("/getOne/:id", getOne)

// router.get("/product",getProduct)

module.exports = router