import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Users
    incident_id: { type: Schema.Types.ObjectId, ref: 'Incident', required: true }, // Reference to Incidents
    notification_type: { type: String, required: true }, // Notification type (e.g., "Incident Assignment")
    message: { type: String, required: true }, // Notification message
    sent_date: { type: Date, default: Date.now }, // Date the notification was sent
    viewed_status: { type: String, enum: ['Unread', 'Viewed'], default: 'Unread' }, // Notification viewed status
    cleared_date: { type: Date } // Date the notification was cleared
});

export default mongoose.model('Notification', notificationSchema);


