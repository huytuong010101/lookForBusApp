import session from 'express-session';
import dotenv from 'dotenv'
dotenv.config()
import _MySQLStore from 'express-mysql-session';
const MySQLStore = _MySQLStore(session)

const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const sessionStore = new MySQLStore(options);

export default session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
})