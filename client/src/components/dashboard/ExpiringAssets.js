import React, {useState} from "react";
import dayjs from "dayjs";
import { DataGrid} from '@mui/x-data-grid';

const ExpiringAssets = (assets) => {

    assets = assets.children;
    const date = new Date();
    let contracts = []

    for (let i = 0; i < assets.length; i++) {
        const contract_dt = new Date(assets[i]['contracts_end_dt']);
        // console.log(contract_dt)

        if (contract_dt >= date && contract_dt.getTime() <= date.getTime() + 2629746000) {
            contracts.push(assets[i])
        }
    }

    const columns = [{
            field: "assetNumber",
            headerName: "Asset Number",
            width: 120,
            align: "left",
            headerAlign: "left",
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
        },
        {
            field: "device_name",
            headerName: "Device Name",
            width: 120,
        },
        {
            field: "contracts_start_dt",
            headerName: "Start Date",
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
            width: 120,
        },
        {
            field: "contracts_end_dt",
            headerName: "End Date",
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
            width: 120,
        },
        {
            field: "customer_account",
            headerName: "Customer",
        },
        {
            field: "product",
            headerName: "Product",
        },
        {
            field: "manufacturer",
            headerName: "Manufacturer",
        },
        {
            field: "serial_number",
            headerName: "Serial Number",
            width: 150,
        },
    ];

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    })

    return (
        <div style={{height: 357, width: 600, backgroundColor:'white'}}>
            <DataGrid
                // autoHeight
                rows={contracts}
                columns={columns}
                getRowId={(rows) => rows._id}
                pageSizeOptions={[10]}
                paginationModel={paginationModel}   
                onPaginationModelChange={setPaginationModel}
                initialState={{
                    sorting: {
                    sortModel: [{ field: 'contracts_end_dt', sort: 'asc' }],
                    },
                }}
            />
      </div>
    )
}

export default ExpiringAssets;