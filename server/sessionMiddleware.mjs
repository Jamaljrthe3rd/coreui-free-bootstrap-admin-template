import session from 'express-session'
import mongoStoreFactory from 'connect-mongo'

export default function sessionMiddleware() {
  const MongoStore = mongoStoreFactory.create

  return session({
    secret: process.env.SESSION_SECRET ?? 'change_this_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore({
      mongoUrl: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1/session'
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    }
  })
}
