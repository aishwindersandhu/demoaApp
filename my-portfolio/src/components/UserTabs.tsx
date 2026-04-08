import {useState} from "react";

import '../styles/userTabs.css';

export const UserTabs = () =>{
  const pillsArr = ['Colours','Makeup','Products'];
  const [selectedTab, setSelectedTab] = useState<String>('Colors');

  const getPills = () =>{
     const tabs = pillsArr.map((item)=>{

          return <div 
          className={`tab-pills ${item === selectedTab ? `tab-pill-selected `: null}`}
          onClick={()=>{setSelectedTab(item)}}
          >
        {item}
      </div>
        });

        return tabs;
  }
  return (<div>
    <div>
      {
       getPills()
      }
    </div>
  </div>)
}