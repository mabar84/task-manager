import React, {ChangeEvent, useState} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from '../../state/task-list-reducer';
import {useDispatch} from 'react-redux';

export type TaskPropsType = {
    task: TaskType
    taskListId: number
}

export const Task: React.FC<TaskPropsType> = (props) => {
    const {id, text, isFinished} = props.task
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(text)
    const dispatch = useDispatch()

    const editTask = () => setEditMode(true)
    const saveTask = () => {
        setEditMode(false)
        dispatch(changeTaskTitleAC(props.taskListId, id, value))
    }
    const removeTask = () => dispatch(removeTaskAC(props.taskListId, id))

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeTaskStatusAC(props.taskListId, id, e.currentTarget.checked))

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    return (
        <div>
            {editMode
                ? <div>
                    <input onChange={onChangeInputHandler} value={value} autoFocus/>
                </div>
                : <div>
                    <input onChange={changeTaskStatus} checked={isFinished} id={`checkbox-${props.taskListId}-${id}`}
                           type="checkbox"/>
                    <label htmlFor={`checkbox-${props.taskListId}-${id}`}>{text}</label>
                </div>
            }
            <button onClick={removeTask}>del</button>
            {editMode ? <button onClick={saveTask}>save</button>
                : <button onClick={editTask}>edit</button>}
            <br/>
        </div>
    )
}