import React, {useState} from "react";
import dayjs from "dayjs";
import { DataGrid} from '@mui/x-data-grid';

const ExpiredAssets = (assets) => {

    assets = assets.children;
    const date = new Date();
    let contracts = []
    
    for (let i=0; i<assets.length;i++){
        const contract_dt = new Date(assets[i]['contracts_end_dt']);

        if(contract_dt < date)
        contracts.push(assets[i])
    }
    
    const columns = [
        {
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
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY")
        },
        {
            field: "contracts_end_dt",
            headerName: "End Date",
            valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY")
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
        pageSize: 5,
      })

    return (
        <div style={{width:600, backgroundColor:'white'}}>
            <DataGrid
                autoHeight
                rows={contracts}
                columns={columns}
                getRowId={(rows) => rows._id}
                pageSizeOptions={[5]}
                paginationModel={paginationModel}   
                onPaginationModelChange={setPaginationModel}
                initialState={{
                    sorting: {
                    sortModel: [{ field: 'contracts_end_dt', sort: 'desc' }],
                    },
                }}
            />
    </div>
    )
}

export default ExpiredAssets;