import { RootState } from '../redux/store';
import { useSelector } from "react-redux"; 
import '../styles/cardComponent.css';

const CardComponent = () =>{
const {imageData: imageData} = useSelector((state:RootState) =>({
  imageData:state.imageReducer.imageData
}));
console.log(imageData,"imageData")
return (
  <div>
    <div className='card-component-layout card-label'>
      Skin Tone
      <p className='card-label'>{imageData.data.skinTone}</p>

    </div>
    <div className='card-component-layout card-label'>
      Face Shape:  
      <p className='card-label'>{imageData.data.faceShape}</p>
    </div>
  </div>
)
}

export default CardComponent;