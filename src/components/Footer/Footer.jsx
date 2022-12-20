import React from "react";
import { Layout } from "antd";
import { FacebookFilled, TwitterSquareFilled, InstagramFilled, AndroidFilled, AppleFilled } from "@ant-design/icons";

const Footer = () => {
  return (
    <Layout.Footer className="bg-gray-800 text-gray-100 py-5">
      <div className="container lg:px-40">
        <div className="flex flex-row lg:flex-col">
          <div className="hidden lg:flex grow lg:grow-0 lg:mb-5">
            <div className="w-2/6">
              <h1 className="text-gray-100 text-lg">TIX</h1>
              <ul className="grid grid-cols-2 gap-2">
                <li className="text-xs text-slate-400 hover:cursor-pointer hover:text-gray-100 transition-all duration-300">
                  FAQ
                </li>
                <li className="text-xs text-slate-400 hover:cursor-pointer hover:text-gray-100 transition-all duration-300">
                  Thỏa thuận sử dụng
                </li>
                <li className="text-xs text-slate-400 hover:cursor-pointer hover:text-gray-100 transition-all duration-300">
                  Brand Guidelines
                </li>
                <li className="text-xs text-slate-400 hover:cursor-pointer hover:text-gray-100 transition-all duration-300">
                  Chính sách bảo mật
                </li>
              </ul>
            </div>
            <div className="w-2/6 ">
              <h1 className="text-gray-100 text-lg">Đối tác</h1>
              <div className="grid grid-cols-3 gap-5 pr-20">
                <div>
                  <a href="https://www.cgv.vn/" target="blank">
                    <img src="../img/cgv.png" alt="cgv" width={30} height={30} className="hover:opacity-60" />
                  </a>
                </div>
                <div>
                  <a href="https://www.bhdstar.vn/" target="blank">
                    <img src="../img/bhd.png" alt="bhd" width={30} height={30} className="hover:opacity-60" />
                  </a>
                </div>
                <div>
                  <a href="https://www.galaxycine.vn/" target="blank">
                    <img src="../img/galaxy.png" alt="galaxy" width={30} height={30} className="hover:opacity-60" />
                  </a>
                </div>
                <div>
                  <a href="http://cinestar.com.vn/" target="blank">
                    <img src="../img/cinestar.png" alt="cinestar" width={30} height={30} className="hover:opacity-60" />
                  </a>
                </div>
                <div>
                  <a href="https://www.lottecinemavn.com/LCHS/index.aspx" target="blank">
                    <img src="../img/lotte.png" alt="lotte" width={30} height={30} className="hover:opacity-60" />
                  </a>
                </div>
                <div>
                  <a href="https://www.megagscinemas.vn/" target="blank">
                    <img src="../img/megags.png" alt="megags" width={30} height={30} className="hover:opacity-60" />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-1/6">
              <h1 className="text-gray-100 text-lg ">Mobile App</h1>
              <div className="flex">
                <AndroidFilled style={{ fontSize: "30px", cursor: "pointer" }} />
                <AppleFilled style={{ fontSize: "30px", cursor: "pointer" }} />
              </div>
            </div>
            <div className="w-1/6">
              <h1 className="text-gray-100 text-lg">Social</h1>
              <div className="flex justify-between">
                <FacebookFilled style={{ fontSize: "30px", cursor: "pointer" }} />
                <TwitterSquareFilled style={{ fontSize: "30px", cursor: "pointer" }} />
                <InstagramFilled style={{ fontSize: "30px", cursor: "pointer" }} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-row justify-between lg:pt-5 lg:border-t">
              <div>
                <img src="../img/zion.jpg" alt="thongbaobct" width={100} height={100} />
              </div>
              <div className="lg:grow lg:mx-10 text-gray-100 text-xs px-2">
                <h1 className="text-gray-100">TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h1>
                <div className="hidden lg:block">
                  <p className="text-gray-100 m-0 leading-5 ">
                    Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.
                  </p>
                  <p className="text-gray-100 m-0 leading-5">Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</p>
                  <p className="text-gray-100 m-0 leading-5">
                    đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí
                    Minh cấp.
                  </p>
                  <p className="text-gray-100 m-0 leading-5">Số Điện Thoại (Hotline): 1900 545 436</p>
                </div>
              </div>
              <div className="hidden lg:block">
                <img src="../img/daThongBao-logo.png" alt="thongbaobct" width={120} height={120} />
              </div>
              <div className="lg:hidden">
                <div className="flex">
                  <AndroidFilled style={{ fontSize: "20px", cursor: "pointer" }} />
                  <AppleFilled style={{ fontSize: "20px", cursor: "pointer" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
