import cv2
from ultralytics import YOLO

# Load trained model
model = YOLO("runs/detect/train-2/weights/best.pt")

video_path = "videos/test.mp4"

cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print("Error: Cannot open video.")
    exit()

frame_count = 0

while True:

    ret, frame = cap.read()

    if not ret:
        break

    frame_count += 1

    if frame_count % 5 != 0:
     continue

    # YOLO Detection
    results = model(frame, verbose=False)

    annotated_frame = results[0].plot()

    cv2.putText(
        annotated_frame,
        f"Frame: {frame_count}",
        (20, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )

    cv2.imshow(
        "Industrial PPE Detection",
        annotated_frame
    )

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()

print(f"Total Frames Processed: {frame_count}")