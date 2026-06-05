import cv2

video_path = "../videos/test.mp4"

cap = cv2.VideoCapture(video_path)

frame_count = 0

while True:

    ret, frame = cap.read()

    if not ret:
        break

    frame_count += 1

    cv2.putText(
        frame,
        f"Frame: {frame_count}",
        (20, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )

    cv2.imshow("Industrial PPE Detection", frame)

    if cv2.waitKey(25) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()

print(f"Total Frames Processed: {frame_count}")