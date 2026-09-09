import FaceCapture, { PrimaryBtn } from './faceCapture';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImageData } from '../reducers/imageSlice';
import { displayLoader, displayCards, setAnalysisError } from '../reducers/utilSlice';
import { RootState } from '../redux/store';
import { useUploadImageMutation } from '../api/imageAPI';
import { useNavigate } from 'react-router-dom';
import { ImageData } from '../interfaces/imageDataInterface';

/**
 * Landing page: lets the user capture or upload a face photo (via FaceCapture),
 * then submits it to the backend for analysis and navigates to the results page.
 */
export const UploadImage = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const { imageSrc } = useSelector((state: RootState) => ({
    imageSrc: state.imageReducer.imageLink,
  }));
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state.utilsReducer.isLoading,
  }));

  // Uploads come through as File; webcam captures come through as Blob.
  const [fileData, setFileData]   = useState<File | Blob | undefined>();
  const [uploadImage]             = useUploadImageMutation();

  // FaceCapture calls this whenever a file is ready (upload or webcam)
  const handleWebImage = (file: File | Blob) => {
    setFileData(file);
  };

  // Uploads the captured photo, stores the analysis result in Redux, then
  // navigates immediately (loading state is shown on the results page while
  // the request is still in flight). The backend has no real face detection —
  // it colour-samples a fixed center region of the photo — so it can't reject
  // group photos or reliably distinguish "no face" as an HTTP error. A failed
  // detection (no usable skin-tone pixels found) still comes back as a 200
  // with colorCode "unknown" and empty palettes, so that's checked explicitly
  // alongside genuine request failures (network/5xx).
  const analyzePicture = () => {
    if (!fileData) return;
    dispatch(displayLoader(true));
    dispatch(setAnalysisError(null));
    uploadImage(fileData).then((res) => {
      dispatch(displayLoader(false));
      if ('error' in res) {
        dispatch(setAnalysisError(
          "We couldn't analyse that photo. Please check your connection and try again."
        ));
        return;
      }
      const analysis = res.data as ImageData;
      if (!analysis?.data?.colorCode || analysis.data.colorCode === 'unknown') {
        dispatch(setAnalysisError(
          "We couldn't detect a face in that photo. Use a clear, front-facing photo of a single face, in good lighting."
        ));
        return;
      }
      dispatch(displayCards(true));
      dispatch(getImageData(analysis));
    });
    navigate('/results');
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-app)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>

      {/* ── Hero text ── */}
      <p style={{
        fontSize: 11, fontWeight: 500, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16,
      }}>
        AI Colour Analysis
      </p>

      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(28px, 5vw, 48px)",
        fontWeight: 400, color: "var(--text-primary)",
        textAlign: "center", lineHeight: 1.15,
        marginBottom: 12,
      }}>
        Discover your <em style={{ fontStyle: "italic", color: "var(--warn-accent)" }}>perfect</em> palette
      </h1>

      <p style={{
        fontSize: 15, fontWeight: 300, color: "var(--text-muted)",
        textAlign: "center", maxWidth: 380,
        lineHeight: 1.7, marginBottom: 40,
      }}>
        Upload a clear photo of your face. We'll detect your skin tone,
        undertone, and build a colour palette made for you.
      </p>

      {/* ── FaceCapture handles upload + webcam internally ── */}
      <FaceCapture handleWebImage={handleWebImage} />

      {/* ── Analyse button — lives in parent, controls navigation ── */}
      <div style={{ width: "100%", maxWidth: 480, marginTop: 16 }}>
        <PrimaryBtn
          onClick={analyzePicture}
          disabled={!imageSrc || isLoading}
        >
          {isLoading ? "Analysing…" : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="var(--btn-primary-fg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              Analyse my palette
            </>
          )}
        </PrimaryBtn>
      </div>

    </div>
  );
};