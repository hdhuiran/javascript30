const panels = document.querySelectorAll('.panel');

function toggleOpen(){
   this.classList.toggle('open');
}


// 如果不加 if (e.propertyName.includes('flex')) 这个判断， toggleActive 函数就会被调用两次！
// 当 font-size 的 0.7 秒动画结束后，transitionend 触发一次，toggleActive 被调用。
// 当 flex 的 0.7 秒动画结束后，transitionend 又触发一次，toggleActive 再次被调用。
// 由于 toggleActive 内部用的是 .toggle('open-active')，连续调用两次的结果就是：第一次添加了 .open-active 类（文字滑入），紧接着第二次又把它移除了（文字又滑出去了），最终看不到任何效果，或者看到一个奇怪的闪烁。

// 为什么要作区分？
// 目标是：只在面板展开（flex 属性变化）这个最主要的动画完成之后，才去触发文字的滑入/滑出。
// if (e.propertyName.includes('flex')) 这行代码的作用就是精确地捕获这个时机。e.propertyName 会告诉你“是谁的动画播完了？”。
// 在 Chrome 和 Firefox 中，这个值是 flex-grow。
// 在 Safari 中，这个值是 flex。
// includes('flex') 这个写法能同时兼容这两种情况。
function toggleActive(e) {
    console.log(e.propertyName);
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

// 当一个事件监听器被触发，并且它的回调函数是一个普通的 function 函数（而不是箭头函数）时，JavaScript 有一个非常重要的规则：
// this 的值会被自动设置为触发该事件的那个 DOM 元素。
panels.forEach(panel => panel.addEventListener('click', toggleOpen));

panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));