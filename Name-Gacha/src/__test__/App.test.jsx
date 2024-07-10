import { describe, it, expect } from 'vitest';
import { signInUser } from '../utils/api/aws/authRoutes';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('signInUser', () => {
    it('should handle successful login and fetch user data', async () => {
        const mock = new MockAdapter(axios);
        mock.onPost(
            'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/auth'
        ).reply(200, {
            uuid: '10',
        });
        mock.onGet(
            'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/auth?uuid=10'
        ).reply(200, {
            userId: 'test7',
            createdAt: '2023-07-10',
        });
        const response = await signInUser('test7', 'test123');
        expect(response.status).toBe(200);
        expect(response.userObject).toEqual({
            uuid: '10',
            userId: 'test7',
            createdAt: '2023-07-10',
        });
    });
    it('should handle incorrect username', async () => {
        const mock = new MockAdapter(axios);
        mock.onPost(
            'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/auth'
        ).reply(404);
        const response = await signInUser('wrongUser', 'test123');
        expect(response.status).toBe(404);
        expect(response.userObject).toBeNull();
    });
    it('should handle incorrect password', async () => {
        const mock = new MockAdapter(axios);
        mock.onPost(
            'https://gh9sfgcnf7.execute-api.us-east-1.amazonaws.com/ng-apit-stage/namegacha/auth'
        ).reply(401);
        const response = await signInUser('test7', 'wrongPassword');
        expect(response.status).toBe(401);
        expect(response.userObject).toBeNull();
    });
});
