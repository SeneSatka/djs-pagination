## Usage

```js
import { Book, isBook, bookHandler } from "@senka/discord-pagination"

client.on("interactionCreate", (i) => {
  if (isBook(i)) return bookHandler(i);
  //other coodes...
});


const embed1 = new EmbedBuilder()
  .setTitle("Page 1")
  .setDescription("User who opened this page: [user.globalName]");

const embed2 = new EmbedBuilder()
  .setTitle("Page 2")
  .setDescription("User who opened this page: [user.username]");

const embed3 = new EmbedBuilder()
  .setTitle("Page 3")
  .setDescription("User who opened this page:  [user.id]");

const book = new Book({
  name: "book1",
  pages: [embed1, embed2, embed3],
  buttonType: "Primary",
});


<channel>.send(book.build());
<interaction,message>.reply(book.build(<interaction,message>.user))
```

### Book options

```ts
new Book({
  name: string, //Required
  prevLabel: string, //Default <
  nextLabel: string, //Default >
  firstLabel: string, //Default <<
  lastLabel: string, //Default >>
  currentPage: number, //Default 1
  pages: Array<Embed | EmbedBuilder>,
  buttonType: "Primary" | "Secondary" | "Success" | "Danger",
  //Default Success
});
```

## Images

<img src="./assets/Page1.png"/>
<img src="./assets/Page2.png"/>
<img src="./assets/Page3.png"/>

## Book Storage

The books are stored in books.json in the directory where the transaction was started.
So why is it saved?
When the Discord bot is restarted, the books sent as messages become useless. To prevent this, books are stored in books.json and can be edited.
