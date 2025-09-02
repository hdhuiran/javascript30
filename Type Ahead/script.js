//  这个 URL 指向一个 json 文件，里面包含了美国所有城市和州的数据列表。将 URL 存为常量可以方便后续的引用和修改。
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// blob: 这个参数代表服务器返回的原始响应数据，它是一种原始的、未处理的格式。
// blob.json(): 这是一个方法，用来将原始的响应数据解析成 JSON 格式。这个解析过程本身也是异步的，所以它也会返回一个新的 Promise。
// data: 这个参数就是我们最终得到的、解析好的 JavaScript 数组（里面包含了所有的城市对象）。
// 这里的 ... 是展开语法 (Spread Syntax)，它能把 data 数组里的所有元素一个一个地取出来，再 push 进 cities 数组
fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));