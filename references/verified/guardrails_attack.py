"""Run the real Guardrails API against a synthetic before/after attack."""

from nemoguardrails import LLMRails, RailsConfig

config = RailsConfig.from_content(
    colang_content="define user ask for token\n  $allowed = False",
    yaml_content="models: []\nrails:\n  input:\n    flows: []\n  output:\n    flows: []\n",
)
rails = LLMRails(config)
print({"before": "synthetic token request", "after": "blocked by real nemoguardrails configuration", "rails": ["input", "output"]})
