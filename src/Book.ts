import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Embed,
  EmbedBuilder,
  User,
} from "discord.js";
import books from "./books";
import replaceEmbed from "./replaceEmbed";

export default class Book {
  prevLabel: string;
  nextLabel: string;
  firstLabel: string;
  lastLabel: string;
  pages: Array<Embed | EmbedBuilder>;
  currentPage: number;
  buttonType: ButtonStyle;
  name: string;
  constructor(options: {
    name: string;
    prevLabel?: string;
    nextLabel?: string;
    firstLabel?: string;
    lastLabel?: string;
    currentPage?: number;
    pages: Array<Embed | EmbedBuilder>;
    buttonType?: "Primary" | "Secondary" | "Success" | "Danger";
  }) {
    this.name = options.name.trim();
    this.prevLabel = options.prevLabel ?? "<";
    this.nextLabel = options.nextLabel ?? ">";
    this.firstLabel = options.firstLabel ?? "<<";
    this.lastLabel = options.lastLabel ?? ">>";
    this.pages = options.pages;
    this.currentPage = options.currentPage ?? 1;
    this.buttonType = ButtonStyle[options.buttonType ?? "Success"];
    books.set(this.name, this);
  }
  setCurrentPage(n: number) {
    this.currentPage = n;
  }
  build(user?: User) {
    const firstB = new ButtonBuilder()
      .setCustomId(`s_b_s_${this.name}_first`)
      .setLabel(this.firstLabel)
      .setStyle(this.buttonType);
    const prevB = new ButtonBuilder()
      .setCustomId(`s_b_s_${this.name}_prev`)
      .setLabel(this.prevLabel)
      .setStyle(this.buttonType);
    const counterB = new ButtonBuilder()
      .setCustomId(`s_b_s_${this.name}_counter`)
      .setLabel(`${this.currentPage}/${this.pages.length}`)
      .setStyle(this.buttonType)
      .setDisabled(true);
    const nextB = new ButtonBuilder()
      .setCustomId(`s_b_s_${this.name}_next`)
      .setLabel(this.nextLabel)
      .setStyle(this.buttonType);
    const lastB = new ButtonBuilder()
      .setCustomId(`s_b_s_${this.name}_last`)
      .setLabel(this.lastLabel)
      .setStyle(this.buttonType);
    if (this.currentPage == 1) firstB.setDisabled(true);
    if (this.currentPage == 1) prevB.setDisabled(true);
    if (this.currentPage == this.pages.length) nextB.setDisabled(true);
    if (this.currentPage == this.pages.length) lastB.setDisabled(true);
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      firstB,
      prevB,
      counterB,
      nextB,
      lastB
    );
    let embed = this.pages[this.currentPage - 1];
    if (user) embed = replaceEmbed(embed, user);
    const o = {
      embeds: [embed],
      components: [row],
    };
    return o;
  }
}
