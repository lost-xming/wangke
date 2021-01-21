import React from "react";
import PropTypes, { object } from "prop-types";
import { Image, Popover, Input, Button } from "antd";
import { connect } from "react-redux";
import FixedApp from "@/components/fixedApp";
import Pay from "./pay";
import "./index.less";
class My extends React.Component {
	static propTypes = {
		loginAction: PropTypes.func,
		userInfo: PropTypes.object,
	};
	static defaultProps = {
		loginAction: () => {},
		userInfo: {},
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
		const { userInfo } = this.props;
		const storeUserInfo = JSON.parse(localStorage.getItem("userInfo"));
		const newUserInfo = Object.assign({}, userInfo, storeUserInfo);
		return (
			<div className="my-content">
				<Image
					height={"100%"}
					className="my-content-bg"
					preview={false}
					src={require("./../../images/mybg_02.png").default}
				/>
				<Pay />
				<FixedApp />
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
	return {
		userInfo: state.my.userInfo,
	};
};
export default connect(mapState, mapDispatch)(My);
