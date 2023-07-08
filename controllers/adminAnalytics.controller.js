const AdminAnalytics = require('../models/AdminAnalytics');

async function getAdminAnalytics(req, res) {
    try {
        const adminAnalyticsData = await AdminAnalytics.find();

        res.status(200).json({
            success: true,
            message: 'ok',
            data: adminAnalyticsData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve admin analytics data',
            error: error.message,
        });
    }
}

async function updateAdminAnalytics(req, res) {
    try {
        const { totalVisitors, totalOrders, totalRevenue } = req.body;

        const analyticsCount = await AdminAnalytics.countDocuments();

        if (analyticsCount === 0) {
            const newAnalytics = new AdminAnalytics({
                totalVisitors,
                totalOrders,
                totalRevenue,
            });

            const savedAnalytics = await newAnalytics.save();

            return res.status(200).json({
                success: true,
                message: 'Admin analytics data created successfully',
                data: savedAnalytics,
            });
        }

        const updatedAnalytics = await AdminAnalytics.findOneAndUpdate(
            {},
            {
                $inc: {
                    totalVisitors,
                    totalOrders,
                    totalRevenue,
                },
            },
            { new: true }
        );

        if(!updatedAnalytics) {
            return res.status(500).json({
                success: false,
                message: 'failed to update analytics',
                data: null,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Admin analytics data updated successfully',
            data: updatedAnalytics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update admin analytics data',
            error: error.message,
        });
    }
}

module.exports = {
    getAdminAnalytics,
    updateAdminAnalytics,
};
