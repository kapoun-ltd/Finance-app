import * as XLSX from 'xlsx';

const exportToExcel = (transactions) => {
  const exportData = transactions.map(tx => ({
    Type: tx.type,
    Description: tx.description || 'No description',
    Amount: Number(tx.amount),
    Account: tx.account,
    Method: tx.method,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
  XLSX.writeFile(workbook, 'transactions.xlsx');
};

export default exportToExcel;