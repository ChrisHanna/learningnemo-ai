# NeMo reference exercises

These exercises make the support-agent contract executable without requiring
credentials, model downloads, or a GPU. They mirror the two recorded paths in
the app:

1. **Build** a narrow `support_agent` with the read-only
   `crm.customer.read` capability.
2. **Guard** the workflow so a request for a private token is denied before it
   can become a tool call or response.

Run them from this directory:

```sh
python -m unittest discover -p 'test_*.py'
python support_agent.py --check-evidence
```

`evidence.json` is committed execution evidence. It is deterministic and CI
regenerates the expected value before comparing it, so a changed exercise must
update its evidence in the same change.
