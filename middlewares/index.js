const valJWT = require('../middlewares/validate-jwt');
const valFields = require('../middlewares/validate-fields');
const valRole = require('../middlewares/validate-role');
const validateFile = require('../middlewares/validate-file')

module.exports = {
    ...valJWT,
    ...valFields,
    ...valRole,
    ...validateFile
}