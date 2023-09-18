const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function getAllContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
}

async function getContactById(id) {
  const allContacts = await getAllContacts();
  const contact = allContacts.find((contactData) => contactData.id === id);
  return contact || null;
}

async function addContact(contactData) {
  const allContacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    ...contactData,
  };
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

async function removeContactById(id) {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex((contactData) => contactData.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedContact] = allContacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return deletedContact;
}

async function updateContactById(contactData) {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex(
    (contact) => contact.id === contactData.id
  );
  if (index === -1) {
    return null;
  }
  console.log(allContacts[index]);
  allContacts[index] = contactData;
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return contactData;
}

module.exports = {
  getAllContacts,
  getContactById,
  updateContactById,
  addContact,
  removeContactById,
};
