![](https://github.com/gani1000/auth-login/actions/workflows/github-actions-demo.yml)

# Authentication-login

  - create an account with JSON Web Token and social login providers
     such as Google and GitHub to get access to your secured data.

    ![Capture](https://github.com/gani1000/auth-login/assets/107857762/742d75c2-c123-470f-8751-b86b465b1336)


# Code walkthrough

  - after setting up your mongoose schema you can start by hashing your password with bcryptjs library.
      `pre(fc)` is a middleware for hashing before submitting to the DB. Within the fnc, you can specify
      `genSalt(num)` as the number of rounds for the algorithm iteration [see this](https://github.com/dcodeIO/bcrypt.js#readme)

        Schema.pre('save', async function() {
            const salt = await bcryptjs.genSalt(10);
            this.password = await bcryptjs.hash(this.password, salt);
        });


  - then, you need to create a token. You can achieve that by using the JWT method `jwt.sign` to assign the info
       from the user instance `object(id, name)`, and specifying the secret key. [see this](https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback) for more info on jwt.
  
        UserSchema.methods.createJWT = function () {
          return jwt.sign({ 
              user: { 
                  id: this._id,
                  user: this.name
          },  process.env.JWT_SECRET})
        }


  - lastly, for comparing the password after making a registry, you can use `comparePassword` from bcryptjs.
        this allows you to encode the saved password in the DB and compare it with the current one. 
   
          Schema.methods.comparePassword = async function (candatespassword) {
              const isMatch = await bcryptjs.compare(candatespassword, this.password);
              return isMatch;
          } 

# Login providers walkthrough
  - In the context of authenticating users based on their social providers, we can utilize the `passport.js` package
      and its plugin strategy to authenticate the middleware in node.js. learn more about [passport.js](https://www.passportjs.org/packages/passport-google-oauth20/).
    
  - To start, you can simply authenticate your Google or any social provider's request by declaring a [strategy](https://www.passportjs.org/concepts/authentication/strategies/)
      that can handle the work for you. You only have to configure an API key from google console in the OAuth section.
    
            const GoogleAuth = new GoogleStrategy(
              {
                  clientID: process.env.GOOGLE_ID, 
                  clientSecret: process.env.GOOGLE_SECRET,
                  callbackURL: process.env.GOOGLE_URL,
                  scope: ['profile']
              },
              async (accessToken, refreshToken, profile, done) => {
                      //Save the user in the DB using your database schema

                      //If the authentication is successful then return the user.
                      return done(null, user);
                  } catch (error) {
                      return done(error);
                  }
              }
        );

- In server.js, initialize and configure a session middleware in Express.js using `app.use(session({})` from express-session.
         This allows you to create a session object for each user and store session data on the server, that can be utilized later.

            app.use(session({
                secret: process.env.GOOGLE_SECRET,
                resave: true,
                saveUninitialized: true,
            }));

- `passport.use(GoogleAuth)` Here we register a Passport strategy for Google authentication.
          And let Passport use the GoogleAuth strategy when authenticating users with Google.

            passport.use(GoogleAuth);

- Then, we need a router to initiate the authentication process. passport in this case, invokes this
          route and redirect the user to the authentication page.

           app.get('/auth/google', passport.authenticate('google'));


# Installation

  - start by cloning the repository into your local environment.

        https://github.com/gani1000/auth-login.git

  - install all the necessary dependencies.

         npm install
  

