import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './datatable.scss';
import {Link, useLocation} from "react-router-dom";
import useFetch from "../../hooks/useFetch";


const Datatable = ({columns}) => {
    const location = useLocation();
    const path = location.pathname.split('/')[1];
    const [list, setList] = useState([]);
    const {data} = useFetch(`/${path}`);

    useEffect(() => {
        setList(data);
    }, [data]);

    const handlerDelete = async (id) => {
        try {
            await axios.delete(`/${path}/${id}`);
            setList(list.filter(item => item._id !== id));
        } catch (e) {

        }
    };
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handlerDelete(params.row._id)}
                        >Delete</div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New User
                <Link to={`/${path}/new`} className="link">
                    Add New
                </Link>
            </div>
            <DataGrid
                className="DataGrid"
                rows={list}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={row => row._id}
            />
        </div>
    );
};

export default Datatable;