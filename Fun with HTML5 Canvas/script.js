const canvas = document.querySelector('#draw');

// 调用 <canvas> 元素的 .getContext('2d') 方法，获取一个 2D 渲染上下文对象。
// 可以把它想象成 Photoshop 里的“画笔工具箱”，之后所有绘图相关的属性设置和方法调用，都是通过这个 ctx 对象来完成的。
// 元素本身的尺寸 (CSS 尺寸)和画布的绘图表面尺寸 (内部像素尺寸)是不同的
const ctx = canvas.getContext('2d');

// 设置画布的宽度和高度，让它占满整个浏览器窗口。非常重要的一点是，必须通过 JavaScript 来设置，而不是在 CSS 里。
// 如果在 CSS 里设置，可能会导致画布被拉伸，绘图坐标不准确。
// 如果只用 CSS 把画框拉伸到 1000x800，但没有用 JS 告诉里面的画布也要变成 1000x800 像素（它的默认尺寸可能只有 300x150），浏览器就会把这张 300x150 的小画布，
// 强行拉伸以填满 1000x800 的大画框。
// 结果就是：
// 画的任何东西都会变得模糊和变形。
// 告诉 JS 在 (10, 10) 这个坐标画一个点，但因为画布被拉伸了，这个点最终显示的位置可能完全不是你想要的，导致坐标错乱。
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//设置线条的颜色。strokeStyle 就是“描边样式”。
ctx.strokeStyle = '#BADA55';

//设置当两条线相交时，连接处的样式。'round' 代表圆角连接。
ctx.lineJoin = 'round';

//设置线条端点的样式。'round' 代表线条的末端是圆形的，而不是平的，这会让线条看起来更柔和。
ctx.lineCap = 'round';
ctx.lineWidth = 100;
// ctx.globalCompositeOperation = 'multiply';

// 定义一个标志位 (flag)。它就像一个开关，用来记录鼠标当前是否处于“按下并移动”的绘画状态。false 代表鼠标没有按下。
let isDrawing = false;

//  用来存储上一个鼠标事件发生时的 X 和 Y 坐标。这样才能知道画笔应该从哪里开始画到哪里
let lastX = 0;
let lastY = 0;

// 用来存储 HSL 颜色模型中的色相 (Hue) 值。色相值的范围是 0 到 360，刚好覆盖一个完整的色环（彩虹色）。
let hue = 0;

// 用来控制线条宽度是增加还是减少的标志位
let direction = true;

function draw(e) {
    // 检查 isDrawing 这个开关。如果开关是关的（鼠标没按下），就直接退出函数，不执行任何绘图操作
    if (!isDrawing) return; 
    console.log(e);

    // 这里设置线条颜色用的是 HSL 颜色模型，而不是十六进制。
    // hsl(hue, saturation, lightness): 色相、饱和度、亮度。
    // 把饱和度和亮度固定在 100% 和 50%（最鲜艳的颜色），然后只动态地改变 hue 的值，就能实现平滑的彩虹色变化。
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    // 可以防止不同路径之间产生意想不到的连接
    // 它的意思是“拿起一支新笔，准备画一条全新的路径”。这个命令非常重要，它会清空之前所有未完成的路径信息。如果不调用它，画的第二条线可能会和你画的第一条线莫名其妙地连在一起。
    ctx.beginPath();
    
    // 笔尖，不画任何东西地移动到上一个点的位置
    ctx.moveTo(lastX, lastY);
    
    // 从上一个点 (lastX, lastY)，画一条直线到当前鼠标的位置。
    ctx.lineTo(e.offsetX, e.offsetY);

    // 执行绘制！ 把刚刚用 moveTo 和 lineTo 定义好的路径，用当前设置的 strokeStyle, lineWidth 等样式真正地“描”在画布上。
    ctx.stroke();

    // 在本次绘制结束后，把当前鼠标的坐标更新为“上一次”的坐标，为下一次 draw 函数的调用做准备
    [lastX, lastY] = [e.offsetX, e.offsetY];
    
    // 每次绘制，都让色相值加 1。
    hue++;

    // 如果色相值超过 360，就让它归零，重新从红色开始，形成一个循环。
    if (hue >= 360) {
      hue = 0;
    }

    // 判断线条宽度是否达到了上限 (100) 或下限 (1)。
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
      direction = !direction;
    }
  
    // 根据 direction 的值，来决定下一次绘制时线条是变粗 (++) 还是变细 (--)。
    if(direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }
  
}

// 当鼠标按下时，把 isDrawing 开关打开 (true)。
// 同时，把当前鼠标按下的位置，作为绘画的第一个起点，存入 lastX 和 lastY
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
  
  
canvas.addEventListener('mousemove', draw);

// 鼠标抬起或移出画布区域时，则关闭开关，停止绘画
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);