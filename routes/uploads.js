
const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { check } = require('express-validator');
const { loadFile, updateFile, showImg, updateImageCloudinary } = require('../controllers/uploads.controller');
const { allowedCollections } = require('../helpers/db-validators');
const { validateFileUpload } = require('../middlewares');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/:collection/:id',[

], showImg)


router.post('/', validateFileUpload, loadFile)

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'Id should be a mongo ID').isMongoId(),
    check('collection').custom( c => allowedCollections(c , ['users', 'products'])),
    validateFields
], updateImageCloudinary )


module.exports = router;
