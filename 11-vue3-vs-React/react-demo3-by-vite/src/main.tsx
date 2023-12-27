import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import TaskList from './views/TaskList'

const todoList = [
    /*{id: "todo-0", name: "吃", checked: false},
    {id: "todo-1", name: "喝", checked: true},
    {id: "todo-2", name: "玩", checked: false},
    {id: "todo-3", name: "乐", checked: false},*/
];

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App suject="abc"/>
        <App suject="abc1"/>
        <TaskList todoList = {todoList}/>
    </React.StrictMode>,
)
