import express, { Response, Request } from "express";
const router = express.Router();
import jwt from "jsonwebtoken";

router.get("/auth/currentuser", (req, res: Response<any>) => {
  console.log("in currentUser")
  if (!req.session?.jwt) {
    return res.send({ currentuser: null });
  }
  try {
    const payload = jwt.verify(req.session.jwt, "Token_KEY_GOES_HERE");
    const {} = payload;
    const user = res.send({ currentUser: payload });
  } catch (error) {
    return res.send({ currentuser: null });
  }
});

export { router as currentUserRouter };
