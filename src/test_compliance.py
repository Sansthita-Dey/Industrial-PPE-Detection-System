from compliance_engine import check_compliance

result = check_compliance(
    "Steel Melting Shop",
    ["helmet", "vest", "gloves"]
)

print(result)