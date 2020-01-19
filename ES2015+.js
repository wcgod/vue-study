/*
 * 1. let, const -> block scope
 *    var -> function-scoped
 */

var a = 1;

if (true) {
  var a = 2;
}

console.log(a);

let b = 1;

if (true) {
  let b = 2;
}

console.log(b);

/*
 * 2. class
 */
function Person(name, address) {
  this.name = name;
  this.address = address;
}

const obj = new Person("wcgod", "incheon");
console.log(obj);

class SuperPerson {
  constructor() {
    console.log("Super constructor");
  }
}

// 자식클래스에서 슈퍼를 선언해줘야 에러가 안난다.
class Person extends SuperPerson {
  constructor(name, address) {
    super();
    console.log("constructor...");
    this.name = name;
    this.address = address;
  }

  //class properties

  //method
  getName() {
    return this.name;
  }
}

const obj = new Person("wcgod", "incheons");
console.log(obj.getName());

/*
 * 3. string literal
 */
// 개행문자도 문자열로 받아들인다(한줄띄워쓰기)
const str = "str" + obj.name;
const str2 = `str ${obj.name}`;
console.log(str);
console.log(str2);

/*
 * 4. spread operator
 */
//2015년 버전에는 array만 적용 2017년 버전은 객체도 포함
function myFunction(x, y, z) {
  console.log(`x: ${x}, y: ${y}, z: ${z}`);
}
const arr = [1, 2, 3];
const arr2 = [4, 5, 6];
myFunction(...arr);

arr.concat(arr2);

const arr3 = arr.concat(arr2);
const arr4 = [...arr, ...arr2];

console.log(arr3);
console.log(arr4);

const obj3 = { x: 1, person: { left } };
const obj4 = { y: 2 };

const obj5 = { ...obj3, ...obj4 };

console.log(obj5);
// 얕은 카피이므로 사용에 주의를 기울여야한다.

// 딥 카피
JSON.parse(JSON.stringify());

/*
 * 5. Deconstucturing
 */
const { person } = obj3;
console.log(person);

/*
 * 6. Promise
 */
//2015 이전에는 별도의 라이브러리 존재, 비동기 처리 작업, 가독성 증가
const asyncTask = (data, callback) => {
  setTimeout(() => {
    callback(data);
  }, 2000);
};

asyncTask("a", res => {
  console.log(res);

  asyncTask(res + "B", res2 => {
    console.log(res2);
  });
  // callback hell 발생
});

//promise 가 만들어지는 시점에 function 실행
const asyncTask = data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(data);
      } else {
        reject("Error!");
      }
    }, 2000);
  });
};

//catch 위치에 따라 에러 범위를 줄 수 있다.
asyncTask("A")
  .then(res => {
    console.log(res);
    return asyncTask(res + "B");
  })
  .then(res2 => {
    console.log(res2);
  })
  .catch(error => {
    console.log(error);
  });

/*
 * 7. async/await
 */
//ES 2017, ajax 통신할때 사용
async function myFunc() {
  try {
    const res = await asyncTask("A");
    const res2 = await asyncTask(res + "B");
    const res3 = await asyncTask(res + "C");
    console.log(res3);
  } catch (e) {
    console.error(e);
  }
}
myFunc();

/*
 * 8. arrow function
 */
// 사용시 주의해야한다.
const add = function(a, b) {
  return a + b;
}.bind(this);

const add2 = (a, b) => a + b;

console.log(add(1, 2));
console.log(add2(1, 2));
