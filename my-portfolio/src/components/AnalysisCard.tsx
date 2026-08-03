import '../styles/analysisCard.css';
import React from 'react';

interface AnalysisCardProps {
  value: any;
  title: string;
}

/** Small stat tile showing a single value (e.g. a percentage or count) with its label. */
export const AnalysisCard = ({value,title} : AnalysisCardProps) => {
  return (
    <React.Fragment>
      <div className="analysis-card">
          <p className="card-value">{value}</p>
          <p className="card-value-title">{title}</p>
      </div>
    </React.Fragment>
  )
}