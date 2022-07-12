const { Router } = require('express');
const { usersGet, usersPatch, usersDelete, usersPost, usersPut } = require('../controllers/user.controller');

const router = Router();

router.get('/',  usersGet);

router.put('/:id',  usersPut);

router.post('/',  usersPost);

router.delete('/',  usersDelete);

router.patch('/',  usersPatch);



module.exports = router;

