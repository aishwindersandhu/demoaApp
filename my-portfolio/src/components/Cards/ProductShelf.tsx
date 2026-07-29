import { useRef } from 'react';
import { CategoryOut } from '../../interfaces/productInterface';
import '../../styles/productRecommendations.css';

export const ProductShelf = ({ category }: { category: CategoryOut }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 220, behavior: 'smooth' });
  };

  return (
    <div className="product-category-block">
      <div className="card-main-sub product-category-title">{category.icon} {category.label}</div>
      <div className="product-shelf">
        <button
          className="product-shelf-nav product-shelf-nav-prev"
          onClick={() => scrollByCard(-1)}
          aria-label={`Scroll ${category.label} left`}
        >‹</button>
        <div className="product-shelf-track" ref={trackRef}>
          {
            category.products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-swatch" style={{ backgroundColor: product.shades[0]?.hex }}>
                  {product.isTopPick && <div className="product-top-pick">Top pick</div>}
                </div>
                <div className="product-info">
                  <div className="product-name">{product.brand} — {product.name}</div>
                  <div className="product-category">{product.matchPercent}% match</div>
                  <div className="product-price">{product.price}</div>
                </div>
              </div>
            ))
          }
        </div>
        <button
          className="product-shelf-nav product-shelf-nav-next"
          onClick={() => scrollByCard(1)}
          aria-label={`Scroll ${category.label} right`}
        >›</button>
      </div>
    </div>
  )
}
