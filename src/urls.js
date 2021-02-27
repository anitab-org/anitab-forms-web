// frontend URLs
export function urlBaseFrontend() {
  return `/`;
}

export function login() {
  return `${urlBaseFrontend()}login`;
}

export function register() {
  return `${urlBaseFrontend()}register`;
}

export function activate() {
  return `${urlBaseFrontend()}:uidb64/:token/`;
}

export function dashboard() {
  return `${urlBaseFrontend()}`;
}

export function forms() {
  return `${urlBaseFrontend()}forms`;
}

export function form(id) {
  return `${urlBaseFrontend()}form/${id}`;
}

export function submission() {
  return `${urlBaseFrontend()}submissions`;
}

export function upload() {
  return `${urlBaseFrontend()}upload`;
}

// backend URLs
export function urlBaseBackend() {
  return `http://localhost:8000/api`;
}

export function urlUser() {
  return `${urlBaseBackend()}/user/`;
}
export function urlLogin() {
  return `${urlBaseBackend()}/token_auth/token/`;
}

export function urlRegister() {
  return `${urlBaseBackend()}/token_auth/register/`;
}

export function urlActivate(uidb64, token) {
  return `${urlBaseBackend()}/token_auth/activate/${uidb64}/${token}`;
}

export function urlInfo() {
  return `${urlBaseBackend()}/info/`;
}

export function urlPatchInfo(id) {
  return `${urlBaseBackend()}/info/${id}/`;
}

export function urlGetForm(status) {
  return `${urlBaseBackend()}/form/?status=${status}`;
}

export function urlFormId(id) {
  return `${urlBaseBackend()}/form/${id}/`;
}

export function urlPostForm() {
  return `${urlBaseBackend()}/form/`;
}

export function urlQuestions(form_id) {
  return `${urlBaseBackend()}/questions/?form_id=${form_id}`;
}

export function urlPatchQuestions() {
  return `${urlBaseBackend()}/questions/`;
}

export function urlZulipStats() {
  return `${urlBaseBackend()}/zulip_stat/`;
}
