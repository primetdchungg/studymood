const categories = ["day", "week", "month"];

function getTodos() {
  return (
    JSON.parse(localStorage.getItem("todos3col")) || {
      day: [],
      week: [],
      month: [],
    }
  );
}

function saveTodos(todos) {
  localStorage.setItem("todos3col", JSON.stringify(todos));
}

function renderTodos() {
  const todos = getTodos();
  categories.forEach((type) => {
    const list = document.getElementById(type);
    const bar = document.getElementById(`progress-${type}-bar`);
    const text = document.getElementById(`progress-${type}-text`);
    list.innerHTML = "";

    let doneCount = 0;

    todos[type].forEach((todo, index) => {
      const li = document.createElement("li");
      // Tạo <p> chứa nội dung công việc
      const p = document.createElement("p");
      p.classList.add("todo-li-p");
      p.textContent = todo.text;
      li.appendChild(p);
      if (todo.done) p.classList.add("done");

      const doneBtn = document.createElement("span");
      doneBtn.textContent = "✔️";
      doneBtn.classList.add("todo-li-btn-done");
      doneBtn.onclick = () => {
        todos[type][index].done = !todos[type][index].done;
        saveTodos(todos);
        renderTodos();
      };
      const delBtn = document.createElement("span");
      delBtn.textContent = "✖️";
      delBtn.classList.add("todo-li-btn-delete");
      delBtn.onclick = () => {
        todos[type].splice(index, 1);
        saveTodos(todos);
        renderTodos();
      };

      li.appendChild(doneBtn);
      li.appendChild(delBtn);
      list.appendChild(li);

      if (todo.done) doneCount++;
    });

    const total = todos[type].length;
    const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100);
    bar.style.width = `${percent}%`;
    text.textContent = `${percent}% (${doneCount}/${total})`;

    // Colorful bar
    if (percent === 100) {
      bar.style.background =
        "linear-gradient(to right, rgb(219, 234, 255), rgb(224, 255, 213), rgb(244, 220, 220))";
    } else if (percent >= 70) {
      bar.style.background = "#4caf50";
    } else if (percent >= 40) {
      bar.style.background = "#ff9800";
    } else {
      bar.style.background = "#f44336";
      bar.style.boxShadow = "none";
    }
  });
}

function addTodo(type) {
  const input = document.getElementById(`input-${type}`);
  const value = input.value.trim();
  if (!value) return;

  const todos = getTodos();
  todos[type].push({ text: value, done: false });
  saveTodos(todos);
  input.value = "";
  renderTodos();
}

renderTodos();
