# Simulated app fixture

This fixture is **Simulated** app/unit-test data. It does not install or execute
NVIDIA software and must not be described as NeMo execution. It mirrors the two
recorded paths in the app:

1. **Build** a narrow `support_agent` with the read-only
   `crm.customer.read` capability.
2. **Guard** the workflow so a request for a private token is denied before it
   can become a tool call or response.

Run them from this directory:

```sh
python -m unittest discover -p 'test_*.py'
python support_agent.py --check-evidence
```

`evidence.json` is deterministic fixture data. The credential-free, synthetic
execution paths for the pinned NVIDIA projects live in
[`../verified/README.md`](../verified/README.md).
