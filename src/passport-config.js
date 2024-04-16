const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./database/models');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Correo electrónico o contraseña incorrectos' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});