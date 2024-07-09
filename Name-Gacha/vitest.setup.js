import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/server.js';

console.log('Setting up MSW server...');
beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    console.log('MSW server started');
});
afterEach(() => {
    server.resetHandlers();
    console.log('MSW server handlers reset');
});
afterAll(() => {
    server.close();
    console.log('MSW server closed');
});
