import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const Table = ({ records }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  // Column definitions for ag-Grid
  const columns = [
    {
      headerCheckboxSelection: true, // Checkbox in the header
      checkboxSelection: true, // Checkbox for row selection
      width: 50, // Fixed width for the checkbox column
      sortable: false, // No sorting for the checkbox column
      filter: false, // No filtering for the checkbox column
    },
    { 
      headerName: 'Price Book Name', 
      field: 'priceBookName', 
      sortable: true, 
      filter: true, 
      flex: 1, // Flexible column width
    },
    { 
      headerName: 'Item', 
      field: 'item', 
      sortable: true, 
      filter: true, 
      flex: 1, 
    },
    { 
      headerName: 'From Date', 
      field: 'fromDate', 
      sortable: true, 
      filter: true, 
      flex: 1, 
    },
    { 
      headerName: 'To Date', 
      field: 'toDate', 
      sortable: true, 
      filter: true, 
      flex: 1, 
    },
    { 
      headerName: 'From Qty', 
      field: 'fromQty', 
      sortable: true, 
      filter: true, 
      flex: 1, 
    },
    { 
      headerName: 'To Qty', 
      field: 'toQty', 
      sortable: true, 
      filter: true, 
      flex: 1, 
    },
    { 
      headerName: 'Price', 
      field: 'price', 
      sortable: true, 
      filter: true, 
      flex: 1, 
    },
    { 
      headerName: 'Discount (%)', 
      field: 'discount', 
      sortable: true, 
      filter: true, 
      flex: 1, 
    },
    { 
      headerName: 'Net Price', 
      field: 'netPrice', 
      sortable: true, 
      filter: true, 
      flex: 1, 
    },
  ];
  

  // Handle row selection
  const onSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    setSelectedRows(selectedData);
  };

  return (
    <div className="w-full h-full flex">
      <div className="ag-theme-quartz w-full h-full">
        <AgGridReact
          rowData={records}
          columnDefs={columns}
          rowSelection="multiple" // Multiple row selection enabled
          onSelectionChanged={onSelectionChanged}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20]} // Capture selected rows
        />
      </div>
    </div>
  );
};

export default Table;
