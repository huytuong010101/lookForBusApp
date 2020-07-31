import { User } from "../../database/models/mainModel.js"
import bcrypt from 'bcrypt';
const saltRounds = 10;

class UserController {
    //login
    async login(req, res) {
        const usr = req.body.username;
        const pwd = req.body.password;
        const userCheck = await User.findOne({
            where: {
                username: usr
            }
        })
        if (!userCheck || !bcrypt.compareSync(pwd, userCheck.dataValues.password)) {
            return res.json({
                result: "not OK",
                errors: ["Tên đăng nhập hoặc mật khẩu không chính xác"]
            })
        }
        req.session.user = userCheck.dataValues;
        return res.json({
            result: "OK",
        })

    }
    logout(req, res) {
        delete req.session.user
        return res.redirect("/user/login")
    }
    //render
    renderLogin(req, res) {
        return res.render("user/loginPage");
    }
}
export default UserController