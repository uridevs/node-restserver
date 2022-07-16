const valJWT = require('../middlewares/validate-jwt');
const valFields = require('../middlewares/validate-fields');
const valRole = require('../middlewares/validate-role');

module.exports = {
    ...valJWT,
    ...valFields,
    ...valRole
}