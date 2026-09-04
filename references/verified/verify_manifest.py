"""Validate the version-pinned, synthetic NeMo execution manifest."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).parent
MANIFEST = json.loads((ROOT / "manifest.json").read_text())
REQUIRED = {"package", "version", "command", "source", "commit", "input", "provenance", "evidence"}


def main() -> None:
    assert len(MANIFEST["paths"]) == 4
    for name, path in MANIFEST["paths"].items():
        missing = REQUIRED - path.keys()
        if missing:
            raise SystemExit(f"{name}: missing {', '.join(sorted(missing))}")
        if path["input"] != "synthetic":
            raise SystemExit(f"{name}: non-synthetic input")
        if not path["commit"] or path["commit"] == "HEAD":
            raise SystemExit(f"{name}: source commit must be pinned")
        if not path["provenance"].startswith(("https://github.com/NVIDIA/", "https://github.com/NVIDIA-NeMo/")):
            raise SystemExit(f"{name}: invalid provenance")
        if set(path["evidence"]) != {"timestamp", "sanitized_output"}:
            raise SystemExit(f"{name}: incomplete evidence metadata")
    print("verified manifest: 4 pinned synthetic paths")


if __name__ == "__main__":
    main()
