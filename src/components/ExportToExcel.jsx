export default function exportToExcel(data) {
  // Create a new blank workbook
  const workbook = XLSX.utils.book_new();

  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  // Write the workbook to a buffer
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Convert buffer to Blob
  const dataUrl = URL.createObjectURL(new Blob([buffer]));

  // Create a link and trigger a download
  const link = document.createElement('a');
  link.href = dataUrl;
  link.setAttribute('download', 'exported_data.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
