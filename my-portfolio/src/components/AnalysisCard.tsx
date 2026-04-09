import '../styles/analysisCard.css';

export const AnalysisCard = ({value: any , title: string}) => {
  return (
    <div className="analysis-card-container">
      <div className="analysis-card">
          <p className="card-value">{value}</p>
          <p className="card-value-title">{title}</p>
      </div>
    </div>
  )
}