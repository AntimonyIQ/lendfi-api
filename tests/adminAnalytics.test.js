const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const AdminAnalytics = require('../models/AdminAnalytics');

describe('Admin Analytics Controller', () => {
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
        await AdminAnalytics.deleteMany();
    });

    describe('GET /admin-analytics', () => {
        it('should retrieve admin analytics data', async () => {
            // Create a test analytics data
            const testData = {
                totalVisitors: 100,
                totalOrders: 50,
                totalRevenue: 1000,
            };
            await AdminAnalytics.create(testData);

            // Send GET request to retrieve analytics data
            const response = await request(app).get('/admin-analytics');

            // Check the response
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('ok');
            expect(response.body.data.length).toBe(1);
            expect(response.body.data[0].totalVisitors).toBe(testData.totalVisitors);
            expect(response.body.data[0].totalOrders).toBe(testData.totalOrders);
            expect(response.body.data[0].totalRevenue).toBe(testData.totalRevenue);
        });

        it('should handle error when retrieving admin analytics data fails', async () => {
            // Mock the find method to throw an error
            jest.spyOn(AdminAnalytics, 'find').mockRejectedValue(new Error('Database error'));

            // Send GET request to retrieve analytics data
            const response = await request(app).get('/admin-analytics');

            // Check the response
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Failed to retrieve admin analytics data');
            expect(response.body.error).toBe('Database error');
        });
    });

    describe('PUT /admin-analytics', () => {
        it('should update admin analytics data', async () => {
            // Create a test analytics data
            const testData = {
                totalVisitors: 100,
                totalOrders: 50,
                totalRevenue: 1000,
            };
            await AdminAnalytics.create(testData);

            // Send PUT request to update analytics data
            const updatedData = {
                totalVisitors: 50,
                totalOrders: 25,
                totalRevenue: 500,
            };
            const response = await request(app).put('/admin-analytics').send(updatedData);

            // Check the response
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Admin analytics data updated successfully');
            expect(response.body.data.totalVisitors).toBe(updatedData.totalVisitors);
            expect(response.body.data.totalOrders).toBe(updatedData.totalOrders);
            expect(response.body.data.totalRevenue).toBe(updatedData.totalRevenue);

            // Check that the analytics data is updated in the database
            const updatedAnalytics = await AdminAnalytics.findOne({});
            expect(updatedAnalytics.totalVisitors).toBe(updatedData.totalVisitors);
            expect(updatedAnalytics.totalOrders).toBe(updatedData.totalOrders);
            expect(updatedAnalytics.totalRevenue).toBe(updatedData.totalRevenue);
        });

        it('should create admin analytics data if it does not exist', async () => {
            // Send PUT request to update analytics data
            const updatedData = {
                totalVisitors: 50,
                totalOrders: 25,
                totalRevenue: 500,
            };
            const response = await request(app).put('/admin-analytics').send(updatedData);

            // Check the response
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Admin analytics data created successfully');
            expect(response.body.data.totalVisitors).toBe(updatedData.totalVisitors);
            expect(response.body.data.totalOrders).toBe(updatedData.totalOrders);
            expect(response.body.data.totalRevenue).toBe(updatedData.totalRevenue);

            // Check that the analytics data is created in the database
            const createdAnalytics = await AdminAnalytics.findOne({});
            expect(createdAnalytics.totalVisitors).toBe(updatedData.totalVisitors);
            expect(createdAnalytics.totalOrders).toBe(updatedData.totalOrders);
            expect(createdAnalytics.totalRevenue).toBe(updatedData.totalRevenue);
        });

        it('should handle error when updating admin analytics data fails', async () => {
            // Mock the findOneAndUpdate method to throw an error
            jest.spyOn(AdminAnalytics, 'findOneAndUpdate').mockRejectedValue(new Error('Database error'));

            // Send PUT request to update analytics data
            const updatedData = {
                totalVisitors: 50,
                totalOrders: 25,
                totalRevenue: 500,
            };
            const response = await request(app).put('/admin-analytics').send(updatedData);

            // Check the response
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Failed to update admin analytics data');
            expect(response.body.error).toBe('Database error');
        });
    });
});
