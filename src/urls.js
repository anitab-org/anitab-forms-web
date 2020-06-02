// frontend
export function urlBaseFrontend() {
    return `/`
}

export function login() {
    return `${urlBaseFrontend()}login`
}

export function register() {
    return `${urlBaseFrontend()}register`
}

export function info() {
    return `${urlBaseFrontend()}info`
}

// backend
export function urlBaseBackend() {
    return `http://localhost:8000/api`
}

export function urlLogin() {
    return `${urlBaseBackend()}/token_auth/token/`
}

export function urlRegister() {
    return `${urlBaseBackend()}/token_auth/register/`
}

export function urlInfo() {
    return `${urlBaseBackend()}/info/`
}