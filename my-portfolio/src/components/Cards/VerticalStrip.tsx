import '../../styles/dashboard.css';
import { colorStrip } from '../../interfaces/imageDataInterface';
import { CopyButton } from "../copyButton";

/** Renders a titled column of colour swatches (e.g. "Warm Colors") with copyable hex codes, or nothing if the palette is empty. */
export const VerticalStrips = ({ palette,title }: { palette: Array<colorStrip>, title:string }) => {

  // Builds one strip per palette entry, each showing its name, hex code, and a copy button.
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