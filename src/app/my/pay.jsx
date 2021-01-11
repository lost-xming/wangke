import React from "react";
import PropTypes from "prop-types";
import { Image, Popover, Input, Button, Statistic } from "antd";
import { connect } from "react-redux";
import "./index.less";
class Pay extends React.Component {
	static propTypes = {
		userInfo: PropTypes.object,
	};
	static defaultProps = {
		userInfo: {},
	};
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 1,
			payArr: [
				{
					id: 1,
					amount: 128,
					title: "连续包学期(6个月)",
					discount: 104,
				},
				{
					id: 2,
					amount: 228,
					title: "连续包年(12个月)",
					discount: 132,
				},
			],
		};
	}
	componentDidMount() {}
	componentWillUnmount() {}
	onInputStateChange = (value, k) => {
		this.setState({
			[k]: value,
		});
	};
	onGoPay = (index) => {
		console.log("支付 选中----", index);
	};
	render() {
		const { payArr, activeIndex } = this.state;
		const { userInfo } = this.props;
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
						{payArr.map((item, index) => {
							return (
								<div
									key={`pay-item-${index}`}
									onClick={() => this.onInputStateChange(index, "activeIndex")}
									className={`pay-item ${
										index === activeIndex ? "pay-item-active" : ""
									}`}
								>
									<div className="pay-item-tips">一年省{item.discount}元</div>
									<div className="pay-item-title">{item.title}</div>
									<div className="pay-item-amount">
										<span>¥</span>
										<Statistic
											style={{ margin: "0 5px" }}
											valueStyle={{ color: "#81581c" }}
											title={null}
											value={item.amount}
										/>
										<span>元</span>
										<div className="pay-item-amount-tip">
											次学期续费{item.amount}元
										</div>
									</div>
									<Button
										size="small"
										onClick={() => this.onGoPay(index)}
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
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {};
};
const mapState = (state) => {
	return {
		userInfo: state.my.userInfo,
	};
};
export default connect(mapState, mapDispatch)(Pay);
