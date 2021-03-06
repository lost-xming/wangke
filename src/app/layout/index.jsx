import React, { Component } from "react";
import { Layout, Affix, Image } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import HeaderCom from "@/components/header";
import FooterCom from "@/components/footer";
import { appRouters } from "./../../router/router";
import "./index.less";
const { Content } = Layout;
class LayoutCom extends Component {
	static propTypes = {
		setAffixData: PropTypes.func,
		setCommonStateData: PropTypes.func,
	};
	static defaultProps = {
		setAffixData: () => {},
		setCommonStateData: () => {},
	};
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		const { location = {}, setCommonStateData } = this.props;
		const { pathname } = location;
		let _ativeIndex = 0;
		appRouters.map((item, index) => {
			if (item.path === pathname) {
				_ativeIndex = index;
			}
		});
		setCommonStateData({
			activeIndex: _ativeIndex,
		});
	}
	onAffixChangeAction = (e) => {
		this.props.setAffixData({
			isAffix: e,
		});
	};
	_renderApp(pathname, children) {
		return (
			<Content style={{ position: "relative" }}>
				{pathname === "/" && (
					<Image
						className="banner-box"
						src={require("./../../images/bg1.png").default}
					/>
				)}
				<Affix
					className="header-affix"
					target={() => this.setContainer}
					offsetTop={0}
					onChange={this.onAffixChangeAction}
				>
					<HeaderCom />
				</Affix>
				<div className="site-layout-content">{children}</div>
				<FooterCom />
			</Content>
		);
	}
	render() {
		const { location, children } = this.props;
		const { pathname } = location;
		return (
			<Layout style={{ height: "100vh", overflow: "hidden" }}>
				<div
					ref={(refs) => (this.setContainer = refs)}
					style={{ overflow: "scroll", height: "100vh" }}
				>
					{this._renderApp(pathname, children)}
				</div>
			</Layout>
		);
	}
}
const mapState = (state = {}) => {
	return {};
};
const mapDispatch = (dispatch) => {
	return {
		setAffixData: dispatch.Common.setAffixData,
		setCommonStateData: dispatch.Common.setCommonStateData,
	};
};

export default connect(mapState, mapDispatch)(withRouter(LayoutCom));
