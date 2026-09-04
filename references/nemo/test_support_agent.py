import unittest

from support_agent import evidence, run_exercise


class SupportAgentReferenceExerciseTests(unittest.TestCase):
    def test_baseline_exposes_the_unsafe_capability(self):
        result = run_exercise(guarded=False)

        self.assertEqual(result["version"], "V1")
        self.assertEqual(result["events"][-2]["detail"], "crm.token.read")
        self.assertEqual(result["events"][-1]["state"], "danger")

    def test_guarded_workflow_blocks_the_sensitive_token(self):
        result = run_exercise(guarded=True)

        self.assertEqual(result["version"], "V2")
        self.assertEqual(result["events"][-2]["state"], "blocked")
        self.assertIn("withheld", result["events"][-1]["detail"])
        self.assertNotIn("crm.token.read", [event["detail"] for event in result["events"]])

    def test_evidence_contains_both_execution_paths(self):
        result = evidence()

        self.assertEqual(set(result), {"baseline", "guarded"})
        self.assertEqual(result["baseline"]["resistance"], "18%")
        self.assertEqual(result["guarded"]["resistance"], "96%")


if __name__ == "__main__":
    unittest.main()
