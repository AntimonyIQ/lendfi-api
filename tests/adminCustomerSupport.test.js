const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const AdminCustomerSupport = require('../models/AdminCustomerSupport');

describe('Admin Customer Support Controller', () => {
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
        await AdminCustomerSupport.deleteMany();
    });

    describe('GET /admin-customer-supports', () => {
        it('should retrieve admin customer supports', async () => {
            // Create test customer supports
            const testData = [
                { name: 'Support 1', email: 'support1@example.com', department: 'Department 1' },
                { name: 'Support 2', email: 'support2@example.com', department: 'Department 2' },
            ];
            await AdminCustomerSupport.create(testData);

            // Send GET request to retrieve customer supports
            const response = await request(app).get('/admin-customer-supports');

            // Check the response
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.length).toBe(2);
            expect(response.body.data[0].name).toBe(testData[0].name);
            expect(response.body.data[0].email).toBe(testData[0].email);
            expect(response.body.data[0].department).toBe(testData[0].department);
            expect(response.body.data[1].name).toBe(testData[1].name);
            expect(response.body.data[1].email).toBe(testData[1].email);
            expect(response.body.data[1].department).toBe(testData[1].department);
        });

        it('should handle error when retrieving admin customer supports fails', async () => {
            // Mock the find method to throw an error
            jest.spyOn(AdminCustomerSupport, 'find').mockRejectedValue(new Error('Database error'));

            // Send GET request to retrieve customer supports
            const response = await request(app).get('/admin-customer-supports');

            // Check the response
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Database error');
        });
    });

    describe('POST /admin-customer-supports', () => {
        it('should create admin customer support', async () => {
            // Send POST request to create customer support
            const supportData = { name: 'Support 1', email: 'support1@example.com', department: 'Department 1' };
            const response = await request(app).post('/admin-customer-supports').send(supportData);

            // Check the response
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe(supportData.name);
            expect(response.body.data.email).toBe(supportData.email);
            expect(response.body.data.department).toBe(supportData.department);

            // Check that the customer support is created in the database
            const createdSupport = await AdminCustomerSupport.findOne({});
            expect(createdSupport.name).toBe(supportData.name);
            expect(createdSupport.email).toBe(supportData.email);
            expect(createdSupport.department).toBe(supportData.department);
        });

        it('should handle error when creating admin customer support fails', async () => {
            // Mock the save method to throw an error
            jest.spyOn(AdminCustomerSupport.prototype, 'save').mockRejectedValue(new Error('Database error'));

            // Send POST request to create customer support
            const supportData = { name: 'Support 1', email: 'support1@example.com', department: 'Department 1' };
            const response = await request(app).post('/admin-customer-supports').send(supportData);

            // Check the response
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Database error');
        });
    });

    describe('GET /admin-customer-supports/:id', () => {
        it('should retrieve admin customer support by ID', async () => {
            // Create a test customer support
            const supportData = { name: 'Support 1', email: 'support1@example.com', department: 'Department 1' };
            const createdSupport = await AdminCustomerSupport.create(supportData);

            // Send GET request to retrieve customer support by ID
            const response = await request(app).get(`/admin-customer-supports/${createdSupport._id}`);

            // Check the response
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe(supportData.name);
            expect(response.body.data.email).toBe(supportData.email);
            expect(response.body.data.department).toBe(supportData.department);
        });

        it('should handle error when retrieving admin customer support by ID fails', async () => {
            // Send GET request to retrieve customer support by ID
            const response = await request(app).get('/admin-customer-supports/nonexistent-id');

            // Check the response
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Admin customer support not found');
        });
    });
});
