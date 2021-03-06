import { GET, POST } from "@/axios";
import CommonService from "@/store/CommonService";
class Service extends CommonService {
	/**
	 *
	 * @param {} params
	 */
	loginAction(params) {
		return POST(`/www/sms_login/`, params, { type: "formData" });
	}
	getLoginSms(params) {
		return POST(`/www/sms_login_send_sms/`, params, { type: "formData" });
	}
	getList(params) {
		return POST(`/www/member/get_member_commodity_list/`, params, {
			type: "formData",
		});
	}
	getWeiXinPay(params) {
		return POST(`/www/member/wx_unified_order/`, params, {
			type: "formData",
		});
	}
	getZhiFuBaoPay(params) {
		return POST(`/www/member/zfb_unified_order/`, params, {
			type: "formData",
		});
	}
	getHostory(params) {
		return POST(`/www/member/get_member_history/`, params, {
			type: "formData",
		});
	}
}

export default new Service();
