const addItemsForm = document.querySelector(".add-items");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("[name=search]");
const itemsList = document.querySelector(".plates");

// 从 localStorage 加载数据，或者初始化为空数组
const items = JSON.parse(localStorage.getItem("items")) || [];

// ---【增】---
function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item").value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  // 调用统一的保存和渲染函数
  saveAndRender();
  this.reset();
}

// ---【改】(切换完成状态)---
function toggleDone(e) {
  if (!e.target.matches('input[type]="checkbox"')) return;
  const index = e.target.dataset.index;
  items[index].done = !items[index].done;
  saveAndRender();
}

// ---【改】(编辑文本)---
function editItem(index, newText) {
  items[index].text = newText;
  saveAndRender();
}

// ---【删】---
function deleteItem(index) {
  items.splice(index, 1);
  saveAndRender();
}

// ---【查】---
function findItems(e) {
  const keyword = e.target.value.toLowerCase();
  const matchedItems = items.filter((item) => {
    return item.text.toLowerCase().includes(keyword);
  });
  populateList(matchedItems, itemsList);
}

// --- 渲染列表函数 (已升级，增加了编辑和删除按钮) ---
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${
        plate.done ? "checked" : ""
      } />
          <label for="item${i}" data-index=${i} contenteditable="false">${
        plate.text
      }</label>
          <button class="edit" data-index=${i}>✏️</button>
          <button class="delete" data-index=${i}>❌</button>
        </li>
      `;
    })
    .join("");
}

// --- 事件委托处理函数 (已升级，可以处理编辑和删除) ---
function handleListClick(e) {
  const target = e.target; // 获取被点击的元素

  // 如果点击的是复选框，则调用 toggleDone
  if (target.matches('input[type="checkbox"]')) {
    toggleDone(e);
    return;
  }

  // 如果点击的是删除按钮
  if (target.matches(".delete")) {
    const index = target.dataset.index;
    deleteItem(index);
    return;
  }

  // 如果点击的是编辑按钮
  if (target.matches(".edit")) {
    const index = target.dataset.index;
    const label = itemsList.querySelector(`label[data-index="${index}"]`);

    // 让 label 变得可编辑
    label.contentEditable = true;
    label.focus(); // 自动聚焦，方便用户直接输入

    // 添加一个一次性的 'blur' 事件监听器，当用户点击别处（失去焦点）时保存
    label.addEventListener(
      "blur",
      () => {
        label.contentEditable = false;
        editItem(index, label.textContent);
      },
      { once: true }
    ); // once: true 确保这个监听器只触发一次

    // 添加一个键盘事件监听器，当用户按回车键时也保存
    label.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // 阻止回车换行
        label.blur(); // 主动触发 blur 事件来保存
      }
    });
  }
}

// --- 统一的保存和渲染函数 ---
function saveAndRender() {
  // 保存到 localStorage
  localStorage.setItem("items", JSON.stringify(items));
  // 用完整的数据重新渲染列表
  populateList(items, itemsList);
}

addItemsForm.addEventListener("submit", addItem);
searchInput.addEventListener("keyup", findItems); // 绑定搜索事件
itemsList.addEventListener("click", handleListClick); // 使用升级后的事件委托函数

// 页面加载时，立即渲染一次列表
populateList(items, itemsList);
