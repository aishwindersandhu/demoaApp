import { useState, useRef, useCallback } from "react";
import { updateImage } from "../reducers/imageSlice";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import React from "react";
import { base64ToBlob } from "../utils/utils";

interface FaceCaptureProps {
  handleWebImage: (image: File) => void;
}

// ─────────────────────────────────────────────────────────────────
// Inline styles — no external CSS dependency.
// All tokens match your existing Parchment / Slate & Bone system.
// ─────────────────────────────────────────────────────────────────

const tokens = {
  bgPage:       "var(--bg-page,        #F7F4EF)",
  bgSurface:    "var(--bg-surface,     #FDFAF7)",
  bgOverlay:    "var(--bg-overlay,     rgba(44,24,16,0.38))",
  borderMuted:  "var(--border-muted,   #D4C4B8)",
  borderAccent: "var(--border-accent,  #8B6355)",
  textPrimary:  "var(--text-primary,   #2C1810)",
  textMuted:    "var(--text-muted,     #A08070)",
  textSecondary:"var(--text-secondary, #7A6558)",
  accentBrown:  "var(--accent-brown,   #8B6355)",
  btnDark:      "var(--btn-dark,       #2C1810)",
  btnDarkHover: "var(--btn-dark-hover, #3D2418)",
  btnDarkText:  "var(--btn-dark-text,  #F7F0E8)",
  fontDisplay:  "'Playfair Display', Georgia, serif",
  fontBody:     "'DM Sans', system-ui, sans-serif",
} as const;

// Tone strip colours — purely decorative
const TONE_STRIP = ["#F5CBA7","#E59866","#CA6F1E","#A04000","#784212","#4A235A","#2C1810"];

/**
 * Face photo input widget with three modes: idle (drag/drop or browse),
 * webcam (live capture), and preview (review the chosen/captured photo).
 * Whenever a photo becomes available it's passed up via `handleWebImage`
 * and also stored in Redux (imageLink) for the preview shown on this page.
 */
const FaceCapture: React.FC<FaceCaptureProps> = ({ handleWebImage }) => {
  const dispatch   = useDispatch();
  const webcamRef  = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode]               = useState<"idle" | "webcam" | "preview">("idle");
  const [previewUrl, setPreviewUrl]   = useState<string | null>(null);
  const [mirrored, setMirrored]       = useState(true);
  const [isDragging, setIsDragging]   = useState(false);

  // ── Webcam capture ──────────────────────────────────────────────
  // Grabs a screenshot from the live webcam feed, converts it to a File-like
  // Blob, stores it in Redux for preview, and hands it off to the parent.
  const handleCapture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc: string = webcamRef.current.getScreenshot();
    const imageFile = base64ToBlob(imageSrc);
    dispatch(updateImage(imageSrc));
    handleWebImage(imageFile);
    setPreviewUrl(imageSrc);
    setMode("preview");
  }, [webcamRef, dispatch, handleWebImage]);

  const openWebcam = () => {
    dispatch(updateImage(""));
    setPreviewUrl(null);
    setMode("webcam");
  };

  // ── File upload ─────────────────────────────────────────────────
  // Shared by both the file input and drag-and-drop: validates it's an
  // image, creates an object URL for local preview, and hands the raw
  // File off to the parent for upload.
  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    dispatch(updateImage(url));
    handleWebImage(file);
    setMode("preview");
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  // Clears the current photo/preview and returns to the drop-zone UI.
  const resetToIdle = () => {
    setMode("idle");
    setPreviewUrl(null);
    dispatch(updateImage(""));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Render helpers ───────────────────────────────────────────────
  // Idle-mode UI: drag-and-drop target that also opens the file picker on click.
  const renderDropZone = () => (
    <div
      onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      style={{
        width: "100%",
        aspectRatio: "4/3",
        border: `1.5px dashed ${isDragging ? tokens.borderAccent : tokens.borderMuted}`,
        borderRadius: 20,
        background: isDragging ? "#F5EDE8" : tokens.bgSurface,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Upload icon */}
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        background: "#EDE8E1",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke={tokens.accentBrown} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
        </svg>
      </div>

      <p style={{ fontFamily: tokens.fontDisplay, fontSize: 16, color: tokens.textPrimary }}>
        Drop your photo here
      </p>
      <p style={{ fontFamily: tokens.fontBody, fontSize: 12, color: tokens.textMuted }}>
        JPG, PNG or WEBP · Max 10MB
      </p>

      {/* Tone strip bottom decoration */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, display: "flex" }}>
        {TONE_STRIP.map((c, i) => (
          <span key={i} style={{ flex: 1, background: c, display: "block" }} />
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: "none" }}
      />
    </div>
  );

  // Webcam-mode UI: live video feed with a mirror toggle.
  const renderWebcam = () => (
    <div style={{ width: "100%", borderRadius: 20, overflow: "hidden", position: "relative" }}>
      <Webcam
        ref={webcamRef}
        mirrored={mirrored}
        screenshotFormat="image/jpeg"
        style={{ width: "100%", display: "block", borderRadius: 20 }}
        videoConstraints={{ facingMode: "user" }}
      />

      {/* Mirror toggle */}
      <label style={{
        position: "absolute", top: 12, right: 12,
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(44,24,16,0.55)", borderRadius: 8,
        padding: "5px 10px", cursor: "pointer",
        fontFamily: tokens.fontBody, fontSize: 12, color: "#F7F0E8",
      }}>
        <input
          type="checkbox"
          checked={mirrored}
          onChange={e => setMirrored(e.target.checked)}
          style={{ accentColor: tokens.accentBrown, width: 13, height: 13 }}
        />
        Mirror
      </label>
    </div>
  );

  // Preview-mode UI: shows the chosen/captured photo with a "change photo" action.
  const renderPreview = () => (
    <div style={{ width: "100%", position: "relative", borderRadius: 20, overflow: "hidden" }}>
      <img
        src={previewUrl!}
        alt="Your photo"
        style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
      />

      {/* Retake overlay on hover — handled via CSS class would be cleaner in prod */}
      <button
        onClick={resetToIdle}
        style={{
          position: "absolute", top: 12, right: 12,
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(44,24,16,0.55)", border: "none", borderRadius: 8,
          padding: "7px 12px", cursor: "pointer",
          fontFamily: tokens.fontBody, fontSize: 12, color: "#F7F0E8",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="#F7F0E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
        </svg>
        Change photo
      </button>

      {/* Tone strip */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, display: "flex" }}>
        {TONE_STRIP.map((c, i) => (
          <span key={i} style={{ flex: 1, background: c, display: "block" }} />
        ))}
      </div>
    </div>
  );

  // ── Main render ──────────────────────────────────────────────────
  return (
    <div style={{
      width: "100%",
      maxWidth: 480,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0,
      fontFamily: tokens.fontBody,
    }}>

      {/* ── Zone: drop / webcam / preview ── */}
      {mode === "idle"    && renderDropZone()}
      {mode === "webcam"  && renderWebcam()}
      {mode === "preview" && renderPreview()}

      {/* ── Divider ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", margin: "20px 0" }}>
        <div style={{ flex: 1, height: 1, background: tokens.borderMuted }} />
        <span style={{ fontSize: 11, color: tokens.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>or</span>
        <div style={{ flex: 1, height: 1, background: tokens.borderMuted }} />
      </div>

      {/* ── Secondary action buttons ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", marginBottom: 20 }}>
        <SecondaryBtn onClick={openWebcam} icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke={tokens.accentBrown} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
        }>Capture</SecondaryBtn>

        <SecondaryBtn onClick={() => fileInputRef.current?.click()} icon={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke={tokens.accentBrown} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18M9 21V9"/>
          </svg>
        }>Browse files</SecondaryBtn>
      </div>

      {/* ── Webcam capture button (only in webcam mode) ── */}
      {mode === "webcam" && (
        <PrimaryBtn onClick={handleCapture} style={{ marginBottom: 12 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={tokens.btnDarkText} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3" fill={tokens.btnDarkText} stroke="none"/>
          </svg>
          Take photo
        </PrimaryBtn>
      )}

      {/* ── Tips ── */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
        {["Face clearly visible", "Natural lighting", "No heavy filters", "Front-facing"].map(tip => (
          <div key={tip} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: tokens.borderMuted, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: tokens.textMuted }}>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────

interface BtnProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
}

/** Outlined secondary action button (e.g. "Capture", "Browse files"). */
const SecondaryBtn: React.FC<BtnProps> = ({ onClick, children, icon }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      padding: "13px 20px", borderRadius: 12,
      border: "1.5px solid #D4C4B8", background: "#FDFAF7",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: 13, fontWeight: 500, color: "#5C4035",
      cursor: "pointer", letterSpacing: "0.01em",
      transition: "border-color 0.2s, background 0.2s",
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.borderColor = "#8B6355";
      (e.currentTarget as HTMLButtonElement).style.background = "#F5EDE8";
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.borderColor = "#D4C4B8";
      (e.currentTarget as HTMLButtonElement).style.background = "#FDFAF7";
    }}
  >
    {icon}{children}
  </button>
);

/** Filled primary call-to-action button, also exported for use on the upload page (e.g. "Analyse my palette"). */
const PrimaryBtn: React.FC<BtnProps> = ({ onClick, children, style, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      width: "100%", padding: "16px", borderRadius: 14, border: "none",
      background: disabled ? "#C4B0A4" : "#2C1810",
      color: "#F7F0E8",
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: 16, fontWeight: 400, letterSpacing: "0.04em",
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
      transition: "background 0.2s",
      ...style,
    }}
    onMouseEnter={e => {
      if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = "#3D2418";
    }}
    onMouseLeave={e => {
      if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = "#2C1810";
    }}
  >
    {children}
  </button>
);

export { PrimaryBtn };
export default FaceCapture;