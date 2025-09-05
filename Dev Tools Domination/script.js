const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 },{name:'text',age:'none'}];
const p = document.querySelector('p');

function makeGreen() {
    p.style.color = '#BADA55';
    p.style.fontSize = '50px';
}

console.log('hello');

// 第一个参数是模板字符串，%s 是一个占位符，代表“这里将来要放一个字符串”。
// 第二个参数 '💩' 就会被自动替换掉 %s 的位置。最终输出 "Hello I am a 💩 string!"。
console.log('Hello I am a %s string!','💩');

// 这里的占位符是 %c，代表“这里的文本要应用 CSS 样式”。第二个参数就是应用的 CSS 样式字符串。
// 这行代码会在控制台打印出一段巨大的、带有红色背景和蓝色阴影的文字。
console.log('%c I am some great text', 'font-size:50px; background:red; text-shadow: 10px 10px 0 blue');

// 使用 console.warn() 会在控制台打印出一条黄色的、带有警告图标的信息。
// 它通常用来提示开发者一些虽然不是错误、但可能存在潜在风险的情况。
console.warn('警告~警告');

// 使用 console.error() 会在控制台打印出一条红色的、带有错误图标的信息，
// 并且通常会附带一个代码调用栈的追踪信息，能快速定位到是哪一行代码出了问题。
console.error("红温了");

// console.info() 在大多数浏览器中的表现和 console.log() 几乎一样，
// 有时会带有一个小小的 "i" 图标。它用于打印一般性的提示信息
console.info('每年死于鳄鱼的人不为0');

// console.assert(condition, message) 是一个非常有用的调试工具。它会先判断第一个参数 condition 的真假
// 如果 condition 为 true，console.assert 什么也不做。
// 如果 condition 为 false，它就会在控制台打印出第二个参数 message 作为一条错误信息。
console.assert(p.classList.contains('haha'),'出问题了，p元素里不包含haha这个类别');

// 调用 console.clear() 会清空控制台当前所有的输出信息，还你一个干净的界面。
// 可以在浏览器的F12里试试，一点没毛病嗷
// console.clear();

// console.log(p) 通常会以一种类似 HTML 标签的形式打印出这个 DOM 元素。
// console.dir(p) 会把这个 DOM 元素看作一个纯粹的 JavaScript 对象，然后以可交互的、树状的列表形式，展示出这个对象身上挂载的所有属性和方法。
// 当你需要深入检查一个 DOM 元素的具体属性时，console.dir() 非常有用。
console.log(p);
console.dir(p);

// console.groupCollapsed(label) 开始一个默认折叠的分组，console.groupEnd(label) 结束这个分组。
// 所有在这两者之间的 console 输出都会被收纳进这个可展开的组里，让控制台界面非常整洁。
// console.group(label) 的功能一样，只是默认是展开的。
dogs.forEach(dog =>{
    console.groupCollapsed(`${dog.name}`);
    console.log(`this is ${dog.name}`);
    if(typeof (dog.age) === 'number' &&!isNaN(dog.age)){
    console.log(`${dog.name} is ${dog.age} years old`);
    console.log(`${dog.name} is ${dog.age * 7} years old`);}
    else{
        console.warn(`${dog.name}`+' age is not a number');
    }
    
    console.groupEnd(`${dog.name}`);
})

// const abc = 'a';
// console.log(abc * 7);
// 会打印出nan，代表not a number

// console.count(label) 会记录下你用同一个 label (标签字符串) 调用它的次数。
// 每次调用，它都会在控制台打印出这个标签和它当前的计数值。
console.count('Wes');
console.count('Wes');
console.count('Steve');
console.count('Steve');
console.count('Wes');
console.count('Steve');
console.count('Wes');
console.count('Steve');
console.count('Steve');
console.count('Steve');
console.count('Steve');
console.count('Steve');

// console.time(label) 启动一个计时器，并给它一个名字。console.timeEnd(label) 会停止同名计时器，
// 并在控制台打印出从开始到结束所经过的精确毫秒数。这是测量异步操作或复杂计算耗时的绝佳工具。
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
.then(data => data.json())
.then(data =>{
    console.timeEnd('fetching data');
    console.log(data);
})

// 给 console.table() 传入一个数组（数组中的元素最好是结构一致的对象）或一个对象时，
// 它会把数据以非常美观、可排序的表格形式打印出来，极大地提高了可读性。
// 之前小项目里试过了
console.table(dogs);