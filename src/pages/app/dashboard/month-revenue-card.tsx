import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

import { getMonthRevenueAmount } from "@/api/get-month-revenue-amount";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MonthRevenueCard() {
  const { data: monthRevenueAmount } = useQuery({
    queryKey: ["metrics", "month-revenue"],
    queryFn: getMonthRevenueAmount,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 ">
        <CardTitle className="text-base font-semibold">Receita total (mês)</CardTitle>
        <DollarSign className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenueAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenueAmount.receipt / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthRevenueAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">+{monthRevenueAmount.diffFromLastMonth}%</span> em relação ao mês
                  passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">{monthRevenueAmount.diffFromLastMonth}%</span> em relação ao mês
                  passado
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
