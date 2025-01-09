import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteOrder, adminOrders as adminOrdersAction } from "../../actions/OrderActions";
import { toast } from "react-toastify"
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";

import { Link, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";

export default function OrderList() {
    const { adminOrders = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderState);
    const dispatch = useDispatch();
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Number Of Items",
                    field: "noOfItems",
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: "amount",
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: "status",
                    sort: "asc"
                },
                {
                    label: "Action",
                    field: "actions",
                    sort: "asc"
                }
            ],
            rows: []
        }

        adminOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: <p style={{ color: order.orderStatus.includes("Processing") ? "red" : "green" }}>{order.orderStatus}</p>,
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                        <button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger py-1 py-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                )
            })
        })
        return data;
    }
    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
    }
    useEffect(() => {
        if (error) {
            toast(error, {
                position: "bottom-center",
                type: "error",
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if (isOrderDeleted) {
            toast("Order Deleted Successfully!", {
                position: "bottom-center",
                type: "success",
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;
        }
        dispatch(adminOrdersAction())
    }, [dispatch, error, isOrderDeleted])
    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1>Orders List</h1>
                    <Fragment>
                        {loading ? <Loader /> :
                            <MDBDataTable
                                data={setOrders()}
                                bordered
                                striped
                                hover
                                className="px-3"
                            >
                            </MDBDataTable>}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}