import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { postRegister } from '../actions/login';

jest.mock('axios');

import Register from '../components/Register';
import { renderWithReduxAndRouter } from './baseRenderers';

const route = '/register';

describe('Validation Message UI:', () => {
  it('Validation check pops up if the email is not in correct format', () => {
    renderWithReduxAndRouter(Register, {
      route,
    });
    const usernameInput = screen.getByTestId('username').querySelector('input');
    const emailInput = screen.getByTestId('email').querySelector('input');
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const confirmPasswordInput = screen
      .getByTestId('confirm_password')
      .querySelector('input');
    const registerBtn = screen.getByTestId('register_btn');
    fireEvent.change(usernameInput, {
      target: { value: 'username123' },
    });

    fireEvent.change(emailInput, {
      target: { value: 'testinvalid.com' },
    });

    fireEvent.change(passwordInput, {
      target: { value: 'Testpassword123!' },
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Testpassword123!' },
    });

    fireEvent.click(registerBtn);
    expect(screen.getByText('Email format is not valid!')).toBeInTheDocument();
  });

  it('Validation check pops up if passwords are not same', () => {
    renderWithReduxAndRouter(Register, {
      route,
    });
    const usernameInput = screen.getByTestId('username').querySelector('input');
    const emailInput = screen.getByTestId('email').querySelector('input');
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const confirmPasswordInput = screen
      .getByTestId('confirm_password')
      .querySelector('input');
    const registerBtn = screen.getByTestId('register_btn');

    fireEvent.change(usernameInput, {
      target: { value: 'username123' },
    });

    fireEvent.change(emailInput, {
      target: { value: 'test@gmail.com' },
    });

    fireEvent.change(passwordInput, {
      target: { value: 'Testpassword123!' },
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'TestPassword123!' },
    });

    fireEvent.click(registerBtn);
    expect(screen.getByText('Passwords do not match!')).toBeInTheDocument();
  });

  it('Validation check pops up if the password is not in correct format', () => {
    renderWithReduxAndRouter(Register, {
      route,
    });
    const usernameInput = screen.getByTestId('username').querySelector('input');
    const emailInput = screen.getByTestId('email').querySelector('input');
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const confirmPasswordInput = screen
      .getByTestId('confirm_password')
      .querySelector('input');
    const registerBtn = screen.getByTestId('register_btn');

    fireEvent.change(usernameInput, {
      target: { value: 'username123' },
    });

    fireEvent.change(emailInput, {
      target: { value: 'test@gmail.com' },
    });

    fireEvent.change(passwordInput, {
      target: { value: 'testpassword123!' },
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'testpassword123!' },
    });

    fireEvent.click(registerBtn);
    expect(
      screen.getByText(
        'Password is too short and not valid! It should contain minimum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
      )
    ).toBeInTheDocument();
  });
});

describe('Register Button:', () => {
  it('Should be enabled if all fields are filled', () => {
    renderWithReduxAndRouter(Register, {
      route,
    });
    const usernameInput = screen.getByTestId('username').querySelector('input');
    const emailInput = screen.getByTestId('email').querySelector('input');
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const confirmPasswordInput = screen
      .getByTestId('confirm_password')
      .querySelector('input');
    const registerBtn = screen.getByTestId('register_btn');

    fireEvent.change(usernameInput, {
      target: { value: 'username123' },
    });

    fireEvent.change(emailInput, {
      target: { value: 'test@gmail.com' },
    });

    fireEvent.change(passwordInput, {
      target: { value: 'Testpassword123!' },
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Testpassword123!' },
    });

    expect(registerBtn).toBeEnabled();
  });

  it('Should be disabled if username field is empty', () => {
    renderWithReduxAndRouter(Register, {
      route,
    });
    const usernameInput = screen.getByTestId('username').querySelector('input');
    const emailInput = screen.getByTestId('email').querySelector('input');
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const confirmPasswordInput = screen
      .getByTestId('confirm_password')
      .querySelector('input');
    const registerBtn = screen.getByTestId('register_btn');

    fireEvent.change(usernameInput, {
      target: { value: '' },
    });

    fireEvent.change(emailInput, {
      target: { value: 'test@gmail.com' },
    });

    fireEvent.change(passwordInput, {
      target: { value: 'Testpassword123!' },
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Testpassword123!' },
    });

    expect(registerBtn).toBeDisabled();
  });

  it('Register button should be disabled if the email field is empty', () => {
    renderWithReduxAndRouter(Register, {
      route,
    });
    const usernameInput = screen.getByTestId('username').querySelector('input');
    const emailInput = screen.getByTestId('email').querySelector('input');
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const confirmPasswordInput = screen
      .getByTestId('confirm_password')
      .querySelector('input');
    const registerBtn = screen.getByTestId('register_btn');

    fireEvent.change(usernameInput, {
      target: { value: 'username123' },
    });

    fireEvent.change(emailInput, {
      target: { value: '' },
    });

    fireEvent.change(passwordInput, {
      target: { value: 'Testpassword123!' },
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Testpassword123!' },
    });

    expect(registerBtn).toBeDisabled();
  });
});

describe('Password Eye Icon:', () => {
  it('Clicking password eye icon of the password input should display the password text', () => {
    renderWithReduxAndRouter(Register, {
      route,
    });
    const passwordInput = screen.getByTestId('password').querySelector('input');
    const passwordDisplayHideIcon = screen.getByTestId('hide-display-password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(passwordDisplayHideIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('Clicking password eye icon of the confirm password input should display the password text', () => {
    renderWithReduxAndRouter(Register, {
      route,
    });
    const passwordInput = screen
      .getByTestId('confirm_password')
      .querySelector('input');
    const passwordDisplayHideIcon = screen.getByTestId(
      'hide-display-confirm-password'
    );
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(passwordDisplayHideIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});

describe('Successful Registration', () => {
  it('Should see success message', async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: ['Your email is confirmed!'] },
        status: 200,
      })
    );

    const callback = jest.fn(() => Promise.resolve(true));
    const registration = {
      username: 'username123',
      email: 'test@gmail.com',
      password: 'Testpassword123!',
      confirm_password: 'Testpassword123!',
    };

    const result = postRegister((registration, callback));
    console.log(result);
  });
});
