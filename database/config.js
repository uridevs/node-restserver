const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.log(error);
        throw new Error('Error during connection to database');
    }

    console.log('Database online!')

}


module.exports = {
    dbConnection
}