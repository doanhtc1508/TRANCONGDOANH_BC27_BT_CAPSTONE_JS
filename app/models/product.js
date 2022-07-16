// Tạo lớp đối tượng Product
function Product(
  id,
  name,
  price,
  screen,
  backCamera,
  frontCamera,
  img,
  desc,
  type
) {
  // thuộc tính (properties)
  this.id = id;
  this.name = name;
  this.price = price;
  this.screen = screen;
  this.backCamera = backCamera;
  this.frontCamera = frontCamera;
  this.img = img;
  this.desc = desc;
  this.type = type;
}
