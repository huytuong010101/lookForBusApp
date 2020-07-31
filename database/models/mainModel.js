import database from '../connection.js'
import _sequelize from 'sequelize'
const { Sequelize, DataTypes } = _sequelize
//User model
const User = database.define('user', {
    // Model attributes are defined here
    uid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);

const Street = database.define('street', {
    // Model attributes are defined here
    streetName: {
        type: DataTypes.STRING,
    },
},
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);
const Route = database.define('route', {
    // Model attributes are defined here
    routeName: {
        type: DataTypes.STRING,
    },
},
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);
const RouteStreet = database.define('routestreet', {
    // Model attributes are defined here
    no: {
        type: DataTypes.INTEGER,
    },
    time: {
        type: DataTypes.TIME,
    },
    price: {
        type: DataTypes.INTEGER,
    }
},
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
);

Route.hasMany(RouteStreet, { as: "routeStreet" });
RouteStreet.belongsTo(Route, {
    foreignKey: "routeId",
    as: "route",
});

Street.hasMany(RouteStreet, { as: "routeStreet" });
RouteStreet.belongsTo(Street, {
    foreignKey: "streetId",
    as: "street",
});


//Create table
/*
User.sync({ alter: true })
Street.sync({ alter: true })
Route.sync({ alter: true })
RouteStreet.sync({ alter: true })
User.create({
    username: "iamadmin",
    password: "$2b$10$YjlsRfcIOr/jNoQ.5pp.Vu302UPQsQFFvmnJsQRljTe57to5mdF2."
})
*/
export { User, Street, RouteStreet, Route }