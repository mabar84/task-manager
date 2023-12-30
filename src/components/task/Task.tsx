import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, removeTaskAC, TaskType} from '../../state/task-list-reducer';
import {useDispatch} from 'react-redux';

export type TaskPropsType = {
    task: TaskType
    taskListId: number
}

export const Task: React.FC<TaskPropsType> = (props) => {
    const {id, text, isFinished} = props.task
    // const [showDescription, setShowDescription] = useState(false)
    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskAC(props.taskListId, id))
    const editTask = () => dispatch(removeTaskAC(props.taskListId, id))
    // const switchShowDescription = () => setShowDescription(!showDescription)

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(props.taskListId, id, e.currentTarget.checked))


    return (
        <div>
            <input onChange={changeTaskStatus} checked={isFinished} id={`checkbox-${props.taskListId}-${id}`}
                   type="checkbox"/>
            <label htmlFor={`checkbox-${props.taskListId}-${id}`}>{text}</label>
            <br/>
            <button onClick={removeTask}>del</button>
            <button onClick={editTask}>edit</button>
            {/*<button onClick={switchShowDescription}>details</button>*/}
            <br/>
            {/*{showDescription && description}*/}
        </div>
    )
}