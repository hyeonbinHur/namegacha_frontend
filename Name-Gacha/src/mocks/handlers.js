// src/mocks/handlers.js
import { http } from 'msw';

export const handlers = [
    http.get('*', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ message: 'Hello, world!' }));
    }),
];
