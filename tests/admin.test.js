const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();


// Connect to the test database before running the tests
beforeAll(async () => {
    jest.setTimeout(10000);
    await mongoose.connect(process.env.MONGODB_TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Clear the test database after running the tests
afterAll(async () => {
    await Admin.deleteMany();
    await mongoose.connection.close();
});

describe('Admin Controller', () => {
    let adminId;

    beforeEach(async () => {
        // Create a test admin before each test
        const admin = new Admin({
            username: 'admin1',
            email: 'admin1@example.com',
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '1234567890',
        });
        const savedAdmin = await admin.save();
        adminId = savedAdmin._id;
    });

    afterEach(async () => {
        // Delete the test admin after each test
        await Admin.findByIdAndDelete(adminId);
    });

    describe('createAdmin', () => {
        it('should create a new admin', async () => {
            const response = await request(app)
                .post('/admins')
                .send({
                    username: 'admin2',
                    email: 'admin2@example.com',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    phoneNumber: '9876543210',
                })
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Admin created successfully');
            expect(response.body.admin.username).toBe('admin2');
        });

        it('should return an error if admin with the same username or email already exists', async () => {
            const response = await request(app)
                .post('/admins')
                .send({
                    username: 'admin1',
                    email: 'admin1@example.com',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    phoneNumber: '9876543210',
                })
                .expect(409);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Admin with the same username or email already exists');
            expect(response.body.data.username).toBe('admin1');
        });
    });

    describe('getAllAdmins', () => {
        it('should return all admins', async () => {
            const response = await request(app).get('/admins').expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Admins retrieved successfully');
            expect(response.body.data.length).toBe(1);
            expect(response.body.data[0].username).toBe('admin1');
        });
    });

    describe('getAdmin', () => {
        it('should return the specified admin', async () => {
            const response = await request(app).get(`/admins/${adminId}`).expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Admin retrieved successfully');
            expect(response.body.data.username).toBe('admin1');
        });

        it('should return an error if admin not found', async () => {
            const nonExistentAdminId = '6098b8e76c731e0d24a3e3db';
            const response = await request(app).get(`/admins/${nonExistentAdminId}`).expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Admin not found');
            expect(response.body.admin).toBeNull();
        });
    });

    describe('updateAdmin', () => {
        it('should update the specified admin', async () => {
            const response = await request(app)
                .put(`/admins/${adminId}`)
                .send({ firstName: 'Updated', lastName: 'Admin' })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Admin updated successfully');
            expect(response.body.admin.firstName).toBe('Updated');
            expect(response.body.admin.lastName).toBe('Admin');
        });

        it('should return an error if admin not found', async () => {
            const nonExistentAdminId = '6098b8e76c731e0d24a3e3db';
            const response = await request(app)
                .put(`/admins/${nonExistentAdminId}`)
                .send({ firstName: 'Updated', lastName: 'Admin' })
                .expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Admin not found');
            expect(response.body.admin).toBeNull();
        });
    });

    describe('deleteAdmin', () => {
        it('should delete the specified admin', async () => {
            const response = await request(app).delete(`/admins/${adminId}`).expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Admin deleted successfully');
            expect(response.body.admin._id).toBe(adminId.toString());

            const deletedAdmin = await Admin.findById(adminId);
            expect(deletedAdmin).toBeNull();
        });

        it('should return an error if admin not found', async () => {
            const nonExistentAdminId = '6098b8e76c731e0d24a3e3db';
            const response = await request(app).delete(`/admins/${nonExistentAdminId}`).expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Admin not found');
            expect(response.body.admin).toBeNull();
        });
    });

    describe('activateAdmin', () => {
        it('should activate the specified admin', async () => {
            const response = await request(app).put(`/admins/${adminId}/activate`).expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Admin activated successfully');
            expect(response.body.data.isActive).toBe(true);

            const activatedAdmin = await Admin.findById(adminId);
            expect(activatedAdmin.isActive).toBe(true);
        });

        it('should return an error if admin not found', async () => {
            const nonExistentAdminId = '6098b8e76c731e0d24a3e3db';
            const response = await request(app).put(`/admins/${nonExistentAdminId}/activate`).expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Admin not found');
            expect(response.body.data).toBeNull();
        });
    });

    describe('deactivateAdmin', () => {
        it('should deactivate the specified admin', async () => {
            const response = await request(app).put(`/admins/${adminId}/deactivate`).expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Admin deactivated successfully');
            expect(response.body.data.isActive).toBe(false);

            const deactivatedAdmin = await Admin.findById(adminId);
            expect(deactivatedAdmin.isActive).toBe(false);
        });

        it('should return an error if admin not found', async () => {
            const nonExistentAdminId = '6098b8e76c731e0d24a3e3db';
            const response = await request(app).put(`/admins/${nonExistentAdminId}/deactivate`).expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Admin not found');
            expect(response.body.data).toBeNull();
        });
    });
});
