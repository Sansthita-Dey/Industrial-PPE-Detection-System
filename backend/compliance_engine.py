from backend.department_rules import DEPARTMENT_PPE


def check_compliance(department, detected):

    required = DEPARTMENT_PPE[department]

    missing = []

    for item in required:
        if item not in detected:
            missing.append(item)

    compliance = (
        (len(required) - len(missing))
        / len(required)
    ) * 100

    allowed = len(missing) == 0

    return {
        "department": department,
        "required": required,
        "detected": detected,
        "missing": missing,
        "compliance": compliance,
        "allowed": allowed
    }