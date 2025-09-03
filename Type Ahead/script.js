//  这个 URL 指向一个 json 文件，里面包含了美国所有城市和州的数据列表。将 URL 存为常量可以方便后续的引用和修改。
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const cities = [];

// blob: 这个参数代表服务器返回的原始响应数据，它是一种原始的、未处理的格式。
// blob.json(): 这是一个方法，用来将原始的响应数据解析成 JSON 格式。这个解析过程本身也是异步的，所以它也会返回一个新的 Promise。
// data: 这个参数就是我们最终得到的、解析好的 JavaScript 数组（里面包含了所有的城市对象）。
// 这里的 ... 是展开语法 (Spread Syntax)，它能把 data 数组里的所有元素一个一个地取出来，再 push 进 cities 数组
fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));

// 封装依据用户关键字搜索的地区或州
function findMatches(wordToMatch,cities){
    return cities.filter(place => {
        // 创建正则表达式示例，gi的g代表全局搜索，i代表不分大小写
        const regex = new RegExp(wordToMatch,'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
}

// 这个正则表达式：用一种叫做**“零宽断言 (Lookaround)”** 的高级技巧，来管理匹配位置的优先级，确保逗号只加在“正确”的位置上。
// \b（小写b）：在正则表达式里，它代表“单词的边界”。比如空格和字母之间的那个“缝隙”。
// \B（大写B）：它的意思恰恰相反，代表**“非单词边界”。在数字里，\B 就代表两个数字之间的那个“缝隙”**。
// 这部分 (?=...) 就是“划分计算顺序”的部分，它叫做**“正向先行断言 (Positive Lookahead)”**。
// 检查后面的内容是否符合（）里的模式 ...，但它并不会真的把光标移动过去。
// 第一个模式是 \d{3}，意思是“连续的三个数字”。
// +: + 号意思是“一次或多次”。
// (\d{3})+: 组合起来就是**“我后面跟着的，必须是‘一组或多组三个数字’”**。
// (?!\d)叫做“负向先行断言”，它的意思是“往后看，但必须不能是某个模式”。
// 在这里 (?!\d) 就是确保找到的“三位数组合”的末尾必须是字符串的结尾，而不是还有别的数字。这是为了处理 12345 这种情况，防止在 12 后面加逗号。
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

  

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    // console.log(matchArray);

    // 遍历这 10 个城市。对于每一个城市，比如 "Boston"，使用 replace 方法，把里面的 "Bos"（因为正则不区分大小写）替换成 <span class="hl">Bos</span>。
    const html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');
    //   console.log(regex);
      
    // .replace(要查找的内容, 用来替换的新内容),这里replace 方法的唯一目的，就是实现“关键词高亮”这个炫酷的视觉效果。 如果没有它，搜索功能依然能用，但结果会非常朴素。
    // 首先在输入框里输入 bos。
    // findMatches 函数成功筛选出包含 bos 的城市，比如 Boston。 
    // .map() 遍历到 Boston 这个城市对象 (place)。
    // const cityName = place.city.replace(...) -> 这一步是关键！
    // place.city 是 "Boston"。
    // regex 是根据你的输入 "bos" 创建的正则表达式。
    // replace 方法会在 "Boston" 中找到匹配 "bos" 的部分（也就是 "Bos"，因为不区分大小写）。
    // 然后，它会把找到的 "Bos" 替换成字符串 "<span class="hl">bos</span>"。
    // 所以，cityName 变量最终的值是一个包含了 HTML 标签的特殊字符串："<span class="hl">Bos</span>ton"。
    // return <li>...-> 返回的 HTML 字符串是<li><span class="name"><span class="hl">Bos</span>ton, Massachusetts</span>...</li>`。
    // 最终效果：当这段 HTML 被插入到页面时，浏览器会渲染它。里面的 <span class="hl"> 会被 CSS 规则（.hl { background: #ffc600; }）选中，给它一个黄色的背景。就看到了关键词被高亮的效果！
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    // console.log(cityName);
      
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
    //  把一个数组里的所有元素，用指定的分隔符，拼接成一个长长的字符串
    }).join('');
    suggestions.innerHTML = html;
}


searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);