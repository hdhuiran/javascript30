function debounce(func, wait = 20, immediate = true) {
    // 用于存储定时器标识
    var timeout;
    // 返回一个新的函数，这个函数具有防抖功能
    return function() {
        // 保存当前执行上下文和参数
      var context = this,
    //   arguments 是一个类数组对象，包含调用函数时传入的所有参数
        args = arguments;
        // 延迟执行函数
      var later = function() {
        // 清除定时器标识
        timeout = null;
        // 如果不是立即执行模式，则调用原始函数
        //  apply是 JavaScript 中调用函数的两种方式之一, 参数作为数组传递
        // call则是参数逐个传递
        if (!immediate) func.apply(context, args);
      };
        // 判断是否应该立即调用
      var callNow = immediate && !timeout;
       // 清除之前的定时器
      clearTimeout(timeout);
      // 设置新的定时器
      // setTimeout() 返回一个数字ID（正整数），用于标识定时器
      // 初始状态下，timeout 是 undefined
      // 当 timeout 为 undefined 或 0 时，!timeout 为 true
      // 当 timeout 有值（定时器ID）时，!timeout 为 false   
      timeout = setTimeout(later, wait);
      // 如果需要立即调用，则执行原始函数
      if (callNow) func.apply(context, args);
    };
}

const sliderImages = document.querySelectorAll(".slide-in");

function checkSlide(e){
    console.log("e : " + e);
    sliderImages.forEach(sliderImage =>{
        // 1. 计算“触发线”：窗户的底部，再往上一点点（照片高度的一半）
        const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
        console.log("slideInAt :" + slideInAt);
        // 2. 计算照片的底部在哪里
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        console.log("imageBottom :"+imageBottom);
        // 3. 判断照片是否应该显示
        // 条件一：你的视线（触发线）是否已经越过了照片的顶部？
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        // 条件二：你的窗户顶部，是否还没有滚过照片的底部？
        const isNotScrolledPast = window.scrollY < imageBottom;
        if(isHalfShown && isNotScrolledPast){
            sliderImage.classList.add('active');
          }else{
            sliderImage.classList.remove('active');
          }
    })
}

window.addEventListener("scroll",debounce(checkSlide));