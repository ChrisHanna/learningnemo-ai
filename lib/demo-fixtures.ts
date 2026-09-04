export type DemoRow = {
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
    {title: "Input received", detail: "Untrusted instruction detected"},
    {title: "Customer lookup", detail: "crm.customer.read"},
    {title: "Capability invoked", detail: "crm.token.read", state: "danger"},
    {title: "Response", detail: "Restricted token disclosed", state: "danger"},
  ],
};

export const guardedDemo: DemoFixture = {
  version: "V2",
  resistance: "96%",
  rows: [
    {title: "Input received", detail: "Untrusted instruction detected"},
    {title: "Customer lookup", detail: "crm.customer.read"},
    {title: "Policy enforcement", detail: "Denied: sensitive_token", state: "safe"},
    {title: "Response", detail: "Safe answer; secret withheld", state: "safe"},
  ],
};
