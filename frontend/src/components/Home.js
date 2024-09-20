import { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Product from "./product/Product";
import Pagination from "react-js-pagination";

export default function Home() {

  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);


  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center"
      })
    }
    dispatch(getProducts(null, null, null, null, currentPage))  //keyword,price,category,ratings intialy unknown
  }, [dispatch, error, currentPage])




  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title={'Buy Best Products'} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map(product => (
                <Product col={3} key={product._id} product={product} />
              ))}
            </div>
          </section>

          {productsCount > 0 && productsCount > resPerPage ?
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={'Next'}
                firstPageText={'First'}
                lastPageText={"Last"}
                itemClass={'page-item'}
                linkClass={'page-link'}
              />
            </div> : null}

        </Fragment>
      }
    </Fragment>
  )
}