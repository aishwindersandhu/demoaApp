import { RootState } from '../redux/store';
import { useSelector } from "react-redux";
import '../styles/cardComponent.css';
import { JSX, Fragment } from 'react';

/**
 * Legacy/alternate summary card renderer (dominant skin tone + colour palette).
 * Superseded in the current UI by AnalysisCard/ColorAnalysis, kept for reference.
 */
const CardComponent = () => {
  const imageData = useSelector((state: RootState) => state.imageReducer.imageData);
  const { skinTone, colorCode, colorPalette } = imageData.data;

  // Returns the display details (swatch class/style, label, and any multi-colour
  // palette dots) for a given card title.
  const getCardDetails = (title: string) => {
    let classLabel = '';
    let styleData = {};
    let cardLabel = '';
    let palette: JSX.Element[] = [];
    if (title == 'Dominant Skin Tone') {
      classLabel = 'w-10 h-10 mt-2 rounded-full';
      styleData = {
        backgroundColor: colorCode,
      }
      cardLabel = skinTone;
    }
    // else if (title == 'Face Shape') {
    //   classLabel = 'w-8 h-10 mt-2 rounded-full';
    //   cardLabel = faceShape;
    //   styleData = {
    //     border: '1px solid black'
    //   }
    // }
    else {
      //return different UI for color palette
      for (let i=0; i< colorPalette.length ; i ++) {
        const shadeCard = <div className='w-10 h-10 m-2 rounded-full'
          key={`${i}-color`}
          style={{ backgroundColor: colorPalette[i] }}></div>;
        palette.push(shadeCard);
      }
      //return palette;
    }
    return { classLabel, styleData, cardLabel, palette };
  }
  // Builds one card per title in cardTitles, using getCardDetails for its content.
  const getCards = () => {
    let cards = [];
    const cardTitles = ['Dominant Skin Tone', 'Color Palette', 
      //'Face Shape'
    ];
    //for every card title generate a new card
    for (var i in cardTitles) {
      let title = cardTitles[i];
      const { classLabel, styleData, cardLabel, palette } = getCardDetails(title);
      let card = <div className='card-component-layout card-label'>
        {cardTitles[i]}
        <div className='card-data-div'>
          {
            palette.length > 0 ? (<div style={{ display: 'flex' }}>{palette}</div>) :
              (
                <Fragment>
                  <div className={`${classLabel}`} style={styleData}></div>
                  <div className='card-data-label' style={{ display: 'flex' }}> {cardLabel}</div>
                </Fragment>
              )
          }
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