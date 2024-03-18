import { http, HttpResponse } from "msw";

import { GetOrdersDetailsResponse, GetOrdersDetailsParams } from "../get-order-details";

export const getOrdersDetailsMock = http.get<GetOrdersDetailsParams, never, GetOrdersDetailsResponse>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    status: "pending",
    createdAt: new Date().toISOString(),
    totalInCents: 4000,
    customer: {
      name: "John Doe",
      email: "johndoe@email.com",
      phone: "123123123",
    },
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 1000,
        quantity: 2,
        product: { name: "Pizza Peperoni" },
      },
      {
        id: "order-item-2",
        priceInCents: 2000,
        quantity: 1,
        product: { name: "Pizza Portuguesa" },
      },
    ],
  });
});
