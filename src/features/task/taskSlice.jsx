// state logic , executed on state

import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name:'tasks',
    initialState:{
        items:[],
        filters: 'all'
    },
    reducers{
        addTask:{
            reducer: (state, action)=>{
                state.items.push(isAction.payload)
            }
        },
        toggleTask:{},
        deleteTask:{},
        setFilter:{}
    }
})