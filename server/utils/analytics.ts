import { Document, Model } from "mongoose";

interface IMonthDate {
  month: string;
  count: number;
}

export async function generateLast12MonthDate<T extends Document>(
  mode: Model<T>,
): Promise<{ last12Months: IMonthDate[] }> {
  const last12Months: IMonthDate[] = [];

  let currentData = new Date();
  currentData.setDate(currentData.getDate() + 1);

  for (let i = 11; i >= 0; i--) {
    const endDate = new Date(
      currentData.getFullYear(),
      currentData.getMonth(),
      currentData.getDate() - i * 28,
    );
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28,
    );

    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const count = await mode.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    last12Months.push({ month: monthYear, count });
  }

  return { last12Months };
}
