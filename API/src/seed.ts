import { User, IUser } from "./models/User";

export const seedData = () => {
  const users: IUser[] = [
    { name: "tia", password: "asdf" },
    { name: "nemo", password: "asdf" },
    { name: "tom", password: "asdf" },
    { name: "jerry", password: "asdf" },
  ];

  users.map(async (user) => {
    const userdoc = User.build(user);
    await userdoc.save();
  });
};
