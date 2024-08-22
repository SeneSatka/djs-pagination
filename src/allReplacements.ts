import { User } from "discord.js";

export default (text: string, user: User) => {
  text = text.replaceAll("[user.username]", user.username);
  text = text.replaceAll("[user.globalName]", user.globalName ?? user.username);
  text = text.replaceAll(
    "[user.createdTimestamp]",
    Math.round(user.createdTimestamp / 1000).toString()
  );
  text = text.replaceAll("[user.id]", user.id);
  return text;
};
