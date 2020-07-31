//import module
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import _dotenv from 'dotenv'
import session from './config/sessionConfig.js'
import methodOverride from 'method-override'
//import router
import IndexRouter from './app/index/indexRouter.js';
import UserRouter from './app/user/userRouter.js'
import AdminRouter from './app/admin-manager/adminRouter.js'
//init app
const app = express();
const __dirname = path.resolve();
_dotenv.config()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//method override
app.use(methodOverride('X-HTTP-Method-Override'))
//session setup
app.use(session)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//use router
app.use('/', IndexRouter);
app.use('/user', UserRouter);
app.use('/admin', AdminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
