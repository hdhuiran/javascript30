const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    // (1) 获取当前时间
    const now = new Date();
  
    // (2) 从时间对象中获取秒、分、时
    // getSeconds()、getMinutes() 和 getHours() 方法是返回当前时间的相应部分，而不是从某个固定时间点开始计算的总时长。
    const seconds = now.getSeconds();
    const mins = now.getMinutes();
    const hour = now.getHours();

    // console.log(seconds,mins,hour)
  
    // (3) 计算每个指针需要旋转的角度
    // 因为要从时钟的12点钟开始计算，然后要加90度，这样就是从12点钟的位置开始转
    //  一圈是 360 度，一共 60 秒。所以每秒钟，秒针转动 360 / 60 = 6 度，当前秒数占了整个一分钟的百分之多少，用这个百分比去乘以一个圆的总角度 (360度)，就能得出当前秒针应该在的位置
    const secondsDegrees = ((seconds / 60) * 360) + 90;

    // console.log(secondsDegrees)
    
    // 每分钟，分针转动 6 度，为了更逼真，分针不应该只在分钟变化时才跳动，它应该随着秒针的移动而缓慢移动。所以我们还要额外加上秒数带来的偏移量
    // 将当前流逝的秒数换算成分钟，再乘以分针每分钟转动的角度（6度），从而得到因秒数变化而产生的精确偏移角度。
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;

    // console.log(minsDegrees);

    // 时针同理
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;

    // console.log(hourDegrees);
  
    // (4) 将计算出的角度应用到元素的 transform 样式上
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minHand.style.transform = `rotate(${minsDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  }

// 每隔 1000 毫秒（也就是 1 秒）就调用一次 setDate 函数。这样，时钟的指针就会每秒更新一次位置。
//   setInterval(setDate, 1000);

  // 创建一个动画循环函数
function animateClock() {
    setDate(); // 1. 先更新一次时钟
    requestAnimationFrame(animateClock); // 2. 请求浏览器在下一次重绘前，再次调用 animateClock
  }
  
  // 启动动画循环
  animateClock();