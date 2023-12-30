# Session

- Instance that exists at the server.
- To use the service of session we use `express-session` package.

To make a session exist in server, we make a middleware function that makes a session on req on the server.

```js
app.use(
  session({
    secret: "index page",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secureProxy: true,
      // httpOnly: true,
      // domain: "example.com",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  })
);
```

Since session exists on server, all the properties are attached on req.properties . Like in these [examples](./controller/session.js)

```js
set -> req.session.session_name = session_data
retrive -> req.session.session_name
clear/destroy -> req.session.destroy()
```

Resources to know about session
- [Medium Article](https://medium.com/@alysachan830/cookie-and-session-ii-how-session-works-in-express-session-7e08d102deb8)
- [Github Repo - expressjs/sessions](https://github.com/expressjs/session)
- [Stack Overflow](https://stackoverflow.com/questions/28789857/how-is-the-express-req-session-object-persisted)

<hr/>

# Cookies

An HTTP cookie, also known as a “web cookie,” “browser cookie,” or simply “cookie,” is a small piece of data that a server sends to a user's web browser.

In session, the information of the client activity in server sent a session ID information to the client in cookie to be stored in session.
This info in cookie is plain text and can be accessed by the server, as the cookie is attached in the header of HTTP request.

[Examples @](./controller/cookie.js) about setting and destroying cookies.

```js
const { data } = req.cookies
res.cookie("key", value)
res.cookie.clear;
```

- [More on this on MDN Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [How Node handles cookies](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_response_setheader_name_value)
- [Medium](https://medium.com/@joshirahul329/how-to-work-with-cookies-client-side-6c89eda24da6)