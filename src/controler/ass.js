window.assignmentController = function ($scope, $http, $location) {
  $scope.listSanPham = [];
  $scope.listMauSac = [];
  $scope.listSpTrangchu = [];
  $scope.listSpGiohang = [];

  //tao doi tuong sp trong gio hang
  $scope.form_spgiohang = {
    quantity: 0,
    img: "",
    name: "",
    ram: "",
    color: "",
    price: "",
    date: "",
    id: "",
  };
  // taoj doi tuong rong
  $scope.form_dienthoai = {
    img: "iphone14promax1.png",
    name: "",
    ram: "",
    color: "",
    price: "",
    date: "",
    id: "",
  };
  $scope.form_mauSac = {
    id: "",
    color: "",
  };

  $scope.checkdangnhapMuahang = false;
  $scope.vitri = -1;
  $scope.vitriMausac = -1;

  // laays du lieu ra
  $http.get(sanphamApi).then(function (response) {
    $scope.listSanPham = response.data;
  });
  $http.get(mausacApi).then(function (response) {
    $scope.listMauSac = response.data;
  });
  $http.get(sptrangchuApi).then(function (response) {
    $scope.listSpTrangchu = response.data;
  });
  $http.get(spGiohangApi).then(function (response) {
    $scope.listSpGiohang = response.data;
  });

  // add dien thoai

  $scope.addSanPham = function (event) {
    event.preventDefault();
    $http.post(sanphamApi, $scope.form_dienthoai).then(function (response) {
      $scope.listSanPham.push(response.data);
    });
  };
  // add mau sac
  $scope.addMauSac = function (event) {
    event.preventDefault();
    $http.post(mausacApi, $scope.form_mauSac).then(function (response) {
      $scope.listMauSac.push(response.data);
    });
  };

  //detail dien thoai
  $scope.dentail = function (event, index) {
    event.preventDefault();
    let dt = $scope.listSanPham[index];
    $scope.form_dienthoai.name = dt.name;
    $scope.form_dienthoai.price = dt.price;
    $scope.form_dienthoai.img = dt.img;
    $scope.form_dienthoai.color = dt.color;
    $scope.vitri = index;
  };
  // detail mau sac
  $scope.dentailMauSac = function (event, index) {
    event.preventDefault();
    let ms = $scope.listMauSac[index];
    $scope.form_mauSac.id = ms.id;
    $scope.form_mauSac.color = ms.color;
    $scope.vitriMausac = index;
  };

  //xoa dien thoai
  $scope.remove = function (event, index) {
    event.preventDefault();
    let dt = $scope.listSanPham[index];
    let dtApi = sanphamApi + "/" + dt.id;

    $http.delete(dtApi).then(function () {
      $scope.listSanPham.splice(dt, 1);
    });
  };
  //xoa mau sac removeMauSac
  $scope.removeMauSac = function (event, index) {
    event.preventDefault();
    let ms = $scope.listMauSac[index];
    let msApi = mausacApi + "/" + ms.id;
    $http.delete(msApi).then(function () {
      $scope.listMauSac.splice(ms, 1);
    });
  };

  // update dien thoai
  $scope.update = function (event) {
    event.preventDefault();
    let dt = $scope.listSanPham[$scope.vitri];
    let dtApi = sanphamApi + "/" + dt.id;
    $http.put(dtApi, $scope.form_dienthoai).then(function (response) {
      $scope.listSanPham[$scope.vitri] = response.data;
    });
  };
  // update mau sac
  $scope.updateMauSac = function (event) {
    event.preventDefault();
    let ms = $scope.listMauSac[$scope.vitriMausac];
    let msApi = mausacApi + "/" + ms.id;
    $http.put(msApi, $scope.form_mauSac).then(function (response) {
      $scope.listMauSac[$scope.vitriMausac] = response.data;
    });
  };

  // xoa vao gio hang
  $scope.xoaGiohang = function (event, index) {
    event.preventDefault();
    let sp = $scope.listSpGiohang[index];
    let spApi = spGiohangApi + "/" + sp.id;
    $http.delete(spApi).then(function () {
      $scope.listSpGiohang.splice(sp, 1);
    });
  };

  //dang kys tk
  $scope.form_dangky = {
    id: "",
    email: "",
    user: "",
    password: "",
    confirmPassword: "",
  };
  $scope.listDangkytaikhoan = [];
  $http.get(dangkytaikhoanApi).then(function (response) {
    $scope.listDangkytaikhoan = response.data;
  });

  $scope.dangky = function () {
    if (
      $scope.form_dangky.email === "" ||
      $scope.form_dangky.user === "" ||
      $scope.form_dangky.password === "" ||
      $scope.form_dangky.confirmPassword === ""
    ) {
      alert("Du lieu khong duoc de trong");
    } else if (
      $scope.form_dangky.password == $scope.form_dangky.confirmPassword
    ) {
      $http
        .post(dangkytaikhoanApi, $scope.form_dangky)
        .then(function (response) {
          $scope.listDangkytaikhoan.push(response.data);
        });
      alert("dang ky thanh cong");
      $location.url("/dangnhap");
    } else {
      alert("Dang ky that bai" + "\n" + "Hay nhap dung password");
    }
  };

  //dang nhap
  $scope.dangNhap = function (event) {
    event.preventDefault();
    $scope.checkdangnhap = true;
    if ($scope.form_dangky.email == "" || $scope.form_dangky.password == "") {
      alert("Email hoac password dang de trong!");
    } else {
      for (var i = 0; i < $scope.listDangkytaikhoan.length; i++) {
        if (
          $scope.form_dangky.email == $scope.listDangkytaikhoan[i].email &&
          $scope.form_dangky.password == $scope.listDangkytaikhoan[i].password
        ) {
          $scope.checkdangnhap = false;
          $scope.checkdangnhapMuahang = true;
          $location.url("index.html");
          alert($scope.checkdangnhapMuahang);
          break;
        }
      }
      if ($scope.checkdangnhap) {
        $scope.checkdangnhapMuahang = false;
        alert("Email hoac password nhap sai!");
      }
    }
  };
  // them vao gio hang
  $scope.themvaogiohang = function (event, index) {
    event.preventDefault();
    let dt = $scope.listSanPham[index];
    $scope.form_spgiohang.id = dt.id;
    $scope.form_spgiohang.name = dt.name;
    $scope.form_spgiohang.price = dt.price;
    $scope.form_spgiohang.img = dt.img;
    $scope.form_spgiohang.color = dt.color;
    $scope.form_spgiohang.quantity = 1;

    $scope.checkSP = true;
    // alert($scope.checkdangnhapMuahang);
    // if ($scope.checkdangnhapMuahang == true) {
    // quantity
    for (let i = 0; i < $scope.listSpGiohang.length; i++) {
      // alert($scope.form_spgiohang.id);
      if ($scope.form_spgiohang.id == $scope.listSpGiohang[i].id) {
        $scope.form_spgiohang.quantity =
          Number($scope.listSpGiohang[i].quantity) + Number(1);
        // $scope.form_spgiohang.quantity = $scope.listSpGiohang[i].quantity++;

        $http
          .put(spGiohangApi, $scope.form_spgiohang)
          .then(function (response) {
            $scope.listSpGiohang[i] = response.data;
          });

        $scope.checkSP = false;
      }
    }
    if ($scope.checkSP) {
      $http.post(spGiohangApi, $scope.form_spgiohang).then(function (response) {
        $scope.listSpGiohang.push(response.data);
      });
    }
    $scope.soluongspgiohang = $scope.listSpGiohang.length + 1;
    alert($scope.soluongspgiohang);
    alert();
    // } else {
    //   alert("Xin moi dang nhap de mua hang");
    // }
  };
};
