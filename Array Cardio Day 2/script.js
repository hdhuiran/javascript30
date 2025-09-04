
const people = [
    { name: "Wes", year: 1988 },
    { name: "Kait", year: 1986 },
    { name: "Irv", year: 1970 },
    { name: "Lux", year: 2015 }
  ];
  
const comments = [
    { text: "Love this!", id: 523423 },
    { text: "Super good", id: 823423 },
    { text: "You are the best", id: 2039842 },
    { text: "Ramen is my fav food ever", id: 123523 },
    { text: "Nice Nice Nice!", id: 542328 }
];
const currentYear = (new Date()).getFullYear();
// 检查 people 数组中是否至少有一个人成年
// .some() 方法一旦收到第一个 true，它就立刻停止继续检查后面的元素，并最终返回 true。
const isAdult = people.some(person => {
    // getFullYear()：是Date对象的一个方法，用于从日期中获取四位数的年份（比如2023）。
   
    return currentYear - person.year >= 18;

})

// {isAdult}：这是在console.log中使用了对象字面量的简写语法。
// 通常，如果想输出一个变量，同时想给它一个标签，可以这样做：console.log({isAdult: isAdult})
// 在ES6中，当对象的属性名和变量名相同时，可以简写为 {isAdult}，这等价于 {isAdult: isAdult}。
// 这样输出会在控制台显示一个对象，有一个属性名为isAdult，属性值为变量isAdult的值。这样更容易识别输出的是哪个变量。
console.log({isAdult});

// .every() 方法一旦收到第一个 false，它就立刻停止检查，并最终返回 false。
const allAdult = people.every(person => {
    return currentYear - person.year >=18;
})

console.log({allAdult});

// 目标: 从 comments 数组中，找出 id 正好是 823423 的那一条评论。
// 如何使用 .find() 方法来查找数组中第一个满足条件的元素，并将其返回
const comment = comments.find(comment =>{return comment.id === 823423});

console.log(comment);

// 查找数组中第一个满足条件的元素的索引
const index = comments.findIndex(comment => comment.id ===823423);

console.log(index);

// 这是删除数组元素的一种方法。.splice() 会直接修改原数组。index 是开始删除的位置，1 是要删除的元素数量。
// comments.splice(index, 1);

// .slice() 方法用来“切片”数组，它返回一个新数组，但不修改原数组。
// slice(startIndex, endIndex) (两个参数):
// 这行代码会从索引 0 开始，一直复制到 index（但不包括 index）之前的所有元素。也就是复制了所有在要删除的评论之前的评论。
const newComments = [
    ...comments.slice(0, index),

// 如果只提供一个参数，它的意思就是：“从 startIndex 开始提取，一直提取到数组的末尾”
// 这行代码会从 index + 1 (也就是被删除评论的下一个位置) 开始，一直复制到数组末尾的所有元素。也就是复制了所有在要删除的评论之后的评论。
// ...: 展开语法。它把前面两个“切片”数组中的所有元素都取出来，放进 newComments 这个新数组里。
    ...comments.slice(index + 1)
];

console.table(newComments);