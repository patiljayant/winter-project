const express = require('express'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      app = express(),
      keys = require('./dbConfig/keys/keys.js'),
      port = process.env.PORT || 5000,
      User = require('./dbConfig/models/user.js')
      apiRoutes = require('./routes/api/apiRoutes.js');      

app.use(require('express-session')({
	secret:"you are now logged in",
	resave:false,
    saveUninitialized:false
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect(keys.uri, { useNewUrlParser: true }, { useUnifiedTopology: true })
        .then(() => console.log('mongoDB connnected'))
        .catch((err) => console.log('error occured ' + err));

app.use('/api/apiRoutes',apiRoutes);

app.listen(port, () => {
    console.log('Server started on ' + port);
});