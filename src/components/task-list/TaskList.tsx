import React, {ChangeEvent, memo, useCallback, useState} from 'react';
import {
    addTaskAC,
    changeTaskListTitleAC,
    removeTaskListAC,
    StatusType,
    TaskListType
} from '../../state/task-list-reducer';
import {Task} from '../task/Task';
import AddItemForm from '../add-item-forn/AddItemForm';
import {useDispatch} from 'react-redux';
import s from './TaskList.module.css'

type TaskListPropsType = {
    taskList: TaskListType
}

export const TaskList: React.FC<TaskListPropsType> = memo((props) => {
    console.log('TaskList')
    const {id, title, tasks} = props.taskList
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title)
    const [status, setStatus] = useState<StatusType>('all')

    const dispatch = useDispatch()

    const editTaskList = () => setEditMode(true)
    const saveTaskList = () => {
        setEditMode(false)
        dispatch(changeTaskListTitleAC(id, value))
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    const addTask = useCallback((title: string) => dispatch(addTaskAC(id, title)), [addTaskAC])

    const removeTaskList = () => dispatch(removeTaskListAC(id))

    let filteredTasks = tasks
    if (status === 'in progress') filteredTasks = tasks.filter(t => !t.isFinished)
    if (status === 'finished') filteredTasks = tasks.filter(t => t.isFinished)

    const onClickAllHandler = () => setStatus('all')
    const onClickInProgressHandler = () => setStatus('in progress')
    const onClickFinishedHandler = () => setStatus('finished')

    return (
        <div className={s.taskList}>
            {editMode
                ? <div>
                    <input onChange={onChangeInputHandler} value={value} autoFocus/>
                </div>
                : <h3>{title}</h3>}
            <button onClick={removeTaskList}>del</button>
            {editMode ? <button onClick={saveTaskList}>save</button>
                : <button onClick={editTaskList}>edit</button>}
            <AddItemForm callBack={addTask}/>
            <button className={`${status === 'all' ? s.active : ''}`} onClick={onClickAllHandler}>all</button>

            <button className={`${status === 'in progress' ? s.active : ''}`} onClick={onClickInProgressHandler}>in
                progress
            </button>
            <button className={`${status === 'finished' ? s.active : ''}`} onClick={onClickFinishedHandler}>finished
            </button>

            {filteredTasks.map(t => <Task key={t.id} task={t} taskListId={id}/>)}
        </div>
    );
})