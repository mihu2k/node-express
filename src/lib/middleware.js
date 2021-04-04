module.exports = {
    // Authentication
    checkAuth: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('/auth/login');
    },

    // Xác thực rồi thì kh thể quay lại login page
    checkNotAuth: (req, res, next) => {
        if (req.isAuthenticated()) return res.redirect('/');
        next();
    },

    // Check mail login with GG
    checkEmail: (req, res, next) => {
        const isValidEmail = req.user.email.includes('@student.tdtu.edu.vn');
        
        if (!isValidEmail) return req.logout();
        else next();
    },

    // Check user is admin
    isAdmin: (req, res, next) => {
        var isAdmin = req.user.userType === 'admin';
        
        return isAdmin ? next() : res.redirect('/');
    },
};