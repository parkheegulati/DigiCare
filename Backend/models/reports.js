const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    url: {
        type : String,
        required : true
    }
},{ timestamps: true })

module.exports = mongoose.model('Reports', reportSchema);