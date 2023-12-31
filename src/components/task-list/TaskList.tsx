import React from 'react';
import {removeTaskListAC, TaskListType} from '../../state/task-list-reducer';
import {Task} from '../task/Task';
import AddItemForm from '../add-item-forn/AddItemForm';
import {useDispatch} from 'react-redux';

type TaskListPropsType = {
    taskList: TaskListType
}

export const TaskList: React.FC<TaskListPropsType> = (props) => {
    console.log('TaskList')
    const {id, title, tasks} = props.taskList
    const dispatch = useDispatch()

    const removeTaskList = () => dispatch(removeTaskListAC(id))

    return (
        <div style={{border: '1px solid red', width: '300px', padding: '5px'}}>
            <AddItemForm/>
            <h3>
                {title}
                <button onClick={removeTaskList}>del</button>
                {/*<button onClick={editTaskListTitle}>edit</button>*/}
            </h3>
            {tasks.map(t => <Task key={t.id} task={t} taskListId={id}/>)}
        </div>
    );
}