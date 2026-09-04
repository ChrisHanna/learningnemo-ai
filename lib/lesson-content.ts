export type LessonContent = {
  objective: string;
  brief: string;
  steps: string[];
  evidence: string;
  example?: string;
};

export const authoredLessons: Record<string, LessonContent> = {
  "01": {
    objective: "Keep the existing support agent intact while making its run observable.",
    brief: "Wrap the agent at the workflow boundary so NeMo can record inputs, outputs, tools, and evaluation metadata without changing the agent's business logic.",
    steps: [
      "Register the existing agent as a workflow entry point.",
      "Attach a run identifier and request metadata at the boundary.",
      "Record the final response and every capability used.",
    ],
    evidence: "A replayable run with the same answer and a complete event envelope.",
    example: "workflow = register_workflow(\"support_agent\", agent.run)",
  },
  "02": {
    objective: "Make the support workflow's authority and failure behavior explicit.",
    brief: "Move model, retrieval, function, input, and output settings into a reviewable NeMo workflow configuration.",
    steps: [
      "Declare the model and support_agent entry point.",
      "Allow only customer_kb retrieval and crm.customer.read.",
      "Define a safe failure response when a capability is unavailable.",
    ],
    evidence: "A configuration diff that reviewers can inspect before execution.",
    example: "functions:\n  support_agent:\n    tools: [crm.customer.read]",
  },
  "03": {
    objective: "Ground answers in only the documents the caller is allowed to see.",
    brief: "Build retrieval as a permission-aware function, not as a global search over the customer knowledge base.",
    steps: [
      "Resolve the authenticated customer identity before retrieval.",
      "Apply document authorization filters before ranking results.",
      "Return citations and refuse when no authorized evidence supports an answer.",
    ],
    evidence: "The trace shows the identity filter before retrieval results are passed to the model.",
  },
  "04": {
    objective: "Expose narrow, authenticated tools without expanding agent authority.",
    brief: "Add MCP functions with validated parameters, caller identity, and read-only scopes so tool discovery cannot become permission discovery.",
    steps: [
      "Publish only the customer read operation the workflow needs.",
      "Validate the customer identifier against the authenticated caller.",
      "Reject unknown tools, extra arguments, and scope escalation.",
    ],
    evidence: "A denied tool request leaves no side effect and records the policy reason.",
    example: "tool = mcp.expose(\"crm.customer.read\", scope=\"customer:read\")",
  },
  "05": {
    objective: "Read one workflow run as a correlated sequence of events.",
    brief: "Learn the event vocabulary that connects model generations, retrieval, policy decisions, functions, and tool calls.",
    steps: [
      "Start with the run identifier, not an individual log line.",
      "Follow parent and child spans through retrieval and execution.",
      "Separate observations from decisions made by the workflow.",
    ],
    evidence: "Every consequential event has a timestamp, source, status, and correlation identifier.",
  },
  "06": {
    objective: "Locate the first consequential decision in an agent trajectory.",
    brief: "Inspect the support-agent trajectory in order and identify where an untrusted instruction changes the requested authority.",
    steps: [
      "Compare the user request with the initial workflow intent.",
      "Find the first tool selection that exceeds the baseline capability.",
      "Mark the earliest point where a guard could have stopped the run.",
    ],
    evidence: "A trajectory annotation naming the first unsafe decision and its preceding context.",
  },
  "07": {
    objective: "Find the expensive and slow parts of a workflow before optimizing.",
    brief: "Use profiling data to connect token usage, latency, retries, and tool calls to a specific workflow step.",
    steps: [
      "Compare input and output tokens for each model event.",
      "Measure queue, model, retrieval, and tool latency separately.",
      "Prioritize the bottleneck that affects the release objective.",
    ],
    evidence: "A profile with one justified optimization target and a baseline measurement.",
  },
  "08": {
    objective: "Export useful telemetry while keeping sensitive content out of production traces.",
    brief: "Design OpenTelemetry attributes and content-capture rules that preserve debugging value without exporting prompts, tokens, or private records.",
    steps: [
      "Keep run IDs, durations, statuses, and capability names as metadata.",
      "Redact prompts, retrieval chunks, tool arguments, and results by default.",
      "Allow audited, time-limited content capture only for approved debugging.",
    ],
    evidence: "A telemetry policy that is useful for operations and safe to share with observability backends.",
  },
};
