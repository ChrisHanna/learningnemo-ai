#!/usr/bin/env bash
set -euo pipefail
anonymizer validate --source synthetic/customers.csv --text-column text --replace redact --no-emit-telemetry
anonymizer preview --source synthetic/customers.csv --text-column text --replace redact --num_records 1 --no-emit-telemetry
anonymizer run --source synthetic/customers.csv --text-column text --replace redact --output /tmp/anonymized-redact.csv --no-emit-telemetry
anonymizer preview --source synthetic/customers.csv --text-column text --replace hash --num_records 1 --no-emit-telemetry
anonymizer run --source synthetic/customers.csv --text-column text --replace hash --output /tmp/anonymized-hash.csv --no-emit-telemetry
