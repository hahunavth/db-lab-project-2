export type ApiResponseT<T> = {
  data?: T;
  _page?: number;
  _limit?: number;
  _id?: number;
  _length?: number;
  success?: boolean;
};

export type ApiProductT = {
  idLoaiDongHo: number;
  ten: string;
  giaTien: number;
  trangThai: "con_hang";
  ngayTao: string;
  moTa: string;
  gioiTinh: string;
  duongKinhMat: number;
  chongNuoc: number;
  chatLieuMat: string;
  nangLuongSuDung: string;
  sizeDay: number;
  chatLieuDay: string;
  chatLieuVo: string;
  cheDoBaoHanh: string;
  urlAnh: string;
};

export type ApiUserT = {
  idNguoiDung: number;
  ten: string;
  email: string;
  gioiTinh: string;
  ngayTao: string;
  diaChi: string;
  sdt: string;
  rank: number;
};
