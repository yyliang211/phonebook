const mongoose = require("mongoose");

const numArgs = process.argv.length;

if (numArgs < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://yingyang:${password}@cluster0.1gxnv09.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

switch (numArgs) {
  case 3:
    Person.find({}).then((persons) => {
      console.log("phonebook:");
      persons.forEach((person) => {
        console.log(person);
      });
      mongoose.connection.close();
    });
    break;
  case 5:
    const name = process.argv[3];
    const number = process.argv[4];
    const person = new Person({
      name,
      number,
    });
    person.save().then((result) => {
      console.log(`added ${name}, number ${number} to phonebook`);
      mongoose.connection.close();
    });
    break;
}
