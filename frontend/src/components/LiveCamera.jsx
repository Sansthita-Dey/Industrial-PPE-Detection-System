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
      setCameraOn(true);

      intervalId = setInterval(() => {
        captureAndAnalyze();
      }, 2000);

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

        setResult(data);

      } catch (err) {
        console.error(err);
      }

    }, "image/jpeg");
  };

  return (
    <Card title="📷 Live PPE Monitoring">

      <video
        ref={videoRef}
        autoPlay
        style={{
          width: "100%",
          borderRadius: "10px"
        }}
      />

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
        <pre
          style={{
            marginTop: 15,
            color: "#fff"
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

    </Card>
  );
}