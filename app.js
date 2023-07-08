const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ip = require('./ip');
const jwt = require('jsonwebtoken');
const usersRouter = require('./routes/users.route');
const wishlistRouter = require('./routes/wishlist.route');
const adminRouter = require('./routes/admin.route');
const adminAnalyticsRoutes = require('./routes/adminAnalytics.route');
const adminAuditLogRoutes = require('./routes/adminAuditLog.route');
const adminCustomerSupportRoutes = require('./routes/adminCustomerSupport.route');
const adminNotificationsRoutes = require('./routes/adminNotifications.route');
const adminOrderManagement = require('./routes/adminOrderManagement.route');
const adminPartnerManagementRoutes = require('./routes/adminPartnerManagement.route');
const adminReportRoutes = require('./routes/adminReport.route');
const adminSettingsRoutes = require('./routes/adminSettings.route');
const notification = require('./routes/notification.routes');
const review = require('./routes/review.routes');
const shared = require('./routes/shared.routes');
const order = require('./routes/order.routes');
const transactionRoutes = require('./routes/transaction.routes');
const userSettings = require('./routes/userSettings.routes');
const policy = require('./routes/policy.routes');
const searchRoutes = require('./routes/search.routes');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ignoreUrl = [
    '/',
    '/auth/start',
    '/auth/generate_username',
    '/auth/decode_token',
    '/auth/verify_token',
    '/auth/send_sms',
    '/auth/verify_sms',
    '/wix/install',
    '/users/all',
    '/users/:id',
    '/wishlist',
    '/wishlist/*',
    '/admin',
    '/admin/*',
];

app.use(async (req, res, next) => {
    const url = req.path;
    console.log(url);
    if (ignoreUrl.includes(url)) {
        return next();
    }

    return next();
});

app.get('/', function (req, res) {
    res.json({
        status: 200,
        message: 'LendFi API',
    });
});
app.use('/users', usersRouter);
app.use('/wishlist', wishlistRouter);
app.use('/admin', adminRouter);
app.use('/admin-analytics', adminAnalyticsRoutes);
app.use('/admin-auditlogs', adminAuditLogRoutes);
app.use('/admin-customersupport', adminCustomerSupportRoutes);
app.use('/admin-notifications', adminNotificationsRoutes);
app.use('/admin-ordermanagement', adminOrderManagement);
app.use('/admin-partnermanagement', adminPartnerManagementRoutes);
app.use('/admin-reports', adminReportRoutes);
app.use('/admin-settings', adminSettingsRoutes);
app.use('/notification', notification);
app.use('/review', review);
app.use('/shared', shared);
app.use('/order', order);
app.use('/transactions', transactionRoutes);
app.use('/settings', userSettings);
app.use('/policy', policy);
app.use('/search', searchRoutes);


module.exports = app;
