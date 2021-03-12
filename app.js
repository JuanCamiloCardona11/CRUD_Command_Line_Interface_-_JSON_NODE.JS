"use strict";
const yargs = require('yargs'),
   people = require('./people');

//CREATE
yargs.command({
   command: "add",
   describe:"This command adds a new person",
   builder:{
      id: {
         describe: "identification",
         demandOption: true,
         type:"string"   
      },
      name: {
         describe: "name",
         demandOption: true,
         type:"string"
      },
      lastName:{ 
         describe:"last name",
         demandOption: true,  
         type: "string"
      },
      phoneNumber: {
         describe:"phone number",
         demandOption: true,  
         type: "string"
      },
      age: {
         describe:"age",
         demandOption: true,  
         type: "number"
      },
      height:{
         describe:"height",
         demandOption: true,  
         type: "number"
      }
   },
   handler: function(argv){
      people.addPerson(argv.id, argv.name, argv.lastName, argv.phoneNumber, argv.age, argv.height);
   }
});

//READ People (All)
yargs.command({
   command: "readAll",
   describe: "This command prints the people by console",
   handler: function () {
      people.readPeople();
   }
});

//READ (one person)
yargs.command({
   command: "read",
   describe: "This command prints one person by console",
   builder: {
      id: {
         describe: "id",
         demandOption: true,
         type: "string",
      }
   },
   handler: function (argv) {
      people.readPerson(argv.id);
   }
});

//UPDATE (one person)
yargs.command({
   command: "update",
   describe:"This command updates one person and show by console it's new information",
   builder:{
      id: {
         describe: "identification",
         demandOption: true,
         type:"string"   
      },
      newId:{
         describe: "new identification",
         demandOption: true,
         type:"string"   
      },
      name: {
         describe: "new name",
         demandOption: true,
         type:"string"
      },
      lastName:{ 
         describe:"new last name",
         demandOption: true,  
         type: "string"
      },
      phoneNumber: {
         describe:"new phone number",
         demandOption: true,  
         type: "string"
      },
      age: {
         describe:"new age",
         demandOption: true,  
         type: "number"
      },
      height:{
         describe:"new height",
         demandOption: true,  
         type: "number"
      }
   },
   handler: function(argv){
      people.updatePerson(argv.id, argv.newId, argv.name, argv.lastName, argv.phoneNumber, argv.age, argv.height);
   }
});

//DELETE
yargs.command({
   command: "remove",
   describe: "This command deletes a current person",
   builder: {
      id: {
         describe: "id",
         demandOption: true,
         type: "string",
      }
   },
   handler: function (argv) {
      people.deletePerson(argv.id);
   }
});

console.log(yargs.argv);
