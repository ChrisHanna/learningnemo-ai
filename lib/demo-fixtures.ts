export type DemoRow = {
  id: string;
  title: string;
  detail: string;
  state?: "safe" | "danger";
};

export type DemoFixture = {
  version: "V1" | "V2";
  resistance: string;
  rows: DemoRow[];
};

export const baselineDemo: DemoFixture = {
  version: "V1",
  resistance: "18%",
  rows: [
    {id: "input", title: "Input received", detail: "Untrusted instruction detected"},
    {id: "lookup", title: "Customer lookup", detail: "crm.customer.read"},
    {id: "capability", title: "Capability invoked", detail: "crm.token.read", state: "danger"},
    {id: "response", title: "Response", detail: "Restricted token disclosed", state: "danger"},
  ],
};

export const guardedDemo: DemoFixture = {
  version: "V2",
  resistance: "96%",
  rows: [
    {id: "input", title: "Input received", detail: "Untrusted instruction detected"},
    {id: "lookup", title: "Customer lookup", detail: "crm.customer.read"},
    {id: "policy", title: "Policy enforcement", detail: "Denied: sensitive_token", state: "safe"},
    {id: "response", title: "Response", detail: "Safe answer; secret withheld", state: "safe"},
  ],
};
