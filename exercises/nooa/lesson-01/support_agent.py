"""Lesson 01: a narrow NOOA agent with deterministic authorization logic.

This example intentionally makes no model call. It proves the learner is using
the real ``nooa.Agent`` abstraction while keeping the refund decision in
ordinary, testable Python.
"""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass

from nooa import Agent
from nooa.unifiedllm import FakeLLMClient


@dataclass(frozen=True)
class RefundRequest:
    order_id: str
    delivered: bool
    days_since_delivery: int


@dataclass(frozen=True)
class RefundDecision:
    approved: bool
    reason: str


class SupportAgent(Agent):
    """Help with orders without inventing authority or bypassing policy."""

    def evaluate_refund(self, request: RefundRequest) -> RefundDecision:
        """Apply the refund policy in deterministic Python."""
        if not request.delivered:
            return RefundDecision(False, "order_not_delivered")
        if request.days_since_delivery > 30:
            return RefundDecision(False, "refund_window_expired")
        return RefundDecision(True, "within_refund_window")


def main() -> None:
    # NOOA agents always resolve an LLM client at construction. The framework's
    # supported fake client keeps this deterministic lesson offline; no model
    # method is called here.
    agent = SupportAgent(llm=FakeLLMClient())
    decision = agent.evaluate_refund(
        RefundRequest(
            order_id="ORDER-1042",
            delivered=True,
            days_since_delivery=12,
        )
    )

    assert issubclass(SupportAgent, Agent)
    assert decision == RefundDecision(True, "within_refund_window")
    print(
        json.dumps(
            {
                "framework": Agent.__module__.split(".")[0],
                "agent": type(agent).__name__,
                "decision": asdict(decision),
            },
            sort_keys=True,
        )
    )


if __name__ == "__main__":
    main()
