import { combineReducers } from "redux"
import filterReducer from "./filterReducer"
import userReducer from "./userReducer"
const rootReducer = combineReducers({
    user: userReducer,
    filter: filterReducer
})
export default rootReducer