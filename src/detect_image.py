from ultralytics import YOLO

from compliance_engine import check_compliance


# Load latest trained model
model = YOLO("runs/detect/train-2/weights/best.pt")


# Test image
image_path = "construction-ppe/images/test/image1.jpeg"


# Run inference
results = model(image_path)


detected_ppe = []


for result in results:

    for box in result.boxes:

        class_id = int(box.cls[0])

        class_name = model.names[class_id]

        # Ignore non-PPE classes
        if class_name not in ["Person", "none"]:
            detected_ppe.append(class_name)


# Remove duplicates
detected_ppe = list(set(detected_ppe))


print("\n========== DETECTED PPE ==========")
print(detected_ppe)


department = "Steel Melting Shop"


compliance_result = check_compliance(
    department,
    detected_ppe
)


print("\n========== COMPLIANCE RESULT ==========")
print("Department:", compliance_result["department"])
print("Required PPE:", compliance_result["required"])
print("Detected PPE:", compliance_result["detected"])
print("Missing PPE:", compliance_result["missing"])
print("Compliance:", compliance_result["compliance"], "%")

if compliance_result["allowed"]:
    print("STATUS: ALLOWED")
else:
    print("STATUS: NOT ALLOWED")