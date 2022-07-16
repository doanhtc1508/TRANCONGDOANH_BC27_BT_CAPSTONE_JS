// hàm kiểm tra điều kiện các input
function validation() {
  // B1 : DOM lấy value từ inout
  let id = document.getElementById("maProduct").value;
  let backCamera = document.getElementById("cameraSau").value;
  let frontCamera = document.getElementById("cameraTruoc").value;
  let type = document.getElementById("hangDienThoai").value;
  let name = document.getElementById("SanPham").value;
  let price = document.getElementById("Gia").value;
  let img = document.getElementById("HinhAnh").value;
  let desc = document.getElementById("MoTa").value;

  let valid = true;

  let tenSp = document.getElementById("tenSp");

  if (!checkInput(name)) {
    valid = false;
    tenSp.innerHTML = "Tên sản phẩm không được để trống";
  }

  let hangSp = document.getElementById("hangSp");
  if (!checkInput(type)) {
    valid = false;
    hangSp.innerHTML = "Chọn hãng điện thoại";
  }

  let cameraSauSp = document.getElementById("cameraSauSp");
  if (!checkInput(backCamera)) {
    valid = false;
    cameraSauSp.innerHTML = "Thêm chi tiết camera";
  }

  let cameraTruocSp = document.getElementById("cameraTruocSp");
  if (!checkInput(frontCamera)) {
    valid = false;
    cameraTruocSp.innerHTML = "Thêm chi tiết camera";
  }
  let giaSp = document.getElementById("giaSp");
  if (!checkInput(price)) {
    valid = false;
    giaSp.innerHTML = "Thêm giá";
  }
  let hinhSp = document.getElementById("hinhSp");
  if (!checkInput(img)) {
    valid = false;
    hinhSp.innerHTML = "Thêm ảnh";
  }
  let motaSp = document.getElementById("motaSp");
  if (!checkInput(desc)) {
    valid = false;
    motaSp.innerHTML = "Thêm mô tả";
  }

  return valid;
}

// hàm kiểm tra input có trống hay không
function checkInput(value) {
  if (!value) {
    return false;
  }
  return true;
}
