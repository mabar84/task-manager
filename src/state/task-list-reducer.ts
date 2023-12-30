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
        case 'REMOVE-TASK': {
            return state.map(tl => tl.id === action.taskListId
                ? {...tl, tasks: tl.tasks.filter(t => t.id !== action.taskId)}
                : tl)
        }
        case 'REMOVE-TASK-LIST': {
            return state.filter(tl => tl.id !== action.taskListId)
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

export type PriorityType = 'normal' | 'medium' | 'high'

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof removeTaskListAC>
// | ReturnType<typeof editTaskListTitle>

export const removeTaskAC = (taskListId: number, taskId: number) => ({type: 'REMOVE-TASK' as const, taskListId, taskId})
export const removeTaskListAC = (taskListId: number) => ({type: 'REMOVE-TASK-LIST' as const, taskListId})
// export const editTaskListTitle = (taskListId: number, title: string) => ({
//     type: 'EDIT-TASK-LIST-TITLE' as const,
//     taskListId,
//     title
// })
