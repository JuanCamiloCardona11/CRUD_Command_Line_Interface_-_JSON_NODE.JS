const fs = require('fs'),
   chalk = require('chalk'),
   rl = require('readline');


function loadPeople(){
   try{
      const dataBuffer = fs.readFileSync('./people.json');
      const dataJSON = dataBuffer.toString();      //Dangerous line
      return(JSON.parse(dataJSON));
   } catch (err) {
      return({people:[]});
   }
}

//If the person exists in the system, return true
const personExists = function(peopleBuffer, id){
   peopleBuffer.people.forEach((elem) => {
      if(elem.id === id){
         return(true);
      }
   });
   return(false);
}

//CREATE -> C
const addPerson = function(id, name, lastName, phoneNumber, age, height){
   let peopleBuffer;
   const newPerson = {
      id: id,
      name : name,
      lastname: lastName,
      phoneNumber: phoneNumber,
      age: parseInt(age),
      height : parseFloat(height)
   }
   peopleBuffer = loadPeople();
   
   if(personExists(peopleBuffer.people, newPerson.id)){
      console.log(chalk.bgRed.bold.white(`Error: The person with id: ${chalk.underline(id)} already exists!!`));
      return;
   }
   peopleBuffer.people.push(newPerson);
   fs.writeFileSync("./people.json", JSON.stringify(peopleBuffer));
} 

//Print a person by console
const printPerson = function(person){
   console.log(`Identification: ${chalk.bgGreen.white(person.id)}\n
   Name: ${chalk.bgGreen.white(person.name + " " + person.lastName)}\n
   PhoneNumber: ${chalk.bgGreen.white(person.phoneNumber)}\n
   Age: ${chalk.bgGreen.white(person.age)}\n
   Estatura: ${chalk.bgGreen.white(person.height)}`);
}

//READ PEOPLE (All) --> R
const readPeople = function(){
   let peopleBuffer,
   i = 0;
   peopleBuffer = loadPeople();
   if(peopleBuffer.people.length === 0){
      console.log(`.`); 
      console.log(chalk.bgRed.bold.white(`Error: There is not people in the system`));
      return;
   }
   peopleBuffer.people.forEach((person) => {
      console.log(`*------ Person #${++i} ------*`);
      printPerson(person);
      console.log("\n\n");
   });
}

//READ PERSON --> another R
const readPerson = function(id){
   let peopleBuffer, person;
   peopleBuffer = loadPeople();
   if(peopleBuffer.people.length === 0){
      console.log(chalk.bgRed.bold.red(`Error: There is not people in the system.`)); 
      return;
   }
   if(!personExists(peopleBuffer.people,id)){
      console.log(chalk.bgRed.bold.white(`Error: The person with id: ${chalk.underline(id)} doesn't exists in the system!!`));
      return;
   }
   person = peopleBuffer.people.filter((person) => (person.id === id))[0];
   console.log(`\nThe person you were looking for is:`);
   printPerson(person);
}

const getPersonData = function(question){
   const readline = rl.createInterface(process.stdin, process.stdout);
   readline.question(`${question}`, (answer) => {
      return(answer);
   });
}

//UPDATE --> U
const updatePerson = function(id){
   let peopleBuffer, person,newId;
   peopleBuffer = loadPeople();
   if(peopleBuffer.people.length === 0){
      console.log(chalk.bgRed.bold.red(`Error: There is not people in the system.`)); 
      return;
   }
   if(!personExists(peopleBuffer.people,id)){
      console.log(chalk.bgRed.bold.white(`Error: The person with id: ${chalk.underline(id)} doesn't exists in the system!!`));
      return;
   }
   person = peopleBuffer.people.filter((person) => (person.id === id))[0];
   newId = getPersonData(`current id: ${person.id}, new id: `);
   if(!personExists(peopleBuffer.people,newId)){
      person.name = getPersonData(`current name: ${person.name}, new name: `);
      person.lastName = getPersonData(`Current lastname: ${person.lastName}, new lastname: `);
      person.phoneNumber = getPersonData(`Current phoneNumber: ${person.phoneNumber}, new phoneNumber: `);
      person.age = getPersonData(`Current age: ${person.age}, new age: `);
      person.height = getPersonData(`Current height: ${person.height}, new height: `)
      console.log(`${chal.bgRed.bold.white(`Person Updated!!`)}\n${printPerson(person)}`);
      fs.writeFileSync("./people.json",JSON.stringify(peopleBuffer));
   } else {
      console.log(chalk.bgRed.bold.white(`Error: The person with id: ${chalk.underline(id)} already exists!!`));
   }
}

//DELETE --> D
const deletePerson = function(id){
   const peopleBuffer = loadPeople(),
   const newBuffer;
   if(peopleBuffer.people.length === 0){
      console.log(chalk.bgRed.bold.red(`Error: There is not people in the system.`));  
      return;
   }
   if(!personExists(peopleBuffer.people,id)){
      console.log(chalk.bgRed.bold.white(`Error: The person with id: ${chalk.underline(id)} doesn't exists in the system!!`));
      return;
   }
   newBuffer = peopleBuffer.people.filter((person) =>(person.id !== id));
   fs.writeFileSync("./people.json", JSON.stringify({people: newBuffer}));
}

module.exports = {
   addPerson,
   readPeople,
   readPerson,
   updatePerson, 
   deletePerson
}