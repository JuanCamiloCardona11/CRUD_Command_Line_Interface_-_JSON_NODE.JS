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
   let i = 0, personExists = false;

   while(!personExists && (i < peopleBuffer.length)){
      if(peopleBuffer[i].id === id){
         personExists = true;
      }
      i++;
   }
   return(personExists);
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
   Name: ${chalk.bgGreen.white(person.name)} ${chalk.bgGreen.white(person.lastname)}\n
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
      console.log(chalk.bgRed.bold.white(`Error: The person with id: ${chalk.underline(id)} doesn't exist in the system!!`));
      return;
   }
   person = peopleBuffer.people.filter((person) => (person.id === id))[0];
   console.log(`\nThe person you were looking for is:`);
   printPerson(person);
}

//UPDATE --> U
const updatePerson = function(id, newId, name, lastName, phoneNumber, age, height){
   let peopleBuffer, person;
   peopleBuffer = loadPeople();
   if(peopleBuffer.people.length === 0){
      console.log(chalk.bgRed.bold.white(`Error: There is not people in the system.`)); 
      return;
   }
   if(!personExists(peopleBuffer.people,id)){
      console.log(chalk.bgRed.bold.white(`Error: The person with id: ${chalk.underline(id)} doesn't exists in the system!!`));
      return;
   }
   if(personExists(peopleBuffer.people,newId)){
      console.log(chalk.bgRed.bold.white(`Error: The person with id: ${chalk.underline(newId)} already exists in the system!!`));
      return;
   }
   person = peopleBuffer.people.filter((person) => (person.id === id))[0];
   person.name = name;
   person.lastname = lastName;
   person.phoneNumber = phoneNumber;
   person.age = age;
   person.height = height;
   fs.writeFileSync("./people.json",JSON.stringify(peopleBuffer));
   console.log(`${chalk.bgGreen.bold.white(`Person Updated!!`)}\n${printPerson(person)}`);
}

//DELETE --> D
const deletePerson = function(id){
   const peopleBuffer = loadPeople();
   if(peopleBuffer.people.length === 0){
      console.log(chalk.bgRed.bold.red(`Error: There is not people in the system.`));  
      return;
   }
   if(!personExists(peopleBuffer.people,id)){
      console.log(chalk.bgRed.bold.white(`Error: The person with id: ${chalk.underline(id)} doesn't exist in the system!!`));
      return;
   }
   const newBuffer = peopleBuffer.people.filter((person) =>(person.id !== id));
   fs.writeFileSync("./people.json", JSON.stringify({people: newBuffer}));
}

module.exports = {
   loadPeople,
   personExists,
   printPerson,
   addPerson,
   readPeople,
   readPerson,
   updatePerson, 
   deletePerson
}