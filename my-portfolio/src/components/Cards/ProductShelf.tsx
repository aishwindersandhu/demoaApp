import { useRef, useState } from 'react';
import { CategoryOut } from '../../interfaces/productInterface';
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

const getProductIcon = (category: CategoryOut, index: number) => {
  const pool = CATEGORY_ICON_POOL[category.key] ?? [category.icon];
  return pool[index % pool.length];
};

export const ProductShelf = ({ category }: { category: CategoryOut }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const scrollByCard = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 220, behavior: 'smooth' });
  };

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
          <span className="shelf-label">{category.label}</span>
          <span className="shelf-count">{category.products.length}</span>
        </div>
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
      </div>
      <div className="product-shelf-track" ref={trackRef}>
        {
          category.products.map((product, index) => {
            const isSaved = savedIds.has(product.id);
            return (
              <div className="product-card" key={product.id}>
                <div className="product-media">
                  {product.isTopPick && <span className="product-badge-top">Top pick</span>}
                  <span className="product-badge-percent">{product.matchPercent}%</span>
                  <span className="product-media-icon" aria-hidden="true">{getProductIcon(category, index)}</span>
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
                  <div className="product-brand">{product.brand}</div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-shade-swatches">
                    {
                      product.shades.map((shade) => (
                        <span
                          className="shade-swatch"
                          style={{ backgroundColor: shade.hex }}
                          title={shade.name}
                          key={shade.name}
                        ></span>
                      ))
                    }
                  </div>
                  <div className="product-price">{product.price}</div>
                </div>
              </div>
            );
          })
}
      </div>
    </div>
  )
}
