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
  
