// 1. 基本类型的演示
let age = 100;
let age2 = age; // 这里是“值复制”
console.log(age, age2); // 输出: 100 100
age = 200; // 修改原始变量 age
console.log(age, age2); // 输出: 200 100 (age2 毫发无损)

let name = "Wes";
let name2 = name;
console.log(name, name2);
name = "wesley";
console.log(name, name2);

// 2. 数组的“引用”问题
const players = ["Wes", "Sarah", "Ryan", "Poppy"];

// 这里的“=”是“引用赋值”
const team = players;

console.log(players, team);
// 输出: ["Wes", "Sarah", "Ryan", "Poppy"]  ["Wes", "Sarah", "Ryan", "Poppy"]

// 让我们试着修改“副本”
// team[3] = "Lux";

// 现在检查一下原数组
console.log(players, team);
// 震惊的输出: ["Wes", "Sarah", "Ryan", "Lux"]  ["Wes", "Sarah", "Ryan", "Lux"]
// 原数组也被修改了！

// players 是一个数组（引用类型）。当执行 const team = players; 时，JS 没有创建一个新数组。
// 它只是创建了一个新的“指针”或“遥控器”叫做 team，让它和 players 指向同一个位于内存中的数组。
// 所以，通过 team 这个遥控器修改了数组内容，players 这个遥控器自然也会看到同样的变化。

// 3. 如何正确地“浅拷贝”数组
// 方法1: slice()
const team2 = players.slice();
team2[3] = "Lux"; // 修改副本
console.log(players, team2); // 原数组 players 不再受影响

// 方法2: concat()
const team3 = [].concat(players);
// console.log(team3,team);

// 方法3: ES6 展开语法 (最常用)
const team4 = [...players];
// console.log(team4,team)

// 方法4: Array.from()
const team5 = Array.from(players);

// 逻辑: 这四种方法都会创建一个全新的、第一层独立的数组。
// 它们会遍历原始的 players 数组，然后把里面的每一个元素（这里是字符串）一个一个地放进这个新数组里。
// 这样，team2, team3 等就和 players 脱离了关系（至少在第一层上）。

// 4. 对象的“引用”与“浅拷贝”
const person = {
    name: "Wes Bos",
    age: 80
};
  
// 引用赋值，修改 captain 会影响 person
const captain = person;
captain.number = 99; // person 也会多出一个 number: 99 的属性
  
// --- 正确的浅拷贝方法 ---
  
// 方法1: Object.assign()
// 创建一个新对象 {}，把 person 的属性复制进去，再把新属性也加进去
const cap2 = Object.assign({}, person, { number: 99, age: 12 });
console.log(person); // 不受影响
console.log(cap2); // { name: 'Wes Bos', age: 12, number: 99 }
  
// 方法2: ES6 展开语法 (最常用)
const cap3 = { ...person };

// 逻辑: 和数组的浅拷贝一样，Object.assign() 和 {...person} 都会创建一个全新的、第一层独立的对象。

// 5. 浅拷贝的局限性与深拷贝
const wes = {
    name: "Wes",
    age: 100,
    social: { // 这是一个嵌套对象
      twitter: "@wesbos",
      facebook: "wesbos.developer"
    }
};
  
const dev = Object.assign({}, wes); // 浅拷贝
  
// dev.social.twitter = "@coolman"; // 修改副本的第二层属性
console.log(wes.social.twitter); // 输出: "@coolman" -> 原数组的第二层也被修改了！

// 逻辑: Object.assign({}, wes) 只创建了一个新的顶层对象。
// 对于 social 这个属性，它复制的只是一个指向原始 social 对象的“遥控器”。
// 所以通过 dev 修改 social，wes 里的 social 也会跟着变。

// 深拷贝的简单方法
const dev2 = JSON.parse(JSON.stringify(wes));
dev2.social.twitter = "@coolman"; // 修改深拷贝副本
console.log(wes.social.twitter); // 输出: "@wesbos" -> 原数组毫发无损！