const inventors = [
    { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
    { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
    { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
    { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
    { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
    { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
    { first: "Max", last: "Planck", year: 1858, passed: 1947 },
    { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
    { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
    { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
    { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
    { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 }
  ];
  
  const people = [
    "Beck, Glenn",
    "Becker, Carl",
    "Beckett, Samuel",
    "Beddoes, Mick",
    "Beecher, Henry",
    "Beethoven, Ludwig",
    "Begin, Menachem",
    "Belloc, Hilaire",
    "Bellow, Saul",
    "Benchley, Robert",
    "Benenson, Peter",
    "Ben-Gurion, David",
    "Benjamin, Walter",
    "Benn, Tony",
    "Bennington, Chester",
    "Benson, Leana",
    "Bent, Silas",
    "Bentsen, Lloyd",
    "Berger, Ric",
    "Bergman, Ingmar",
    "Berio, Luciano",
    "Berle, Milton",
    "Berlin, Irving",
    "Berne, Eric",
    "Bernhard, Sandra",
    "Berra, Yogi",
    "Berry, Halle",
    "Berry, Wendell",
    "Bethea, Erin",
    "Bevan, Aneurin",
    "Bevel, Ken",
    "Biden, Joseph",
    "Bierce, Ambrose",
    "Biko, Steve",
    "Billings, Josh",
    "Biondo, Frank",
    "Birrell, Augustine",
    "Black, Elk",
    "Blair, Robert",
    "Blair, Tony",
    "Blake, William"
  ];

// 1. 筛选出所有在16世纪（1500-1599年）出生的发明家
//  .filter() 方法会创建一个新数组。
//  它会遍历 inventors 数组中的每一个 inventor 对象。
//  对于每一个 inventor，它都会执行箭头函数里的判断条件。
//  当箭头函数使用花括号时，必须使用return语句明确返回值，否则函数默认返回undefined。
const fifteen_return = inventors.filter(
    inventor => {return inventor.year>=1500 && inventor.year < 1600}
);
// 这是不使用花括号，直接输出使用表达式
const fifteen = inventors.filter(
    inventor => inventor.year>=1500 && inventor.year < 1600
);

console.log(fifteen_return);

// console.table() 是一个非常有用的命令，它会把一个数组或对象以表格的形式打印在控制台，非常清晰
console.table(fifteen);

// 2. 创建一个新数组，只包含所有发明家的姓和名
const fullName = inventors.map(inventor => `${inventor.first} ${inventor.last}`);

console.table(fullName);

// 3. 按照发明家的出生年份，从早到晚进行排序
// sort() 方法需要一个比较函数，这个函数应该返回三种可能的值：
// 负数：表示 a 应该排在 b 前面
// 正数：表示 a 应该排在 b 后面
// 零：表示 a 和 b 的顺序不变
// 如果 a.year - b.year 是负数，a 排在 b 前面
// 如果 a.year - b.year 是正数，a 排在 b 后面
// 如果 a.year - b.year 是零，顺序不变
// 升序排列（从小到大）
const oldestToYoungest = inventors.sort((a,b) => a.year - b.year);

console.table(oldestToYoungest);

// 4. 计算所有发明家加起来一共活了多少岁
// .reduce() 方法非常强大，它可以把一个数组“reduce（浓缩）”成一个单一的值。
// reduce 的基本语法是这样的：.reduce(处理函数, 初始值);
// `0`：这就是初始值。第一次执行回调函数时，`total` 的值就是 0。
// 第一个参数`total`：我们称之为“累加器”。它是上一次回调函数执行的返回值。
// 第二个参数`inventor`：数组中当前正在被处理的元素。参数顺序很重要
// 整个过程是：
//  1. total 初始为 0。
//  2. 处理第一个发明家 (爱因斯坦)，计算他的寿命 (passed - year)，加到 total 上。函数返回新的 total。
//  3. 新的 total 被传到下一次执行，再处理第二个发明家 (牛顿)，计算寿命，再加到 total 上...
//  4. 直到所有发明家都被处理完，最终的 total 值被返回。
const totalYears = inventors.reduce((total,inventor)=>{return total + (inventor.passed - inventor.year);},0);
console.log(totalYears);

// 5. 按照发明家寿命进行排序,Array.prototype.sort() 方法会直接修改（或者说“突变”，mutate）它所操作的原始数组，而不是返回一个全新的、排好序的数组。
// 升序
// const liveYearsAsc = inventors.sort((a,b) => a.passed - a.year - (b.passed - b.year));
// 降序
// const liveYearsDesc = inventors.sort((a,b) => b.passed - b.year - (a.passed - a.year));

// --- 升序 ---
// 先用 [...] 创建一个 inventors 的副本，然后对副本进行排序
const liveYearsAsc = [...inventors].sort((a,b) => (a.passed - a.year) - (b.passed - b.year));

// --- 降序 ---
// 再次创建一个新的副本进行排序
const liveYearsDesc = [...inventors].sort((a,b) => (b.passed - b.year) - (a.passed - a.year));

console.log(liveYearsAsc);
console.log(liveYearsDesc);

// 6. 从给定的维基百科页面上，筛选出所有名字中包含 'de' 这个词的巴黎林荫大道 (Boulevards in Paris)，并把它们打印出来。
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

// 在当前的维基百科页面上，查找第一个 CSS 类名为 .mw-category 的 HTML 元素
// 
// const category = document.querySelector(".mw-category");

// 上一步找到的 category 元素内部，继续查找所有的 <a> 标签（也就是所有的超链接）。这会返回一个 NodeList，里面包含了所有大道名称的链接。
// Array.from(...): querySelectorAll 返回的是一个 NodeList，它不是一个真正的数组，很多数组方法（比如 .map, .filter）在旧的浏览器里不能直接使用。
// Array.from() 的作用就是把它转换成一个真正的 JavaScript 数组
//
// const lists = Array.from(category.querySelectorAll("a"));


// 它是一个链式调用，把两个数组方法串在了一起，数据会像流水一样依次通过这两个处理站：
// .map(item => item.textContent):
// .map() 方法会遍历 lists 数组中的每一个 <a> 元素。
// item.textContent 会提取出每个 <a> 元素内部的文本内容（也就是我们看到的大道名字）。
// 这一步处理完后，我们会得到一个只包含大道名字字符串的新数组，例如 ['Boulevard Auguste-Blanqui', 'Boulevard Barbès', ...]。
// .filter(streetName => streetName.includes("de")):
// .filter() 方法会紧接着处理上一步 .map() 生成的那个名字字符串数组。
// 它会遍历每一个街道名字 streetName。
// streetName.includes("de") 是一个字符串方法，用来判断一个字符串中是否包含另一个子字符串（这里是 'de'）。如果包含，返回 true；不包含，返回 false。
// .filter() 会保留所有让 includes("de") 返回 true 的街道名字，组成最终的新数组。
// 
// const de = lists.map(item => item.textContent).filter(streetName => streetName.includes("de"));

// console.log(de);


// 7. 对 people 数组进行排序，按照姓氏的字母顺序
const alpha = [...people].sort((a, b) => {
    // 1. 分割字符串，把整个字符串劈成两段
    const astr = a.split(", "); 
    const bstr = b.split(", ");
  
    // 2. 比较 姓氏 并返回结果，如果是astr[1]就是比较名字
    // 会从第一个字母开始，逐个对比两个字符串中每个字符的顺序。这个规则叫做**“字典序” (Lexicographical Order)**，跟你在查字典时单词的排列顺序一模一样。
    // 计算机内部是这样工作的：
    // 比较第一个字符：比较 'B' 和 'B'。嗯，它们是一样的，无法分出胜负。
    // 比较第二个字符：比较 'e' 和 'e'。还是一样。
    // 比较第三个字符：比较 'c' 和 'n'。好了，现在不一样了！
    // 得出结论：在字母表中，'c' 排在 'n' 的前面，所以计算机会判定 'Becker' 小于 'Bentsen'。因此，'Becker' > 'Bentsen' 的结果是 false。
    // 这个比较规则适用于所有字符，而不仅仅是26个字母。 它基于一个叫做 Unicode (或 ASCII) 的标准字符编码表，每个字符（包括数字、符号、汉字等）都有一个唯一的数字码。比较字符串，本质上就是在比较这些数字码的大小。
    return astr[0] - bstr[0] ; 
});

console.table(alpha);

// 8. 使用 reduce 方法，统计数据中每种交通工具的数量
const data = [
    "car",
    "car",
    "truck",
    "truck",
    "bike",
    "walk",
    "car",
    "van",
    "bike",
    "walk",
    "car",
    "van",
    "car",
    "truck"
  ];
// 原材料 (The Array)：data 数组 ['car', 'car', 'truck', ...] 就是被送进工厂的一箱原材料。
// 加工站 (The Callback Function)：那个箭头函数 (obj, item) => { ... }，就是流水线上的一个“加工站”。设计了这个加工站的功能（统计数量）
// 并告诉它需要两个输入口：obj（用来放半成品）和 item（用来放单个原材料）。
// 初始模具 (The Initial Value)：初始值 {}，就像是流水线起点的一个空箱子。
// reduce 工厂的内部运作 (The Magic)：
// 工厂的总控制系统（reduce 方法的内部代码）启动了。

// 第一次运行：它从原材料箱子里拿出第一个物件 'car'。然后，它调用“加工站”，把“空箱子 {}”塞进 obj 输入口，把 'car' 塞进 item 输入口。
// 加工站开始工作，一番操作后 (if 判断、obj[item]++)，从出口吐出一个新的箱子 { car: 1 }。

// 第二次运行：总控制系统接住这个 { car: 1 } 的箱子。然后，它从原材料箱子里拿出第二个物件，还是 'car'。它再次调用加工站，把 { car: 1 } 塞进 obj 输入口，把新的 'car' 塞进 item 输入口。
// 加工站再次工作，吐出一个更新后的箱子 { car: 2 }。

// 第三次运行：总控制系统接住 { car: 2 }。从原材料箱子拿出第三个物件 'truck'...
// 这个过程会一直重复，reduce 的总控制系统内置了一个循环，它会按顺序、一个不漏地从数组中取出元素，然后每一次都用正确的参数（上一次的结果 和 当前的新元素）来调用提供给它的那个加工站（回调函数）。
  const transportation = data.reduce((obj, item) => {
    if (!obj[item]) {
      obj[item] = 0;
    }
    obj[item]++;
    return obj;
  }, {});
  console.log(transportation);