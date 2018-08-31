import util from '../util.js';

//显示分享按钮
function ydShowShareBtn() {
  if (util.ua.isFromAndroid) {
    if (!window.YDJSInterface) {

    } else {
      if ("showShareBtn" in YDJSInterface) {
        window.YDJSInterface.showShareBtn();
      }
    }
  } else if (util.ua.isFromIos) {
    window.location.href = '/local_call?local_action=hide_share_bnt&arg0=1';
  }
}

//隐藏分享按钮
function ydHideShareBtn() {
  if (util.ua.isFromAndroid) {
    if (!window.YDJSInterface) {

    } else {
      if ("hideShareBtn" in YDJSInterface) {
        window.YDJSInterface.hideShareBtn();
      }
    }
  } else if (util.ua.isFromIos) {
    window.location.href = '/local_call?local_action=hide_share_bnt&arg0=0';
  }
}

export default {ydShowShareBtn, ydHideShareBtn};
