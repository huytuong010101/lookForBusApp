class UserMiddleware {
    hasLogin(req, res, next) {
        if (req.session.user) {
            return next();
        }
        return res.redirect("/user/login")
    }
    hasNotLogin(req, res, next) {
        if (!req.session.user) {
            return next();
        }
        return res.redirect("/")
    }
    isAdmin(req, res, next) {
        return req.session.user.role == 2 ? next() : res.redirect("/404");
    }
    isAdminOrManager(req, res, next) {
        return req.session.user.role == 2 || req.session.user.role == 1 ? next() : res.redirect("/404");
    }
    isStaff(req, res, next) {
        return req.session.user.role == 0 ? next() : res.redirect("/404");
    }
}
export default UserMiddleware