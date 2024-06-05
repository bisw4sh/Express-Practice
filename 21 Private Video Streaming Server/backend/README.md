# Passport.js

## Unofficial Best [Docs](https://github.com/jwalton/passport-api-docs)

1. Explains bit and [...here](https://www.youtube.com/playlist?list=PL_cUvD4qzbkwjmjy-KjbieZ8J9cGwxZpC)

   > The [repo](https://github.com/stuyy/expressjs-full-course)

2. Stack Overflow [discussion](https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize)

---

### Flow of Passport.js

1. In main server file

```js
app.use(session(options)); //express-session & configs
app.use(passport.initilize()); //initializes the passport strategy
app.use(passport.session()); //Make the connection between the session and passport
```

2. Config of passport.js file

```js
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export default passport.use(
  new LocalStrategy(
    { usernameField: "user", passwordField: "password" },
    async (username, password, done) => {
      try {
        const checkExistence = await userExists(username);
        if (!checkExistence) {
          return done(null, false, {
            message: "No user with that username",
          });
        }

        const isMatch = await verifyPassword(password, checkExistence.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, checkExistence);
      } catch (err) {
        return done(err);
      }
    }
  )
);
```

The code above is self-explanatory, and passport does allow for our own strategy.

3. Serialize and Deserialize the session

```js
//Serialization occurs when a token is issued in the case of passport. This happens when user logs in. The data from database is saved to the session and client is given a session id(cookie)

passport.serializeUser((user, done) => {
  process.nextTick(function () {
    done(null, { username: user.username, id: user.id, role: user.role });
  });
});

//Deserialization occurs every time user makes a req(call), It happens when passport has to convert that encrypted string back into a JavaScript object. Why does it do this? Because in that object is the user’s email or id that you serialized in the first place. It’s the minimum information required for your app to look up that user in the db and make sure they are who they say they are.

// This is done to verify the client making the request
passport.deserializeUser(async (user: Express.User, done) => {
  try {
    process.nextTick(function () {
      return done(null, user);
    });
  } catch (err) {
    done(err);
  }
});
```

---

## Accessing Data

1. **req.session.passport.user.data** -> This guarantees the data to be there
2. **req.user** --> So does this, as internally the above is being mapped to this by the middleware, TypeScript does give a hell of a time to fix in this approach

---