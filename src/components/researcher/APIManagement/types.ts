export interface PublicAPI {
  id: string;
  name: string;
  status: string;
  description: string;
  baseUrl: string;
  category: string;
  icon: string;
}

export interface APIEndpoint {
  name: string;
  method: string;
  endpoint: string;
  description: string;
  sampleRequest?: string;
}
