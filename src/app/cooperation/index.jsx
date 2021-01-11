import React from "react";
import { Image } from "antd";
import FixedApp from "@/components/fixedApp";
import "./index.less";
const dataArr = [
	{
		text: "电话",
		value: "15972847835",
		icon: "icon-tel",
	},
	{
		text: "微信",
		value: "holiday7855",
		icon: "icon-weixin",
	},
	{
		text: "微信二维码",
		value: "",
		src: require("../../images/erweima2_05.png").default,
	},
];
export default class Cooperation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	componentWillUnmount() {}
	render() {
		return (
			<div className="cooperation-content">
				<div className="cooperation-img-box">
					<Image src={require("./../../images/cooperation.png").default} />
					<div className="cooperation-img-text">
						<div>
							<div className="img-text-title">・ 合作共赢，共创未来 ・</div>
							<div className="img-text-desc">
								<span className="img-text-desc-text">
									诚义育人才，卓越弘天下
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="cooperation-bottom">
					<h3>如果您是老师，请联系我们</h3>
					<div className="cooperation-bottom-box">
						{dataArr.map((item, index) => {
							return (
								<div key={`cooperation-${index}`} className="cooperation-item">
									<div className={`icon-box iconfont ${item.icon || ""}`}>
										{item.src ? (
											<Image className="icon-box-img" src={item.src} />
										) : null}
									</div>
									<div className="cooperation-item-text">{item.text}</div>
									<div className="cooperation-item-text">{item.value}</div>
								</div>
							);
						})}
					</div>
				</div>
				<FixedApp />
			</div>
		);
	}
}
