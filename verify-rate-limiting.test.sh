#!/bin/bash
# Verification Test: Rate Limiting
# This script verifies that the rate limiting prevents excessive requests
# Expected: 6th request should return 429 Too Many Requests

set -e

BASE_URL="http://localhost:3000"
API_URL="${BASE_URL}/api/newsletter"
CSRF_URL="${BASE_URL}/api/csrf-token"
EMAIL="test@example.com"

echo "=== Rate Limiting Verification Test ==="
echo "Testing: 6 requests in quick succession"
echo "Expected: 6th request returns 429 Too Many Requests"
echo ""

# Function to get CSRF token
get_csrf_token() {
    curl -s "${CSRF_URL}"
}

# Function to make newsletter request
make_request() {
    local token="$1"
    local request_num="$2"

    response=$(curl -s -w "\n%{http_code}" -X POST "${API_URL}" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"${EMAIL}\",\"csrfToken\":\"${token}\"}")

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    echo "Request ${request_num}: HTTP ${http_code}"
    echo "Response: ${body}"

    # Return the HTTP code
    echo "${http_code}"
}

echo "Step 1: Submitting 5 requests (should all succeed)..."
echo "------------------------------------------------"

success_count=0
for i in {1..5}; do
    echo ""
    echo "Request ${i} of 6..."
    token=$(get_csrf_token)
    echo "CSRF Token: ${token:0:20}..."

    status_code=$(make_request "${token}" "${i}")

    if [ "$status_code" = "200" ]; then
        success_count=$((success_count + 1))
        echo "✓ Request ${i} succeeded (200 OK)"
    elif [ "$status_code" = "429" ]; then
        echo "✗ Request ${i} was rate limited (429) - unexpected!"
        echo "ERROR: Rate limit triggered before 5 requests"
        exit 1
    else
        echo "✗ Request ${i} failed with status ${status_code} - unexpected!"
        exit 1
    fi

    # Small delay to ensure quick succession but processable
    sleep 0.1
done

echo ""
echo "------------------------------------------------"
echo "Step 2: Submitting 6th request (should return 429)..."
echo "------------------------------------------------"
echo ""

token=$(get_csrf_token)
echo "CSRF Token: ${token:0:20}..."

status_code=$(make_request "${token}" "6")

echo ""
echo "=== RESULTS ==="
echo "Successful requests: ${success_count}/5"

if [ "$status_code" = "429" ]; then
    echo "✓ 6th request correctly returned 429 Too Many Requests"
    echo ""
    echo "✓✓✓ RATE LIMITING VERIFICATION PASSED ✓✓✓"
    echo "The API correctly rate limits after 5 requests per minute"
    exit 0
else
    echo "✗ 6th request returned ${status_code}, expected 429"
    echo ""
    echo "✗✗✗ RATE LIMITING VERIFICATION FAILED ✗✗✗"
    exit 1
fi
