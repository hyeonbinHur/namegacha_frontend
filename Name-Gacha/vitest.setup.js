import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/server';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';

const handleError = (error) => {
    if (error.message.includes('modal.current.showModal is not a function')) {
        error.preventDefault();
    }
};
beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    const container = document.createElement('div');
    container.setAttribute('id', 'root');
    document.body.appendChild(container);
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);

    const dialog = document.createElement('dialog');
    dialogPolyfill.registerDialog(dialog);
    window.addEventListener('error', handleError);
});
afterEach(() => server.resetHandlers());
afterAll(() => {
    server.close();
    window.removeEventListener('error', handleError);
    // 테스트 후 모달 요소 제거
    const modalRoot = document.getElementById('modal');
    if (modalRoot) {
        document.body.removeChild(modalRoot);
    }

    const container = document.getElementById('root');
    if (container) {
        document.body.removeChild(container);
    }
});
