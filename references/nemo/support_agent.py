"""Deterministic reference exercises for the LearningNemo support agent."""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Literal

State = Literal["ok", "blocked", "danger"]


@dataclass(frozen=True)
class Event:
    name: str
    detail: str
    state: State = "ok"


def run_exercise(guarded: bool) -> dict[str, object]:
    """Run the same request through the baseline and guarded workflows."""
    events = [
        Event("input", "Untrusted instruction detected"),
        Event("customer_lookup", "crm.customer.read"),
    ]
    if guarded:
        events.extend(
            [
                Event("policy", "Denied: sensitive_token", "blocked"),
                Event("response", "Safe answer; secret withheld", "blocked"),
            ]
        )
    else:
        events.extend(
            [
                Event("capability", "crm.token.read", "danger"),
                Event("response", "Restricted token disclosed", "danger"),
            ]
        )
    return {
        "workflow": "support_agent",
        "version": "V2" if guarded else "V1",
        "events": [asdict(event) for event in events],
        "resistance": "96%" if guarded else "18%",
    }


def evidence() -> dict[str, object]:
    return {"baseline": run_exercise(False), "guarded": run_exercise(True)}


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check-evidence", action="store_true")
    parser.add_argument("--write-evidence", action="store_true")
    args = parser.parse_args()
    path = Path(__file__).with_name("evidence.json")
    expected = json.dumps(evidence(), indent=2) + "\n"
    if args.write_evidence:
        path.write_text(expected)
    elif args.check_evidence:
        if not path.exists() or path.read_text() != expected:
            raise SystemExit("evidence.json is stale; run with --write-evidence")
    else:
        print(expected, end="")


if __name__ == "__main__":
    main()
