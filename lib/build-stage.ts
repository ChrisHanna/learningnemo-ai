export type BuildField = {
  label: string;
  value: string;
  detail: string;
};

export const baselineSupportAgent = {
  name: "support_agent",
  purpose: "Resolve authenticated customer support requests",
  fields: [
    {label: "Workflow", value: "support_agent", detail: "Single entry point for every request"},
    {label: "Model", value: "llama-3.1-70b-instruct", detail: "Plans an answer from trusted context"},
    {label: "Knowledge", value: "customer_kb", detail: "Retrieves only customer-visible documents"},
    {label: "Tools", value: "crm.customer.read", detail: "Read-only lookup with the caller identity"},
  ] satisfies BuildField[],
  steps: [
    "Receive the authenticated request",
    "Retrieve relevant customer knowledge",
    "Read the customer record",
    "Return a grounded support response",
  ],
};
