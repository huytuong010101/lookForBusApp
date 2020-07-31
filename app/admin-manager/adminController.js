import { Route, RouteStreet, Street } from "../../database/models/mainModel.js"

class adminController {
    constructor() {
        //----------------------------------------------------Streets-----------------------------------------------
    }
    async addNewStreet(req, res) {
        //check if exist
        const name = req.body.name
        const isExist = await Street.findOne({
            where: {
                streetName: name
            }
        })
        if (isExist) {
            return res.json({
                result: "not OK",
                errors: ["Tên đường đã tồn tại"]
            })
        }
        await Street.create({
            streetName: name,
        })
        return res.json({
            result: "OK",
        })
    }

    async getAllStreet(req, res) {
        const streets = await Street.findAll({ include: ["routeStreet"] })
        return res.json({
            result: "OK",
            streets: streets,
        })
    }

    async deteleStreet(req, res) {
        const id = req.body.id
        try {
            await (await Street.findOne({ where: { id: id } })).destroy()
            return res.json({
                result: "OK",
            })
        } catch {
            return res.json({
                result: "not OK",
                errors: ["Lỗi cở sở dử liệu"]
            })
        }
    }

    async renameStreet(req, res) {
        const id = req.body.id
        const name = req.body.name
        try {
            await Street.update({ streetName: name }, {
                where: {
                    id: id,
                }
            });
            return res.json({
                result: "OK",
            })
        } catch {
            return res.json({
                result: "not OK",
                errors: ["Lỗi cơ sở dữ liệu"]
            })
        }

    }

    //----------------------------------------------------Routes--------------------------------------------------
    async addNewRoute(req, res) {
        //check if exist
        const name = req.body.name
        const isExist = await Route.findOne({
            where: {
                routeName: name
            }
        })
        if (isExist) {
            return res.json({
                result: "not OK",
                errors: ["Tên tuyến đã tồn tại"]
            })
        }
        await Route.create({
            routeName: name,
        })
        return res.json({
            result: "OK",
        })
    }

    async getAllRoute(req, res) {
        const routes = await Route.findAll({ include: ["routeStreet"] })
        return res.json({
            result: "OK",
            routes: routes,
        })
    }

    async deteleRoute(req, res) {
        const id = req.body.id
        try {
            await (await Route.findOne({ where: { id: id } })).destroy()
            return res.json({
                result: "OK",
            })
        } catch {
            return res.json({
                result: "not OK",
                errors: ["Lỗi cở sở dử liệu"]
            })
        }
    }

    async renameRoute(req, res) {
        const id = req.body.id
        const name = req.body.name
        try {
            await Route.update({ routeName: name }, {
                where: {
                    id: id,
                }
            });
            return res.json({
                result: "OK",
            })
        } catch {
            return res.json({
                result: "not OK",
                errors: ["Lỗi cơ sở dữ liệu"]
            })
        }

    }
    //--------------------------------------------------Route Detail----------------------------------------------
    async updateDetailRoute(req, res) {
        const data = JSON.parse(Object.keys(req.body)[0])
        try {
            await RouteStreet.destroy({ where: { routeId: data.id } })
            await RouteStreet.bulkCreate(data.list)
            return res.json({
                result: "OK",
            })
        } catch {
            return res.json({
                result: "not OK",
                errors: ["Lỗi cơ sở dữ liệu"]
            })
        }
    }

    async getRouteDetail(req, res) {
        try {
            const data = await RouteStreet.findAll({ where: { routeId: req.params.id }, include: ["route", "street"] })
            return res.json({
                result: "OK",
                data: data,
            })
        } catch {
            return res.json({
                result: "not OK",
                errors: ["Lỗi cơ sở dữ liệu"]
            })
        }
    }
    //___________________________________Render_________________________________
    renderStreets(req, res) {
        return res.render('admin-manager/streets');
    }
    renderRoutes(req, res) {
        return res.render('admin-manager/routes');
    }
    renderRouteDetail(req, res) {
        return res.render('admin-manager/routeDetail');
    }
}
export default adminController