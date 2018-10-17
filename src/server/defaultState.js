export const defaultState = {
    session:{
        id:"U1",
        token:"ABCD-1234"
    },
    users:[{
        id:"U1",
        name:"Alexander",
    },{
        id:"U2",
        name:"Dorias"
    }],
    groups:[{
        name:"To Do",
        id:"G1",
        owner:"U1"
    },{
        name:"Doing",
        id:"G2",
        owner:"U1"
    },{
        name:"Done",
        id:"G3",
        owner:"U1"
    }
    ],
    tasks:[{
        name:"Refactor Tests",
        id:"T1",
        parent:"G1",
        owner:"U1",
        complete:false,
    },{
        name:"Meet with CTO",
        id:"T2",
        parent:"G1",
        owner:"U1",
        complete:true,
    },{
        name:"Compile ES6",
        id:"T3",
        parent:"G2",
        owner:"U2",
        complete:false,
    },{
        name:"Production Optimizations",
        id:"T4",
        parent:"G3",
        owner:"U1",
        complete:false,
    }],
    // actions are interesting but do they really provide any opportunities for learning that
    // the comment model does not?
    actions:[{
        name:"Inquire about recent improvement at golf",
        id: `A1`,
        parent:`T2`,
        complete: true
    },{
        name:"Ask for $50,000 Contract",
        id: `A2`,
        parent:`T2`,
        complete: false
    }],
    comments:[{
        owner:"U1",
        id:"C1",
        task:"T1",
        content:"Great work!"
    }]
};