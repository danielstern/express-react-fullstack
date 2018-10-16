import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

export const TaskListItem = ({id,name,commentCount,complete})=>(
    <Link to={`/task/${id}`}>
        <div className="card p-2 mt-2">
            <span>
                {name} ({commentCount}) {complete ? `✓` : null}
            </span>
        </div>
    </Link>
)

export const ConnectedTaskListItem = connect((state, ownProps)=>{
    return {
        ...state.tasks.find(task=>task.id === ownProps.id),
        commentCount:state.comments.filter(comment=>comment.task === ownProps.id).length
    };
})(TaskListItem);

export const TaskList = ({tasks,comments,name})=>(
    <div className="card p-2 m-2">
        <h2>
            {name}
        </h2>
        <div>
            {tasks.map(task=>(
                <ConnectedTaskListItem {...task} key={task.id}/>
            ))}
        </div>
    </div>
);

const mapStateToProps = (state, ownProps)=>{
    return {
        name:ownProps.name,
        tasks: state.tasks.filter(task=>task.parent === ownProps.id),
    };
};

export const ConnectedTaskList = connect(mapStateToProps)(TaskList);