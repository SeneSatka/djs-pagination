import { APIEmbed, EmbedBuilder, User } from "discord.js";
import allReplacements from "./allReplacements";

export default (e: APIEmbed | any, user: User) => {
  const embed = new EmbedBuilder(e);
  if (e.data.author)
    embed.setAuthor({
      name: allReplacements(e.data.author.name, user),
      iconURL: e.data.author.icon_url ?? undefined,
      url: e.data.author.url ?? undefined,
    });
  if (e.data.description)
    embed.setDescription(allReplacements(e.data.description, user));
  if (e.data.fields)
    if (e.data.fields.length > 0)
      embed.addFields(
        e.data.fields.map(
          (f: { inline: boolean; value: string; name: string }) => ({
            inline: f.inline,
            value: allReplacements(f.value, user),
            name: allReplacements(f.name, user),
          })
        )
      );
  if (e.data.footer)
    embed.setFooter({
      text: allReplacements(e.data.footer.text, user),
      iconURL: e.data.footer.icon_url ?? undefined,
    });

  if (e.data.title) embed.setTitle(allReplacements(e.data.title, user));
  return embed;
};
