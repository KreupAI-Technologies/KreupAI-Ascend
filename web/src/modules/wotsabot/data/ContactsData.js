export const contactColumnDefs = [
  {
    field: "contactName",
    headerName: "Contact Name",
    headerCheckboxSelection: true,
    checkboxSelection: true,
    flex: 1,
  },
  { field: "clientId.clientName", headerName: "Account Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "phone", headerName: "Phone", flex: 1 },
  { field: "userId.firstName", headerName: "Contact Owner", flex: 1 },
];
