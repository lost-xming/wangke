import React from "react";
import { Image, Popover } from "antd";
import QueueAnim from "rc-queue-anim";
import { MobileFilled } from "@ant-design/icons";
import "./index.less";

export default class FiexdApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
		};
	}
	componentDidMount() {
		this.timer = setTimeout(() => {
			this.setState({
				isShow: true,
			});
		}, 1000);
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	downApp = () => {
		const { navigator } = window;
		var u = navigator.userAgent,
			isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
			isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			urls = {
				android:
					"http://www.aso12345.com/appIntroduction/primaryeducation.html",
				ios: "https://itunes.apple.com/cn/app/id1513133147",
				other: "http://www.aso12345.com/appIntroduction/primaryeducation.html",
			};
		//三元运算
		// window.location.href = isAndroid? urls.android : isiOS? urls.ios : urls.other;
		//简化
		if (isAndroid) {
			window.location.href = urls.android;
		} else if (isiOS) {
			window.location.href = urls.ios;
		} else {
			window.location.href = urls.other;
		}
	};

	_renderFixed() {
		const { isShow } = this.state;
		return (
			<QueueAnim
				className="banner-item"
				duration={1000}
				animConfig={[
					{ opacity: [1, 0], translateX: [0, 300] },
					{ opacity: [1, 0], translateX: [0, -300] },
				]}
			>
				{isShow ? (
					<Popover
						placement="left"
						title={null}
						className="demo-thead"
						key="c"
						content={
							<div>
								<div className="fixed-right-text">下载小学生网校APP</div>
								<div className="fixed-right-img1-box">
									<Image
										className="fixed-right-img1"
										src={require("./../../images/erweima_32.png").default}
									/>
								</div>
								<div className="fixed-right-text">服务打动人心</div>
								<div className="fixed-right-text">超越用户期待</div>
							</div>
						}
					>
						<div className="fixed-right" onClick={this.downApp}>
							<MobileFilled className="fixed-right-icon" />
							<div>APP下载</div>
						</div>
					</Popover>
				) : null}
			</QueueAnim>
		);
	}
	render() {
		return this._renderFixed();
	}
}
