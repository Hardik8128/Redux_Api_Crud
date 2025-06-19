import { Get } from "../types/Type";

export const ApiReducer = (state=[],action) =>{
    switch(action.type){
        case Get:
            return action.data;

        default:
            return state;        
    }
}