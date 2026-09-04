"""Typed, synthetic NOOA trace fixture and ATIF export contract."""

from dataclasses import asdict, dataclass
import json
from pathlib import Path


@dataclass(frozen=True)
class Step:
    name: str
    children: tuple["Step", ...] = ()


trace = Step("support_agent", (Step("request"), Step("policy", (Step("deny_token"),))))
Path("/tmp/nooa-atif.json").write_text(
    json.dumps({"schema_version": "ATIF-v1", "steps": [asdict(trace)]}, indent=2) + "\n"
)
print("/tmp/nooa-atif.json")
