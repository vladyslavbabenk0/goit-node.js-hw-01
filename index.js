import * as contactsService from "./contacts.js";
import { program } from "commander";

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactsList = await contactsService.listContacts();
        return console.table(contactsList);

      case "get":
        const oneContact = await contactsService.getContactById(id);
        return console.log(oneContact);

      case "add":
        const newContact = await contactsService.addContact({
          name,
          email,
          phone,
        });
          return console.log(newContact);

      case "remove":
        const removeContact = await contactsService.removeContact(id);
        return console.log(removeContact);

      default:
        console.warn("\x1B[31m Unknown action type!");
      }
  } 
  
  catch (error) {
    console.log(error.message);
    throw error;
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
