import api from "./api";

export interface ReportSummaryDTO {
  totalBooks: number;
  totalMembers: number;
  totalTransactions: number;
  activeLoans: number;
  returnedLoans: number;
  overdueLoans: number;
  totalFines: number;
  categoryDistribution: Record<string, number>;
}

export const reportService = {
  getReportSummary: async (): Promise<ReportSummaryDTO> => {
    const response = await api.get<ReportSummaryDTO>("/reports/summary");
    return response.data;
  },
};
