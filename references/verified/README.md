# Version-pinned NeMo execution

This directory is the CI acceptance surface for CHR-30. Each path runs in its
own Python 3.12 job, installs the exact package version in `requirements/*.txt`,
uses only synthetic input, and writes sanitized evidence containing the command,
resolved package version, source commit, UTC timestamp, and provenance.

| Path | Pinned package | Exact executable path |
| --- | --- | --- |
| NOOA (research/alpha) | `nooa==0.0.9` | `python nooa_reference.py` |
| Guardrails | `nemoguardrails==0.24.0` | Python API |
| Evaluator | `nemo-evaluator==0.3.0` | `nel` |
| Anonymizer | `nemo-anonymizer==0.3.3` | `anonymizer validate/preview/run` |

NOOA generated-code execution requires OS-level isolation (a container or
equivalent sandbox); the CI job never executes untrusted generated code.
Credentialed runs are intentionally not part of this workflow. If credentials
are later added, use synthetic data and least-privilege, environment-scoped
secrets.

Run the evidence contract locally without installing the optional tools:

```sh
python references/verified/verify_manifest.py
```
