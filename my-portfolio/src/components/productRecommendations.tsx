import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import '../styles/colorAnalysis.css';
import '../styles/productRecommendations.css';
import { useGetRecommendationsMutation } from "../api/imageAPI";
import { ProductShelf } from "./Cards/ProductShelf";
import { CategoryOut } from "../interfaces/productInterface";

interface ProductRecommendationsProps {
  // Controlled by SkinDetection when provided, so the mobile nav drawer can
  // drive category filtering from outside this component's own DOM subtree.
  selectedFilter?: string;
  onSelectedFilterChange?: (filter: string) => void;
  onCategoriesLoaded?: (categories: CategoryOut[]) => void;
}

/**
 * "Products" board: fetches product recommendations for the current session's
 * analyzed face, then shows them grouped into category shelves with a
 * filter-pill row. The active filter can be controlled externally (by
 * SkinDetection, for the mobile nav drawer) or managed internally otherwise.
 */
export const ProductRecommendations = ({
  selectedFilter: controlledFilter,
  onSelectedFilterChange,
  onCategoriesLoaded,
}: ProductRecommendationsProps = {}) => {
  const imageData = useSelector((state: RootState) => state.imageReducer.imageData);
  const sessionId = useSelector((state: RootState) => state.imageReducer.sessionId);
  const skinColorHex = imageData.data.colorCode;
  const [getRecommendations, { data, isLoading, isError }] = useGetRecommendationsMutation();
  const [internalFilter, setInternalFilter] = useState('All');
  // Falls back to local state when no controlled filter/setter is passed in.
  const selectedFilter = controlledFilter ?? internalFilter;
  const setSelectedFilter = onSelectedFilterChange ?? setInternalFilter;

  // Fetch recommendations once on mount, using the already-analyzed face data.
  useEffect(() => {
    getRecommendations({ userId: sessionId, body: imageData.data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Notify the parent whenever fresh category data arrives (used to build the mobile filter list).
  useEffect(() => {
    if (data) onCategoriesLoaded?.(data.categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <div className="card-container">Finding your matches…</div>;
  }

  if (isError || !data) {
    return <div className="card-container">Couldn't load product recommendations.</div>;
  }

  const filterOptions = ['All', ...data.categories.map((category) => category.label)];
  const visibleCategories = selectedFilter === 'All'
    ? data.categories
    : data.categories.filter((category) => category.label === selectedFilter);

  return (
    <div className="card-container product-recommendations-card">
      <div className="card-main-title">Product recommendations</div>
      <div className="card-main-sub">{data.toneLabel} · {data.matchPercent}% overall match</div>
      <div className="product-filter-pills">
        {
          filterOptions.map((label) => (
            <button
              className={`product-filter-pill ${selectedFilter === label ? 'product-filter-pill-active' : ''}`}
              onClick={() => setSelectedFilter(label)}
              key={label}
            >{label}</button>
          ))
        }
      </div>
      {
        visibleCategories.map((category) => (
          <ProductShelf
            category={category}
            skinColorHex={skinColorHex}
            unwrapScroll={selectedFilter !== 'All'}
            key={category.key}
          ></ProductShelf>
        ))
      }
    </div>
  )
}
