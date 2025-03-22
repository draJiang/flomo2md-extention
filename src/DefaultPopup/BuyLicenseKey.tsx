import React, { useEffect } from "react";

import { Divider, Button, Tag } from "antd";

export function BuyLicenseKeyDrawer() {
  useEffect(() => {});

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "14px",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>¥19.99</h2>
        <div style={{ color: "#333", textAlign: "center" }}></div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              textAlign: "center",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <img style={{ width: "50%" }} src="WeChatPay.png" />
            {/* <img style={{ width: '50%' }} src="AliPay.png" /> */}
          </div>
          <div style={{}}>
            <Tag style={{ border: 0 }} color="orange">
              导出全部笔记
            </Tag>
            <Tag style={{ border: 0 }} color="orange">
              选择笔记直接复制
            </Tag>
          </div>
          <p style={{ marginBottom: "8px" }}>
            请在付款时备注<strong>你的邮箱</strong>
          </p>
        </div>

        {/* <p style={{ margin: '0', color: '#666' }}> License Key 会发送到你的邮箱</p> */}
      </div>

      <Divider style={{ marginTop: "20px" }}>常见问题</Divider>

      <div
        style={{
          color: "#333",
        }}
      >
        <h4>付费后多久拿到许可证</h4>
        <p>北京时间 12:00 ~ 02:00 会在 120 分钟内发送到你的邮箱），若迟迟未发请联系邮箱，感谢谅解。</p>
        <h4>许可证会过期吗</h4>
        <p>一次性支付，永久有效</p>
        <h4>支持支付宝吗</h4>
        <p>请联系我获取收款码</p>
        <h4>联系方式</h4>
        <p>jzlong666@gmail.com</p>
        <h4>如何退款</h4>
        <p>虚拟商品，购买后恕不退换。请谨慎购买。</p>
      </div>
    </div>
  );
}
