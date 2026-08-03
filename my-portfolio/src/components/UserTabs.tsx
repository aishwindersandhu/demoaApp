import {useState} from "react";
import { useDispatch } from "react-redux";
import { displayBoard } from "../reducers/utilSlice";
import '../styles/userTabs.css';

/** Pill-style tab selector (desktop left panel) for switching between the Colours/Makeup/Products boards. */
export const UserTabs = () =>{
  const pillsArr = ['Colours','Makeup','Products'];
  const [selectedTab, setSelectedTab] = useState<String>('Colours');//Default state
  const dispatch = useDispatch();

  // Updates local highlight state and dispatches to Redux so SkinDetection renders the matching board.
  const displayAnalysis = (item :string) =>{
    setSelectedTab(item);
    dispatch(displayBoard(item));
    //dispatch action for which board
  }

  // Builds the clickable pill for each tab, highlighting the active one.
  const getPills = () =>{
     const tabs = pillsArr.map((item)=>{
          return <div 
          className={`tab-pills ${item === selectedTab ? `tab-pill-selected `: null}`}
          onClick={()=>{displayAnalysis(item)}}
          >
        {item}
      </div>
        });
        return tabs;
  }
  return (<div>
    <div style={{marginTop:'50px'}}>
      {
       getPills()
      }
    </div>
  </div>)
}