// ======DOM======
document
  .getElementById("btnThemSanPham")
  .addEventListener("click", showAddModal);
function showAddModal() {
  // Thay đổi text của modal heading
  document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
  document.querySelector(".modal-footer").innerHTML = `
    <button
      class="btn btn-primary"
      data-type="add"
    >
      Thêm
    </button>
    <button
      class="btn btn-secondary"
      data-toggle="modal"
      data-target="#myModal"
    >
      Huỷ
    </button>
  `;
  resetForm();
}

// Uỷ quyền lắng nghe event của các button từ thẻ .modal-footer
document.querySelector(".modal-footer").addEventListener("click", handleSubmit);

function handleSubmit(event) {
  var type = event.target.getAttribute("data-type");

  switch (type) {
    case "add":
      addProduct();
      break;
    case "update":
      updateProduct();
      break;
    default:
      break;
  }
}

// Uỷ quyền lắng nghe tất cả event của button Xoá và Cập nhật trong table cho tbody
document
  .getElementById("tblDanhSachSanPham")
  .addEventListener("click", handleUserAction);

function handleUserAction(event) {
  const type = event.target.getAttribute("data-type");
  const id = event.target.getAttribute("data-id");

  switch (type) {
    case "delete":
      deleteProduct(id);
      break;
    case "update":
      {
        showUpdateModal(id);
      }
      break;

    default:
      break;
  }
}
