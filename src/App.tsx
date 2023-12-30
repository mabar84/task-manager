import React from 'react';
import {TaskList} from './components/task-list/TaskList';
import AddItemForm from './components/add-item-forn/AddItemForm';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskListType} from './state/task-list-reducer';
// import './App.css';

export const App = () => {
    console.log('App')
    const taskLists = useSelector<AppRootStateType, TaskListType[]>(state => state.taskLitReducer)
    return (
        <div className="App">
            <AddItemForm/>
            <hr/>
            {taskLists.map(tl => <TaskList key={tl.id} taskList={tl}/>)}
        </div>
    );
};
