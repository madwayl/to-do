function Task(
    title = "New Task",
    description = "Random Description",
    project = "Default",
    taskTags = [],
    subTasks = [],
    isTaskDone = false,
    dueDate = new Date(),
    cumulativeUID
) {

    const uid = generateNewUID(cumulativeUID)

    const addTag = (newTag) => {
        taskTags.push(newTag)
    }

    const addSubTask = (title) => {
        const subTask = !title ? SubTask(title) : SubTask()

        subTasks.push(subTask)
    }

    const deleteSubTask = (indexToDelete) => {
        const subTask = subTask.splice(indexToDelete, 1)
    }

    const changeTaskStatus = () => isTaskDone = !isTaskDone

    return {
        uid,
        title,
        description,
        project,
        taskTags, addTag,
        subTasks, addSubTask, deleteSubTask,
        isTaskDone, changeTaskStatus,
        dueDate
    }
}

function SubTask(
    title = "New SubTask",
    isSubTaskDone = false
) {

    const changeSubTaskStatus = () => isSubTaskDone = !isSubTaskDone

    return {
        title,
        isSubTaskDone, changeSubTaskStatus
    }

}

const generateNewUID = (cumulativeUID) => {
    let newUID = Math.floor(Math.random() * 100000);
    while (cumulativeUID.includes(newUID)) {
        newUID = Math.floor(Math.random() * 100000)
    }
    return newUID
}

function TaskController() {
    const taskList = []

    // taskList.push(initialTasks)
    const getCumulativeUID = () => taskList.map(task => task.uid)

    const addNewTask = (taskInputs) => {
        const newTask = Task(...taskInputs, getCumulativeUID())

        taskList.push(newTask)
    }

    const deleteTask = (taskUID) => {
        const indexToDelete = taskList.findIndex(task => task.uid === taskUID)
        taskList = taskList.splice(indexToDelete, 1)
    }

    const getCumulativeTaskTags = (taskList) => {
        taskList.map(task => task.taskTags.toLowerCase()).reduce(
            (cummulativeArray, tag) => {
                if (cummulativeArray.includes(tag)) return cummulativeArray
                cummulativeArray.push(tag)
                return cummulativeArray
            }, []
        )
    }

    const getCumulativeTaskProjects = (taskList) => {
        taskList.map(task => task.project.toLowerCase()).reduce(
            (cumulativeList, project) => {
                cumulativeList[project] = (cumulativeList[project] ?? 0) + 1
            }, {}
        )
    }

    return {
        taskList,
        addNewTask, deleteTask,
        getCumulativeTaskTags,
        getCumulativeTaskProjects
    }
}

const initialTasks = [
    [
        "Task 1",
        "Random Description for Task 1",
        "Work",
        ["Long-Term", "New"],
        [
            SubTask(
                "New SubTask",
            ),
            SubTask(
                "Another SubTask",
            ),
            SubTask(
                "One Another SubTask",
            )
        ],
        false,
        new Date()
    ],
    [
        "Task 2",
        "Random Description for Task 2",
        "",
        ["Long-Term", "Old"],
        [
            SubTask(
                "New SubTask",
            ),
            SubTask(
                "Another SubTask",
            ),
            SubTask(
                "One Another SubTask",
            )
        ],
        false,
        new Date()
    ]
]

const taskonDashboard = TaskController()
initialTasks.forEach(task => taskonDashboard.addNewTask(task))
// console.log(taskonDashboard.taskList)
// console.log(taskonDashboard.taskList[0].subTasks)