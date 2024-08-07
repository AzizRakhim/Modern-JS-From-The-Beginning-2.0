const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");

    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);

  checkUI();

  itemInput.value = "";
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;

  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

// His version
function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  // console.log(text);
  items.forEach((item) => {
    // console.log(item);
    // const itemName = item.firstChild; This gets textNode. So basically it is not text it is not hence u cannot use includes functions. U need to get value from inside node
    const itemName = item.firstChild.textContent.toLowerCase();

    // console.log(itemName);
    if (itemName.indexOf(text) != -1) {
      // console.log(true);
      item.style.display = "flex";
    } else {
      // console.log(false);
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// My version
// function filterItems() {
//   const items = itemList.querySelectorAll("li");

//   items.forEach((item) => {
//     if (item.firstChild.nodeValue.includes(itemFilter.value)) {
//       item.style.display = "flex";
//     } else {
//       item.style.display = "none";
//     }
//   });
// }

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
// My version
// itemFilter.addEventListener("keyup", filterItems);
// His version
itemFilter.addEventListener("input", filterItems);

checkUI();
