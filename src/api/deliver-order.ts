import { api } from "@/lib/axios";

export interface DeliverOrdersParams {
  orderId: string;
}

export async function deliverOrder({ orderId }: DeliverOrdersParams) {
  await api.patch(`/orders/${orderId}/deliver`);
}
