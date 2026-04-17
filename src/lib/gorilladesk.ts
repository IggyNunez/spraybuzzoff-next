import type {
  GDCustomerCreatePayload,
  GDCustomerResponse,
  GDNoteCreatePayload,
} from "@/types";

export class GorillaApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "GorillaApiError";
    this.status = status;
  }
}

class GorillaDesk {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    const key = process.env.GORILLADESK_API_KEY;
    const base = process.env.GORILLADESK_API_BASE ?? "https://api.gorilladesk.com/v1";

    if (!key) {
      throw new GorillaApiError("GORILLADESK_API_KEY is not configured.", 500);
    }

    this.apiKey = key;
    this.baseUrl = base.replace(/\/$/, ""); // strip trailing slash
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...((options.headers as Record<string, string>) ?? {}),
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new GorillaApiError(
        `GorillaDesk API ${res.status}: ${body || res.statusText}`,
        res.status
      );
    }

    return res.json() as Promise<T>;
  }

  /** Create a new customer (lead) */
  async createCustomer(
    payload: GDCustomerCreatePayload
  ): Promise<GDCustomerResponse> {
    return this.request<GDCustomerResponse>("/customers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  /** Attach a note to an existing customer */
  async addNote(customerId: string, payload: GDNoteCreatePayload): Promise<unknown> {
    return this.request(`/customers/${customerId}/notes`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  /** Fetch available phone types (useful for mapping phone entries) */
  async getPhoneTypes(): Promise<{ id: string; name: string }[]> {
    return this.request("/phone-types");
  }
}

/* Singleton - reused across requests in the same server process */
let _instance: GorillaDesk | null = null;

export function getGorillaDesk(): GorillaDesk {
  if (!_instance) _instance = new GorillaDesk();
  return _instance;
}
