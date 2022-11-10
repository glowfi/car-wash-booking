export const isAuth = (type = 'user') => {
    const hasUser = localStorage.getItem('uid');
    if (!hasUser) {
        if (type === 'admin') {
            window.location.href = '/admin/signin';
        } else {
            window.location.href = '/signin';
        }
    }
};
