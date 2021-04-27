import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Activate from '../components/Activate';
import { createServer } from 'miragejs';
import { renderWithReduxAndRouter } from './baseRenderers';
import { activate, urlActivate } from '../urls';

let server;

beforeEach(() => {
  server = createServer();
});

afterEach(() => {
  server.shutdown();
  cleanup();
});

const fakeURL = '/testid/testtoken';
const frontendActivateURL = activate();
const backendActivateURL = urlActivate('testid', 'testtoken');

it('Activated Email Successfully', async () => {
  server.get(backendActivateURL, () => {
    return {
      data: ['Your email is confirmed!'],
      status: 200,
      statusText: 'OK',
    };
  });
  const { getByTestId } = renderWithReduxAndRouter(Activate, {
    path: frontendActivateURL,
    route: fakeURL,
  });
  expect(getByTestId('ActivateHeader')).toHaveTextContent(
    'Redirecting to Login Page in 5 seconds.'
  );
});
