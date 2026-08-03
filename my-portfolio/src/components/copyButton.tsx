import {useState} from "react";
import '../styles/copyButton.css';

/** Small icon button that copies a hex colour code to the clipboard, with a brief "Copied!" confirmation. */
export const CopyButton = ({hex}: {hex:string}) =>{
  const [copied, setCopied] = useState(false)

  // Copies the hex value and shows a checkmark + "Copied!" label for 1.8s.
  const handleCopy = async (e:React.MouseEvent) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

   return(<button onClick={handleCopy} className="copy-btn">
      {copied ? (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
          stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8l3.5 3.5L13 5"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
          stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="5" width="8" height="9" rx="1.5"/>
          <path d="M4 11H3a1 1 0 01-1-1V3a1 1 0 011-1h7a1 1 0 011 1v1"/>
        </svg>
      )}
      {copied && (
        <div className="copied-text">Copied!</div>
      )}
    </button>)
}