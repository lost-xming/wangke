import React from "react";
import PropTypes from "prop-types";
import { Image, Popover, Input, Button, Statistic } from "antd";
import { connect } from "react-redux";
import "./index.less";
const { Countdown } = Statistic;
class Login extends React.Component {
	static propTypes = {
		loginAction: PropTypes.func,
		getLoginSms: PropTypes.func,
	};
	static defaultProps = {
		loginAction: () => {},
		getLoginSms: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
			count: 60,
			liked: true,
			phoneValue: "",
			passwordValue: "",
		};
	}
	componentDidMount() {}
	componentWillUnmount() {}
	onInputStateChange = (e, k) => {
		this.setState({
			[k]: e.target.value,
		});
	};
	onLogin = () => {
		const { phoneValue, passwordValue } = this.state;
		const { loginAction } = this.props;
		loginAction({
			phone: phoneValue,
			ver_number: passwordValue,
		});
	};
	countDown = async () => {
		const { count } = this.state;
		if (count === 1) {
			this.setState({
				count: 60,
				liked: true,
			});
		} else {
			const data = await this.props.getLoginSms({ phone: 15171658986 });
			this.setState({
				count: count - 1,
				liked: false,
			});
			this.timer = setTimeout(this.countDown.bind(this), 1000);
		}
	};

	handleClick = () => {
		const { liked } = this.state;
		if (!liked) {
			return;
		}
		this.countDown();
	};
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}

	render() {
		const { phoneValue, passwordValue, count, liked } = this.state;
		return (
			<div className="my-box">
				<div className="my-box-content">
					<div className="my-left">
						<Image
							className="my-left-img"
							preview={false}
							src={require("./../../images/my-2_04.png").default}
						/>
					</div>
					<div className="my-right">
						<h1>Hello,欢迎登录/注册</h1>
						<div className="my-right-wel">Welcome to login/sign up</div>
						<Input
							bordered={false}
							prefix={
								<div className="iconfont icon-user site-form-item-icon" />
							}
							value={phoneValue}
							onChange={(e) => this.onInputStateChange(e, "phoneValue")}
							onPressEnter={this.onLogin}
							className="my-right-userPhone"
							placeholder="请输入手机号"
						/>
						<Input
							bordered={false}
							prefix={
								<div className="iconfont icon-mima site-form-item-icon" />
							}
							suffix={
								<Button
									disabled={!liked}
									size="small"
									style={{
										fontSize: "0.2rem",
										border: "none",
										backgroundColor: "transparent",
									}}
									onClick={this.handleClick}
								>
									{liked ? "获取验证码" : `${count} 秒后重发`}
								</Button>
							}
							value={passwordValue}
							onChange={(e) => this.onInputStateChange(e, "passwordValue")}
							onPressEnter={this.onLogin}
							className="my-right-userPhone"
							placeholder="请输入短信验证码"
						/>
						<div
							className={`my-right-btn ${
								phoneValue || passwordValue ? "my-right-btn-color" : ""
							}`}
							onClick={this.onLogin}
						>
							登 录
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => {
	return {
		loginAction: dispatch.my.loginAction,
		getLoginSms: dispatch.my.getLoginSms,
	};
};
const mapState = (state) => {
	return {};
};
export default connect(mapState, mapDispatch)(Login);
