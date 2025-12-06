let Message: string = "Typescript Setup Done!";
console.log("Hello " + Message);

function greet(name: string): string {
  return `Hello, ${name}`;
}
const msg = greet("raja");
console.log(msg);

function hello(name: any) {
  return "hello Brother".concat(" ", name, "!");
  // return "hello Brother".concat(" " + name, "!");  // we can do like this also
}
const mess = hello("rani");
console.log(mess);

//dataType in ts: number, string, boolean, any.

let fullname: string = "abc bcd";
let age: number = 21;
let isExperienced = true;
let anything: any = "this is any type.";

anything = 21;
anything = true;

isExperienced = false;
// isExperienced = 21; ---> we can't give except data-type is "any"

age = 22.5; // there is no sepration like int and float, every decimals are also handleed by "number"

//How to define Arrays in ts
let arr: string[] = ["aman", "manan", "karan", "dipak"];
console.log(arr);
//another way
let arr2: Array<number> = [1, 2, 3, 4];
console.log(arr2);

//Tuples in ts:
let tp1: [number, boolean, string] = [1, false, "hemant"];
console.log(tp1);

//Practice task:
let city: string = "surat";
console.log(city);
console.log(age);

let isEnjoying: boolean = true;
console.log(isEnjoying);

let favTech: string[] = [".net", "angular", "react", "vue", "java"];
console.log(favTech);

let info: [number, string] = [22, "abc"];
console.log(info);

let UnknownEx: unknown = "UNknown";
let something: any = "21"; // we'll use this mostly.

if (typeof UnknownEx === "string") {
  console.log("this is a data of Type 'string' :" + UnknownEx);
}

if (typeof something === "string") {
  console.log("ERROR: this is NOT a data of Type 'string'" + something);
}

// console.log(UnknownEx.toUpperCase()); -->TypeScript does not allow calling methods on unknown without checking its type first.

if (typeof UnknownEx === "string") {
  console.log("Uppercase after Typechecking: " + UnknownEx.toUpperCase());
}

//understand the meaning of given function:
function Calculate(quantity: number, price: number): number {
  return quantity * price;
}
// Guj: આ ફંક્શન બે 'number' પેરામીટર્સની અપેક્ષા રાખે છે અને એક 'number' રીટર્ન કરે છે.

console.log(Calculate(20, 4));

//Type annotation and type inference

//Explicit Type Annotation
let ages: number = 10;
let arrr: string[] = [""];
let isLoading: boolean = true;

//Type Inference
let userName = "kbc"; // TypeScript infers 'string
let Age = 22; // TypeScript infers 'number'
let flags = [true, false, true]; // TypeScript infers 'boolean[]'

const user = {
  name: "bca",
  age: 30,
  isAdmin: true,
};

console.log(user.name);
console.log(user.age);

//Function : with optional parameter ?
function welcome(name: string, surname?: string): string {
  return `welcome mr.${name}`;
}
console.log(welcome("aryan", "dholakiya"));
console.log(welcome("aryan")); //optional parameter etle k no aapie to bhi chale

// function : with default value
function Heyy(message: string = "Heyy") {
  //ahiya koi return type nathi aapyo k function aaj type return krse j etle return na krvu pdyu
  console.log(message);
}
Heyy(); // Heyy
Heyy("Hiii, how are you?"); //Hiii, how are you?

function greetings(name?: string) {
  return `Hello, ${name || "stranger"}`;
}
console.log(greetings()); //Hello, stranger

//Arrow Functions:
const ArrowFn = (x: number, y: number) => {
  console.log(x * y);
};

ArrowFn(2, 3);

//ENUM : એટલે fixed values નો group — જે બદલાતો નથી

enum day {
  Mon,
  tue,
  wed,
  thu,
  fri,
  sat,
  sun,
}

let Today = day[0];
console.log(Today);

//Task:
//1.Create Enum → Department with values:
// IT, CS, EC, Civil, Mech

//2.Create Type Alias → Employee
// Fields:
// id (number)
// name (string)
// dept (Department enum)

//3. Create 2 employees using that type alias & console log them.

enum Department {
  IT = "Information Technology",
  CS = "Computer Science",
  EC = "Electircal Engineering",
  CIVIL = "Civil Engineering",
  MECH = "Mechanical Engineering",
}

let yourDegree: Department = Department.IT;
console.log("My Degree: " + yourDegree);

// Type Alias for Employee structure //Reusable custom type //વારંવાર લખવાનું ના પડે એ માટે typeને નામ આપી દીધું
type Employee = {
  id: number;
  name: string;
  dept: Department;
};

let emp1: Employee = {
  //emp1 → object (instance of Employee type) OR a variable holding that object
  id: 101,
  name: "raju",
  dept: Department.IT,
};

let emp2: Employee = {
  //emp1 → object (instance of Employee type) OR a variable holding that object
  id: 102,
  name: "shyam",
  dept: Department.CS,
};

console.log(emp1);
console.log("Only the Department of emp2: " + emp2.dept);

//Nullish Coalescing and Optional Chaining:- ?? "default value"
let month = null;
let CurrentMonth = month ?? "default value if month value is NULL or UNDEFINED";
console.log(CurrentMonth);

//optional chaining: ?.
let HomeNumber: number = 100;
let street: number = 2;
let City: string = "surat";

// console.log(HomeNumber?.street?.City) --> this is only use with the Objects not like this

let Use: string | null = null; // note that how we can give the type to variable.

type User = {
  name: string;
  address: {
    street: null;
    city?: string; // ahiyathi "?" kadhine ne "User" type na object ma juo su change aave 6 te//it gives error
  };
};

let user1: User = {
  name: "rajesh",
  address: {
    street: null,
    city: "surat",
  },
};

console.log("Name: " + user1?.name + " city: " + user1.address?.city);
// console.log(user1?.home); --> this will give compile time error because in ts it is not allowed when you already defined that user1: User --> it means ts ma ene khbr pdi jai k aama aatli properties to mlse j jo e nai hse to compile time error aapse.. for that we have to give ":any" type to object

let person: any = {
  name: "Aryan",
  address: { city: "Ahmedabad" },
};

console.log(person.address?.city); // Ahmedabad
console.log(person?.address?.pincode ?? "gfvhvgh");

//Array revision:

let names: string[] = ["shyam", "shayma", "rajja"];
names.push("ranii");
console.log("Array after push(): " + names);
names.pop();
console.log("Array after POP(): " + names);
names.shift();
console.log("Array after shift(): " + names);
names.unshift("NewPerson");
console.log("Array after unshift(): " + names);

//The readonly keyword can prevent arrays from being changed.
const ChangableArr: number[] = [1, 2, 3];
ChangableArr.push(4);
console.log("const Array after push(): " + ChangableArr);

let NoChangableArr: readonly number[] = [11, 22, 33];
// NoChangableArr.push(44); --> Property 'push' does not exist on type 'readonly number[]'.

//Type inference
let inferenceArray = [1, "raju", 1.1, true];
console.log(inferenceArray);

inferenceArray.push("hello");
console.log(inferenceArray);

let inferenceArray2 = [1, 2, 3, 4, 5];
// inferenceArray2.push("stringvalue"); --> Argument of type 'string' is not assignable to parameter of type 'number'.

//Type Aliases
type firstType = number;
// let firstVariable:firstType="hello" gives error bcz firstType if type number
let firstVariable = 111;

type secondType = string;
let secondVari: secondType = "noteIT";

type AnotherEx = {
  name: string;
  surname: string;
  age: number;
  mobileNumer?: number; // here this property is called "Optional property"
};

let cust1: AnotherEx = {
  name: "abcd",
  surname: "egfh",
  age: 10,
};

// interface: Interface defines the shape of an object

interface Emp {
  //dhyan khali e rakho k ahi Type Aliasis ni jem " = { }" nhi aave.
  EmpId: number;
  EmpName: string;
  EmpSalary?: number;
}

const Emp1: Emp = {
  EmpId: 101,
  EmpName: "axay",
  EmpSalary: 20000,
};

console.log(Emp1);
console.log(Emp1.EmpName);

//Union Type : | operator
function Total(paisa: number | string): void {
  console.log(`Total amount is: ${paisa}`);
}
Total(10000);
Total("Ten Thousand");

//Intersection Type: & operator:
interface person {
  name: string;
}
interface worker {
  salary: number;
}

type Manager = person & worker; //Manager પાસે 'name' અને 'role' બંને હોવા જોઈએ //note that we took "type" here

let A: Manager = {
  name: "gitanjali",
  salary: 35000,
};

let result: string | null = "Success";
// result = null;
console.log(result);

// interface in detail:

//1)interface with optional propeties:
interface student {
  name: string;
  rollNo: number;
  email?: string;
}

let stud1: student = {
  name: "vishal",
  rollNo: 64,
};
let stud2: student = {
  name: "krish",
  rollNo: 57,
  email: "krish@gmail.com",
};
stud2.email = "krish123@gmail.com";
console.log(stud2.email);

// 2) readonly properties in interface
interface radonlyEx {
  readonly name: string;
  age: number;
}

let newEx: radonlyEx = {
  name: "rajju",
  age: 22,
};
// newEx.name = "raj"; -->err: Cannot assign to 'name' because it is a read-only property
newEx.age = 23;
console.log((newEx.age = 24));

//3)Methods inside interface:
interface MethodableInterface {
  x: number;
  y: number;
  operation(a: number, b: number): void;
}

let ex2: MethodableInterface = {
  x: 100,
  y: 200,
  operation(a: number, b: number) {
    console.log(a * b);
  },
};
ex2.operation(10, 20); // o/p: 200

// 4) Interaface Inheritance: Intersection Type jevu

interface parent {
  surname: string;
  propertyAmt: number;
  debtAmt: number;
}

interface child extends parent {
  name: string;
}

interface child {
  //NOTE: we can reOpen same interface and add property in it
  education: string;
}

let child1: child = {
  name: "Abc",
  surname: "bcd",
  propertyAmt: 200000,
  debtAmt: 400000,
  education: "b.tech",
};

console.log(child1.debtAmt);

//Class in Ts.: A Class is a blueprint/template to create Objects in OOP

class Student {
  id: number = 0; //we must have to initialize the properties other wise it will shows error.
  name: string = "";

  // constructor(id:number, name:string) {  //we can make constructor if dont intialize the properties
  //   this.id = id;
  //   this.name = name
  // }

  display() {
    console.log(`ID: ${this.id}, Name: ${this.name}`);
  }
}

let stu = new Student();
stu.id = 1;
stu.name = "Aryan";
stu.display();

//Access Modifiers in Class

class car {
  public brand: string;
  private price: number;
  protected model: string;
  readonly date = new Date().getDate();

  constructor(brand: string, price: number, model: string) {
    this.brand = brand;
    this.price = price;
    this.model = model;
  }

  public carDetails(): string {
    return `Price is : ${this.price} & model is: ${this.model}`;
  }
}

let car1 = new car("TATA", 1000000, "Nexon");
console.log(car1.brand);
console.log(car1.carDetails());

console.log(car1.date);

class miniCar extends car {
  // public price:number;  ---> aane lidhe error aavse bcz ts ma parent class ma je property 6 ene child ma bnavo j ni em keva magse
  public name: string;
  constructor(price: number, name: string) {
    super("tata", price, "1000");
    this.name = name;
  }
}

let car2 = new miniCar(1000000, "Nexon");
console.log(car2.brand);
console.log(car2.carDetails());

//Super() keyword no use.:
class MotorCycle {
  public Engine: string;
  private price: number;
  protected model: string;

  constructor(Engine: string, price: number, model: string) {
    this.Engine = Engine;
    this.price = price;
    this.model = model;
  }

  public getdetails(): void {
    console.log(
      `Model of the motorCycle: ${this.model}, price is: ${this.price}, engine used ${this.Engine}`
    );
  }
}

class miniMotorcycle extends MotorCycle {
  public name: string;

  constructor(name: string) {
    super("b6Turbo", 100000, "honda");
    this.name = name;
  }
}

let moto1 = new miniMotorcycle("splendour");
moto1.getdetails();
