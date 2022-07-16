// ham xu ly reset form va dong modal
function resetForm() {
  document.getElementById("maProduct").value = "";
  document.getElementById("cameraSau").value = "";
  document.getElementById("cameraTruoc").value = "";
  document.getElementById("hangDienThoai").value = "";
  document.getElementById("SanPham").value = "";
  document.getElementById("Gia").value = "";
  document.getElementById("HinhAnh").value = "";
  document.getElementById("MoTa").value = "";

  // reset thông báo lỗi
  document.getElementById("tenSp").innerHTML = "";
  document.getElementById("hangSp").innerHTML = "";
  document.getElementById("cameraSauSp").innerHTML = "";
  document.getElementById("cameraTruocSp").innerHTML = "";
  document.getElementById("giaSp").innerHTML = "";
  document.getElementById("hinhSp").innerHTML = "";
  document.getElementById("motaSp").innerHTML = "";
  // Dong modal
  $("#myModal").modal("hide");
}
