import React from "react";
import { Result, Button } from "antd";
import welcomeHref from "@/components/svg/welcome";
import { SmileOutlined } from "@ant-design/icons";
import "./index.less";
export default class Welcome extends React.Component {
	render() {
		return (
			<div className="homeStyle">
				<div>
					<svg style={{ width: 400 }} viewBox="0 0 500 130">
						<image width="500" height="130" href={welcomeHref}></image>
					</svg>
					<Result
						icon={<SmileOutlined />}
						title="主人你好，欢迎回来！"
						subTitle={null}
					/>
				</div>
			</div>
		);
	}
}
