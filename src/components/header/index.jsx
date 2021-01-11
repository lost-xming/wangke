import React from "react";
import { Layout, Button, Menu, Image } from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { appRouters } from "./../../router/router";
import "./index.less";
const { Header } = Layout;
class HeaderCom extends React.Component {
	static propTypes = {
		activeIndex: PropTypes.number,
	};
	static defaultProps = {
		activeIndex: 0,
	};
	constructor(props) {
		super(props);
		this.state = {
			headerHide: false,
		};
	}
	onLoginAction = () => {
		this.props.history.push("/admin");
	};
	componentDidMount() {
		this.setState({
			headerHide: true,
		});
		this.timer = setTimeout(() => {
			this.setState({
				headerHide: false,
			});
		}, 5000);
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	render() {
		const { headerHide } = this.state;
		const { activeIndex } = this.props;
		return (
			<Header
				className={`isHasBack header-show-in ${
					headerHide ? "" : "header-show-hide"
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
							selectedKeys={[String(activeIndex)]}
						>
							{appRouters.map((item, index) => {
								return (
									<Menu.Item key={index}>
										<Link to={item.path}>{item.title}</Link>
									</Menu.Item>
								);
							})}
						</Menu>
					</div>
				</div>
			</Header>
		);
	}
}

const mapState = (state = {}) => {
	return {
		activeIndex: state.Common.activeIndex,
	};
};
const mapDispatch = (dispatch) => {
	return {};
};
export default connect(mapState, mapDispatch)(withRouter(HeaderCom));
