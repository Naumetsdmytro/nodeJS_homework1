const contacts = require("./contacts");
const { Command } = require("commander");

console.log("hello");

const program = new Command();
program
  .option("-l, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "cuser name")
  .option("-e, --email <type>", "cuser email")
  .option("-ph, --phone <type>", "cuser phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeActions({ action, id, name, email, phone }) {
  switch (action) {
    case "getList":
      const allContacts = await contacts.getAllContacts();
      return console.log(allContacts);
    case "getContact":
      const contact = await contacts.getContactById(id);
      return console.log(contact);
    case "addContact":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "updateContact":
      const updatedContact = await contacts.updateContactById({
        id,
        name,
        email,
        phone,
      });
      return console.log(updatedContact);
    case "removeContact":
      const deletedContact = await contacts.removeContactById(id);
      return console.log(deletedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeActions(argv);
