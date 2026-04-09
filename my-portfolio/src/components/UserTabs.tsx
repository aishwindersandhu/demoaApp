import {useState} from "react";
import { useDispatch } from "react-redux";
import { displayBoard } from "../reducers/utilSlice";
import '../styles/userTabs.css';

export const UserTabs = () =>{
  const pillsArr = ['Colours','Makeup','Products'];
  const [selectedTab, setSelectedTab] = useState<String>('Colours');
  const dispatch = useDispatch();


  const displayAnalysis = (item :string) =>{
    setSelectedTab(item);
    dispatch(displayBoard(item));
    //dispatch action for which board
  }

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