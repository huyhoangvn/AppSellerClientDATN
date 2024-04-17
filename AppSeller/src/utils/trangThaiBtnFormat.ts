import { appColors } from "../constants/appColors";

export function formatTrangThaiMuaBtn(trangThai: number): string {
    switch (trangThai) {
        case 0:
            return "Duyệt đơn";
        case 1:
            return "Giao hàng";
        case 2:
            return "Xác nhận giao hàng";
        case 3:
            return "Đã xác nhận giao hàng";
        case 4:
            return "Đã xác nhận giao hàng";
        default:
            return "---";
    }
}

export function formatTrangThaiMuaBtnColor(trangThaiMua: number, trangThai: boolean): string {
    if(trangThai === false){
        return appColors.gray
    }
    switch (trangThaiMua) {
        case 0:
            return appColors.primary;
        case 1:
            return appColors.primary;
        case 2:
            return appColors.primary;
        case 3:
            return appColors.gray;
        case 4:
            return appColors.gray;
        default:
            return "---";
    }
}

export function formatBtn(trangThai: boolean): string {
    switch (trangThai) {
        case true:
            return appColors.primary;
        case false:
            return appColors.gray;
        default:
            return appColors.text;
    }
}