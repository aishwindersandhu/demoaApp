import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import '../styles/colorAnalysis.css';
import '../styles/productRecommendations.css';
import { useGetRecommendationsMutation } from "../api/imageAPI";
import { ProductShelf } from "./Cards/ProductShelf";

export const ProductRecommendations = () => {
  const imageData = useSelector((state: RootState) => state.imageReducer.imageData);
  const sessionId = useSelector((state: RootState) => state.imageReducer.sessionId);
  const [getRecommendations, { data, isLoading, isError }] = useGetRecommendationsMutation();
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    getRecommendations({ userId: sessionId, body: imageData.data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <ProductShelf category={category} key={category.key}></ProductShelf>
        ))
      }
    </div>
  )
}
