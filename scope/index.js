const scope = {
  exerciseA() {
    let personA = 'Paul';
    let personB = 'Ben';
    let personC = 'Tom';

    function changePerson() {
      if (personA === 'Paul') {
        person = 'CardiB'; //person = 'CardiB' has become globally scoped
        beautifyPerson();
      }

      function beautifyPerson() {
        // Log A: personB  //A: 'Ben'
        
        if (personB.includes('B')) {
          personB = person; //globally scoped - personB (reassigned as) = 'CardiB'
          personC = personB; //globally scoped - personC (reassigned as) = 'CardiB'
          // Log B: personC
        }
      }

      personC = personA; //globally scoped - personC = 'Paul' (reassigned)

      // Log C: personB
    }

    changePerson();

    // Log D: personC

    const result = [
      { A : 'Ben' },
      { B : 'CardiB'},
      { C : 'CardiB' },
      { D : 'Paul' }
    ];
    return result;

    // Annotation:
    // Three variables are assigned to the global scope as personA, personB, and personC with the let keyword
    //On line 7 there is the changePerson function declared with a nested function inside, but we skip over functions until they are invoked
    //That takes us to line 28 where the function changePerson is invoked which takes us back up to line 7
    //In the function, there is a conditional met by the globally scoped personA. We go inside the conditional where a new variable is declared without a keyword throwing it into the global scope.
    //Our global variables are as follows:
    //let personA = 'Paul';
    // let personB = 'Ben';
    // let personC = 'Tom';
    // person = 'CardiB';
    //The nested function beautifyPerson is invoked in the conditional
    //We move to line 13 where the function is declared and log personB, 'Ben'
    //There is a conditional that personB fulfills and we go into the conditional to globally reassign (without a keyword) personB to person and personC to personB(now same as person):
    //let personA = 'Paul';
    // let personB = 'CardiB';
    // let personC = 'CardiB';
    // person = 'CardiB';
    //Now we log personC, 'CardiB'
    //On line 23 (still in the function, but outside the nested function), we reassign personC = 'Paul' and now:
    //let personA = 'Paul';
    // let personB = 'CardiB';
    // let personC = 'Paul';
    // person = 'CardiB';
    //We log personB, 'CardiB' on the last line of the function and hop to line 30 after the function invocation and log personC, 'Paul'
  },

  exerciseB() {
    let number = 30;

    function numberFunction() {
      let number = 75;

      if (number === 75) {
        let number = 28;
      }

      // Log A: number

      function newNumber() {
        number = 64;

        // Log B: number
      }

      newNumber();

      // Log C: number
    }

    numberFunction();

    // Log D: number

    const result =  [{
      A: 75 
    }, {
      B: 64
    }, {
      C: 64
    }, {
      D: 30
    }];
    return result;

    // Annotation:
    //We start at line 67 where number is assigned to 30, we skip over numberFunction and the nested newNumber toline 89 where numberFunction is invoked which brings us back to line 69.
    //On line 70 number is reassigned to 75
    //There is a a conditional that reassigns with let but it is block scoped and the first console.log is outside that block and so Log A: 75
    //We pass over newNumber, but line 84 invokes it and takes us back up to line 78
    //In newNumber number is reassigned to 64 without var, let, or const and so it moves up the scope chain to line 70 where it is reassigned in the numberFunction's functional scope so both Log B:64 and Log C:64
    //We pop out of that function and are back in the global scope where number = 30, so the last Log D:30
  },

  exerciseC() {
    let greeting = 'Hello';

    function greetingFunction() {
      var greeting = 'Yo';

      if (greeting === 'Yo') {
        let greeting = 'Howdy';
      }

      // Log A: greeting

      function newPhrase() {
        greeting = 'Hey';

        // Log B: greeting
      }

      newPhrase();

      // Log C: greeting
    }

    greetingFunction();

    // Log D: greeting

    const result = [{
      A: 'Yo' 
    }, {
      B: 'Hey'
    }, {
      C: 'Hey'
    }, {
      D: 'Hello'
    }];
    return result;

    // Annotation:

  //greeting is declared globally with let; the greeting Function is declared with a nested newPhrase Function
  //Both are passed over until greetingFunction is invoked at which time a new variable with the same name of greeting is declared with var in the functional scop of greetingFunction.
  //There is a conditional that assigns another variable of greeting with let to 'Howdy' but there it is block scoped and the first console log is outside the block scope, but still in the functional scope and so A: "Yo"
  //we pass over the newPhrase function until it is invoke later in the greetingFunction at which time we dive into the newPhrase Function where greeting is immediately reassigned to 'Hey' and console logged B: 'Hey'
  //We exit that functional scope, but since it was reassigned without a let, var, or const the value travels up the scope chain ad finds the parent variable to reassign and that is within the greeting Function.
  //The next console log is still in the greeting function and so C: 'Hey'
  //Then we are done with the functions and back in the global scope where greeting is assigned to 'Hello' so the last console log is D: 'Hello'
  },

  exerciseD() {
    let greeting = 'howdy';

    const greetingGenerator = () => {
      let greeting = 'hi';

      if (greeting === 'hi') {
        let greeting = 'hello';
      }

      // Log A: greeting

      const newGreeting = ()  => {
        greeting = 'welcome';

        // Log B: greeting
      };

      newGreeting();

      // Log C: greeting
    };

    greetingGenerator();

    // Log D: greeting

    const result = [{
      A: 'hi' 
    }, {
      B: 'welcome'
    }, {
      C: 'welcome'
    }, {
      D: 'howdy'
    }];
    return result;

    // Annotation:
    //A: 'hi'
    //B: 'welcome'
    //C: 'welcome'
    //D: 'howdy'
    //greeting assigned to 'Howdy'in global scope
    //Pass grettingGenerator until invoked and then go into greetingGenerator where gretting is assigned to in the functional scope to 'hi'
    //A conditional reassigns in the block of conditional but does not log until back in the functional scope where A: 'hi'
    //newGreeting is passed, invoked and then entered where greeting is reassigned without var, let or const and so it traverses up the scope chain and attaches to the functional scope as welcome; it is also logged immediately so B: welcome 
    //We leave the nested function newGreeting and are back in the parent function where greeting is assigned to C: 'welcome' due to the first line of newGreeting
    //Then we pop back into the global scope where D: 'howdy'
  },

  exerciseE() {
    let name = 'Brittany';

    function sayName() {
      let name = 'Pam';

      if (name === 'Pam') {
        name = 'Nathaniel';

        if (name.length > 0) {
          let name = 'Brittany';
        }

        // Log A: name
      }

      // Log B: name
    }

    // Log C: name

    sayName();

    // Log D: name

    const result = [{
      C: 'Brittany' 
    }, {
      A: 'Nathaniel'
    }, {
      B: 'Nathaniel'
    }, {
      D: 'Brittany'
    }];
    return result;

    // Annotation:
    //name is assigned to 'Brittany'
    //We pass over the sayName function
    //but log C is called C: 'Brittany'
    //invoke sayName function.In function name is assigned to 'Pam' in the functional scope. There is a conditional where if name is equal to 'Pam' (which it is) then name is reassigned without let, var, or const to 'Nathaniel' so it traverses up the scope chain to the next assignment of name which is in the functional scope of sayName.
    //There is another conditional that reassigns it to 'Brittany' but just inside that block scope where no console logis called
    //the next console log is A inside the sayName function where name is assigned to 'Nathaniel' so A: 'Nathaniel'
    //We exit the outer conditional and are back in the functional scope where name is still 'Nathanial' so B: 'Nathanial'
    //Then we exit the functional scope and are in the global scope where D: 'Brittany'
  },

  exerciseF() {
    var dog = 'Spot';

    function petDog() {
      // Log A: 'Spot'

      if (dog === 'Spot') {
        let dog = 'Fluffy';
      }

      function rollOver() {
        // Log B: 'Spot'

        dog = 'Biscuit';

        // Log C: 'Biscuit'

      }

      rollOver();

      // Log D: 'Biscuit'
    }

    petDog();

    // Log E: 'Biscuit'

    const result = [{
      A: 'Spot' 
    }, {
      B: 'Spot'
    }, {
      C: 'Biscuit'
    }, {
      D: 'Biscuit'
    }, {
      E: 'Biscuit'
    }
    ];
    return result;

    // Annotation:
    // The variable dog is assigned to 'Spot'
    //petDog is invoked; we go inside and immediately dog is logged
    //So A:'Spot'
    //We reassign Spot to Fluffy with let inside an if statement(block scoped) but never log dog inside the block
    //WE have a rollover funciton inside that is called and entered
    //dog is logged B:'Spot'
    //dog is reassigned without a keyword so it traverses upi the scope chain and attaches to the variable in the global scope
    //C: 'Biscuit'
    //We exit the nested function and log again, nothing has changed
    //D: 'Biscuit'
    //We exit the outer function and log
    //E: 'Biscuit'
  },

  exerciseG() {
    var fruit = 'apple';

    function eatFruit() {

      if (fruit !== 'kiwi') {
        var fruit = 'mango';

        if (fruit) {
          // Log A: fruit
          const fruit = 'strawberry';
        }

        // Log B: fruit
      }

      // Log C: fruit
    }

    eatFruit();

    // Log D: fruit

    const result = [{
      A: 'reference error' 
    }, {
      B: 'mango'
    }, {
      C: 'mango'
    }, {
      D: 'apple'
    }
    ];
    return result;

    // Annotation:
    // fruit is assigned to 'apple' globally with var
    //eatfruit invoked, enter function, then enter if statement and reassign to 'mango' with var which with a var declaration you cannot use var to reassign with the keyword
    //enter another if statement and log fruit, but because double declaration
    //A: 'reference error'
    //reassign within if block with const to 'strawberry' but don't log and only block scoped
    //exit conditional and log, still in the functional scope where assigned to B: 'mango'
    //leave outer block and log, but still in functional scope so C: 'mango'
    //exit function into global scope where D: 'apple'
  },

  exerciseH() {
    let num = 6;

    const fn1 = function() {
      let num = 4;

      // Log A: 4

      if (num < 5) {
        const num = 9;

        fn2(num);

        const newNum = num;

        // Log B: 9
      }

      newNum = num;

      // Log C: 4
    };

    const fn2 = function(num){
      // Log D: 9

      num = num + 1;

      // Log E: 10
    };

    fn1();

    const result =   [{
      A: 4
    }, {
      D: 9
    }, {
      E: 10
    }, {
      B: 9
    }, {
      C: 4
    }];
    return result;

    // Annotation:
    //num is assigned to 6 in the global scope with let
    //call fn1 num is reassigned to 4 with let in the function scope and logged A: 4
    //num is assigned to 9 with const in the conditional which calls fn2 and passes the num as 9 through to fn2 below and logged D: 9
    //num is reassigned in the function to 10 and logged E: 10 (this is reassigning the variable moving through the parameter not traveling up the scope chain)
    //then we go back into the fn1 if statement and num is given a new variable name by reassignment and logged as B: 9
    //we exit the conditional and num is logged again but num is now back in the fn1 function and num is 4 in that functional scope so C: 4
  },

  exerciseI() {
    var hunger = 100;

    function eatSnack() {
      hunger -= 25;
      // Log A: 75 /55
      gorgeYourself();

      function gorgeYourself() {
        const hunger = 0;
        // Log B: 0 /0
      }

      // Log C: 75 /55
    }

    eatSnack();

    hunger += 5;
    // Log D: 80 

    eatSnack();
    // Log E: 55

    const result = [{
      A: 75
    }, {
      B: 0
    }, {
      C: 75
    }, {
      D: 80
    }, {
      A: 55
    }, {
      B: 0
    }, {
      C: 55
    }, {
      E: 55
    }];
    return result;

    // Annotation:
    //hunger is set to a global variable of 100
    //eatSnack is called and when we get in 25 is subtracted from hunger, reassigning it to 75 and logged A: 75 in the global scope without var
    //gorgeYourself is called inside the function and assigned to zero with const which is scoped functionally to the inside of that function block and logged B: 0
    //Outside of gorgeYourself, but still in eatSnack, hunger is logged at C: 75
    //We end up in the code after the invocation of eatSnack where hunger is gloablly reassigned from 74 to D: 80
    //eatSnack is called again and A: 55, B: 0, C: 55 then below the invocation again and hunger is logged as E:55 because we are outside the functional scope and back in the global scope which was reassigned globally on the first line of eatSnack
  },

  exerciseJ() {
    let sandwich = 'ketchup sandwich';

    // Log A: ketchup sandwich

    const addChipotle = () => {
      // Log B: undefined
      var toppings = 'chipotle sauce';

      if (toppings === 'chipotle sauce') { 
        sandwich = 'not a mediocre sandwich';
      }

      // Log C: 'not a mediocre sandwich'
    };

    const addCheese = () => {
      let cheeseTopping = 'gouda';
      // Log D: gouda

      const shesTheManReference = () => {
        amandaBynes = 'National Treasure';
      };

      shesTheManReference();
    };

    cheeseTopping = 'kraft';
    addCheese();

    addChipotle();
    // Log E: 'not a mediocre sandwich'
    // Log F: amandaBynes

    const result = [{
      A: 'ketchup sandwich'
    }, {
      D: 'gouda'
    }, {
      B: undefined
    }, {
      C: 'not a mediocre sandwich'
    }, {
      E: 'not a mediocre sandwich'
    }, {
      F: 'National Treasure'
    }];
    return result;

    // Annotation:
    // sandwich is assigned to 'ketchup sandwich' in the global scope with let and is logged immediately A: 'ketchup sandwich'
    //cheeseTopping is globally scoped to 'kraft'
    //and addCheese is invoked; inside cheeseTopping is reassigned in the functional scope of addCheese to D: 'gouda'
    //shesTheManReference is call as a nested function and then we leave both functions where addChipotle is invoked
    //inside toppings is logged but hasn't been defined yet(but is defined on the next line with var so it is hoisted within the function; if it was defined with let or const it would have thrown a reference error) so B: undefined
    //toppings is declared with var and assigned to 'chipotle sauce'
    //inside the conditional sandwich is reassigned without a keyword so it traverses up the scope chain to the nearest declaration of sandwich which is scoped globally
    //then C: 'not a mediocre sandwich'
    //we exit the function and the next log askes for sandwich E: 'not a mediocre sandwich'
    //Then amandaBynes is logged in the global scope where it is assigned F: 'National Treasure'
  },

  exerciseK() {
    let num = 10;

    function foo() {
      if (num > 5) {
        num = 7;
      }
      // Log A: 7
    }

    foo();

    // Log B: 7

    const result = [{
      A: 7
    }, {
      B: 7
    }];
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseL() {
    let grade = 100;//90

    function losePoints() {
      grade = 90;

      function addPoints() {
        const grade = 95;

        if (grade === 95) {
          let grade = 97;
        }

        // Log A: 95
      }

      addPoints();

      // Log B: 90
    }

    losePoints();

    // Log C: 90

    const result = [{
      A: 95
    }, {
      B: 90
    }, {
      C: 90
    }];
    return result;

    // Annotation:
    // grade globally scoped as 100
    //losePoints invoked
    //grade traverses up scope chain to global assignment of 90
    //addPoints invoked and grade functionally scoped to 95
    //then logged A: 95
    //leave function logged B: 90
    //exit function to globl scope and logged C: 90
  },

  exerciseM() {
    var num = 5;//6

    function first() {
      // Log A: 5
      num = 6;
      // Log B: 6
    }

    function second() {
      // Log C: 'reference error'
      let num = 7;
    }

    first();
    second();

    // Log D: 6

    const result = [{
      A: 5
    }, {
      B: 6
    }, {
      C: 'reference error'
    }, {
      D: 6
    }];;
    return result;

    // Annotation:
    // num assigned to 5
    //first invoked and logged A: 5
    //num assigned without keyword moves up scope chain to global scope and logged B: 6
    //
  },

  exerciseN() {
    var instructor = 'Pam';

    function changeInstructor() {

      // Log A: instructor

      if (instructor === 'Brittany') {
        const instructor = 'Nathaniel';
      } else {
        let instructor = 'Brittany';
      }

      // Log B: instructor

      function rename() {
        instructor = 'Louisa';
        // Log C: instructor
      }

      rename();

      // Log D: instructor

    }

    // Log E: instructor

    changeInstructor();

    // Log F: instructor

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseO() {
    var shoe = 'flipflop';

    function putOnShoe() {
      // Log A: shoe
      var shoe = 'boot';
    }

    // Log B: shoe
    putOnShoe();
    // Log C: shoe

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseP() {
    let lunch;
    function orderLunch() {
      if (lunch) {
        // Log A: lunch
        let lunch = 'sandwich';
      }

      if (typeof lunch === 'undefined') {
        lunch = 'soup';
      }

      // Log B: lunch
    }

    orderLunch();

    // Log C: lunch

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseQ(){
    let myKid = 'Pandora';
    let wildKids = ['Antigone'];

    let myCrazyKidAntics = kid => {
      // Log A: kid
      wildKids.push(kid);
      // Log B: wildKids
  
      let drawOnTheWall = () => {
        let myKid = 'Mandy';
        // Log C: myKid
        return `That wild kid ${myKid}, drew on the wall!`;
      };

      drawOnTheWall();

      let myAmazingKid = () => {
        let myKid = wildKids.shift();
        // Log D: myKid
        return `That kid ${myKid}, is AMAZING!`;
      };

      myAmazingKid();
      // Log E: myKid;
      return `All these kids are wild, especially, ${myKid}!`;
    };

    myCrazyKidAntics(myKid);

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseR() {
    let myName = 'Rody';
    // Log A: myName

    const parentFunc = () => {
      myName += 'Toy';
      // Log B: myName

      let innerFunc = () => {
        let myName = 'Tesla'; 
        // Log C: myName
      };

      innerFunc();
      myName += 'Daniels';
    };

    parentFunc();
    // Log D: myName

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = scope;