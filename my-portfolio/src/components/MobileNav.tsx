import { useState } from 'react';
import '../styles/mobileNav.css';

// Labels matching the 4 swatches in FaceDetails.colorPalette (see facePalette.tsx).
const PALETTE_LABELS = ['Conceal', 'Base', 'Contour', 'Highlight'];

const BOARD_ICONS: Record<string, string> = {
  Colours: '🎨',
  Makeup: '💄',
  Products: '🛍️',
};

/** A single product-category filter entry shown in the drawer, with its product count. */
interface ProductFilterOption {
  key: string;
  label: string;
  count: number;
}

interface MobileNavProps {
  skinTone: string;
  colorCode: string;
  undertone: string;
  colorPalette: string[];
  boards: string[];
  activeBoard: string;
  onSelectBoard: (board: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  productFilters?: ProductFilterOption[];
  selectedProductFilter?: string;
  onSelectProductFilter?: (label: string) => void;
}

/**
 * Compact top bar + slide-out drawer navigation shown on small screens, in
 * place of the desktop left panel. Mirrors board switching, theme toggling,
 * and (on the Products board) category filtering — all driven by props
 * lifted up from SkinDetection so state stays in sync with the desktop UI.
 */
export const MobileNav = ({
  skinTone,
  colorCode,
  undertone,
  colorPalette,
  boards,
  activeBoard,
  onSelectBoard,
  theme,
  onToggleTheme,
  productFilters,
  selectedProductFilter,
  onSelectProductFilter,
}: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const handleSelectBoard = (board: string) => {
    onSelectBoard(board);
    close();
  };

  const handleSelectFilter = (label: string) => {
    onSelectProductFilter?.(label);
    close();
  };

  // Uses the native share sheet when available, otherwise falls back to clipboard copy.
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Tone.AI', url: window.location.href });
      } catch {
        // user dismissed the share sheet — nothing to do
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <div className="mnav-header">
        <div className="mnav-logo">Tone.AI</div>
        <div className="mnav-actions">
          <button className="mnav-icon-btn" aria-label="Share" onClick={handleShare} type="button">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="18" cy="5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="19" r="2.5" />
              <path d="M8.2 10.7l7.6-4.4M8.2 13.3l7.6 4.4" />
            </svg>
          </button>
          <button
            className="mnav-icon-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            type="button"
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`mnav-overlay${open ? ' mnav-overlay-open' : ''}`} onClick={close} />

      <div className={`mnav-drawer${open ? ' mnav-drawer-open' : ''}`}>
        <div className="mnav-drawer-hdr">
          <span className="mnav-drawer-title">Menu</span>
          <button className="mnav-icon-btn" aria-label="Close menu" onClick={close} type="button">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <div className="mnav-drawer-body">
          <div className="mnav-section-label">Browse by</div>
          {boards.map((board) => (
            <div
              key={board}
              className={`mnav-item${board === activeBoard ? ' mnav-item-active' : ''}`}
              onClick={() => handleSelectBoard(board)}
            >
              <span className="mnav-item-icon" aria-hidden="true">{BOARD_ICONS[board] ?? '•'}</span>
              <span className="mnav-item-label">{board}</span>
            </div>
          ))}

          {productFilters && productFilters.length > 0 && (
            <>
              <div className="mnav-section-label">Filter products</div>
              {productFilters.map((filter) => (
                <div
                  key={filter.key}
                  className={`mnav-item${filter.label === selectedProductFilter ? ' mnav-item-active' : ''}`}
                  onClick={() => handleSelectFilter(filter.label)}
                >
                  <span className="mnav-item-label">{filter.label}</span>
                  <span className="mnav-count">{filter.count}</span>
                </div>
              ))}
            </>
          )}

          <div className="mnav-section-label">Your palette</div>
          <div className="mnav-palette-row">
            {colorPalette.map((color, index) => (
              <div className="mnav-palette-swatch" key={index} title={`${PALETTE_LABELS[index]}: ${color}`}>
                <span className="mnav-palette-color" style={{ background: color }} />
                <span className="mnav-palette-label">{PALETTE_LABELS[index]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mnav-drawer-footer">
          <div className="mnav-tone-row">
            <div className="mnav-tone-dot" style={{ background: colorCode }} />
            <div>
              <div className="mnav-tone-name">{skinTone}</div>
              <div className="mnav-tone-sub">{colorCode} · {undertone}</div>
            </div>
          </div>
          <button className="mnav-theme-btn" onClick={onToggleTheme} type="button">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M9 5.8A4 4 0 1 1 5.2 2a3 3 0 0 0 3.8 3.8z"></path>
            </svg>
            {theme === 'light' ? 'Dark' : 'Light'} mode
          </button>
        </div>
      </div>
    </>
  );
};
