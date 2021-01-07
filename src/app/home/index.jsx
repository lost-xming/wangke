import React from "react";
import { Image, Popover } from "antd";
import QueueAnim from "rc-queue-anim";
import { MobileFilled } from "@ant-design/icons";
import "./index.less";
const option1Arr = [
	require("./../../images/icon-23.png").default,
	require("./../../images/icon-20.png").default,
	require("./../../images/icon-21.png").default,
	require("./../../images/icon-22.png").default,
];
const optionTabs = [
	{
		src: require("./../../images/icon-19.png").default,
		text: "语音全维度评测",
		left: "20%",
	},
	{
		src: require("./../../images/icon-24.png").default,
		text: "汉字书写识别",
		left: "39%",
	},
	{
		src: require("./../../images/icon-25.png").default,
		text: "单元精度练习",
		left: "58%",
	},
	{
		src: require("./../../images/icon-26.png").default,
		text: "智能学情分析",
		left: "77%",
	},
];
const option3Arr = [
	{
		src: require("../../images/icon-8.png").default,
		title: "绘本儿歌",
		desc: "纯正发音，贴身翻译",
	},
	{
		src: require("../../images/icon-9.png").default,
		title: "作文阅读",
		desc: "有声读物，作文比评",
	},
	{
		src: require("../../images/icon-10.png").default,
		title: "奥数培优",
		desc: "精选有趣的数学课外内容",
	},
];
const option4Arr = [
	{
		title: "语",
		icon1: "icon-jiangke",
		icon1Text: "课前",
		icon2: "icon-lianxi",
		icon2Text: "练习",
		icon3: "icon-hanziku",
		icon3Text: "汉字",
	},
	{
		title: "数",
		icon1: "icon-lianxi",
		icon1Text: "练习",
		icon2: "icon-kousuan",
		icon2Text: "口算",
		icon3: "icon-zhongdian",
		icon3Text: "重难点",
	},
	{
		title: "英",
		icon1: "icon-lianxi",
		icon1Text: "练习",
		icon2: "icon-kouyu_luyin",
		icon2Text: "口语",
		icon3: "icon-dancilangdu",
		icon3Text: "单词",
	},
];
const option5Arr = [
	require("./../../images/icon-11.png").default,
	require("./../../images/icon-12.png").default,
	require("./../../images/icon-13.png").default,
	require("./../../images/icon-14.png").default,
];

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false,
			bannerArr: [
				{
					title: "小学语文",
					text:
						"小学语文全面辅导，单元练习，汉字书写，作文阅读，海量课外拓展。 ",
					src: require("../../images/icon-16.png").default,
				},
				{
					title: "小学数学",
					text: "单元练习，口算，重难点讲解，小升初，奥数等。 ",
					src: require("../../images/icon-17.png").default,
				},
				{
					title: "小学英语",
					text:
						"各种版本，单元练习，口语评测，单词背记，音标，自然拼读，更有海量儿歌，绘本。 ",
					src: require("../../images/icon-18.png").default,
				},
			],
			option1Src: require("./../../images/icon-23.png").default,
			tabsIndex: 0,
			tabImgIsShow: true,
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				isShow: true,
			});
		}, 1000);
	}
	onTabClickAction = (index) => {
		this.setState({
			tabImgIsShow: false,
			option1Src: option1Arr[index],
			tabsIndex: index,
		});
		setTimeout(() => {
			this.setState({
				tabImgIsShow: true,
			});
		}, 200);
	};
	_renderBanner() {
		const { isShow, bannerArr } = this.state;
		return (
			<div className="banner">
				{bannerArr.map((item, index) => {
					return (
						<QueueAnim
							key={`banner-${index}`}
							className="banner-item"
							duration={1000}
							animConfig={[
								{ opacity: [1, 0], translateY: [0, 100 * index] },
								{ opacity: [1, 0], translateY: [0, -100 * index] },
							]}
						>
							{isShow ? (
								<div className="demo-thead" key="c">
									{index % 2 === 0 && (
										<div className={`banner-text  banner-text-top`}>
											<div>
												<h3>{item.title}</h3>
												{item.text}
											</div>
										</div>
									)}
									<Image className={`banner-1-1`} src={item.src} />
									{index % 2 === 1 && (
										<div className={`banner-text  banner-text-bottom`}>
											<div>
												<h3>{item.title}</h3>
												{item.text}
											</div>
										</div>
									)}
								</div>
							) : null}
						</QueueAnim>
					);
				})}
			</div>
		);
	}
	_renderOption1() {
		const { option1Src, tabsIndex, tabImgIsShow } = this.state;
		return (
			<div className="home-option-1">
				<div className="option1-left"></div>
				<div className="option1-right"></div>
				<QueueAnim
					duration={1000}
					animConfig={[
						{ opacity: [1, 0], translateX: [0, 100] },
						{ opacity: [1, 0], translateX: [0, -100] },
					]}
				>
					{tabImgIsShow ? (
						<Image
							className="option-1-content demo-thead"
							key="a"
							src={option1Src}
						/>
					) : null}
				</QueueAnim>
				<div className="option-1-bg">
					<div
						className="option-1-bg-san"
						style={{ left: optionTabs[tabsIndex].left }}
					/>
				</div>
				<div className="option-1-tabs">
					{optionTabs.map((item, index) => {
						return (
							<div
								key={`tabs-${index}`}
								onClick={() => this.onTabClickAction(index)}
								className={`option-1-tabs-item ${
									tabsIndex === index ? "option-1-tabs-item-active" : ""
								} `}
							>
								<Image preview={false} src={item.src} />
								<div className="option-1-tabs-item-text">{item.text}</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
	_renderOption2() {
		return (
			<div className="home-option2">
				<div className="home-option2-left" />
				<div className="home-option2-right" />
				<div className="home-option2-title">
					<Image
						preview={false}
						src={require("../../images/icon-2.png").default}
					/>
					<div className="home-option2-title-box">
						<div className="home-option2-title-one">同步辅导</div>
						<div className="home-option2-title-two">
							小学语文数学英语学习辅导神器，专为小学生设计
						</div>
					</div>
				</div>
				<div className="home-option2-content">
					<div className="home-option2-content-item">
						<div className="item-tip">No.1</div>
						<div className="item-text">
							<div>
								<h3>在家就能学习</h3>
								<div className="item-text-desc">简单易用，功能强大</div>
							</div>
						</div>
					</div>
					<div className="home-option2-content-item">
						<div className="item-tip">No.2</div>
						<div className="item-text">
							<div>
								<h3>资源优质</h3>
								<div className="item-text-desc">教研老师精心制作</div>
							</div>
						</div>
					</div>
					<div className="home-option2-content-item">
						<div className="item-tip">No.3</div>
						<div className="item-text">
							<div>
								<h3>全面辅导</h3>
								<div className="item-text-desc">语文数学英语一应俱全</div>
							</div>
						</div>
					</div>
					<div className="home-option2-content-item home-option2-content-item2"></div>
				</div>
			</div>
		);
	}
	_renderOption3() {
		return (
			<div className="home-option2">
				<div className="home-option2-title">
					<Image
						preview={false}
						src={require("../../images/icon-2.png").default}
					/>
					<div className="home-option2-title-box">
						<div className="home-option2-title-one">课外拓展</div>
						<div className="home-option2-title-two">更高效提升孩子知识体系</div>
					</div>
				</div>
				<div className="home-option3-content">
					<Image
						className="home-option3-bg"
						preview={false}
						src={require("../../images/bg-3_50.png").default}
					/>
					<div className="home-option3-tabs">
						{option3Arr.map((item, index) => {
							return (
								<div
									key={`option3-${index}`}
									className="home-option3-tabs-item"
								>
									<Image
										className="home-option3-img"
										preview={false}
										src={item.src}
									/>
									<div className="home-option3-text">
										<h3>{item.title}</h3>
										<div>{item.desc}</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
	_renderOption4() {
		return (
			<div className="home-option2">
				<div className="home-option2-title">
					<Image
						preview={false}
						src={require("../../images/icon-2.png").default}
					/>
					<div className="home-option2-title-box">
						<div className="home-option2-title-one">家长专区</div>
						<div className="home-option2-title-two">
							完整记录学生学习轨迹，智能学情分析
						</div>
					</div>
				</div>
				<div className="home-option4-content">
					<div className="home-option4-tabs">
						{option4Arr.map((item, index) => {
							return (
								<div
									key={`option4-${index}`}
									className="home-option4-tabs-item"
								>
									<div className="option4-title">
										<div className="option4-title-text">{item.title}</div>
									</div>
									<div className="home-option4-text">
										<div className="home-option4-bg">
											<h1>{`0${index + 1}`}</h1>
											<div>{item.icon1Text}</div>
											<div>{item.icon2Text}</div>
											<div>{item.icon3Text}</div>
										</div>
										<div className="home-option4-icon">
											<div className="option4-icon-item">
												<span className={`iconfont ${item.icon1}`}></span>
												<span>{item.icon1Text}</span>
											</div>
											<div className="option4-icon-item">
												<span className={`iconfont ${item.icon2}`}></span>
												<span>{item.icon2Text}</span>
											</div>
											<div className="option4-icon-item">
												<span className={`iconfont ${item.icon3}`}></span>
												<span>{item.icon3Text}</span>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
	_renderOption5() {
		return (
			<div className="home-option5">
				<Image src={require("../../images/bg-4_55.png").default} />
				<div className="home-option5-content">
					<h3 className="option5-h3">学习效果真实反馈</h3>
					<div className="option5-img">
						{option5Arr.map((item, index) => {
							return (
								<Image
									key={`option5-${index}`}
									className="option5-item-img"
									src={item}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
	_renderFixed() {
		const { isShow } = this.state;
		return (
			<QueueAnim
				className="banner-item"
				duration={1000}
				animConfig={[
					{ opacity: [1, 0], translateX: [0, 300] },
					{ opacity: [1, 0], translateX: [0, -300] },
				]}
			>
				{isShow ? (
					<Popover
						placement="left"
						title={null}
						className="demo-thead"
						key="c"
						content={
							<div>
								<div className="fixed-right-text">下载小学生网校APP</div>
								<div className="fixed-right-img1-box">
									<Image
										className="fixed-right-img1"
										src={require("./../../images/erweima_32.png").default}
									/>
								</div>
								<div className="fixed-right-text">服务打动人心</div>
								<div className="fixed-right-text">超越用户期待</div>
							</div>
						}
					>
						<div className="fixed-right">
							<MobileFilled className="fixed-right-icon" />
							<div>APP下载</div>
						</div>
					</Popover>
				) : null}
			</QueueAnim>
		);
	}
	render() {
		return (
			<div className="home-content">
				{this._renderBanner()}
				{this._renderOption1()}
				{this._renderOption2()}
				{this._renderOption3()}
				{this._renderOption4()}
				{this._renderOption5()}
				{this._renderFixed()}
			</div>
		);
	}
}
