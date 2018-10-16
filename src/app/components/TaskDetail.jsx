import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ConnectedUsernameDisplay } from './UsernameDisplay'

import {
    setTaskCompletion,
    addTaskComment
} from '../store/mutations'

import {
    requestTaskDetails
} from '../store/events';

const TaskDetail = ({
    id,
    comments,
    task,
    isOwner,
    complete,
    owner,
    sessionID,
    setTaskCompletion,
    addTaskComment
})=>{
    return (
        <div className="card p-3">
            <h3>
                {task.name} {complete ? `✓` : null}
            </h3>
            <div>
                {isOwner ? <div>You are the owner of this task.</div> : <div><ConnectedUsernameDisplay id={owner}/> is the owner of this task.</div>}
            </div>

            <div>
            {comments.map(comment=>(
                <div key={comment.id}>
                    {/* TODO... display commenter's name, not just ID... preferably do this in a non-relational manner*/}
                    <ConnectedUsernameDisplay id={comment.owner}/> : {comment.content}
                </div>
            ))}
            </div>
            {isOwner ?
                <div>
                    <button onClick={() => setTaskCompletion(id,!complete)}>
                        {complete ? `Reopen` : `Complete`} This Task
                    </button>
                </div> :
                //<div>
//                    Only this task's owner can complete it or reopen it.
  //              </div>
                null
            }

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
    let complete = task.complete;

    return {
        id,
        task,
        comments,
        isOwner,
        owner: task.owner,
        sessionID: state.session.id,
        complete
    };
}

function mapDispatchToProps(dispatch,ownProps){
    let id = ownProps.match.params.id;
    dispatch(requestTaskDetails(id));

    return {
        setTaskCompletion(id,complete){
            dispatch(setTaskCompletion(id,complete));
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