import React from 'react';
import {TaskList} from './components/task-list/TaskList';
import AddItemForm from './components/add-item-forn/AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskListAC, TaskListType} from './state/task-list-reducer';
// import './App.css';

export const App = () => {
    console.log('App')
    const taskLists = useSelector<AppRootStateType, TaskListType[]>(state => state.taskLitReducer)
    const dispatch = useDispatch()

    const addTaskList = (title: string) => dispatch(addTaskListAC(title))

    return (
        <div className="App">
            <AddItemForm callBack={addTaskList}/>
            <hr/>
            {taskLists.map(tl => <TaskList key={tl.id} taskList={tl}/>)}
        </div>
    );
};
