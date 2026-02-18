#!/bin/bash
# Verification Test: Input Validation
# This script verifies that invalid emails are rejected with 400 Bad Request
# Expected: Invalid emails should return 400 with appropriate error messages

set -e

BASE_URL="http://localhost:3000"
API_URL="${BASE_URL}/api/newsletter"
CSRF_URL="${BASE_URL}/api/csrf-token"

echo "=== Input Validation Verification Test ==="
echo "Testing: Various invalid email formats"
echo "Expected: All should return 400 Bad Request"
echo ""

# Function to get CSRF token
get_csrf_token() {
    curl -s "${CSRF_URL}"
}

# Function to test an email
test_email() {
    local email="$1"
    local description="$2"
    local token="$3"

    response=$(curl -s -w "\n%{http_code}" -X POST "${API_URL}" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"${email}\",\"csrfToken\":\"${token}\"}")

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    echo "Test: ${description}"
    echo "Email: '${email}'"
    echo "Status: HTTP ${http_code}"
    echo "Response: ${body}"
    echo ""

    # Return the HTTP code
    echo "${http_code}"
}

echo "Fetching CSRF token for tests..."
token=$(get_csrf_token)
echo "CSRF Token: ${token:0:20}..."
echo ""

echo "=================================================="
echo "Running Input Validation Tests..."
echo "=================================================="
echo ""

test_count=0
pass_count=0
fail_count=0

# Test 1: Email without @ symbol
echo "Test 1: Email without @ symbol"
echo "-------------------------------"
status_code=$(test_email "invalidemail" "Email without @ symbol" "${token}")
test_count=$((test_count + 1))
if [ "$status_code" = "400" ]; then
    pass_count=$((pass_count + 1))
    echo "✓ PASSED: Rejected with 400 Bad Request"
else
    fail_count=$((fail_count + 1))
    echo "✗ FAILED: Expected 400, got ${status_code}"
fi
echo ""

# Test 2: Email without domain extension
echo "Test 2: Email without domain extension"
echo "---------------------------------------"
status_code=$(test_email "user@example" "Email without TLD" "${token}")
test_count=$((test_count + 1))
if [ "$status_code" = "400" ]; then
    pass_count=$((pass_count + 1))
    echo "✓ PASSED: Rejected with 400 Bad Request"
else
    fail_count=$((fail_count + 1))
    echo "✗ FAILED: Expected 400, got ${status_code}"
fi
echo ""

# Test 3: Email with invalid characters
echo "Test 3: Email with invalid characters"
echo "--------------------------------------"
status_code=$(test_email "user@@example.com" "Email with double @" "${token}")
test_count=$((test_count + 1))
if [ "$status_code" = "400" ]; then
    pass_count=$((pass_count + 1))
    echo "✓ PASSED: Rejected with 400 Bad Request"
else
    fail_count=$((fail_count + 1))
    echo "✗ FAILED: Expected 400, got ${status_code}"
fi
echo ""

# Test 4: Empty email
echo "Test 4: Empty email"
echo "-------------------"
status_code=$(test_email "" "Empty email string" "${token}")
test_count=$((test_count + 1))
if [ "$status_code" = "400" ]; then
    pass_count=$((pass_count + 1))
    echo "✓ PASSED: Rejected with 400 Bad Request"
else
    fail_count=$((fail_count + 1))
    echo "✗ FAILED: Expected 400, got ${status_code}"
fi
echo ""

# Test 5: Email starting with dot
echo "Test 5: Email starting with dot"
echo "-------------------------------"
status_code=$(test_email ".user@example.com" "Email with leading dot" "${token}")
test_count=$((test_count + 1))
if [ "$status_code" = "400" ]; then
    pass_count=$((pass_count + 1))
    echo "✓ PASSED: Rejected with 400 Bad Request"
else
    fail_count=$((fail_count + 1))
    echo "✗ FAILED: Expected 400, got ${status_code}"
fi
echo ""

# Test 6: Email with consecutive dots
echo "Test 6: Email with consecutive dots"
echo "-----------------------------------"
status_code=$(test_email "user..name@example.com" "Email with consecutive dots" "${token}")
test_count=$((test_count + 1))
if [ "$status_code" = "400" ]; then
    pass_count=$((pass_count + 1))
    echo "✓ PASSED: Rejected with 400 Bad Request"
else
    fail_count=$((fail_count + 1))
    echo "✗ FAILED: Expected 400, got ${status_code}"
fi
echo ""

# Test 7: Email with spaces
echo "Test 7: Email with spaces"
echo "-------------------------"
status_code=$(test_email "user name@example.com" "Email with space" "${token}")
test_count=$((test_count + 1))
if [ "$status_code" = "400" ]; then
    pass_count=$((pass_count + 1))
    echo "✓ PASSED: Rejected with 400 Bad Request"
else
    fail_count=$((fail_count + 1))
    echo "✗ FAILED: Expected 400, got ${status_code}"
fi
echo ""

# Test 8: Non-email input (number)
echo "Test 8: Non-email input (number)"
echo "--------------------------------"
status_code=$(test_email "123456" "Non-email string" "${token}")
test_count=$((test_count + 1))
if [ "$status_code" = "400" ]; then
    pass_count=$((pass_count + 1))
    echo "✓ PASSED: Rejected with 400 Bad Request"
else
    fail_count=$((fail_count + 1))
    echo "✗ FAILED: Expected 400, got ${status_code}"
fi
echo ""

echo "=================================================="
echo "=== RESULTS ==="
echo "=================================================="
echo "Total Tests: ${test_count}"
echo "Passed: ${pass_count}"
echo "Failed: ${fail_count}"
echo ""

if [ $fail_count -eq 0 ]; then
    echo "✓✓✓ INPUT VALIDATION VERIFICATION PASSED ✓✓✓"
    echo ""
    echo "The API correctly rejects invalid email formats:"
    echo "  - Emails without @ symbol"
    echo "  - Emails without domain extension (TLD)"
    echo "  - Emails with invalid characters"
    echo "  - Empty email strings"
    echo "  - Emails with leading dots"
    echo "  - Emails with consecutive dots"
    echo "  - Emails with spaces"
    echo "  - Non-email input"
    exit 0
else
    echo "✗✗✗ INPUT VALIDATION VERIFICATION FAILED ✗✗✗"
    echo ""
    echo "${fail_count} test(s) failed"
    exit 1
fi
