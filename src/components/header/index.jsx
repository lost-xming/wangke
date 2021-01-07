import React from "react";
import { Layout, Button, Menu, Image } from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import "./index.less";
const { Header } = Layout;
class HeaderCom extends React.Component {
	static propTypes = {};
	static defaultProps = {};
	constructor(props) {
		super(props);
		this.state = {
			headerHide: false,
		};
	}
	onLoginAction = () => {
		console.log(this.props);
		this.props.history.push("/admin");
	};
	componentDidMount() {
		this.timer = setTimeout(() => {
			this.setState({
				headerHide: true,
			});
		}, 5000);
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	render() {
		const { headerHide } = this.state;
		const { isAffix } = this.props;
		return (
			<Header
				className={`isHasBack header-show-in ${
					headerHide ? "header-show-hide" : ""
				}`}
			>
				<div className="header-tips">你好！欢迎进入，小学生网校</div>
				<div className="components-layout-top">
					<div type="link" className="logo">
						<Image
							className="logoImg"
							preview={false}
							src={require("./../../images/logo_03.png").default}
						/>
						<div className="logoRight">
							<h2>小学生网校</h2>
							<div className="logoRightText">服务打动人心，超越用户期待</div>
						</div>
					</div>
					<div className="logoMenu">
						<Menu
							className="notHasBack"
							theme="light"
							mode="horizontal"
							defaultSelectedKeys={["2"]}
						>
							<Menu.Item key="1">首页</Menu.Item>
							<Menu.Item key="2">申请合作</Menu.Item>
							<Menu.Item key="3">学习中心</Menu.Item>
						</Menu>
					</div>
				</div>
			</Header>
		);
	}
}

const mapState = (state = {}) => {
	return {
		isAffix: state.Common.isAffix,
	};
};
const mapDispatch = (dispatch) => {
	return {};
};
export default connect(mapState, mapDispatch)(withRouter(HeaderCom));
