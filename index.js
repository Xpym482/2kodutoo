/*jshint esversion:6*/

class Entry{
  constructor(title, description, date){
    this.title = title;
    this.description = description;
    this.date = date;
  }
}


class ToDo{
  constructor(){
    this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];
    document.querySelector('#addButton').addEventListener('click', ()=> this.addEntry());
    this.render();
  }

  render(){
    if(document.querySelector('.todo-list')){
      document.body.removeChild(document.querySelector('.todo-list'));
    }

    const ul = document.createElement("ul");
    ul.setAttribute("id", "myUl");
    ul.className = "todo-list";
    this.entries.forEach((entry, entryIndex)=>{
      const li = document.createElement("li");
      li.innerHTML = `<b>${entry.title}</b> <br>  ${entry.description} <br>  ${entry.date}`;

      let span = document.createElement("SPAN");
      let txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.addEventListener("click", ()=>{
        ul.removeChild(li);
        this.entries = this.entries.slice(0, entryIndex).concat(this.entries.slice(entryIndex + 1, this.entries.length));
        this.saveOnLocalStorage();
      });

      li.addEventListener('click', (event)=> {
          event.target.classList.toggle('checked');
          if(entry.done){
            entry.done = false;
          }
          else{
            entry.done = true;
          }

          this.saveOnLocalStorage();
          this.render();
      });

      if(entry.done){
        li.classList.toggle('checked');
      }

      span.appendChild(txt);
      li.appendChild(span);
      ul.appendChild(li);
    });
    document.body.appendChild(ul);
  }


  addEntry(){
    const titleValue = document.querySelector('#title').value;
    const descriptionValue = document.querySelector('#description').value;
    const dateValue = document.querySelector('#date').value;
    this.entries.push(new Entry(titleValue, descriptionValue, dateValue));
    this.saveOnLocalStorage();
    this.render();
  }

  saveOnLocalStorage(){
    window.localStorage.setItem('entries', JSON.stringify(this.entries));
  }
}

const todo = new ToDo();

function searchTitle() {
  let input, filter, ul, li, i, txtValue;
  let entries = JSON.parse(window.localStorage.getItem('entries'));
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUl");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    txtValue = entries[i].title;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function sortName(){
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("myUl");
  switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("li");
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

function sortDate(){
  let todos = sortDateFunction();
  window.localStorage.setItem('entries', JSON.stringify(todos));
  window.location.href = "index.html";

}

function sortDateFunction(){
  let currentTodos = localStorage.getItem('entries');

  if (currentTodos != null) {
    todos = JSON.parse(currentTodos);
  }
  else {
    todos = [];
  }
  return todos.sort(function(a, b){
    return new Date(b.date) - new Date(a.date);
  });

}
