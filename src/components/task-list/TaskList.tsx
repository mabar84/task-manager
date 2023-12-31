import React, {ChangeEvent, useState} from 'react';
import {changeTaskListTitleAC, removeTaskListAC, TaskListType} from '../../state/task-list-reducer';
import {Task} from '../task/Task';
import AddItemForm from '../add-item-forn/AddItemForm';
import {useDispatch} from 'react-redux';

type TaskListPropsType = {
    taskList: TaskListType
}

export const TaskList: React.FC<TaskListPropsType> = (props) => {
    console.log('TaskList')
    const {id, title, tasks} = props.taskList
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title)

    const dispatch = useDispatch()

    const editTaskList = () => setEditMode(true)
    const saveTaskList = () => {
        setEditMode(false)
        dispatch(changeTaskListTitleAC(id, value))
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)


    const removeTaskList = () => dispatch(removeTaskListAC(id))

    return (
        <div style={{border: '1px solid red', width: '300px', padding: '5px'}}>
            {editMode
                ? <div>
                    <input onChange={onChangeInputHandler} value={value} autoFocus/>
                </div>
                : <h3 style={{margin: '0'}}>{title}</h3>}
            <button onClick={removeTaskList}>del</button>
            {editMode ? <button onClick={saveTaskList}>save</button>
                : <button onClick={editTaskList}>edit</button>}
            <AddItemForm callBack={() => {
            }}/>
            {tasks.map(t => <Task key={t.id} task={t} taskListId={id}/>)}
        </div>
    );
}