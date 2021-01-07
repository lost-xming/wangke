import React from "react";
import { Layout, Divider } from "antd";
import "./index.less";
const { Footer } = Layout;
export default class FooterCom extends React.Component {
	render() {
		return (
			<Footer
				style={{
					textAlign: "center",
					color: "#666",
					fontSize: "0.2rem",
					lineHeight: "0.4rem",
					backgroundColor: "rgba(0,0,0,0.8)",
					padding: "0.3rem 0",
				}}
			>
				<div>
					关于我们
					<Divider className="footer-diveider" type="vertical" />
					加入我们
					<Divider className="footer-diveider" type="vertical" />
					用户隐私协议
					<Divider className="footer-diveider" type="vertical" />
					客服联系电话：<span style={{ color: "#ffffff" }}>15972847855</span>
					（上班时间：周一至周日9:00-21:00）
				</div>
				<div>
					联系我们：<span style={{ color: "#ffffff" }}>15972847855</span>
					（版权及内容合作）
				</div>
				<div>版权XXXXXXXX Copyright©武汉梦幻x遐游科技有限公司</div>
			</Footer>
		);
	}
}
