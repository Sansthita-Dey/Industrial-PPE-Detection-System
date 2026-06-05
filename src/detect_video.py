import cv2
from ultralytics import YOLO

from compliance_engine import check_compliance


# Load trained model
model = YOLO("runs/detect/train-2/weights/best.pt")


video_path = "videos/test.mp4"

cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print("Error: Cannot open video.")
    exit()


frame_count = 0

# Store PPE detected across the entire video
all_detected_ppe = set()


while True:

    ret, frame = cap.read()

    if not ret:
        break

    frame_count += 1

    # Process every 5th frame
    if frame_count % 5 != 0:
        continue

    # YOLO Detection
    results = model(frame, verbose=False)

    # Collect detected PPE
    for result in results:

        for box in result.boxes:

            class_id = int(box.cls[0])

            class_name = model.names[class_id]

            if class_name not in ["Person", "none"]:
                all_detected_ppe.add(class_name)

    # Draw detections
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


print(f"\nTotal Frames Processed: {frame_count}")

print("\nDetected PPE Across Entire Video:")
print(list(all_detected_ppe))


# Compliance Check
department = "Steel Melting Shop"

compliance_result = check_compliance(
    department,
    list(all_detected_ppe)
)


print("\n========== VIDEO COMPLIANCE REPORT ==========")

print("Department:", compliance_result["department"])

print("Required PPE:",
      compliance_result["required"])

print("Detected PPE:",
      compliance_result["detected"])

print("Missing PPE:",
      compliance_result["missing"])

print("Compliance:",
      compliance_result["compliance"], "%")

if compliance_result["allowed"]:
    print("STATUS: ALLOWED")
else:
    print("STATUS: NOT ALLOWED")