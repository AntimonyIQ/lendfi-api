const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const AdminNotifications = require('../models/AdminNotifications');

describe('Admin Notifications Controller', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await AdminNotifications.deleteMany();
    });

    describe('GET /admin-notifications', () => {
        it('should retrieve admin notifications', async () => {
            // Create test notifications
            const testData = [
                { title: 'Notification 1', message: 'Message 1', type: 'info', recipient: 'user1@example.com' },
                { title: 'Notification 2', message: 'Message 2', type: 'warning', recipient: 'user2@example.com' },
            ];
            await AdminNotifications.create(testData);

            // Send GET request to retrieve notifications
            const response = await request(app).get('/admin-notifications');

            // Check the response
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.length).toBe(2);
            expect(response.body.data[0].title).toBe(testData[0].title);
            expect(response.body.data[0].message).toBe(testData[0].message);
            expect(response.body.data[0].type).toBe(testData[0].type);
            expect(response.body.data[0].recipient).toBe(testData[0].recipient);
            expect(response.body.data[1].title).toBe(testData[1].title);
            expect(response.body.data[1].message).toBe(testData[1].message);
            expect(response.body.data[1].type).toBe(testData[1].type);
            expect(response.body.data[1].recipient).toBe(testData[1].recipient);
        });

        it('should handle error when retrieving admin notifications fails', async () => {
            // Mock the find method to throw an error
            jest.spyOn(AdminNotifications, 'find').mockRejectedValue(new Error('Database error'));

            // Send GET request to retrieve notifications
            const response = await request(app).get('/admin-notifications');

            // Check the response
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Database error');
        });
    });

    describe('POST /admin-notifications', () => {
        it('should create admin notification', async () => {
            // Send POST request to create notification
            const notificationData = {
                title: 'Notification 1',
                message: 'Message 1',
                type: 'info',
                recipient: 'user1@example.com',
                metadata: { key: 'value' },
            };
            const response = await request(app).post('/admin-notifications').send(notificationData);

            // Check the response
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.title).toBe(notificationData.title);
            expect(response.body.data.message).toBe(notificationData.message);
            expect(response.body.data.type).toBe(notificationData.type);
            expect(response.body.data.recipient).toBe(notificationData.recipient);
            expect(response.body.data.metadata).toEqual(notificationData.metadata);

            // Check that the notification is created in the database
            const createdNotification = await AdminNotifications.findOne({ title: notificationData.title });
            expect(createdNotification).not.toBeNull();
        });

        it('should handle error when creating admin notification fails', async () => {
            // Mock the save method to throw an error
            jest.spyOn(AdminNotifications.prototype, 'save').mockRejectedValue(new Error('Database error'));

            // Send POST request to create notification
            const notificationData = {
                title: 'Notification 1',
                message: 'Message 1',
                type: 'info',
                recipient: 'user1@example.com',
                metadata: { key: 'value' },
            };
            const response = await request(app).post('/admin-notifications').send(notificationData);

            // Check the response
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Database error');
        });
    });

    describe('GET /admin-notifications/:id', () => {
        it('should retrieve admin notification by ID', async () => {
            // Create a test notification
            const notificationData = {
                title: 'Notification 1',
                message: 'Message 1',
                type: 'info',
                recipient: 'user1@example.com',
                metadata: { key: 'value' },
            };
            const createdNotification = await AdminNotifications.create(notificationData);

            // Send GET request to retrieve notification by ID
            const response = await request(app).get(`/admin-notifications/${createdNotification._id}`);

            // Check the response
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.title).toBe(notificationData.title);
            expect(response.body.data.message).toBe(notificationData.message);
            expect(response.body.data.type).toBe(notificationData.type);
            expect(response.body.data.recipient).toBe(notificationData.recipient);
            expect(response.body.data.metadata).toEqual(notificationData.metadata);
        });

        it('should handle error when retrieving admin notification by ID fails', async () => {
            // Send GET request to retrieve notification by ID
            const response = await request(app).get('/admin-notifications/nonexistent-id');

            // Check the response
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Admin notification not found');
        });
    });

    describe('PATCH /admin-notifications/:id', () => {
        it('should update admin notification', async () => {
            // Create a test notification
            const notificationData = {
                title: 'Notification 1',
                message: 'Message 1',
                type: 'info',
                recipient: 'user1@example.com',
                metadata: { key: 'value' },
            };
            const createdNotification = await AdminNotifications.create(notificationData);

            // Send PATCH request to update notification
            const updateData = { isRead: true };
            const response = await request(app).patch(`/admin-notifications/${createdNotification._id}`).send(updateData);

            // Check the response
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.isRead).toBe(true);

            // Check that the notification is updated in the database
            const updatedNotification = await AdminNotifications.findById(createdNotification._id);
            expect(updatedNotification.isRead).toBe(true);
        });

        it('should handle error when updating admin notification fails', async () => {
            // Mock the findById method to throw an error
            jest.spyOn(AdminNotifications, 'findById').mockRejectedValue(new Error('Database error'));

            // Send PATCH request to update notification
            const updateData = { isRead: true };
            const response = await request(app).patch('/admin-notifications/nonexistent-id').send(updateData);

            // Check the response
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Admin notification not found');
        });
    });
});
