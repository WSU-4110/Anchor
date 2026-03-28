export interface Observer {
  update(businessId: string, message: string): void;
}
