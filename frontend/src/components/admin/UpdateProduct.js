import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productAction";
import { toast } from "react-toastify";
import { clearError, clearProductUpdated } from "../../slices/productSlice";

export default function UpdateProduct() {
    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];

    const { loading, isProductUpdated, error, product } = useSelector(state => state.productState);
    const { id: productId } = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesCleared, setImagesCleared] = useState(false)
    const [imagesPreview, setImagesPreview] = useState([]);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState == 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }
            reader.readAsDataURL(file)
        })

    }
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("stock", stock);
        formData.append("seller", seller);
        images.forEach(image => {
            formData.append("images", image)
        })
        formData.append("imagesCleared", imagesCleared)
        dispatch(updateProduct(productId, formData))
    }
    const clearImageHandler = () => {
        setImages([]);
        setImagesPreview([]);
        setImagesCleared(true);
    }
    useEffect(() => {
        if (isProductUpdated) {
            toast("Product Update Successfully", {
                position: "bottom-center",
                type: "success",
                onOpen: () => dispatch(clearProductUpdated())
            })
            setImages([])
            navigate("/admin/products")
            return;
        }
        if (error) {
            toast(error, {
                position: "bottom-center",
                type: "error",
                onOpen: () => dispatch(clearError())
            })
            return;
        }
        dispatch(getProduct(productId))
    }, [isProductUpdated, error, dispatch])

    useEffect(() => {
        if (product._id) {
            setName(product.name);
            setPrice(product.price);
            setStock(product.stock);
            setDescription(product.description);
            setSeller(product.seller);
            setCategory(product.category);

            let images = [];
            product.images.forEach(image => {
                images.push(image.image)
            });
            setImagesPreview(images)
        }
    }, [product])



    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div class="wrapper my-5">
                        <form onSubmit={submitHandler} class="shadow-lg" encType='multipart/form-data'>
                            <h1 class="mb-4">Update Your Product</h1>

                            <div class="form-group">
                                <label for="name_field">Name</label>
                                <input type="text" id="name_field" class="form-control"
                                    value={name}
                                    onChange={e => setName(e.target.value)} />
                            </div>

                            <div class="form-group">
                                <label for="price_field">Price</label>
                                <input type="text" id="price_field" class="form-control"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)} />
                            </div>

                            <div class="form-group">
                                <label for="description_field">Description</label>
                                <textarea class="form-control" id="description_field" rows="4"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div class="form-group">
                                <label for="category_field">Category</label>
                                <select value={category} onChange={e => setCategory(e.target.value)} class="form-control" id="category_field">
                                    <option value="">-Select-</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="stock_field">Stock</label>
                                <input type="number" id="stock_field" class="form-control"
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                />
                            </div>

                            <div class="form-group">
                                <label for="seller_field">Seller Name</label>
                                <input type="text" id="seller_field" class="form-control"
                                    value={seller}
                                    onChange={e => setSeller(e.target.value)}
                                />
                            </div>

                            <div class='form-group'>
                                <label>Images</label>

                                <div class='custom-file'>
                                    <input type='file' name='product_images' class='custom-file-input' id='customFile' multiple
                                        onChange={onImagesChange}
                                    />
                                    <label class='custom-file-label' for='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                {imagesPreview.length > 0 && <span className="mr-2" onClick={clearImageHandler} style={{ cursor: "pointer" }}><i className="fa fa-trash"></i></span>}
                                {imagesPreview.map(image => (
                                    <img
                                        className="mt-3 mr-2"
                                        key={image}
                                        src={image}
                                        alt={`Image Preview`}
                                        width="55"
                                        height="52"
                                    />
                                ))}
                            </div>

                            <button id="login_button"
                                disabled={loading} type="submit" class="btn btn-block py-3">
                                Update
                            </button>

                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    )
}