/**
 * @description Kakao Local API의 지번 주소 상세 정보
 */
export interface KakaoAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name?: string;
  h_code?: string;
  b_code?: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x?: string;
  y?: string;
}
