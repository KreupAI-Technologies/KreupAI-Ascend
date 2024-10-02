import React, { useState } from 'react';

const InvoiceItemRow = ({ index }) => {
    return (
        <div className="grid grid-cols-10 items-start gap-4 px-4 py-2">
            <div className="text-center col-span-1">{index + 1}</div>
            <div className="col-span-3">
                <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full border rounded p-2"
                />
                <textarea
                    placeholder="Description"
                    className="w-full border rounded p-2 mt-1"
                ></textarea>
            </div>
            <div className="col-span-1">
                <input
                    type="number"
                    placeholder="Qty"
                    className="w-full border rounded p-2"
                />
            </div>
            <div className="col-span-1">
                <input
                    type="number"
                    placeholder="List Price ($)"
                    className="w-full border rounded p-2"
                />
            </div>
            <div className="col-span-1">
                <input
                    type="number"
                    placeholder="Amount ($)"
                    className="w-full border rounded p-2"
                />
            </div>
            <div className="col-span-1">
                <input
                    type="number"
                    placeholder="Discount ($)"
                    className="w-full border rounded p-2"
                />
            </div>
            <div className="col-span-1">
                <input
                    type="number"
                    placeholder="Tax ($)"
                    className="w-full border rounded p-2"
                />
            </div>
            <div className="col-span-1">
                <input
                    type="number"
                    placeholder="Total ($)"
                    className="w-full border rounded p-2"
                />
            </div>
        </div>
    );
};

const InvoiceItemsTable = () => {
    const [rows, setRows] = useState([{}]);

    const addRow = () => {
        setRows([...rows, {}]);
    };

    return (
        <div className="mt-16 p-6 bg-white rounded ">
            <h2 className="text-lg font-semibold text-red-500 border-b pb-2 mb-4">
                Invoiced Items
            </h2>
            <div className="border rounded-t overflow-hidden">
                <div className="grid grid-cols-10 bg-gray-100 text-center px-4 py-2">
                    <div className="col-span-1">S.NO</div>
                    <div className="col-span-3">Product Name</div>
                    <div className="col-span-1">Quantity</div>
                    <div className="col-span-1">List Price ($)</div>
                    <div className="col-span-1">Amount ($)</div>
                    <div className="col-span-1">Discount ($)</div>
                    <div className="col-span-1">Tax ($)</div>
                    <div className="col-span-1">Total ($)</div>
                </div>
                {rows.map((row, index) => (
                    <InvoiceItemRow key={index} index={index} />
                ))}
            </div>
            <button
                className="mt-4 px-4 py-2 text-blue-500 bg-blue-50 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
                onClick={addRow}
            >
                + Add row
            </button>
            <div className="mt-8 p-4 shadow-md shadow-mt grid grid-cols-[30%,60%] gap-x-8 gap-y-2 max-w-md ml-auto">
    <div className="flex justify-between items-center">
        <span className="text-right w-full">Sub Total ($)</span>
    </div>
    <div>
        <input
            type="number"
            className="w-full border bg-gray-100 rounded-md p-2"
        />
    </div>
    <div className="flex justify-between items-center">
        <span className="text-right w-full">Discount ($)</span>
    </div>
    <div>
        <input
            type="number"
            className="w-full border bg-gray-100 rounded-md p-2"
            value="0"
        />
    </div>
    <div className="flex justify-between items-center">
        <span className="text-right w-full">Tax ($)</span>
    </div>
    <div>
        <input
            type="number"
            className="w-full border bg-gray-100 rounded-md p-2"
            value="0"
        />
    </div>
    <div className="flex justify-between items-center">
        <span className="text-right w-full">Adjustment ($)</span>
    </div>
    <div>
        <input
            type="number"
            className="w-full border bg-gray-100 rounded-md p-2"
        />
    </div>
    <div className="flex justify-between items-center">
        <span className="text-right w-full">Grand Total ($)</span>
    </div>
    <div>
        <input
            type="number"
            className="w-full border bg-gray-100 rounded-md p-2"
            value="0"
        />
    </div>
</div>

        </div>
    );
};

export default InvoiceItemsTable;
