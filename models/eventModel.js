const mongoose = require('mongoose')


const eventSchema = new mongoose.Schema({
    event_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    dateFrom: {
        type: Date,
        required: true 
    },
    dateTo: {
        type: Date
    },
    timeFrom: {
        type: String, 
        required: true
    },
    timeTo: {
        type: String, 
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        trim: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    officialWebsite: {
        type: String,
    },
    images:{
        type: Object,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Events", eventSchema)