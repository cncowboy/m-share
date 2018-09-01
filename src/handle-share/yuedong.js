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

function ydDoShare(shareInfo) {
  const shareTitle = shareInfo.title
  const shareContent = shareInfo.desc
  let openShareUrl = shareInfo.link
  const shareIcon = shareInfo.imgUrl
  openShareUrl = openShareUrl.replace(/&is_share=[a-z]+/g, "");
  openShareUrl = openShareUrl.replace(/&is_share=/g, "");
  openShareUrl = openShareUrl.replace(/\?user_id=[0-9]+&?/g, "?");
  openShareUrl = openShareUrl.replace(/\?user_id=[0-9]+/g, "");
  openShareUrl = openShareUrl.replace(/&user_id=[0-9]+/g, "");
  openShareUrl = openShareUrl.replace(/&user_id=/g, "");
  openShareUrl = openShareUrl + "&is_share=true";

  if (util.ua.isFromIos) {
    var strAction = 'share_params';
    if (init) {
      strAction = "share_text";
    }
    var imgBase64Url1 = "iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAIAAADZ8fBYAAADlElEQVR4AX2VA6xEVxCGv3/OuYvajdPGSRvUCGvFKsPGZuPGbsyaQW3btm27T6s70+Ttnpzcfcrd3Tl435n7z73z6+ifjnfkmGOx+V3jemmnpRIvE7LCTUY44GCCAOEgsAAAc8JwAHBhQYlRYBgKwh0MENmYDwwKmvoXNcRRWepuq0NjQdvklhQMddA1Vsk63FSWVLYJgrJTm3HhEoRgK1p41LvuoKOjW02OAM/CjSKoMLaia1y0LmgKGrrSKxse1DMDwNqYtbBU63p1ZyBl9TporNStng/hh9the9u+jiCBxeY3JGSQyqSBJeU/fPWt2VeFsJC01A2spDyL9lAdcNEel4ASKalJpKwmKSVy33o99QwzWcL20ODyf657LT5p1LcAFd0MN9zCNQ/wxuzt6RsfTz4imMVsFtPyPXNaQRvt/DLs5dH7d208NbBkFML8EmG4yU2LhUSEpk+OHpsx0SKDACD6m7kbMilhLe1VK3eObZwKpKI755S4Z+lr//yt8es9NRRoQ+6rb1KSGTaw/hPrL786e3doqUsoXCMs3KIsbAbZeGr02L/+j2ECwZ5pj6xkmKGs9G/73/Wrd6SEEQtcVEltwVJI5Uy58Eb6nZ+fHz3dKAU+tMFQA6GEmWyg3p2rD3/pX/dltiCGVCTFTaVuFrF0O31LL06e+XH2fU/Nfmkfk6XNq0fz7fSH2zfuG6Sssr9kGlXfeggddBYb+u+R9fv3SfsMNLR5slhWvmXltr/4I4sqaLkUMZfRl5sLbuUdydJP/i1EVmoR0Kj39ujdx8dPDHMDtXNWggi0zXtBmGuBJtqzhudNfRJEwkAe7Y3/3Ti1UcOwZABROoPmsazmr/pIGGFEG+Mj0pGnDs+cxHjNV5Py0IZPrT/55uy1oWWjrY+BlghR+lks9y0nepEu2OvSfdP+q6ystav7pf3/bf+5ZeX6nDACgvD6X932VvVdMoKJT88cXHDy8LRxjBr1xj6KiHtWbvvGP+/nPR1XbO8yHb+owpe4p/T79Psr/risxR21ES3+1uzNYWrA6/0t9WuVghsx37e8gL3XvjCLcNKiEcuS9bOyF4uB4jI4wqNawVzf7ZxN9JWbjp/LwXF1+nVxGTpaF7/YUakaa3c/7hJq3XZGd51tB3QnuVK3Io1sobVYfuABbbH6wFS3KTAVP55zqzTb1lfU1KSuVXff4LIpC7eAKuKOT6WqXLGTIGWb/ge7OXDlEvWZtQAAAABJRU5ErkJggg=="
    var url = "/local_call?local_action=" + strAction + "&arg0=" + encodeURIComponent(shareTitle) + "&arg1=" + encodeURIComponent(shareContent) + "&arg2=" + encodeURIComponent(shareIcon) + "&arg3=" + encodeURIComponent(openShareUrl) + "&arg4=" + encodeURIComponent(JSON.stringify({}))+"&arg7=" + encodeURIComponent(imgBase64Url1);
    iosIframeLocalCall(url);
    return;
  } else if (util.ua.isFromAndroid) {
    if (("setShareMetaInfo" in YDJSInterface) && window.YDJSInterface) {
      window.YDJSInterface.setShareMetaInfo(shareTitle, shareContent, shareIcon, openShareUrl, JSON.stringify({}));
    }
  }
  ydShare()
}

function ydShare(type, event) {
    if (event != null) {
        stopBubble(event);
    }
    if (null == type) {
        iosIframeLocalCall("/local_call?local_action=share");
    } else {
        iosIframeLocalCall("/local_call?local_action=share&type=" + type);
    }
}

function stopBubble(e) {
    if (e && e.stopPropagation)
        e.stopPropagation() //非IE
    else
        window.event.cancelBubble = true; //IE
}
export default {ydShowShareBtn, ydHideShareBtn, ydDoShare};
