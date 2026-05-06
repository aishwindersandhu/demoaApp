import FaceCapture, { PrimaryBtn } from './faceCapture';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImageData } from '../reducers/imageSlice';
import { displayLoader, displayCards } from '../reducers/utilSlice';
import { RootState } from '../redux/store';
import { useUploadImageMutation } from '../api/imageAPI';
import { useNavigate } from 'react-router-dom';

export const UploadImage = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const { imageSrc } = useSelector((state: RootState) => ({
    imageSrc: state.imageReducer.imageLink,
  }));
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state.utilsReducer.isLoading,
  }));

  const [fileData, setFileData]   = useState<File | undefined>();
  const [uploadImage]             = useUploadImageMutation();

  // FaceCapture calls this whenever a file is ready (upload or webcam)
  const handleWebImage = (file: File) => {
    setFileData(file);
  };

  const analyzePicture = () => {
    if (!fileData) return;
    dispatch(displayLoader(true));
    uploadImage(fileData).then((res) => {
      if (res && Object.keys(res).length !== 0) {
        dispatch(displayLoader(false));
        dispatch(displayCards(true));
        dispatch(getImageData(res.data));
      }
    });
    navigate('/results');
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-page, #F7F4EF)",
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
        textTransform: "uppercase", color: "#A08070", marginBottom: 16,
      }}>
        AI Colour Analysis
      </p>

      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(28px, 5vw, 48px)",
        fontWeight: 400, color: "#2C1810",
        textAlign: "center", lineHeight: 1.15,
        marginBottom: 12,
      }}>
        Discover your <em style={{ fontStyle: "italic", color: "#8B6355" }}>perfect</em> palette
      </h1>

      <p style={{
        fontSize: 15, fontWeight: 300, color: "#7A6558",
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
                stroke="#F7F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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