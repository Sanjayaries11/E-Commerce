import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { clearError, clearProductDeleted } from "../../slices/productSlice";
import { getAdminProducts } from "../../actions/productsActions";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { deleteProduct } from "../../actions/productAction";

export default function ProductList() {

    const { products = [], loading = true, error } = useSelector(state => state.productsState);
    const { isProductDeleted, error: productError } = useSelector(state => state.productState);
    const dispatch = useDispatch();
    //const navigate = useNavigate();

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc"
                },
                {
                    label: "Price",
                    field: "price",
                    sort: "asc"
                },
                {
                    label: "Stock",
                    field: "stock",
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc"
                }
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                        <button onClick={e => deleteHandler(e, product._id)} className="btn btn-danger py-1 py-2 ml-2">
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
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if (error || productError) {
            toast(error || productError, {
                position: "bottom-center",
                type: "error",
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }
        if (isProductDeleted) {
            toast("Product Deleted Successfully!", {
                position: "bottom-center",
                type: "success",
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        dispatch(getAdminProducts());
    }, [dispatch, error, isProductDeleted])



    return (
        <Fragment>
            <MetaData title="Admin Products" />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-sm-10">
                    <h1 className="my-4">Products List</h1>
                    <Fragment>
                        {loading ? <Loader /> :
                            <MDBDataTable
                                data={setProducts()}
                                bordered
                                striped
                                hover
                                className="px-3"
                            >
                            </MDBDataTable>
                        }
                    </Fragment>
                </div>
            </div>
        </Fragment>

    )
}