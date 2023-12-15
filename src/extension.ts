const baseUrl = document.querySelector('body')?.getAttribute('data-base-url');
(window as any).__webpack_public_path__ = `${baseUrl}\nnbextensions/ipychess`;
export * from './index';
