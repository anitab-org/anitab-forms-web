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

export function forms() {
    return `${urlBaseFrontend()}forms`
}

export function form(id) {
    return `${urlBaseFrontend()}form/${id}`
}

export function submission() {
    return `${urlBaseFrontend()}submission`
}

export function upload() {
    return `${urlBaseFrontend()}upload`
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

export function urlPatchInfo(id) {
    return `${urlBaseBackend()}/info/${id}/`
}

export function urlGetForm(status) {
    return `${urlBaseBackend()}/form/?status=${status}`
}

export function urlFormId(id) {
    return `${urlBaseBackend()}/form/${id}/` 
}

export function urlPostForm() {
    return `${urlBaseBackend()}/form/`
}

export function urlQuestions(form_id) {
    return `${urlBaseBackend()}/questions/?form_id=${form_id}`
}

export function urlPatchQuestions() {
    return `${urlBaseBackend()}/questions/`
}

export function urlFormsFilled() {
    return `${urlBaseBackend()}/feedback/`
}

export function urlSubmissions(user_name, form_id) {
    if(user_name === undefined && form_id === undefined)
        return `${urlBaseBackend()}/feedback/`
    else if(user_name === undefined)
        return `${urlBaseBackend()}/feedback/?form_id=${form_id}`
    else if(form_id === undefined)
        return `${urlBaseBackend()}/feedback/?user_name=${user_name}`
    else
        return `${urlBaseBackend()}/feedback/?user_name=${user_name}&form_id=${form_id}`
}
