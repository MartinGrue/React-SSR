import express, { Response, Request, NextFunction } from "express";
import { IUser, User } from "../../models/User";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

router.post(
  "/auth/signin",
  async (
    req: Request<{}, {}, IUser>,
    res: Response<any>,
    next: NextFunction
  ) => {
    console.log("in signIn");

    try {
      const { name, password } = req.body;
      if (!name || !password) {
        return res.status(422).send("Name and Password required");
      }
      const user = await User.findOne({ name });
      if (!user) {
        return res.status(422).send("User not found");
      }
      try {
        await user.comparePassword(password);
      } catch (error) {
        return res.status(422).send("Name or Password invalid");
      }
      const token = jsonwebtoken.sign(
        { userId: user.id, name },
        "Token_KEY_GOES_HERE"
      );
      req.session!["jwt"] = token;
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);
router.get("/api/auth/signin", (req, res) => {
  res.send("Hello");
});
export { router as signInRouter };
