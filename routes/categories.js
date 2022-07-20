 const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createCategory, 
    getCategories, 
    getCategory, 
    categoryPut, 
    categoryDelete} = require('../controllers/categories.controller');
const { categoryExists } = require('../helpers/db-validators');
const { validateJWT,validateFields, isAdminRole } = require('../middlewares');

const router = Router();

// Get all categories (public)
router.get('/', getCategories)

// Get category by ID (public)

router.get('/:id',[
    check('id', 'ID is not a valid Mongo id').isMongoId(),
    check('id').custom(categoryExists),
    validateFields
], getCategory)

// Create category (private) - Anyone with a valid token
router.post('/',[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory)

// Update (private) - Anyone with a valid token
router.put('/:id',[
    validateJWT,
    check('name', 'Name to modify required').not().isEmpty(),
    check('id').custom( categoryExists ),
    validateFields
], categoryPut)

// Delete category (private) - Only Admin
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'ID is not a valid Mongo id').isMongoId(),
    check('id').custom( categoryExists ),
    validateFields
], categoryDelete)
module.exports = router;