let productList = [];
let array = [];
main();

function main() {
  array = JSON.parse(localStorage.getItem("carts")) || [];
  // B1: Gọi API lấy danh sách sản phẩm
  apiGetProduct().then(function (result) {
    // Tạo biến products nhận kết quả trả về từ API
    const products = result.data;
    productList = products;
    saveData();
    render(productList);
  });
  display(array);
  countQuantity();
}

// hàm hiển thị danh sách sản phẩm ra giao diện
function render(list) {
  let html = "";
  list.forEach(
    (product) =>
      (html += `
         <div class="col col-12 col-sm-6 col-lg-3">
            <div class="item animate__animated wow animate__backInLeft">
              <div class="img">
                <img src="${product.img}" style="width: 100%" />
              </div>
              <div class="body">

                <h4 class="title">${product.name}</h4>
                <p class="text animate__animated wow animate__fadeInDown">
                ${product.backCamera}
                </p>
                <p class="text animate__animated wow animate__fadeInDown">
                ${product.frontCamera}
                </p>
                <p class="text animate__animated wow animate__fadeInDown">
                ${product.desc}
                </p>
                <h5 class="text ">
                ${Number(product.price).toLocaleString()} vnd
                </h5>
              </div>
              <div>
              <button

              class ="btn btn-primary"
              id="buy-${product.id}"
                onClick="handleCart( ${product.id})"
                  >
                 Add
                  </button>
              </div>
            </div>
          </div>
         `)
  );
  document.getElementById("rowshow").innerHTML = html;
}

const saveData = () => {
  return productList;
};

// hàm thêm sản phẩm
function handleCart(productId) {
  const listCurrentProducts = JSON.parse(localStorage.getItem("carts")) || [];
  productList = saveData();
  const product = productList.find(
    (product) => product.id.toString() === productId.toString()
  );
  const indexProductExisting = listCurrentProducts.findIndex(
    (pr) => pr.id.toString() === product.id.toString()
  );

  if (indexProductExisting < 0) {
    const productAssignQuantity = Object.assign({}, product, { quantity: 1 });
    listCurrentProducts.push(productAssignQuantity);
  } else listCurrentProducts[indexProductExisting].quantity += 1;

  window.localStorage.setItem("carts", JSON.stringify(listCurrentProducts));
  display(listCurrentProducts);
  countPrice();
  countQuantity();
}

function display() {
  const cards = JSON.parse(localStorage.getItem("carts")) || [];

  let html = "";
  for (let i = 0; i < cards.length; i++) {
    let product = cards[i];
    html += `
        <tr>
          <td>${i + 1}</td>
          <td>${product.name}</td>
          <td id="price-${product.id}"> ${Number(
      product.price
    ).toLocaleString()}</td>
          <td>
          <img src="${product.img}" style="width:80px; height: 80px" />
          </td>
          <td>${product.desc}</td>
          <td>
          <button
            class="btn btn-secondary "
            onClick="decrease(${product.id})"
            >
              -
            </button>

            <p class ="quantity" id="amount-${product.id}">${
      product.quantity
    }</p>
            <button
            class="btn btn-secondary"
            onClick="increase(${product.id})"

            >
              +
            </button>

          </td>

          <td>
            <button
            class="btn btn-danger"
            onClick="delateCart(\'' + ${product.id} + '\')"
            >
            <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>

      `;
  }
  document.getElementById("tblDanhSachSanPhamDaMua").innerHTML = html;

  countPrice();
}

// hàm xóa sản phẩm
function delateCart(productId) {
  const currentProducts = JSON.parse(localStorage.getItem("carts")) || [];
  const products = currentProducts.filter((product) => {
    return product.id.toString() !== productId.toString();
  });
  localStorage.setItem("carts", JSON.stringify(products));
  display(currentProducts);
  countQuantity();
}

// hàm tăng  số lượng
function increase(productId) {
  const currentProducts = JSON.parse(localStorage.getItem("carts")) || [];
  const indexProductExsiting = currentProducts.findIndex(
    (product) => product.id.toString() === productId.toString()
  );
  currentProducts[indexProductExsiting].quantity += 1;
  document.getElementById(`amount-${productId}`).innerHTML =
    currentProducts[indexProductExsiting].quantity;
  localStorage.setItem("carts", JSON.stringify(currentProducts));
  countPrice();
  countQuantity();
}

// hàm giảm số lượng
function decrease(productId) {
  const currentProducts = JSON.parse(localStorage.getItem("carts")) || [];
  const indexProductExsiting = currentProducts.findIndex(
    (product) => product.id.toString() === productId.toString()
  );

  if (currentProducts[indexProductExsiting].quantity > 1)
    currentProducts[indexProductExsiting].quantity =
      currentProducts[indexProductExsiting].quantity - 1;

  if (currentProducts[indexProductExsiting].quantity === 1)
    currentProducts[indexProductExsiting].quantity =
      currentProducts[indexProductExsiting].quantity;
  document.getElementById(`amount-${productId}`).innerHTML =
    currentProducts[indexProductExsiting].quantity;

  localStorage.setItem("carts", JSON.stringify(currentProducts));
  countPrice();
  countQuantity();
}

// hàm  tính tiền theo số lượng
function countPrice() {
  const arrayCarts = JSON.parse(localStorage.getItem("carts")) || [];
  const totalPrice = arrayCarts.reduce((total, product) => {
    return total + Number(product.quantity) * Number(product.price);
  }, 0);
  const totalPricePD = totalPrice.toLocaleString();
  document.getElementById("tongTien").innerHTML = totalPricePD;
}

// hàm tính tổng số lượng sản phẩm
function countQuantity() {
  const arrayCarts = JSON.parse(localStorage.getItem("carts")) || [];
  const totalQuantity = arrayCarts.reduce((total, product) => {
    return total + Number(product.quantity);
  }, 0);
  document.getElementById("carts").style.display = "block";
  document.getElementById("carts").innerHTML = totalQuantity;
}

// tìm sản phẩm
function search() {
  let searchItem = document.getElementById("hang").value;

  productList = saveData();

  const phoneProducts = productList.filter((product) => {
    return product.type.toString() === searchItem.toString();
  });
  render(phoneProducts);

  if (searchItem === "all") {
    render(productList);
  }
}
function DeleteCart() {
  if (array.length === array.length) {
    array.splice(array, array.length);
  }
  display(array);
  countQuantity();
  localStorage.setItem("carts", JSON.stringify(array));
}
