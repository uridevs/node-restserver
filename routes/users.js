const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, usersPatch, usersDelete, usersPost, usersPut } = require('../controllers/users.controller');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const { isRoleValid, emailExists, userByIdExists } = require('../helpers/db-validators');

const router = Router();

router.get('/',  usersGet);

router.put('/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( userByIdExists),
    check('role').custom( isRoleValid ),
    validateFields
], usersPut);

router.post('/',[
    check('name', 'Name field is required').not().isEmpty(),
    check('password', 'Password is required and 6 characters at least').isLength(6),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( emailExists ),
    // check('role', 'Not an allowed role').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('role').custom( isRoleValid ),
    validateFields
], usersPost);

router.delete('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( userByIdExists),
    validateFields
], usersDelete);

router.patch('/',  usersPatch);



module.exports = router;

