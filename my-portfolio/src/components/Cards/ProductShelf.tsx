import { useRef, useState } from 'react';
import { CategoryOut } from '../../interfaces/productInterface';
import { findClosestByHex } from '../../utils/utils';
import '../../styles/productRecommendations.css';

// Mock icon variety per category — until real product images exist, cycle
// through a small themed set instead of repeating the category's single icon.
const CATEGORY_ICON_POOL: Record<string, string[]> = {
  foundation: ['🧴', '🫙', '💧', '🧪'],
  blush: ['🌸', '🌺', '🍑', '💗'],
  lip: ['💄', '💋', '👄', '🎨'],
  eye: ['👁️', '🖤', '🌙', '🪞'],
  highlight: ['✨', '🌟', '💫', '☀️'],
};

/** Picks a decorative icon for a product card, cycling through the category's icon pool by index. */
const getProductIcon = (category: CategoryOut, index: number) => {
  const pool = CATEGORY_ICON_POOL[category.key] ?? [category.icon];
  return pool[index % pool.length];
};

// Some backend shade entries use the hex code itself as the "name" (no
// friendly name assigned yet) — showing it would just repeat the swatch's hex.
const isHexLike = (value: string) => /^#?[0-9a-f]{6}$/i.test(value.trim());

// Catalogue products without a real photo point at a local "/assets/products/..."
// path that was never actually populated — only absolute CDN URLs are real.
const hasRealImage = (image: string) => /^https?:\/\//i.test(image);

interface ProductShelfProps {
  category: CategoryOut;
  skinColorHex: string;
  // True when this category is the only one visible (a specific filter pill
  // is selected rather than "All"). In that case the shelf drops its
  // horizontal scroll and instead wraps every product onto the page, since
  // there's no longer a row of other shelves it needs to stay compact for.
  unwrapScroll?: boolean;
}

/**
 * Product shelf for one category, with save/heart toggling per product.
 * Each card shows only the single shade that best matches the user's
 * detected skin tone (`skinColorHex`), rather than every shade the product
 * comes in. Renders as a horizontally scrollable row by default, or as a
 * wrapped grid when `unwrapScroll` is set.
 */
export const ProductShelf = ({ category, skinColorHex, unwrapScroll = false }: ProductShelfProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  // Locally-tracked "saved" state — not persisted, resets on remount/refresh.
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  // Products whose image 404'd or otherwise failed to load — falls back to
  // the emoji icon rather than showing a broken-image glyph.
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());

  // Scrolls the product track left/right by roughly one card width.
  const scrollByCard = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 220, behavior: 'smooth' });
  };

  // Toggles the saved/heart state for a product; stops propagation so it doesn't trigger card click handlers.
  const toggleSaved = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  return (
    <div className="product-category-block">
      <div className="product-shelf-header">
        <div className="product-shelf-title">
          <span className="shelf-dash">—</span>
          <span className="shelf-label tooltip-host" data-fulltext={category.label}>
            <span className="truncate-text">{category.label}</span>
          </span>
          <span className="shelf-count">{category.products.length}</span>
        </div>
        {/* Nav arrows only make sense for the scrolling row — hidden once wrapped */}
        {!unwrapScroll && (
          <div className="shelf-nav-group">
            <button
              className="shelf-nav-btn"
              onClick={() => scrollByCard(-1)}
              aria-label={`Scroll ${category.label} left`}
            >‹</button>
            <button
              className="shelf-nav-btn"
              onClick={() => scrollByCard(1)}
              aria-label={`Scroll ${category.label} right`}
            >›</button>
          </div>
        )}
      </div>
      <div className={`product-shelf-track ${unwrapScroll ? 'product-shelf-track-wrap' : ''}`} ref={trackRef}>
        {
          category.products.map((product, index) => {
            const isSaved = savedIds.has(product.id);
            const matchedShade = findClosestByHex(product.shades, skinColorHex);
            const showImage = hasRealImage(product.image) && !failedImageIds.has(product.id);
            return (
              <div className="product-card" key={product.id}>
                <div className="product-media">
                  {product.isTopPick && <span className="product-badge-top">Top pick</span>}
                  <span className="product-badge-percent">{product.matchPercent}%</span>
                  {showImage ? (
                    <img
                      className="product-media-image"
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      onError={() => setFailedImageIds((prev) => new Set(prev).add(product.id))}
                    />
                  ) : (
                    <span className="product-media-icon" aria-hidden="true">{getProductIcon(category, index)}</span>
                  )}
                  <button
                    className={`product-heart-btn ${isSaved ? 'product-heart-btn-active' : ''}`}
                    onClick={(e) => toggleSaved(e, product.id)}
                    aria-pressed={isSaved}
                    aria-label={isSaved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
                    type="button"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.4 5 6 5c2 0 3.6 1.1 4.5 2.6C11.4 6.1 13 5 15 5c3.6 0 5.5 3.4 4 6.9-2.5 4.5-10 9.1-10 9.1z" />
                    </svg>
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-brand tooltip-host" data-fulltext={product.brand}>
                    <span className="truncate-text">{product.brand}</span>
                  </div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-shade-swatches">
                    <span
                      className="shade-swatch tooltip-host"
                      style={{ backgroundColor: matchedShade.hex }}
                      data-fulltext={matchedShade.name}
                    ></span>
                    {!isHexLike(matchedShade.name) && (
                      <span className="shade-swatch-name tooltip-host" data-fulltext={matchedShade.name}>
                        <span className="truncate-text">{matchedShade.name}</span>
                      </span>
                    )}
                  </div>
                  <div className="product-price">
                    <span className="truncate-text">{product.price}</span>
                  </div>
                </div>
              </div>
            );
          })
}
      </div>
    </div>
  )
}
