import util from '../util.js';

function iosIframeLocalCall(url) {
    var iFrame;
    iFrame = document.createElement("iframe");
    iFrame.setAttribute("src", url);
    iFrame.setAttribute("style", "display:none;");
    iFrame.setAttribute("height", "0px");
    iFrame.setAttribute("width", "0px");
    iFrame.setAttribute("frameborder", "0");
    document.body.appendChild(iFrame);
    // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
    iFrame.parentNode.removeChild(iFrame);
    iFrame = null;
}

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
    iosIframeLocalCall('/local_call?local_action=hide_share_bnt&arg0=1');
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
    iosIframeLocalCall('/local_call?local_action=hide_share_bnt&arg0=0');
  }
}

export default {ydShowShareBtn, ydHideShareBtn};
