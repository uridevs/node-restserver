const { v4: uuidv4 } = require('uuid');
const path = require('path')

const uploadFile = ( files, allowedExt = ['png','jpg', 'jpeg', 'gif'], folder='' ) => {

    return new Promise( (resolve, reject) => {
        
        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[ cutName.length -1]

     // Validate extension

        if (!allowedExt.includes(extension.toLowerCase())){
            return reject(`Extension ${extension} is not allowed - Please try with another document(${allowedExt})`)
        }

        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname,'../uploads/', folder, nameTemp);

        file.mv(uploadPath, function(err) {
            if (err) {
                reject(err);
            }
            resolve(nameTemp)
        });
    })
    

}

module.exports = {
    uploadFile
}