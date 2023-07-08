const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const AdminAuditLog = require('../models/AdminAuditLog');

describe('Admin Audit Log Controller', () => {
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
        await AdminAuditLog.deleteMany();
    });

    describe('GET /admin-audit-logs', () => {
        it('should retrieve admin audit logs', async () => {
            // Create test audit logs
            const testData = [
                { action: 'Action 1', performedBy: 'User 1' },
                { action: 'Action 2', performedBy: 'User 2' },
            ];
            await AdminAuditLog.create(testData);

            // Send GET request to retrieve audit logs
            const response = await request(app).get('/admin-audit-logs');

            // Check the response
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('ok');
            expect(response.body.data.length).toBe(2);
            expect(response.body.data[0].action).toBe(testData[0].action);
            expect(response.body.data[0].performedBy).toBe(testData[0].performedBy);
            expect(response.body.data[1].action).toBe(testData[1].action);
            expect(response.body.data[1].performedBy).toBe(testData[1].performedBy);
        });

        it('should handle error when retrieving admin audit logs fails', async () => {
            // Mock the find method to throw an error
            jest.spyOn(AdminAuditLog, 'find').mockRejectedValue(new Error('Database error'));

            // Send GET request to retrieve audit logs
            const response = await request(app).get('/admin-audit-logs');

            // Check the response
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('error');
            expect(response.body.error).toBe('Database error');
        });
    });

    describe('POST /admin-audit-logs', () => {
        it('should create admin audit log', async () => {
            // Send POST request to create audit log
            const logData = { action: 'Action 1', performedBy: 'User 1' };
            const response = await request(app).post('/admin-audit-logs').send(logData);

            // Check the response
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('ok');
            expect(response.body.data.action).toBe(logData.action);
            expect(response.body.data.performedBy).toBe(logData.performedBy);

            // Check that the audit log is created in the database
            const createdLog = await AdminAuditLog.findOne({});
            expect(createdLog.action).toBe(logData.action);
            expect(createdLog.performedBy).toBe(logData.performedBy);
        });

        it('should handle error when creating admin audit log fails', async () => {
            // Mock the save method to throw an error
            jest.spyOn(AdminAuditLog.prototype, 'save').mockRejectedValue(new Error('Database error'));

            // Send POST request to create audit log
            const logData = { action: 'Action 1', performedBy: 'User 1' };
            const response = await request(app).post('/admin-audit-logs').send(logData);

            // Check the response
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('error');
            expect(response.body.error).toBe('Database error');
        });
    });
});
