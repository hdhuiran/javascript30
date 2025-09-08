const checkboxes = Array.from(
  document.querySelectorAll('.inbox input[type="checkbox"]')
);

const checkboxex_2 = Array.from(
  document.querySelectorAll('.inbox-2 input[type="checkbox"]')
);

let checkEle = null;

function handleCheck(e) {
  let self = this;
  if (e.shiftKey && e.target.checked) {
    let isBetween = false;
    checkboxes.map((element) => {
      if (
        (element === self || element === checkEle) &&
        checkEle &&
        checkEle !== self
      ) {
        isBetween = !isBetween;
      }
      if (isBetween) {
        element.checked = true;
      }
    });
  }
  checkEle = self.checked ? self : null;
}

function extenCheck(e) {
  let self = this;
  if (!e.target.checked) {
    return;
  }

  let nowSelIndex = checkboxex_2.findIndex((element) => element === self);
  // console.log(nowSelIndex);

  if (!e.shiftKey) {
    return;
  }

  const nearMaxCheckboxIndex = checkboxex_2.findIndex((element, index) => {
    return (
      index !== nowSelIndex && index > nowSelIndex && element.checked === true
    );
  });
  console.log("nearMaxCheckboxIndex :" + nearMaxCheckboxIndex);

  const nearMinCheckboxIndex = checkboxex_2.findIndex((element, index) => {
    return (
      index !== nowSelIndex && index < nowSelIndex && element.checked === true
    );
  });
  console.log("nearMinCheckboxIndex:" + nearMinCheckboxIndex);

  if (nearMaxCheckboxIndex !== -1) {
    setCheckbox(nowSelIndex, nearMaxCheckboxIndex);
  }
  if (nearMinCheckboxIndex !== -1) {
    setCheckbox(nearMinCheckboxIndex, nowSelIndex);
  }
}

function setCheckbox(initIndex, arrayLength) {
  for (let index = initIndex; index < arrayLength; index++) {
    checkboxex_2[index].checked = true;
  }
}

checkboxes.map((element) => {
  element.addEventListener("click", handleCheck);
});

checkboxex_2.map((element) => {
  element.addEventListener("click", extenCheck);
});
