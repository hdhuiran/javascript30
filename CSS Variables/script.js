const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
  // this.dataset.sizing 用来读取 HTML 里的 data-sizing 属性。
  // 对于 spacing 和 blur 滑块，它们有 data-sizing="px"，所以 this.dataset.sizing 的值是字符串 'px'。
  // 但是对于颜色选择器 <input type="color">，我们并没有给它设置 data-sizing 属性，所以 this.dataset.sizing 的值是 undefined。
  // || (逻辑或) 操作符的特性是：如果左边的值是“真”值 (truthy value，比如 'px')
  // 就返回左边的值；如果左边的值是“假”值 (falsy value，比如 undefined 或 null)，它就返回右边的值。
  // 所以，当 this.dataset.sizing 是 'px' 时，'px' || '' 返回 'px'。当它是 undefined 时，undefined || '' 返回 '' (空字符串)。
  // 这样做的目的就是确保 suffix 这个变量要么是 'px'，要么是 ''，避免在拼接颜色值时出现 "#ffc600" + undefined 这样的错误。
  const suffix = this.dataset.sizing || "";

  //   给这个元素增加一个css变量 比如--spacing  --blur --base
  //   document.documentElement 代表整个 HTML 文档的根元素 <html>,document.documentElement 就是获取当前页面的根元素
  //   style.setProperty('--spacing', '10px') 这行代码的作用是给根元素设置一个 CSS 变量 --spacing，并将其值设为 '10px'。
  //   这样一来，整个文档中的任何地方都可以通过 var(--spacing) 来引用这个变量的值，从而实现样式的统一和动态调整。
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

// document.querySelectorAll('.controls input') 这个方法返回的不是一个真正的 JavaScript 数组 (Array)，而是一个叫做 NodeList 的东西。
//NodeList 是一个“类数组”对象，它和数组很像（有 length 属性，可以用索引 inputs[0] 访问），但它没有数组的所有方法（比如 map, filter 等）。
// 不过，现代浏览器中的 NodeList 已经内置了 forEach 方法，所以我们可以直接在它上面使用 forEach ，
// 遍历每一个 input 元素，并为它们逐一绑定事件监听器。这比用传统的 for 循环要方便得多
// 在拖动时，mousemove 会在你松手前的最后一刻更新一次值，看起来好像没问题。但可能会有一种极端情况：你拖动滑块后
// 鼠标移出滑块区域再松手，这时 change 事件会触发，但 mousemove 在你松手那一刻可能没有触发，导致样式没有更新到你最终松手时的那个精确值。
inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));
