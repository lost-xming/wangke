import React from "react";
import PropTypes from "prop-types";
import { Image, Popover, Input, Button, Statistic, Modal } from "antd";
import { AlipayCircleFilled, WechatFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import QRCode from "qrcode.react";
import "./index.less";
class Pay extends React.Component {
	static propTypes = {
		userInfo: PropTypes.object,
		getList: PropTypes.func,
		carList: PropTypes.array,
		getWeiXinPay: PropTypes.func,
		getZhiFuBaoPay: PropTypes.func,
	};
	static defaultProps = {
		userInfo: {},
		getList: () => {},
		getWeiXinPay: () => {},
		getZhiFuBaoPay: () => {},
		carList: [],
	};
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 1,
			payItem: {},
			onShowPay: false,
			payUrl: "",
		};
	}
	componentDidMount() {
		this.initData();
	}
	initData = () => {
		const { getList } = this.props;
		getList();
	};
	componentWillUnmount() {}
	onInputStateChange = (value, k) => {
		this.setState({
			[k]: value,
		});
	};
	onGoPay = (item) => {
		this.setState({
			onShowPay: true,
			payItem: item,
		});
	};
	onCancel = () => {
		this.setState({
			onShowPay: false,
			payItem: {},
		});
	};
	onWeiXinPay = async () => {
		const { getWeiXinPay } = this.props;
		const { payItem } = this.state;
		const data = await getWeiXinPay({
			product_id: payItem.id,
		});
		// 判断 手机还是 pc
		if (this.isUserAgent()) {
			// 直接 打开
		} else {
			// 生成二维码
			this.setState({
				payUrl: "weixin://wxpay/bizpayurl?pr=mWFE7NVzz",
			});
		}
	};
	onZhiFuBaoPay = async () => {
		const { getZhiFuBaoPay } = this.props;
		const { payItem } = this.state;
		const data = await getZhiFuBaoPay({
			product_id: payItem.id,
		});
	};
	// 判断当前平台是移动端还是pc端
	isUserAgent = () => {
		return /Android|webOS|iPhone|iPod|BlackBerry/i.test(
			window.navigator.userAgent
		);
	};
	render() {
		const { activeIndex, onShowPay, payUrl } = this.state;
		const { userInfo, carList } = this.props;
		return (
			<div className="pay">
				<div className="pay-header">
					<Image
						width={"0.7rem"}
						height={"0.7rem"}
						preview={false}
						className="pay-user-img"
						src={require("./../../images/icon-9.png").default}
					/>
					<div className="pay-user-info">
						<div>
							<span>{userInfo.userName}，欢迎进入</span>
							<span className="iconfont icon-huangguan" />
						</div>
						<div>您的会员截止日期为：{userInfo.timer}</div>
					</div>
				</div>
				<div className="pay-body">
					<h2>套餐类型</h2>
					<div className="pay-body-list">
						{carList.map((item, index) => {
							let str = "月";
							if (item.month === 3) {
								str = "季度";
							} else if (item.month === 6) {
								str = "学期";
							} else if (item.month === 12) {
								str = "年";
							}
							return (
								<div
									key={`pay-item-${index}`}
									onClick={() => this.onInputStateChange(index, "activeIndex")}
									className={`pay-item ${
										index === activeIndex ? "pay-item-active" : ""
									}`}
								>
									<div className="pay-item-tips">
										一年省
										{((item.money - item.discount_monty || 0) * 12) /
											item.month}
										元
									</div>
									<div className="pay-item-title">{`连续包${str}(${item.name})`}</div>
									<div className="pay-item-amount">
										<span>¥</span>
										<Statistic
											style={{ margin: "0 5px" }}
											valueStyle={{ color: "#81581c" }}
											title={null}
											value={item.discount_monty || item.money}
										/>
										<span>元</span>
										<div className="pay-item-amount-tip">
											{`次${str}续费`}
											{item.discount_monty || item.money}元
										</div>
									</div>
									<Button
										size="small"
										onClick={() => this.onGoPay(item)}
										className="pay-item-btn"
										type="primary"
									>
										立即开通
									</Button>
								</div>
							);
						})}
					</div>
				</div>
				{onShowPay && (
					<div className="payModal">
						{payUrl ? (
							<div className="pay-result">
								<div>
									<h2>请打开微信扫一扫</h2>
									<QRCode
										className="pay-er"
										value={payUrl} //value参数为生成二维码的链接
										fgColor="#000000"
									/>
								</div>
							</div>
						) : (
							<div className="zhifu-content">
								<h2>请选择支付方式</h2>
								<div className="zhifu-content-box">
									<div className="zhifu-item" onClick={this.onZhiFuBaoPay}>
										<AlipayCircleFilled className="zhifubao" />
										<div>支付宝支付</div>
									</div>
									<div onClick={this.onWeiXinPay}>
										<WechatFilled className="weixin" />
										<div>微信支付</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		getList: dispatch.my.getList,
		getWeiXinPay: dispatch.my.getWeiXinPay,
		getZhiFuBaoPay: dispatch.my.getZhiFuBaoPay,
	};
};
const mapState = (state) => {
	return {
		userInfo: state.my.userInfo,
		carList: state.my.carList,
	};
};
export default connect(mapState, mapDispatch)(Pay);
