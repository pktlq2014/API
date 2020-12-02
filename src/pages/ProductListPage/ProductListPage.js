import React, { Component } from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import { Link } from 'react-router-dom';
import { actFetchProductsRequest, actDeleteProductRequest } from './../../actions/index';
// 4
import { connect } from 'react-redux';
class ProductListPage extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     products: []
  //   };
  // }
  // vào lần đầu tiên thì UI sẽ chạy trước, dùng vòng đời này để buộc UI khởi chạy 1 lần nữa
  // sau khi nhận được dữ liệu này
  componentDidMount() {
    console.log('componentDidMount');
    // apiCaller('products', 'GET', null).then(res => {
    //   // this.setState({
    //   //   products: res.data
    //   // });
    //   // không lưu data của server vào state nữa mà lưu vào store
    //   this.props.fetchAllProducts(res.data);
    // });
    this.props.fetchAllProducts();
  }
  showProducts(products) {
    // var { products } = this.state;
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ProductItem
            key={index}
            product={product}
            index={index}
            onDelete={this.onDelete}
          />
        );
      });
    }
    return result;
  }
  // tìm id người dùng chọn để xóa trong state
  // findIndex = (products, id) => {
  //   var result = -1;
  //   products.forEach((product, index) => {
  //     if (product.id === id) {
  //       result = index;
  //     }
  //   });
  //   return result;
  // }
  // tạo cái func ở đây để truyền data vào productItem
  onDelete = (id) => {
    // var { products } = this.state;
    // apiCaller(`products/${id}`, 'DELETE', null).then(res => {
    //   if (res.status === 200) { // xóa thành công
    //     var index = this.findIndex(products, id);
    //     if (index !== -1) {
    //       products.splice(index, 1); // mỗi lần xóa 1 phần tử thôi
    //       this.setState({
    //         // cập nhật lại danh sách
    //         products: products
    //       });
    //     }
    //   } 
    // });
    this.props.onDeleteProduct(id);
  }
  render() {
    console.log('render');
    //  var products = [];
    //  var {products} = this.state;
    // không lấy data từ state nữa mà lấy từ store
    var { products } = this.props; // để lấy dữ liệu từ store
    console.log(products);
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Link to="/product/add" className="btn btn-info mb-10">Thêm Sản Phẩm</Link>
        <ProductList>
          {this.showProducts(products)}
        </ProductList>
      </div>
    );
  }
}
// 4
// lấy all các products từ store
const mapStateToProps = state => {
  return {
    products: state.products
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    // fetchAll dùng để lưu products lên store
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest());
    },
    // xóa products từ store
    onDeleteProduct: (id) => {
      dispatch(actDeleteProductRequest(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
