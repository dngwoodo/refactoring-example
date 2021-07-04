// 1. 필요한 element들인 input, button, ul, li 생성 X
// 2. button을 누르면 li가 생성되는 기능 구현 X
// 3. li가 생성되었을 경우 input 값 초기화
// 4. li클릭 시 밑줄을 긋고 글자 색 변경 X
// 5. li에서 삭제를 누를 시 li가 삭제되는 기능 구현 X

(function () {
  const root = document.getElementById("root");
  const todoControl = document.createElement("input");
  const todoAddButton = document.createElement("button");
  const todoList = document.createElement("ul");

  todoControl.type = "text";
  todoAddButton.type = "button";
  todoAddButton.textContent = "추가";

  root.appendChild(todoControl);
  root.appendChild(todoAddButton);
  root.appendChild(todoList);

  todoControl.focus();

  todoAddButton.addEventListener("click", () => {
    const todoContainer = document.createElement("li");
    const todo = document.createElement("p");
    const todoDeleteButton = document.createElement("button");

    todoDeleteButton.type = "button";
    todoDeleteButton.textContent = "완료";
    todo.textContent = todoControl.value;
    todoControl.value = "";
    todoControl.focus();

    todoContainer.appendChild(todo);
    todoContainer.appendChild(todoDeleteButton);
    todoList.appendChild(todoContainer);

    todo.addEventListener("click", () => {
      todo.classList.toggle("done");
    });

    todoDeleteButton.addEventListener("click", (event) => {
      const todoContainer = event.target.parentNode;

      todoList.removeChild(todoContainer);

      todoContainer.removeEventListener("click", () => {
        todo.classList.toggle("done");
      });

      todoDeleteButton.removeEventListener("click", (event) => {
        const todoContainer = event.target.parentNode;

        todoList.removeChild(todoContainer);

        todoContainer.removeEventListener("click", () => {
          todo.classList.toggle("done");
        });
      });
    });
  });
})();
