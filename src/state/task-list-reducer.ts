const initialState: StateType = [
    {
        id: 1,
        title: 'To cook dumplings',
        status: 'all',
        // deadline: 'tomorrow',
        // priority: 'normal',
        tasks: [
            {
                id: 1,
                text: 'get water',
                // description: 'something about a saucepan',
                isFinished: false
            },
            {
                id: 2,
                text: 'to buy dumplings',
                // description: 'nothing yet',
                isFinished: true
            }
        ]
    },
    {
        id: 2,
        title: 'To make homework',
        status: 'all',
        // deadline: 'yesterday',
        // priority: 'high',
        tasks: [
            {
                id: 1,
                text: 'get enough sleep',
                // description: 'something about time management',
                isFinished: false
            },
            {
                id: 2,
                text: 'to turn laptop on',
                // description: 'nothing yet',
                isFinished: false
            }
        ]
    },
]

export const taskListReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case 'ADD-TASK-LIST': {
            return [{id: state.length + 1, title: action.title, status: 'all', tasks: []}, ...state]
        }
        case 'REMOVE-TASK': {
            return state.map(tl => tl.id === action.taskListId
                ? {...tl, tasks: tl.tasks.filter(t => t.id !== action.taskId)}
                : tl)
        }
        case 'REMOVE-TASK-LIST': {
            return state.filter(tl => tl.id !== action.taskListId)
        }
        case 'CHANGE-TASK-STATUS': {
            return state.map(tl => tl.id === action.taskListId
                ? {
                    ...tl, tasks: tl.tasks
                        .map(t => t.id === action.taskId
                            ? {...t, isFinished: action.isFinished}
                            : t)
                }
                : tl)
        }
        case 'CHANGE-TASK-TITLE': {
            return state.map(tl => tl.id === action.taskListId
                ? {
                    ...tl, tasks: tl.tasks
                        .map(t => t.id === action.taskId
                            ? {...t, text: action.title}
                            : t)
                }
                : tl)
        }
        case 'CHANGE-TASK-LIST-TITLE': {
            return state.map(tl => tl.id === action.taskListId
                ? {...tl, title: action.title}
                : tl)
        }
        default:
            return state
    }
}

export type StateType = TaskListType[]

export type TaskListType = {
    id: number
    title: string
    status: StatusType
    // deadline: string
    // priority: PriorityType
    tasks: TaskType[]
}

export type TaskType = {
    id: number
    isFinished: boolean
    text: string
    // description: string
}

export type StatusType = 'all' | 'in progress' | 'finished'

// export type PriorityType = 'normal' | 'medium' | 'high'

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof removeTaskListAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTaskListAC>
    | ReturnType<typeof changeTaskListTitleAC>

export const removeTaskAC = (taskListId: number, taskId: number) => ({type: 'REMOVE-TASK' as const, taskListId, taskId})
export const removeTaskListAC = (taskListId: number) => ({type: 'REMOVE-TASK-LIST' as const, taskListId})
export const addTaskListAC = (title: string) => ({type: 'ADD-TASK-LIST' as const, title})

export const changeTaskStatusAC = (taskListId: number, taskId: number, isFinished: boolean) => ({
    type: 'CHANGE-TASK-STATUS' as const,
    taskListId,
    taskId,
    isFinished
})
export const changeTaskTitleAC = (taskListId: number, taskId: number, title: string) => ({
    type: 'CHANGE-TASK-TITLE' as const,
    taskListId,
    taskId,
    title
})
export const changeTaskListTitleAC = (taskListId: number, title: string) => ({
    type: 'CHANGE-TASK-LIST-TITLE' as const,
    taskListId,
    title
})