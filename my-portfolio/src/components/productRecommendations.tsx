import { useEffect } from "react";
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

  return (
    <div className="card-container product-recommendations-card">
      <div className="card-main-title">Product recommendations</div>
      <div className="card-main-sub">{data.toneLabel} · {data.matchPercent}% overall match</div>
      {
        data.categories.map((category) => (
          <ProductShelf category={category} key={category.key}></ProductShelf>
        ))
      }
    </div>
  )
}
