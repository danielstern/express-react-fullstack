export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const ADD_TASK_COMMENT = `ADD_TASK_COMMENT`;

export const setTaskCompletion = (id, complete = true)=>({
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