// 리팩토링 코드
function render() {
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
    todoDeleteButton.classList.add('delete-btn');
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
}

// Test 코드
describe("TODO", () => {
  function renderTodoApp() {
    document.body.innerHTML = '<div id="root"></div>';
    render();
  }


  it("renders input, button", () => {
    renderTodoApp();

    const todoControl = document.querySelector("input");
    const todoAddButton = document.querySelector("button");

    expect(todoControl).toBeDefined();
    expect(todoAddButton).toBeDefined();
    expect(todoAddButton.textContent).toBe("추가");
  });

  it('focuses input control when load', () => {
    renderTodoApp();

    const todoControl = document.querySelector("input");

    todoControl.focus();
    
    expect(todoControl).toEqual(document.activeElement);
  });

  it('listens "todoAddButton" click event', () => {
    renderTodoApp();

    const todoControl = document.querySelector("input");
    const todoAddButton = document.querySelector("button");

    todoControl.value = "공부하기";
    todoAddButton.click();

    const todoContainer = document.querySelector('li');
    const todo = document.querySelector('p');
    const todoDeleteButton = document.querySelector('.delete-btn');

    expect(todoContainer).toBeDefined();
    expect(todo.textContent).toBe('공부하기');
    expect(todoDeleteButton.textContent).toBe('완료');
  });

  it('listens "todoDeleteButton" click event', () => {
    renderTodoApp();

    const todoControl = document.querySelector("input");
    const todoAddButton = document.querySelector("button");
    const todoList = document.querySelector("ul");

    todoControl.value = "공부하기";
    todoAddButton.click();

    expect(todoList.innerHTML).toBeTruthy();

    const todoDeleteButton = document.querySelector('.delete-btn');

    todoDeleteButton.click();

    expect(todoList.innerHTML).toBeFalsy();
  });

  it('listens "todo" click event', () => {
    renderTodoApp();

    const todoControl = document.querySelector("input");
    const todoAddButton = document.querySelector("button");

    todoControl.value = "공부하기";
    todoAddButton.click();

    const todo = document.querySelector('p');

    todo.click();

    expect(todo.className).toBe('done');

    todo.click();

    expect(todo.className).toBe("");
  });
})