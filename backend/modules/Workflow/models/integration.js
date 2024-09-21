// models/integration.js
const mongoose = require('mongoose');

const IntegrationSchema = new mongoose.Schema({
    integration_type: {
        type: String,
        required: true
    },
    api_endpoint: {
        type: String,
        required: true
    },
    api_token: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Inactive'
    },
    last_sync_date: {
        type: Date,
        default: Date.now
    }
},{collection:"Integration"});

module.exports = mongoose.model('Integration', IntegrationSchema);