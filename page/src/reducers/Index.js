import searchBtncounter from "./Searchbutton";
import previousBtncounter from "./Previousbutton";
import nextBtncounter from "./Nextbutton";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  searchcounter: searchBtncounter,
  prevcounter: previousBtncounter,
  nextcounter: nextBtncounter,
});
export default allReducers;
