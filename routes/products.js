const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProducts, productDelete, getProduct, updateProduct } = require('../controllers/products.controller');
const { productExists, categoryExists } = require('../helpers/db-validators');
const { validateJWT,validateFields, isAdminRole } = require('../middlewares');

const router = Router();

// Get all categories (public)
router.get('/', getProducts)

router.get('/:id',[
    check('id', 'ID is not a valid Mongo id'),
    check('id').custom( productExists ),
    validateFields
], getProduct)

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category ID is not a valid MONGO id').isMongoId(),
    check('category').custom( categoryExists ),
    validateFields
], createProduct)

router.put('/:id',[
    validateJWT,
    check('id', 'ID is not a valid Mongo id').isMongoId(),
    check('id').custom( productExists ),
    validateFields
], updateProduct)

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID is not a valid Mongo id').isMongoId(),
    check('id').custom( productExists ),
    validateFields
],
productDelete)

module.exports = router;