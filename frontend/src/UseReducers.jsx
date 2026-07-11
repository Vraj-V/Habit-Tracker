import React, { useReducer } from 'react'

const initalState = { count : 100}


const reducers =(state, action) =>{
    switch(action.type){
        case "addition" :
            return{
                count : state.count + 1,
            };
        case "subtraction" :
            return {
                count : state.count - 1,
            };
        case "square":
            return{
                count : state.count * state.count,
            };
    default :
        return state;
    }
}

const UseReducers = () => {
    const [state, dispatch] = useReducer(reducers,initalState)
  return (
    <div>
        <h1>{state.count}</h1>

    <button onClick={()=> dispatch({type: 'addition'})}>Add</button>
    <button onClick={()=> dispatch({type: 'subtraction'})}>subtraction</button>
    <button onClick={()=> dispatch({type: 'square'})}>square</button>
    </div>
  )
}

export default UseReducers