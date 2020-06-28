// frontend URLs
export function urlBaseFrontend() {
    return `/`
}

export function login() {
    return `${urlBaseFrontend()}login`
}

export function register() {
    return `${urlBaseFrontend()}register`
}

export function dashboard() {
    return `${urlBaseFrontend()}`
}

export function form() {
    return `${urlBaseFrontend()}form`
}

export function submission() {
    return `${urlBaseFrontend()}submission`
}

// backend URLs
export function urlBaseBackend() {
    return `http://localhost:8000/api`
}

export function urlUser() {
    return `${urlBaseBackend()}/user/`
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