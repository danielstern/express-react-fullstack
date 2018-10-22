import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ConnectedUsernameDisplay } from './UsernameDisplay'

import {
    setTaskCompletion,
    addTaskComment
} from '../store/mutations'

const TaskDetail = ({
    id,
    comments,
    task,
    isOwner,
    isComplete,
    owner,
    sessionID,
    setTaskCompletion,
    addTaskComment
})=>{
    return (
        <div className="card p-3">
            <h3>
                {task.name} {isComplete ? `✓` : null}
            </h3>
            <div>
                {isOwner ?
                    <div>
                        <div>
                            You are the owner of this task.
                            <button  className="btn btn-primary ml-2" onClick={() => setTaskCompletion(id,!isComplete)}>
                                {isComplete ? `Reopen` : `Complete`} This Task
                            </button>
                        </div>
                        <div>

                        </div>

                    </div> :
                    <div>
                        <ConnectedUsernameDisplay id={task.owner}/> is the owner of this task.
                    </div>}
            </div>
            <div className="mt-5">
            {comments.map(comment=>(
                <div key={comment.id}>
                    <ConnectedUsernameDisplay id={comment.owner}/> : {comment.content}
                </div>
            ))}
            </div>

            <form className="form-inline" onSubmit={(e)=>addTaskComment(id,sessionID,e)}>
                <input type="text" name="commentContents" placeholder="Add a comment" className="form-control col-3"/>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    )
}

function mapStateToProps(state,ownProps){
    let id = ownProps.match.params.id;
    let task = state.tasks.find(task=>task.id === id);
    let comments = state.comments.filter(comment=>comment.task === id);
    let isOwner = state.session.id === task.owner;

    return {
        id,
        task,
        comments,
        isOwner,
        sessionID: state.session.id,
        isComplete: task.isComplete
    };
}

function mapDispatchToProps(dispatch){
    return {
        setTaskCompletion(id,isComplete){
            dispatch(setTaskCompletion(id,isComplete));
        },
        addTaskComment(taskID, ownerID, e) {
            let input = e.target[`commentContents`];
            let commentID = uuid();
            let content = input.value;
            e.preventDefault();
            if (content !== ``) {
                input.value = ``;
                dispatch(addTaskComment(commentID, taskID, ownerID, content));
            }

        }
    }
}

export const ConnectedTaskDetail = withRouter(connect(mapStateToProps,mapDispatchToProps)(TaskDetail));