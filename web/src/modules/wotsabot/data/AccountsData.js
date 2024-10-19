
//accountsData.js
export const accountColumnDefs = [
  {
    field: "clientName",
    headerName: "Account Name",
  },
  { field: "phone", headerName: "Phone" },
  { field: "website", headerName: "Website", width: 240 },
  {
    field: "fullName",
    headerName: "Account Owner",
    valueGetter: (params) =>
      `${params.data.userId.firstName || ""} ${params.data.userId.lastName || ""}`.trim(),
  },
  // {
  //   field: "industryId.name",
  //   headerName: "Industry",
  // },


  // {
  //   field: "paymentMethodId.name",
  //   headerName: "Payment Method",
  // },
  // {
  //   field: "paymentTermsId.name",
  //   headerName: "Payment Term",
  // },
  // {
  //   field: "deliveryTermsId.name",
  //   headerName: "Delivery Term",
  // },
  // {
  //   field: "divisionId.name",
  //   headerName: "Division",
  // },
  // {
  //   field: "rating",
  //   headerName: "Rating",
  // },

  // { field: "email", headerName: "Email" },
  // {
  //   field: "fullName", headerName: "Created By",
  //   valueGetter: (params) =>
  //     `${params.data.createdBy.firstName || ""} ${params.data.createdBy.lastName || ""}`.trim(),
  // },
  // {
  //   field: "fullName", headerName: "Last Modified By",
  //   valueGetter: (params) =>
  //     `${params.data.lastModifiedBy.firstName || ""} ${params.data.lastModifiedBy.lastName || ""}`.trim(),
  // },
  // { field: "billingAddressId.addressLines", headerName: "Billing Address" },
  // { field: "shippingAddressId.addressLines", headerName: "Shipping Address" },
  // { field: "address_information.billing_city", headerName: "Billing City" },
  // { field: "address_information.billing_state", headerName: "Billing State" },
  // { field: "address_information.billing_code", headerName: "Billing Code" },
  // {
  //   field: "address_information.billing_country",
  //   headerName: "Billing Country",
  // },

  // {
  //   field: "address_information.shipping_street",
  //   headerName: "Shipping Street",
  // },
  // { field: "address_information.shipping_city", headerName: "Shipping City" },
  // { field: "address_information.shipping_state", headerName: "Shipping State" },
  // { field: "address_information.shipping_code", headerName: "Shipping Code" },
  // {
  //   field: "address_information.shipping_country",
  //   headerName: "Shipping Country",
  // },
];
