import React from "react";
import {useState} from "react";
import "./TaskList.css";
import ToDo from "../components/ToDo";
import Form from "../components/Form";
import FilterButton from "../components/FilterButton";
import {nanoid} from "nanoid";

function TaskList(props) {
    const [todoTasks, setTodoTasks] = useState(props.todoList);

    const deleteTask = (id) => {
        const remainTask = todoTasks.filter(a => a.id !== id);
        setTodoTasks(remainTask);
    }

    const checkTask = (id) => {
        const checked = todoTasks.map(a => {
            if (id === a.id) {
                return {id: a.id, name: a.name, checked: !a.checked}
            } else {
                return a;
            }
        })
        setTodoTasks(checked);
    }

    const editTask = (id, newName) => {
        const edited = todoTasks.map(a => {
            if (id === a.id) {
                return {id: a.id, name: newName, checked: false};
            } else {
                return a;
            }
        });
        setTodoTasks(edited);
    }

    const [filter, setFilter] = useState("All");

    const filterMap = {
        All: () => true,
        Active: (task) => !task.checked,
        Completed: (task) => task.checked
    }

    const taskListProps = {
        addTask: (taskName) => {
            console.log("try to add the name=" + taskName + " to new task");
            const newTask = {id: `todo-${nanoid()}`, name: taskName, checked: false};
            setTodoTasks([...todoTasks, newTask]);
        },
        todoList: todoTasks?.filter(filterMap[filter]).map((a) =>
            <ToDo
                id={a.id}
                name={a.name}
                checked={a.checked}
                key={a.id}
                delete={deleteTask}
                check={checkTask}
                edit={editTask}
            />)
    }

    const filterMapKey = Object.keys(filterMap);


    const filterButtonList = filterMapKey.map(a => {
        return (<FilterButton
            key={a}
            name={a}
            isPressed={a === filter}
            setFilter={setFilter}
        >no</FilterButton>);
    })


    return (
        <div className="todoapp stack-large" id={taskListProps.id}>
            <h1>TodoMatic</h1>
            <Form onSubmit={taskListProps.addTask}/>
            <div className="filters btn-group stack-exception">
                {filterButtonList}
            </div>
            <h2 id="list-heading">{taskListProps?.todoList?.length} tasks remaining</h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading">
                {taskListProps.todoList}
            </ul>
        </div>
    );
}

export default TaskList;