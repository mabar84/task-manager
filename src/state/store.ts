import {combineReducers, createStore} from 'redux';
import {taskListReducer} from './task-list-reducer';

const rootReducer = combineReducers({
    taskLitReducer: taskListReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)