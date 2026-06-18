import React, { useRef, useState } from "react";
import { Button, Card, message } from "antd";

const API_URL = "http://localhost:8000";

export default function LiveCamera({ department }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [result, setResult] = useState(null);

  let intervalId = null;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
      setCameraOn(true);

      intervalId = setInterval(() => {
        captureAndAnalyze();
      }, 2000);
};
    } catch (err) {
      console.error(err);
      message.error("Camera access denied");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    setCameraOn(false);
  };

  const captureAndAnalyze = async () => {
    if (!department) return;

    const canvas = canvasRef.current;
const video = videoRef.current;

if (!video || !canvas) {
  return;
}

if (video.videoWidth === 0 || video.videoHeight === 0) {
  return;
}

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();

      formData.append(
        "file",
        blob,
        "live_frame.jpg"
      );

      formData.append(
        "department",
        department
      );

      try {
        const response = await fetch(
          `${API_URL}/live-detect`,
          {
            method: "POST",
            body: formData,
          }
        );

       const data = await response.json();

console.log("LIVE RESPONSE:", data);

setResult(data);

      } catch (err) {
        console.error(err);
      }

    }, "image/jpeg");
  };

  return (
    <Card title="📷 Live PPE Monitoring">

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px"
  }}
>
  <video
    ref={videoRef}
    autoPlay
    style={{
      width: "100%",
      maxWidth: "650px",
      height: "360px",
      objectFit: "cover",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.1)"
    }}
  />
</div>

      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

      <div
        style={{
          marginTop: 15,
          display: "flex",
          gap: 10
        }}
      >
        <Button
          type="primary"
          onClick={startCamera}
          disabled={cameraOn}
        >
          Start Camera
        </Button>

        <Button
          danger
          onClick={stopCamera}
        >
          Stop Camera
        </Button>
      </div>

      {result && (
  <div
    style={{
      marginTop: 20,
      padding: 20,
      background: "#0f172a",
      border: result.allowed
        ? "1px solid #10b981"
        : "1px solid #ef4444",
      borderRadius: 12,
      color: "white"
    }}
  >

    <div
      style={{
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: 15,
        color: result.allowed
          ? "#10b981"
          : "#ef4444"
      }}
    >
      {result.allowed
        ? "🟢 ALLOWED"
        : "🔴 NOT ALLOWED"}
    </div>

    <div
      style={{
        fontSize: "16px",
        marginBottom: 20
      }}
    >
      Compliance Score: {result.compliance}%
    </div>

    <div style={{ marginBottom: 15 }}>
      <strong>Detected PPE</strong>

      <ul style={{ marginTop: 10 }}>
        {result.detected.length > 0 ? (
          result.detected.map(item => (
            <li key={item}>
              ✅ {item}
            </li>
          ))
        ) : (
          <li>No PPE detected</li>
        )}
      </ul>
    </div>

    <div>
      <strong>Missing PPE</strong>

      <ul style={{ marginTop: 10 }}>
        {result.missing.map(item => (
          <li key={item}>
            ❌ {item}
          </li>
        ))}
      </ul>
    </div>

  </div>
)}

    </Card>
  );
}