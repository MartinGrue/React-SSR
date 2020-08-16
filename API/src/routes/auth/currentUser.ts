import express from "express";
const router = express.Router();

router.get("api/auth/currentuser", (req, res) => {
  console.log("Hi from currentuserRouter");
});

export { router as currentUserRouter };
