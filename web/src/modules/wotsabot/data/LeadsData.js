// leadsData.js
export const leadColumnDefs = [
  {
    field: "fullName",
    headerName: "Lead Name",
    width: 280,
    valueGetter: (params) =>
      `${params.data.firstName || ""} ${params.data.lastName || ""}`.trim(),
  },
  { field: "email", headerName: "Email" },
  { field: "phone", headerName: "Phone" },
  { field: "mobile", headerName: "Mobile" },
  { field: "title", headerName: "Title" },
  {
    field: "leadSubSourceId.name",
    headerName: "Lead Source",
  },
  {
    field: "industryId.name",
    headerName: "Industry",
  },
  { field: "company", headerName: "Company" },
  {
    field: "statusId.statusDescription",
    headerName: "Status",
  },
  {
    field: "ratingId.statusDescription",
    headerName: "Rating",
  },
  {
    field: "addressId.street",
    headerName: "Street",
    valueGetter: (params) =>
      params.data.addressId?.addressLines?.join(", ") || "",
  },
  // {
  //   field: "addressId.cityId.name",
  //   headerName: "City",
  // },
  // {
  //   field: "addressId.stateId.name",
  //   headerName: "State",
  // },
  // {
  //   field: "addressId.postalCode",
  //   headerName: "Zip Code",
  // },
  // {
  //   field: "addressId.countryId.name",
  //   headerName: "Country",
  // },
];
