import React from "react";
import PropTypes from "prop-types";
import { Image, Popover, Input, Button, Statistic, Modal, Table } from "antd";
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
		getHostory: PropTypes.func,
		dataSource: PropTypes.array,
	};
	static defaultProps = {
		userInfo: {},
		getList: () => {},
		getWeiXinPay: () => {},
		getZhiFuBaoPay: () => {},
		getHostory: () => {},
		carList: [],
		dataSource: [],
	};
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 1,
			payItem: {},
			onShowPay: false,
			payUrl: "",
			pageNum: 1,
			total: 0,
			payType: "微信",
		};
		this.columns = [
			{
				title: "会员类型",
				dataIndex: "subject",
				key: "subject",
			},
			{
				title: "订单编号",
				dataIndex: "out_trade_no",
				key: "out_trade_no",
			},
			{
				title: "购买时间",
				dataIndex: "purchase_date",
				key: "purchase_date",
			},
			{
				title: "到期时间",
				dataIndex: "expires_date",
				key: "expires_date",
			},
			{
				title: "金额",
				dataIndex: "money",
				key: "money",
				render: (value) => {
					return value + "元";
				},
			},
			{
				title: "状态",
				dataIndex: "is_right",
				key: "is_right",
				render: (value) => {
					return (
						<span className={`${!value ? "colorRed" : ""}`}>
							{value ? "有效" : "已过期"}
						</span>
					);
				},
			},
		];
	}
	componentDidMount() {
		this.initData();
	}
	initData = async () => {
		const { getList, getHostory } = this.props;
		const { pageNum } = this.state;
		const { total, page } = await getHostory({ page: pageNum });
		this.setState({
			total,
			pageNum: page,
		});
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
			payUrl: "",
		});
		this.initData();
	};
	onWeiXinPay = async () => {
		const { getWeiXinPay } = this.props;
		const { payItem } = this.state;
		const code_url = await getWeiXinPay({
			product_id: payItem.product_id,
		});
		this.setState({
			payType: "微信",
		});
		// 判断 手机还是 pc
		if (this.isUserAgent()) {
			// 直接 打开
			window.location.href = code_url;
		} else {
			// 生成二维码
			this.setState({
				onShowPay: true,
				payUrl: code_url,
			});
		}
	};
	onZhiFuBaoPay = async () => {
		const { getZhiFuBaoPay } = this.props;
		const { payItem } = this.state;
		const code_url = await getZhiFuBaoPay({
			product_id: payItem.product_id,
		});
		this.setState({
			payType: "支付宝",
		});
		window.open(code_url);
	};
	onPageChange = async (page) => {
		const { getHostory } = this.props;
		await this.setState({
			pageNum: page,
		});
		getHostory({ page });
	};
	// 判断当前平台是移动端还是pc端
	isUserAgent = () => {
		return /Android|webOS|iPhone|iPod|BlackBerry/i.test(
			window.navigator.userAgent
		);
	};
	render() {
		const {
			activeIndex,
			onShowPay,
			payUrl,
			pageNum,
			total,
			payType,
		} = this.state;
		const { userInfo, carList, dataSource } = this.props;
		const storeUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
		const newUserInfo = Object.assign({}, userInfo, storeUserInfo);
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
							<span>{newUserInfo.name}，欢迎进入</span>
							{newUserInfo.expires_date && (
								<span className="iconfont icon-huangguan" />
							)}
						</div>
						{newUserInfo.expires_date && (
							<div>您的会员截止日期为：{newUserInfo.expires_date}</div>
						)}
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
									{item.discount_monty && (
										<div className="pay-item-tips">
											一年省
											{((item.money - item.discount_monty || 0) * 12) /
												item.month}
											元
										</div>
									)}
									<div className="pay-item-title">{`包${str}(${item.name})`}</div>
									<div className="pay-item-amount">
										<span>¥</span>
										<Statistic
											style={{ margin: "0 5px" }}
											valueStyle={{ color: "#81581c" }}
											title={null}
											value={item.discount_monty || item.money}
										/>
										<span>元</span>
										{item.discount_monty && (
											<div className="pay-money-throw">原价{item.money}</div>
										)}
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
					{!dataSource.length && Number(pageNum) === 1 ? null : (
						<div>
							<h2>购买记录</h2>
							<Table
								dataSource={dataSource}
								columns={this.columns}
								className="pay-table-list"
								rowKey={(record, index) => `table_${index}`}
								pagination={{
									current: pageNum,
									total,
									showTotal: (totalNum) => <span>共{totalNum}条</span>,
									onChange: this.onPageChange,
								}}
							/>
						</div>
					)}
				</div>

				{onShowPay && (
					<div className="payModal" onClick={this.onCancel}>
						{payUrl ? (
							<div className="pay-result">
								<div>
									<h2>请打开{payType}扫一扫</h2>
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
		getHostory: dispatch.my.getHostory,
	};
};
const mapState = (state) => {
	return {
		userInfo: state.my.userInfo,
		carList: state.my.carList,
		dataSource: state.my.dataSource,
	};
};
export default connect(mapState, mapDispatch)(Pay);
