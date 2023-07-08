# Authentication-login

  - create an account with JSON Web Token and social login providers
     such as Google and GitHub to get access to your secured data.

    ![Capture](https://github.com/gani1000/auth-login/assets/107857762/ab9c5df0-4b6e-4d96-83fc-704edc48b960)

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
