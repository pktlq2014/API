import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';
import { connect } from 'react-redux';
class ProductActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      txtName: '',
      txtPrice: '',
      chkbStatus: ''
    };
  }
  componentDidMount() {
    console.log('componentDidMount');
    var { match } = this.props;
    if (match) {
      // lấy được id của sp cần sửa
      var id = match.params.id;
      // apiCaller(`products/${id}`, 'GET', null).then(res => {
      //   // lấy dc data của id này
      //   var data = res.data;
      //   this.setState({
      //     id: data.id,
      //     txtName: data.name,
      //     txtPrice: data.price,
      //     chkbStatus: data.status
      //   });
      // });
      this.props.onEditProduct(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    if (nextProps && nextProps.itemEditing) { // nếu tồn tại và khác null
      var { itemEditing } = nextProps;
      this.setState({
        id: itemEditing.id,
        txtName: itemEditing.name,
        txtPrice: itemEditing.price,
        chkbStatus: itemEditing.status
      });
    }
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }
  onSave = (e) => {
    e.preventDefault(); // chặn trường hợp load lại trang
    // console.log(this.state);
    var { id, txtName, txtPrice, chkbStatus } = this.state;
    // history trong routes
    var { history } = this.props;
    var product = {
      id: id,
      name: txtName,
      price: txtPrice,
      status: chkbStatus
    }
    if (id) // nếu id tồn tại thì là sửa
    {
      // thêm vs sửa chỗ data phải thay = thuộc tính chứ không null nữa
      // apiCaller(`products/${id}`, 'PUT', {
      //   name: txtName,
      //   price: txtPrice,
      //   status: chkbStatus
      // }).then(res => {
      //   history.goBack();
      // });
      this.props.onUpdateProduct(product);
    }
    else {
      // apiCaller('products', 'POST', {
      //   // đối với post phải gửi data lên vs các key và value tương ứng
      //   name: txtName,
      //   price: txtPrice,
      //   status: chkbStatus
      // }).then(res => {
      //   console.log(res);
      //   history.goBack(); // quay về trang trước khi vào thêm sản phẩm
      //   // history.push("/"); // quay về trang home
      // });
      this.props.onAddProduct(product);
    }
    history.goBack(); // quay về trang trước khi vào thêm sản phẩm
  }
  render() {
    var { txtName, txtPrice, chkbStatus } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label for="">Tên Sản Phẩm: </label>
            <input type="text" className="form-control" name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label for="">Giá: </label>
            <input type="number" className="form-control" name="txtPrice"
              value={txtPrice}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label for="">Trạng Thái: </label>
          </div>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="chkbStatus"
                value={chkbStatus}
                checked={chkbStatus}
                onChange={this.onChange} />
                Còn Hàng
              </label>
          </div>
          <Link to="/product-list" className="btn btn-danger mr-10">
            Trở Lại
          </Link>
          <button type="submit" className="btn btn-primary">Lưu Lại</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    itemEditing: state.itemEditing // lấy dữ liệu từ store trong reducers/index.js
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddProduct: (product) => {
      dispatch(actAddProductRequest(product));
    },
    onEditProduct: (id) => {
      dispatch(actGetProductRequest(id));
    },
    onUpdateProduct: (product) => {
      dispatch(actUpdateProductRequest(product));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
