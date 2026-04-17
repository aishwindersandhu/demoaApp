import '../../styles/dashboard.css';
import { colorStrip } from '../../interfaces/imageDataInterface';
import { CopyButton } from "../copyButton";

export const VerticalStrips = ({ palette,title }: { palette: Array<colorStrip>, title:string }) => {

  const getColors = () => {
    const divList = <div style={{ display: 'flex' }}>
      {
        palette.map((item: colorStrip) => {
          return <div style={{ backgroundColor: item.hex }} className="color-strip">
            <div className="color-strip-info">
              <div className="color-strip-name">{item.name}</div>
              <div className="color-strip-hex-row">
                <div className="color-strip-hex">{item.hex}</div>
                <CopyButton hex={item.hex}></CopyButton>
              </div>
            </div>
          </div>;
        })
      }
    </div>
    return divList;
  }
  return (
    <div className="dashboard-card">
      {/* Vertical color rendering from props */}
      {
        palette.length !== 0 ? (
          <div>
            {getColors()}
            <div className="color-type-strip">{title}</div>
          </div>
        ) : null
      }
    </div>
  )
}