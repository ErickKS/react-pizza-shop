import { api } from "@/lib/axios";

export interface GetDateInPeriodQuery {
  from?: Date;
  to?: Date;
}

export type GetDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenueInPeriod({ from, to }: GetDateInPeriodQuery) {
  const response = await api.get<GetDailyRevenueInPeriodResponse>("/metrics/daily-receipt", {
    params: {
      from,
      to,
    },
  });

  return response.data;
}
