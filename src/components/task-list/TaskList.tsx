import React from 'react';
import {removeTaskAC, removeTaskListAC, TaskListType} from '../../state/task-list-reducer';
import {Task} from '../task/Task';
import AddItemForm from '../add-item-forn/AddItemForm';
import {useDispatch} from 'react-redux';

type TaskListPropsType = {
    taskList: TaskListType
}

export const TaskList: React.FC<TaskListPropsType> = (props) => {
    console.log('TaskList')
    const {id, title, tasks, ...rest} = props.taskList
    const dispatch = useDispatch()

    const removeTaskList = () => dispatch(removeTaskListAC(id))
    // const editTaskListTitle = (nweTitle: string) => dispatch(removeTaskAC(id, title))

    return (
        <div>
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