const life = document.querySelector(".life");
const egg = document.querySelector(".egg");
const pressed = [];
const secretCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right b a
window.addEventListener("keyup", (event) => {
  console.log(event.keyCode);
  pressed.push(event.keyCode);
  // splice(-7, ...) 表示从数组末尾向前数第7个位置开始操作
  // 如果数组长度小于7，-7 会被自动转换为 0（从数组开头）
  // pressed.length - 6 确保数组长度不会超过6个元素
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  if (pressed.join("").includes(secretCode.join(""))) {
    // cornify_add();
    life.textContent = "30";
    egg.style.display = "flex";
  }
});
