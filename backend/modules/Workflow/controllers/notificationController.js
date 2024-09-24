import Notification from '../models/Notification.js';

// Create a new Notification
export const createNotification = async (req, res) => {
    try {
        const notificationData = {
            ...req.body,
            user_id: mongoose.Types.ObjectId(req.body.user_id),
            incident_id: mongoose.Types.ObjectId(req.body.incident_id)
        };

        const notification = new Notification(notificationData);
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Notifications
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().populate('user_id').populate('incident_id');
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Notification by ID
export const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id).populate('user_id').populate('incident_id');
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Notification
export const updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Notification
export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
