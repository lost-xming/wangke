import React from "react";
import PropTypes from "prop-types";
import { Image, Popover, Input, Button } from "antd";
import { connect } from "react-redux";
import "./index.less";
class Login extends React.Component {
	static propTypes = {
		loginAction: PropTypes.func,
	};
	static defaultProps = {
		loginAction: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {
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
			phoneValue,
			passwordValue,
		});
	};
	render() {
		const { phoneValue, passwordValue } = this.state;
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
	};
};
const mapState = (state) => {
	return {};
};
export default connect(mapState, mapDispatch)(Login);
