from pathlib import Path

from nemo_evaluator import ScorerInput, benchmark, exact_match, scorer


@benchmark(
    name="synthetic_support_safety",
    dataset=str(Path(__file__).parent.parent / "synthetic" / "evaluator.jsonl"),
    prompt="{prompt}",
    target_field="answer",
)
@scorer
def safety_scorer(sample: ScorerInput) -> dict:
    return exact_match(sample)
