# LearningNemo AI

LearningNemo is a hands-on curriculum for building, tracing, attacking,
guarding, evaluating, and improving an enterprise support agent with NVIDIA
NeMo concepts.

## Quick start

```sh
npm install
npm run dev
```

The application is available at `http://localhost:3000`. The deterministic
reference exercises can be run independently:

```sh
npm test
python references/nemo/support_agent.py --check-evidence
```

## CI-verified references

`references/nemo` contains the executable support-agent contract used by the
recorded V1/V2 demo. The baseline path demonstrates why a narrow,
read-only customer lookup still needs enforcement. The guarded path denies a
private token request before it becomes a tool call. Both paths are tested
without external services, and `evidence.json` records their deterministic
execution output.

GitHub Actions runs the reference tests, checks the committed evidence, and
builds the Next.js application on every push and pull request.

## Curriculum

The studio follows six stages:

- **Build** — configure an observable workflow and explicit authority.
- **Trace** — inspect events, tokens, latency, and tool calls.
- **Attack** — test prompt injection, permissions, grounding, and handoffs.
- **Guard** — enforce input, retrieval, execution, and output policy.
- **Evaluate** — measure quality, safety, cost, and latency.
- **Improve** — release, observe, and repeat the improvement loop.

This is an independent educational project and is not an NVIDIA product.