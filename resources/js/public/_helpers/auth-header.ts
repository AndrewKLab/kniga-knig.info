export function authHeader() {
    let token = localStorage.getItem('token');
    if (token) return { 'Authorization': 'Bearer ' + token };
    else return {};
}
export function authorizationHeader() {
    let token = localStorage.getItem('token');
    if (token) return 'Bearer ' + token ;
}
export function csrf() {
    const csrf = document.querySelector('meta[name="csrf-token"]').content;
    if (csrf) return csrf;
}