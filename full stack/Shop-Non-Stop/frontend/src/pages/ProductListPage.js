import { useSelector,useDispatch } from "react-redux";
import{useEffect} from 'react'
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { createProduct, deleteProduct, listProducts } from "../redux/actions/productActions";
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from "../redux/actionConstants/productConstants";

const ProductListPage = (props) =>{

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList;
    const productCreate = useSelector(state => state.productCreate)
    const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      product: cratedProduct,
    } = productCreate;
    const productDelete = useSelector((state) => state.productDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = productDelete;
    const dispatch = useDispatch()

    useEffect(() => {
      if (successCreate) {
        dispatch({ type: PRODUCT_CREATE_RESET });
        props.history.push(`/product/${cratedProduct._id}/edit`);
      }
      if(successDelete){
          dispatch({type:PRODUCT_DELETE_RESET})
      }
      dispatch(listProducts());
    }, [cratedProduct, dispatch, props.history, successCreate, successDelete]);

    

    const deleteHandler = (product) =>{
        if(window.confirm('Are you sure to delete')){
            dispatch(deleteProduct(product._id));       
        }
        
    }
    const createHandler = () =>{
        dispatch(createProduct())
    }
    return (
      <div>
        <div className="row">
          <h1>Products</h1>
          <button className="button" onClick={createHandler}>
            Create Product
          </button>
        </div>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <button
                        className="button small"
                        onClick={() =>
                          props.history.push(`/product/${product._id}/edit`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="button small"
                        onClick={() => deleteHandler(product)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );

}

export default ProductListPage;