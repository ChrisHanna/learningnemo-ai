#!/usr/bin/env bash
set -euo pipefail
python mock_model.py &
nel validate -b ./evaluator/byob.py --model-url http://127.0.0.1:8000/v1 --model-id synthetic --samples 10
nel eval run --bench ./evaluator/byob.py --model-url http://127.0.0.1:8000/v1 --model-id synthetic --max-problems 10 --output-dir reports/candidate
nel eval report reports/candidate -f json -o reports/candidate.json
cp -a reports/candidate reports/baseline
nel compare reports/baseline reports/candidate --strict
nel gate reports/baseline reports/candidate --policy evaluator/policy.yaml --strict
