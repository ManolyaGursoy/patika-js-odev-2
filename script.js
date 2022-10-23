// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var input = document.getElementById("task");
  var trimmedValue= input.value.trim()
  var t = document.createTextNode(trimmedValue);
  li.appendChild(t);
  let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
  if (trimmedValue == "") {
    $(".error").toast("show");
  } else {
    list.appendChild(li);
    $(".success").toast("show");
    todos.push(trimmedValue);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  document.getElementById("task").value = "";
  
  var deleteBtn = document.createElement("button");
  var txt = document.createTextNode("\u00D7");
  deleteBtn.className = "close";
  deleteBtn.appendChild(txt);
  li.appendChild(deleteBtn);

  var close = document.getElementsByClassName("close");
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      var todoContent = this.parentNode.childNodes[0].textContent;
      //  console.log(div) // to see what's inside
      //  console.log(todoContent) // to see what's inside

      todos.forEach((item, index) => { 
        if(item == todoContent) {
          todos.splice(index, 1);  
      }}); // or this works, too (no need for forEach) -->> todos.splice(todos.indexOf(todoContent), 1);
      localStorage.setItem("todos", JSON.stringify(todos)) // with splice() method and setting items again, it means that we kinda delete that specific item on localStorage
      div.remove(); // or this works, too -->> div.style.display = "none";  // we do this to not see todo items on the UI 
    }
  }
}