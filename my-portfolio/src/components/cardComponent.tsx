import { RootState } from '../redux/store';
import { useSelector } from "react-redux";
import '../styles/cardComponent.css';

const CardComponent = () => {
  const imageData  = useSelector((state: RootState) =>  state.imageReducer.imageData );
  const { skinTone, faceShape, colorCode } = imageData.data;

  const getCardDetails = (title: string) => {
    let classLabel = '';
    let styleData = {};
    let cardLabel = '';
    if (title == 'Skin Tone') {
      classLabel = 'w-10 h-10 mt-2 rounded-full';
      styleData = {
        backgroundColor: colorCode,
      }
      cardLabel = skinTone;
    }
    else {
      classLabel = 'w-8 h-10 mt-2 rounded-full';
      cardLabel = faceShape;
      styleData = {
        border: '1px solid black'
      }
    }
    return { classLabel, styleData, cardLabel };
  }
  const getCards = () => {
    let cards = [];
    const cardTitles = ['Skin Tone', 'Face Shape'];
    //for every card title generate a new car
    for (var i in cardTitles) {
      let title = cardTitles[i];
      const { classLabel, styleData, cardLabel } = getCardDetails(title);
      let card = <div className='card-component-layout card-label'>
        {cardTitles[i]}
        <div className='card-data-div'>
          <div className={`${classLabel}`} style={styleData}></div>
          <div className='card-data-label'> {cardLabel}</div>
        </div>
      </div>;
      cards.push(card);
    }
    return cards;
  }
  return (
    <div>
      {getCards()}
    </div>
  )
}

export default CardComponent;