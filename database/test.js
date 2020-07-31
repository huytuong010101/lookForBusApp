import { User, Department } from './models/mainModel.js'

const func = async () => {
    const u = await User.create({
        fullname: "Huy Tuong",
        username: "admin",
        password: "admin",
        sex: 0,
    })
    console.log(u)
}
func()