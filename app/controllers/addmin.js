const products = [];
main();

function main() {
  // B1: Gọi API lấy danh sách sản phẩm
  apiGetProduct().then(function (result) {
    // Tạo biến users nhận kết quả trả về từ API
    let products = result.data;
    // Sau khi đã lấy được data từ API thành công
    // Duyệt mảng data và khởi tạo các đối tượng product
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      products[i] = new Product(
        product.id,
        product.name,
        product.price,
        product.screen,
        product.backCamera,
        product.frontCamera,
        product.img,
        product.desc,
        product.type
      );
    }

    display(products);
  });
}

// // Hàm xử lý gọi API thêm sản phẩm
function addProduct() {
  // B1: DOM lấy value
  let id = document.getElementById("maProduct").value;
  let backCamera = document.getElementById("cameraSau").value;
  let frontCamera = document.getElementById("cameraTruoc").value;
  let type = document.getElementById("hangDienThoai").value;
  let name = document.getElementById("SanPham").value;
  let price = document.getElementById("Gia").value;
  let img = document.getElementById("HinhAnh").value;
  let desc = document.getElementById("MoTa").value;

  // B2: Khởi tạo đối tượng product
  const product = new Product(
    id,
    name,
    price,
    null,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  var valid = validation();
  if (!valid) {
    alert("vui lòng nhập các giá trị");
    return;
  }
  products.push(product);
  // B3: Gọi API thêm sản phẩm

  apiAddProduct(product)
    .then(function (result) {
      main();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// hàm hiển thị sản phẩm ra giao diện
function display(products) {
  let html = "";
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${product.name}</td>
        <td>${Number(product.price).toLocaleString()}</td>
        <td>
        <img src="${product.img}" style="width:80px; height: 80px" />
        </td>
        <td>${product.desc}</td>

        <td>
          <button
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal"
            data-type="update"
            data-id="${product.id}"
          >
            Cập Nhật
          </button>
          <button
            class="btn btn-danger"
            data-type="delete"
            data-id="${product.id}"

          >
            Xoá
          </button>
        </td>
      </tr>
    `;
  }

  document.getElementById("tblDanhSachSanPham").innerHTML = html;
}

// Hàm xử lý gọi API xoá sản phẩm
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(function () {
      main();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// hàm hiện thông tin sản phẩm lên table cập nhật
function showUpdateModal(productId) {
  document.querySelector(".modal-title").innerHTML = "Chỉnh sửa thông tin";
  document.querySelector(".modal-footer").innerHTML = `
    <button
      class="btn btn-primary"
      data-type="update"
    >
      Update
    </button>
    <button
      class="btn btn-secondary"
      data-dismiss="modal"

    >
      Huỷ
    </button>
  `;

  apiGetProductDetail(productId)
    .then(function (result) {
      let product = result.data;
      document.getElementById("maProduct").value = product.id;
      document.getElementById("SanPham").value = product.name;
      document.getElementById("Gia").value = product.price;
      document.getElementById("cameraSau").value = product.backCamera;
      document.getElementById("cameraTruoc").value = product.frontCamera;
      document.getElementById("HinhAnh").value = product.img;
      document.getElementById("MoTa").value = product.desc;
      document.getElementById("hangDienThoai").value = product.type;
    })
    .catch(function (error) {
      console.log(error);
    });

  resetForm();
}

// hàm chỉnh sửa sản phẩm
function updateProduct() {
  // B1: DOM lấy value
  let id = document.getElementById("maProduct").value;
  let backCamera = document.getElementById("cameraSau").value;
  let frontCamera = document.getElementById("cameraTruoc").value;
  let type = document.getElementById("hangDienThoai").value;
  let name = document.getElementById("SanPham").value;
  let price = document.getElementById("Gia").value;
  let img = document.getElementById("HinhAnh").value;
  let desc = document.getElementById("MoTa").value;
  // B2: Khởi tạo đối tượng product
  const product = new Product(
    id,
    name,
    price,
    null,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  // B3: Gọi API cập nhật sản phẩm đã chỉnh sửa
  apiUpdateProduct(product)
    .then(function (result) {
      main();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}
