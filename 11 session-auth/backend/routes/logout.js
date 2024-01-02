import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.table(req.cookies);
  console.log(req.session.data);

  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error destroying session");
    } else {
      // Clear the cookie
      res.clearCookie("data");
      res.send("Session and cookie have been destroyed");
    }
  });
});

export default router;
