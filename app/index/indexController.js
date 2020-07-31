import { Route, RouteStreet, Street } from "../../database/models/mainModel.js"
import pkg from 'sequelize';
const { Op } = pkg;

class IndexController {
    constructor() {

    }

    async search(req, res) {
        const start = req.query.start
        const end = req.query.end
        const now = new Date()
        const time = now.getHours() + ":" + now.getMinutes()
        const data = await Street.findOne({
            where: { streetName: start }, include: [{
                association: "routeStreet",
                where: {
                    time: {
                        [Op.gt]: time,
                    }
                }
            }]
        })
        const endId = await Street.findOne({ where: { streetName: end } })
        if (!data || !endId) {
            return res.json({
                result: "not OK",
                errors: ["Không tìm được tuyến xe phù hợp"]
            })
        }
        const finnalData = []
        const allPromise = data.dataValues.routeStreet.map(async (item, idx) => {
            const isExist = await RouteStreet.findOne({
                where: {
                    routeId: item.routeId,
                    time: {
                        [Op.gt]: item.time,
                    },
                    streetId: endId.dataValues.id,
                }
            })
            if (isExist) finnalData.push(isExist.dataValues.routeId)
        })
        await Promise.all(allPromise);
        console.log(finnalData)
        const answer = await Route.findAll({ where: { id: { [Op.in]: finnalData } }, include: ["routeStreet"] })
        return res.json({
            result: "OK",
            data: answer,
        })
    }

    renderHome(req, res) {
        return res.render("index");
    }
}
export default IndexController