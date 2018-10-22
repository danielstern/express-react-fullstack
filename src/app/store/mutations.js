export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const ADD_TASK_COMMENT = `ADD_TASK_COMMENT`;
export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;

export const setTaskCompletion = (id, isComplete = true)=>({
    type:SET_TASK_COMPLETE,
    id,
    isComplete
});

export const addTaskComment = (commentID, taskID, ownerID, content)=>({
    type:ADD_TASK_COMMENT,
    id:commentID,
    task: taskID,
    owner: ownerID,
    content
});

export const requestTaskCreation = (groupID)=>({
    type:REQUEST_TASK_CREATION,
    groupID
});

export const createTask = (taskID, groupID, ownerID)=>({
    type:CREATE_TASK,
    taskID,
    groupID,
    ownerID
});