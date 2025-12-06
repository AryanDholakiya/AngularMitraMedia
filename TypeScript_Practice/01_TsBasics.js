var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a, _b, _c, _d;
var Message = "Typescript Setup Done!";
console.log("Hello " + Message);
function greet(name) {
    return "Hello, ".concat(name);
}
var msg = greet("raja");
console.log(msg);
function hello(name) {
    return "hello Brother".concat(" ", name, "!");
    // return "hello Brother".concat(" " + name, "!");  // we can do like this also
}
var mess = hello("rani");
console.log(mess);
//dataType in ts: number, string, boolean, any.
var fullname = "abc bcd";
var age = 21;
var isExperienced = true;
var anything = "this is any type.";
anything = 21;
anything = true;
isExperienced = false;
// isExperienced = 21; ---> we can't give except data-type is "any"
age = 22.5; // there is no sepration like int and float, every decimals are also handleed by "number"
//How to define Arrays in ts
var arr = ["aman", "manan", "karan", "dipak"];
console.log(arr);
//another way
var arr2 = [1, 2, 3, 4];
console.log(arr2);
//Tuples in ts:
var tp1 = [1, false, "hemant"];
console.log(tp1);
//Practice task:
var city = "surat";
console.log(city);
console.log(age);
var isEnjoying = true;
console.log(isEnjoying);
var favTech = [".net", "angular", "react", "vue", "java"];
console.log(favTech);
var info = [22, "abc"];
console.log(info);
var UnknownEx = "UNknown";
var something = "21"; // we'll use this mostly.
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
function Calculate(quantity, price) {
    return quantity * price;
}
// Guj: આ ફંક્શન બે 'number' પેરામીટર્સની અપેક્ષા રાખે છે અને એક 'number' રીટર્ન કરે છે.
console.log(Calculate(20, 4));
//Type annotation and type inference
//Explicit Type Annotation
var ages = 10;
var arrr = [""];
var isLoading = true;
//Type Inference
var userName = "kbc"; // TypeScript infers 'string
var Age = 22; // TypeScript infers 'number'
var flags = [true, false, true]; // TypeScript infers 'boolean[]'
var user = {
    name: "bca",
    age: 30,
    isAdmin: true,
};
console.log(user.name);
console.log(user.age);
//Function : with optional parameter ?
function welcome(name, surname) {
    return "welcome mr.".concat(name);
}
console.log(welcome("aryan", "dholakiya"));
console.log(welcome("aryan")); //optional parameter etle k no aapie to bhi chale
// function : with default value
function Heyy(message) {
    if (message === void 0) { message = "Heyy"; }
    //ahiya koi return type nathi aapyo k function aaj type return krse j etle return na krvu pdyu
    console.log(message);
}
Heyy(); // Heyy
Heyy("Hiii, how are you?"); //Hiii, how are you?
function greetings(name) {
    return "Hello, ".concat(name || "stranger");
}
console.log(greetings()); //Hello, stranger
//Arrow Functions:
var ArrowFn = function (x, y) {
    console.log(x * y);
};
ArrowFn(2, 3);
//ENUM : એટલે fixed values નો group — જે બદલાતો નથી
var day;
(function (day) {
    day[day["Mon"] = 0] = "Mon";
    day[day["tue"] = 1] = "tue";
    day[day["wed"] = 2] = "wed";
    day[day["thu"] = 3] = "thu";
    day[day["fri"] = 4] = "fri";
    day[day["sat"] = 5] = "sat";
    day[day["sun"] = 6] = "sun";
})(day || (day = {}));
var Today = day[0];
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
var Department;
(function (Department) {
    Department["IT"] = "Information Technology";
    Department["CS"] = "Computer Science";
    Department["EC"] = "Electircal Engineering";
    Department["CIVIL"] = "Civil Engineering";
    Department["MECH"] = "Mechanical Engineering";
})(Department || (Department = {}));
var yourDegree = Department.IT;
console.log("My Degree: " + yourDegree);
var emp1 = {
    //emp1 → object (instance of Employee type) OR a variable holding that object
    id: 101,
    name: "raju",
    dept: Department.IT,
};
var emp2 = {
    //emp1 → object (instance of Employee type) OR a variable holding that object
    id: 102,
    name: "shyam",
    dept: Department.CS,
};
console.log(emp1);
console.log("Only the Department of emp2: " + emp2.dept);
//Nullish Coalescing and Optional Chaining:- ?? "default value"
var month = null;
var CurrentMonth = month !== null && month !== void 0 ? month : "default value if month value is NULL or UNDEFINED";
console.log(CurrentMonth);
//optional chaining: ?.
var HomeNumber = 100;
var street = 2;
var City = "surat";
// console.log(HomeNumber?.street?.City) --> this is only use with the Objects not like this
var Use = null; // note that how we can give the type to variable.
var user1 = {
    name: "rajesh",
    address: {
        street: null,
        city: "surat",
    },
};
console.log("Name: " + (user1 === null || user1 === void 0 ? void 0 : user1.name) + " city: " + ((_a = user1.address) === null || _a === void 0 ? void 0 : _a.city));
// console.log(user1?.home); --> this will give compile time error because in ts it is not allowed when you already defined that user1: User --> it means ts ma ene khbr pdi jai k aama aatli properties to mlse j jo e nai hse to compile time error aapse.. for that we have to give ":any" type to object
var person = {
    name: "Aryan",
    address: { city: "Ahmedabad" },
};
console.log((_b = person.address) === null || _b === void 0 ? void 0 : _b.city); // Ahmedabad
console.log((_d = (_c = person === null || person === void 0 ? void 0 : person.address) === null || _c === void 0 ? void 0 : _c.pincode) !== null && _d !== void 0 ? _d : "gfvhvgh");
//Array revision:
var names = ["shyam", "shayma", "rajja"];
names.push("ranii");
console.log("Array after push(): " + names);
names.pop();
console.log("Array after POP(): " + names);
names.shift();
console.log("Array after shift(): " + names);
names.unshift("NewPerson");
console.log("Array after unshift(): " + names);
//The readonly keyword can prevent arrays from being changed.
var ChangableArr = [1, 2, 3];
ChangableArr.push(4);
console.log("const Array after push(): " + ChangableArr);
var NoChangableArr = [11, 22, 33];
// NoChangableArr.push(44); --> Property 'push' does not exist on type 'readonly number[]'.
//Type inference
var inferenceArray = [1, "raju", 1.1, true];
console.log(inferenceArray);
inferenceArray.push("hello");
console.log(inferenceArray);
var inferenceArray2 = [1, 2, 3, 4, 5];
// let firstVariable:firstType="hello" gives error bcz firstType if type number
var firstVariable = 111;
var secondVari = "noteIT";
var cust1 = {
    name: "abcd",
    surname: "egfh",
    age: 10,
};
var Emp1 = {
    EmpId: 101,
    EmpName: "axay",
    EmpSalary: 20000,
};
console.log(Emp1);
console.log(Emp1.EmpName);
//Union Type : | operator
function Total(paisa) {
    console.log("Total amount is: ".concat(paisa));
}
Total(10000);
Total("Ten Thousand");
var A = {
    name: "gitanjali",
    salary: 35000,
};
var result = "Success";
// result = null;
console.log(result);
var stud1 = {
    name: "vishal",
    rollNo: 64,
};
var stud2 = {
    name: "krish",
    rollNo: 57,
    email: "krish@gmail.com",
};
stud2.email = "krish123@gmail.com";
console.log(stud2.email);
var newEx = {
    name: "rajju",
    age: 22,
};
// newEx.name = "raj"; -->err: Cannot assign to 'name' because it is a read-only property
newEx.age = 23;
console.log((newEx.age = 24));
var ex2 = {
    x: 100,
    y: 200,
    operation: function (a, b) {
        console.log(a * b);
    },
};
ex2.operation(10, 20); // o/p: 200
var child1 = {
    name: "Abc",
    surname: "bcd",
    propertyAmt: 200000,
    debtAmt: 400000,
    education: "b.tech",
};
console.log(child1.debtAmt);
//Class in Ts.: A Class is a blueprint/template to create Objects in OOP
var Student = /** @class */ (function () {
    function Student() {
        this.id = 0; //we must have to initialize the properties other wise it will shows error.
        this.name = "";
    }
    // constructor(id:number, name:string) {  //we can make constructor if dont intialize the properties
    //   this.id = id;
    //   this.name = name
    // }
    Student.prototype.display = function () {
        console.log("ID: ".concat(this.id, ", Name: ").concat(this.name));
    };
    return Student;
}());
var stu = new Student();
stu.id = 1;
stu.name = "Aryan";
stu.display();
//Access Modifiers in Class
var car = /** @class */ (function () {
    function car(brand, price, model) {
        this.date = new Date().getDate();
        this.brand = brand;
        this.price = price;
        this.model = model;
    }
    car.prototype.carDetails = function () {
        return "Price is : ".concat(this.price, " & model is: ").concat(this.model);
    };
    return car;
}());
var car1 = new car("TATA", 1000000, "Nexon");
console.log(car1.brand);
console.log(car1.carDetails());
console.log(car1.date);
var miniCar = /** @class */ (function (_super) {
    __extends(miniCar, _super);
    function miniCar(price, name) {
        var _this = _super.call(this, "tata", price, "1000") || this;
        _this.name = name;
        return _this;
    }
    return miniCar;
}(car));
var car2 = new miniCar(1000000, "Nexon");
console.log(car2.brand);
console.log(car2.carDetails());
//Super() keyword no use.:
var MotorCycle = /** @class */ (function () {
    function MotorCycle(Engine, price, model) {
        this.Engine = Engine;
        this.price = price;
        this.model = model;
    }
    MotorCycle.prototype.getdetails = function () {
        console.log("Model of the motorCycle: ".concat(this.model, ", price is: ").concat(this.price, ", engine used ").concat(this.Engine));
    };
    return MotorCycle;
}());
var miniMotorcycle = /** @class */ (function (_super) {
    __extends(miniMotorcycle, _super);
    function miniMotorcycle(name) {
        var _this = _super.call(this, "b6Turbo", 100000, "honda") || this;
        _this.name = name;
        return _this;
    }
    return miniMotorcycle;
}(MotorCycle));
var moto1 = new miniMotorcycle("splendour");
moto1.getdetails();
