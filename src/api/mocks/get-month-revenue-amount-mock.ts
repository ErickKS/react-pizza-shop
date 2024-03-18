import { http, HttpResponse } from "msw";

import { GetMonthRevenueAmountResponse } from "../get-month-revenue-amount";

export const getMonthRevenueAmountMock = http.get<never, never, GetMonthRevenueAmountResponse>("/metrics/month-receipt", () => {
  return HttpResponse.json({
    receipt: 2000,
    diffFromLastMonth: 10,
  });
});
