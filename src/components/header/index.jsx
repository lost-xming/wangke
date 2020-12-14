import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import router from "./../../router/index";
import {
	Popover,
	Menu,
	Tabs,
	Image,
	Divider,
	Button,
	Modal,
	Drawer,
} from "antd";
import {
	UnorderedListOutlined,
	CustomerServiceFilled,
} from "@ant-design/icons";
import "./index.less";
const { TabPane } = Tabs;
class Header extends Component {
	static propTypes = {};
	static defaultProps = {};
	constructor(props) {
		super(props);
		this.state = {
			drawerVisible: false,
			modalVisible: false,
		};
	}
	onClose = () => {
		this.setState({
			drawerVisible: false,
		});
	};
	onMenuClick = () => {
		this.setState({
			drawerVisible: true,
		});
	};
	_renderRouter = (item) => {
		const { match = {} } = this.props;
		const { path = "" } = match;
		return (
			<div className="header-router-item" key={item.path}>
				<NavLink
					exact={item.path === "/"}
					key={item.path}
					to={item.path}
					className={`header-item ${path === item.path ? "active" : ""}`}
				>
					{item.title}
				</NavLink>
			</div>
		);
	};
	_renderModuleInfo = () => {
		this.setState({
			modalVisible: true,
		});
	};
	onCancelModule = () => {
		this.setState({
			modalVisible: false,
		});
	};

	render() {
		const { drawerVisible, modalVisible } = this.state;
		const { match = {} } = this.props;
		const { path = "" } = match;
		const activePathItem = router.filter((item) => item.path === path);
		let headerTitle = "锦东电器® 智能厨房";
		if (path !== "/" && activePathItem.length) {
			headerTitle = activePathItem[0].title;
		}
		return (
			<div className="header">
				<div className="header-mune" onClick={this.onMenuClick}>
					<UnorderedListOutlined />
				</div>
				<Drawer
					title={
						<div className="drawer_title">
							<img
								className="drawer_title_logo"
								src={require("./../../assets/logo.png").default}
							/>
							锦东电器
						</div>
					}
					placement="left"
					closable={false}
					onClose={this.onClose}
					visible={drawerVisible}
					key="left"
					width={200}
				>
					<div className="header-router">
						{router.map((item, index) => {
							if (!item.notRender) {
								if (item.path) {
									return this._renderRouter(item);
								}
							}
						})}
					</div>
				</Drawer>
				<div>{headerTitle}</div>
				<div className="header-coKiing" onClick={this._renderModuleInfo}>
					<CustomerServiceFilled className="header-user-kefu" />
				</div>
				<Modal
					width={300}
					title={<div style={{ fontSize: 20, padding: 10 }}>服务热线</div>}
					maskClosable={true}
					visible={modalVisible}
					footer={null}
					closable={false}
					onCancel={this.onCancelModule}
				>
					<div style={{ fontSize: 14, paddingLeft: 20 }}>
						<div>客服电话</div>
						<div>0769-22225669</div>
						<div>消费维权热线</div>
						<div>0769-22225669</div>
						<div>举报邮箱</div>
						<div>0769-22225669</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default withRouter(Header);
