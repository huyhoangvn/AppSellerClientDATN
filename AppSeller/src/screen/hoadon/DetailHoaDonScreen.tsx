import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { appColors } from '../../constants/appColors';
import NavProps from '../../models/props/NavProps';
import { appImageSize } from '../../constants/appImageSize';
import { appFontSize } from '../../constants/appFontSizes';
import { formatCurrency } from '../../utils/currencyFormatUtils';
import { showAlert } from '../../utils/showAlert';
import TextViewComponent from '../../component/text/TextViewComponent';
import MyButtonComponent from '../../component/button/MyButtonComponent';
import authenticationAPI from '../../apis/authApi';
import { formatTrangThai, formatTrangThaiGiaoHang, formatTrangThaiThanhToan } from '../../utils/trangThaiFormat';
import { formatTrangThaiColor, formatTrangThaiGiaoHangColor, formatTrangThaiThanhToanColor } from '../../utils/trangThaiColor';
import OptionPicker from '../../component/hoadon/OptionPicker';
import { formatBtn, formatTrangThaiMuaBtn, formatTrangThaiMuaBtnColor } from '../../utils/trangThaiBtnFormat';
import { Tree } from 'iconsax-react-native';

const HoaDonResExample = {
  index: {
    idHD: "1",
    maHD: "ZI90K8",
    idKH: "2",
    tenKH: "Nguyễn Huy Hoàng",
    sdt: "0763421273",
    idKM: "1",
    tenKhuyenMai: "Giảm 30%",
    idCH: "1",
    tenCH: "FIVE STAR Cát Quế",
    phanTramKhuyenMaiDat: 30,
    diaChiGiaoHang: "Đơn nguyên 1,2 - KTX Mỹ Đình, Hàm Nghi, Mỹ Đình 2, Nam Từ Liêm, HN",
    thoiGianTao: "03-19-2024 11:30",
    thoiGianDuyet: "03-19-2024 11:30",
    thoiGianGiaoHangDuKien: "03-19-2024 11:30",
    ghiChu: "...",
    tongTien: 300000,
    thanhTien: 300000,
    trangThaiMua: 0,
    phiGiaoHang: 24000,
    trangThaiThanhToan: 0,
    trangThai: true
  },
  list: [
    {
      idMD: "1",
      idMon: "1",
      tenMon: "Bánh tráng trộn FIVESTAR",
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
      giaTienDat: 20000,
      soLuong: 2
    },
    {
      idMD: "2",
      idMon: "2",
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
      tenMon: "Bánh tráng trộn ZEROSTAR",
      giaTienDat: 40000,
      soLuong: 1
    },
    {
      idMD: "3",
      idMon: "3",
      hinhAnh: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/10f13510774061.560eadfde5b61.png",
      tenMon: "Bánh tráng trộn FOURSTAR",
      giaTienDat: 10000,
      soLuong: 7
    }
  ],
  count: 3,
  msg: "Thành công",
  success: true
}

const DeleteResExample = {
  success : true,
  msg: "Thành công",
}

const DetailHoaDonScreen: React.FC<NavProps> = ({ navigation }) =>  {
  const route : any = useRoute();
  // Truy cập các tham số từ đối tượng route
  const idHD = route.params.id;
  // let danhSachSoLuong: number[] = new Array(saveList.length).fill(1);
  const [idKH, setIdKH] = useState("");
  const [maHD, setMaHD] = useState("")
  const [tenKH, setTenKH] = useState("");
  const [idCH, setIdCH] = useState("");
  const [tenCH, setTenCH] = useState("");
  const [thoiGianTao, setThoiGianTao] = useState("")
  const [thoiGianDuyet, setThoiGianDuyet] = useState("")
  const [thoiGianGiaoHangDuKien, setThoiGianGiaoHangDuKien] = useState("")
  const [diaChi, setDiaChi] = useState("");
  const [phanTramKhuyenMai, setPhanTramKhuyenMai] = useState(0);
  const [trangThaiMua, setTrangThaiMua] = useState(0)
  const [trangThai, setTrangThai] = useState(true)
  const [trangThaiThanhToan, setTrangThaiThanhToan] = useState(0)
  const [ghiChu, setGhiChu] = useState("")
  const [thanhTien, setThanhTien] = useState(0)
  const [danhSachMonDat, setDanhSachMonDat] = useState<any[]>([])
  const [isActiveThanhToan, setIsActiveThanhToan] = useState(false);
  const [isActiveHuy, setIsActiveHuy] = useState(false);
  const [phiVanChuyen, setPhiVanChuyen] = useState("")
  const [modalDuyetVisible, setModalDuyetVisible] = useState(false);
  const [modalChuanBiVisible, setModalChuanBiVisible] = useState(false);
  const [modalGiaoHangVisible, setModalGiaoHangVisible] = useState(false);
  const [modalHuyVisible, setModalHuyVisible] = useState(false);
  const [modalThanhToanVisible, setModalThanhToanVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true)

  const optionsGiaoHang = [
    { key: 'Giao hàng thành công', value: 3 },
    { key: 'Giao hàng thất bại', value: 4 },
  ];

  const optionsThoiGianGiao = [
    { key: '5 phút', value: 5 },
    { key: '10 phút', value: 10 },
    { key: '15 phút', value: 15 },
    { key: '20 phút', value: 20 },
    { key: '25 phút', value: 25 },
    { key: '30 phút', value: 30 },
    { key: '35 phút', value: 35 },
    { key: '40 phút', value: 40 },
    { key: '45 phút', value: 45 },
    { key: '50 phút', value: 50 },
    { key: '55 phút', value: 55 },
  ];

  const optionsLyDoHuy = [
    { key: 'Không có ghi chú', value: ""},
    { key: 'Hủy do vị trí quá xa', value: "Hủy do vị trí quá xa" },
    { key: 'Hủy do hết hàng', value: "Hủy do hết hàng"},
    { key: 'Hủy do thái độ khách hàng', value: "Hủy do thái độ khách hàng" },
    { key: 'Hủy do khách hàng yêu cầu', value: "Hủy do khách hàng yêu cầu"},
  ];

  const optionsLyDoGiaoThatBai = [
    { key: 'Không có ghi chú', value: ""},
    { key: 'Giao thất bại do đơn vị giao hàng', value: "Giao thất bại do đơn vị giao hàng"},
    { key: 'Giao thất bại do khách không nhận hàng', value: "Giao thất bại do khách không nhận hàng" },
    { key: 'Giao thất bại do lỗi cửa hàng', value: "Giao thất bại do lỗi cửa hàng"},
  ];

  const getThongTinHD = async (id: string)=>{
    if(!id){return}

    try {
      const res : any = await authenticationAPI.HandleAuthentication(
        '/nhanvien/hoadon' + "/" + id,
        'get',
      );
      // const res : any = HoaDonResExample
      if (res.success === true) {
        const { list, index } = res;
        setIdKH(index.idKH);
        setIdCH(index.idCH);
        setMaHD(index.maHD);
        setTenKH(index.tenKH);
        setTenCH(index.tenCH);
        setThoiGianTao(index.thoiGianTao)
        setThoiGianDuyet(index.thoiGianDuyet)
        setThoiGianGiaoHangDuKien(index.thoiGianGiaoHangDuKien)
        setDiaChi(index.diaChiGiaoHang)
        setThanhTien(index.thanhTien)
        setPhanTramKhuyenMai(index.phanTramKhuyenMaiDat)
        setTrangThai(index.trangThai)
        setTrangThaiMua(index.trangThaiMua)
        setTrangThaiThanhToan(index.trangThaiThanhToan)
        setIsActiveThanhToan((index.trangThaiMua == 3)?true:false)
        setIsActiveHuy((((index.trangThaiMua === 0 || index.trangThaiMua === 1)  && index.trangThai === true) || index.trangThai === false)?true:false)
        setPhiVanChuyen(formatCurrency(index.phiGiaoHang))
        setDanhSachMonDat(list)
      }
    } catch (e) {

    }
  }

  useEffect(()=>{
    getThongTinHD(idHD)
  }, [])

  const thanhToan = () => {
    if(isActiveThanhToan){
      setModalThanhToanVisible(true)
    } else {
      showAlert("Chưa thể xác nhận thanh toán", "Chỉ có thể xác nhận thanh toán cho đơn hàng đã được giao thành công")
    }
  }

  const huyHoaDon = () => {
    if(isActiveHuy){
      setModalHuyVisible(true);
    } else {
      if(trangThaiMua > 0){
        if(trangThaiMua === 3 && trangThaiThanhToan === 1){
          showAlert("Không thể hủy", "Đơn hàng đã thanh toán không thể hủy")
          return;
        }
        if(trangThaiMua === 3 && trangThaiThanhToan === 0){
          showAlert("Không thể hủy", "Đơn hàng đã được giao xác nhận thanh toán để hoàn thành giao hàng")
          return;
        }
        else if(trangThaiMua === 2 && trangThaiThanhToan === 0){
          showAlert("Không thể hủy", "Đơn hàng đang được giao không thể hủy vui lòng xác nhận đơn hàng thất bại nếu giao hàng không thành công")
        }
        return;
      }
    }
    return;
  }

  const MonItem = ({ item }: { item: any }) => {

    //openSearchScreen(item.idMon)
    const openSearchScreen = (idMon: string) => {
      navigation.navigate('DetailMonScreen', {
        idMon: idMon,
      });
    };

    return (
      <TouchableOpacity style={styles.itemContainer} onLongPress={()=> openSearchScreen(item.idMon)} activeOpacity={0.7}>
        <Image style={styles.itemImage}
          source={item.hinhAnh ? { uri: item.hinhAnh } : require('./../../assest/image/default-image.jpg')} 
          defaultSource={require('./../../assest/image/default-image.jpg')}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.tenMon}</Text>
          <Text style={styles.normal}>{formatCurrency(item.giaTienDat)}</Text>
          <Text style={styles.normal}>{item.soLuong}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleDuyetSelect = (selected : any) => {
    try{
      const thoiGianGiao = selected.option1
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/nhanvien/hoadon/delete' + "/" + idHD,
      //   {},
      //   'delete',
      // );
      const res : any = DeleteResExample
      if(res.success === true){
        showAlert("Xác nhận duyệt", "Xác nhận duyệt thành công", false)
        getThongTinHD(idHD)
        return;
      }
      showAlert("Xác nhận duyệt", "Xác nhận duyệt thất bại", false)
      return;
    }
    catch(e){
      showAlert("Xác nhận duyệt", "Xác nhận duyệt thất bại do đường truyền", false)
    }
  };

  const handleChuanBiSelect = (selected: any) => {
    try{
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/nhanvien/hoadon/delete' + "/" + idHD,
      //   {},
      //   'delete',
      // );
      const res : any = DeleteResExample
      if(res.success === true){
        showAlert("Tiến hành giao hàng", "Tiến hành giao hàng thành công", false)
        getThongTinHD(idHD)
        return;
      }
      showAlert("Tiến hành giao hàng", "Tiến hành giao hàng thất bại", false)
      return;
    }
    catch(e){
      showAlert("Tiến hành giao hàng", "Tiến hành giao hàng thất bại do đường truyền", false)
    }
  };

  const handleGiaoHangSelect = (selected: any) => {
    try{
      const trangThaiMua = selected.option1
      const ghiChu = selected.option2
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/nhanvien/hoadon/delete' + "/" + idHD,
      //   {},
      //   'delete',
      // );
      const res : any = DeleteResExample
      if(res.success === true){
        showAlert("Xác nhận giao hàng", "Xác nhận giao hàng thành công", false)
        getThongTinHD(idHD)
        return;
      }
      showAlert("Xác nhận giao hàng", "Xác nhận giao hàng thất bại", false)
      return;
    }
    catch(e){
      showAlert("Xác nhận giao hàng", "Xác nhận giao hàng thất bại do đường truyền", false)
    }  
  };

  const handleHuySelect = (selected: any) => {
    showAlert("Bạn có muốn hủy ?", "Hủy hóa đơn " + maHD, true)
    .then(async (result) => {
      if (result) {
        try{
          const ghiChu = selected.option1
          // const res : any = await authenticationAPI.HandleAuthentication(
          //   '/nhanvien/hoadon/delete' + "/" + idHD,
          //   {},
          //   'delete',
          // );
          const res : any = DeleteResExample
          if(res.success === true){
            showAlert("Hủy hóa đơn", "Hủy hóa đơn thành công", false)
            getThongTinHD(idHD)
            return;
          }
          showAlert("Hủy hóa đơn", "Hủy hóa đơn thất bại", false)
          return;
        }
        catch(e){
          showAlert("Hủy hóa đơn", "Hủy hóa đơn thất bại do đường truyền", false)
        }
      }
    })
    .catch(e => {
      // Handle error if necessary
      showAlert("Hủy hóa đơn", "Hủy hóa đơn thất bại do hệ thống", false)
    });
    return
  };

  const handleThanhToanSelect = (selected: any) => {
    try{
      // const res : any = await authenticationAPI.HandleAuthentication(
      //   '/nhanvien/hoadon/delete' + "/" + idHD,
      //   {},
      //   'delete',
      // );
      const res : any = DeleteResExample
      if(res.success === true){
        showAlert("Xác nhận thanh toán", "Xác nhận thanh toán thành công", false)
        getThongTinHD(idHD)
        return;
      }
      showAlert("Xác nhận thanh toán", "Xác nhận thanh toán thất bại", false)
      return;
    }
    catch(e){
      showAlert("Xác nhận thanh toán", "Xác nhận thanh toán thất bại do đường truyền", false)
    }
  };

  const setModal = (trangThai: number) => {
    switch (trangThai) {
      case 0:
        setModalDuyetVisible(true)
        break;
  
      case 1:
        setModalChuanBiVisible(true)
        break;
  
      case 2:
        setModalGiaoHangVisible(true)
        break;
  
      case 3:
        showAlert("Hóa đơn giao thất bại", "Liên hệ cửa hàng để cập nhật trạng thái giao hàng" )
        break;
  
      case 4:
        showAlert("Hóa đơn giao thành công", "Quý khách hàng có thể thực hiện giao dịch thanh toán" )
        break;

      default:
        break;
    }
  };
  return (
    <ScrollView>

    <View style={styles.wrapper}>
        <TextViewComponent
            leftText="Mã hóa đơn"
            rightText={maHD}
            rightBold={true}
        />
        <TextViewComponent
          leftText="Tên cửa hàng"
          rightText={tenCH}
        />
        <TextViewComponent
          leftText="Tên khách hàng"
          rightText={tenKH}
        />
        <TextViewComponent
          leftText="Địa chỉ giao"
          rightText={diaChi}
        />
        <TextViewComponent
          leftText="Thời gian tạo"
          rightText={thoiGianTao}
        />
        <TextViewComponent
          leftText="Thời gian duyệt"
          rightText={thoiGianDuyet}
        />
        <TextViewComponent
          leftText="Thời gian giao"
          rightText={thoiGianGiaoHangDuKien}
        />
        <TextViewComponent
          leftText="Giao hàng"
          rightText={formatTrangThaiGiaoHang(trangThaiMua)}
          rightColor={formatTrangThaiGiaoHangColor(trangThaiMua)}
        />
        <TextViewComponent
          leftText="Thanh toán"
          rightText={formatTrangThaiThanhToan(trangThaiThanhToan)}
          rightColor={formatTrangThaiThanhToanColor(trangThaiThanhToan)}
        />   
        <TextViewComponent
          leftText="Khuyến mãi"
          rightText={phanTramKhuyenMai + "%"}
        />  
        <TextViewComponent
          leftText="Phí giao hàng"
          rightText={phiVanChuyen}
        />  
        <TextViewComponent
          leftText="Thành tiền"
          rightText={formatCurrency(thanhTien)}
          leftBold={true}
          backgroundColor={appColors.secondary}
          showBorderBottom={false}
        /> 
        <FlatList
          scrollEnabled={false}
          data={danhSachMonDat}
          renderItem={({ item }: any) => <MonItem item={item}/>}
          keyExtractor={(item : any) => item.idMD}
          />
        <TextViewComponent
          leftText="Ghi chú"
          rightText={ghiChu}
        />
        <TextViewComponent
          leftText="Trạng thái"
          rightText={formatTrangThai(trangThai)}
          rightColor={formatTrangThaiColor(trangThai)}
        /> 

        <MyButtonComponent text={formatTrangThaiMuaBtn(trangThaiMua)} onPress={() => setModal(trangThaiMua)} color={formatTrangThaiMuaBtnColor(trangThaiMua)}/>
        <OptionPicker
          visible={modalDuyetVisible}
          optionalTitle={"Nhập thời gian giao hàng dự kiến"}
          optionalDesc={"Thời gian giao tính từ thời điểm hiện tại"}
          onSelect={handleDuyetSelect}
          onClose={() => setModalDuyetVisible(false)}
          options={optionsThoiGianGiao}
        />
        <OptionPicker
          visible={modalChuanBiVisible}
          optionalTitle={"Giao món ăn cho khách hàng"}
          optionalDesc={"Đơn hàng sẽ được giao và không thể hủy"}
          onSelect={handleChuanBiSelect}
          onClose={() => setModalChuanBiVisible(false)}
        />
        <OptionPicker
          visible={modalGiaoHangVisible}
          optionalTitle={"Xác nhận giao hàng"}
          optionalDesc={"Xác nhận đơn hàng giao thất bại phải có ghi chú"}
          onSelect={handleGiaoHangSelect}
          onClose={() => setModalGiaoHangVisible(false)}
          options={optionsGiaoHang}
          options2={optionsLyDoGiaoThatBai}
        />
        <OptionPicker
          visible={modalHuyVisible}
          optionalTitle={"Bạn có muốn hủy ?"}
          optionalDesc={"Vui lòng chọn lý do hủy hóa đơn và hóa đơn bị hủy sẽ không thể kích hoạt lại"}
          onSelect={handleHuySelect}
          onClose={() => setModalHuyVisible(false)}
          options={optionsLyDoHuy}
        />
        <OptionPicker
          visible={modalThanhToanVisible}
          optionalTitle={"Tiến hành xác nhận thanh toán"}
          optionalDesc={"Đơn hàng sẽ được xác nhận thanh toán và không thể thay đổi"}
          onSelect={handleThanhToanSelect}
          onClose={() => setModalThanhToanVisible(false)}
        />
        <MyButtonComponent text="Thanh toán" onPress={thanhToan} color={formatBtn(isActiveThanhToan)}/>
        <MyButtonComponent text="Hủy hóa đơn" onPress={huyHoaDon} color={formatBtn(isActiveHuy)}/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: appColors.boderColor, // Remove border color
    borderRadius: 12,
    backgroundColor: appColors.white,
    margin: 3,
    elevation: 3
  },
  itemImage: {
    width: appImageSize.size75.width,
    height: appImageSize.size75.height,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'column', // Change flex direction to column
  },
  itemName: {
    fontSize: appFontSize.normal,
    fontWeight: 'bold',
    color: appColors.text
  },
  normal: {
    fontSize: appFontSize.normal,
    color: appColors.text,
  }
});

export default DetailHoaDonScreen;


