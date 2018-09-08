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

function setAppShareTitle(title) {
  if (!window.YDJSInterface) {

  } else {
    if ("setPageShareTitle" in YDJSInterface) {
      window.YDJSInterface.setPageShareTitle(title);
    }
  }
}

function setAppShareContent(content) {
  if (!window.YDJSInterface) {

  } else {
    if ("setPageShareContent" in YDJSInterface) {
      //                alert("info saved at app");
      window.YDJSInterface.setPageShareContent(content);
    }
  }
}

function setAppShareIcon(shareIcon) {
  if (!window.YDJSInterface) {

  } else {
    if ("setPageShareIcon" in YDJSInterface) {
      //                alert("info saved at app");
      window.YDJSInterface.setPageShareIcon(shareIcon);
    }
  }
}

function setAppShareUrl(url) {
  if (!window.YDJSInterface) {

  } else {
    if ("setPageShareUrl" in YDJSInterface) {
      window.YDJSInterface.setPageShareUrl(url);
    }
  }
}

function checkShareContent(content) {
    var enableContent = true;
    if (!content || content == undefined || content == "") {
        enableContent = false;
    }
    return enableContent;
}

function getMetaShareInfoFunction(platform, shareInfo) {
  return (init) => {
    const shareTitle = shareInfo.title
    const shareContent = shareInfo.desc
    const shareIcon = shareInfo.imgUrl
    var shareWxCircle = "";
    var shareQqTitle = "";
    var shareQqContent = "";
    var shareQzoneTitle = "";
    var shareQzoneContent = "";
    var shareWbContent = "";
    var sharePicUrl = "";  
    var openShareUrl = shareInfo.link || window.location.href;
    openShareUrl = openShareUrl.replace(/&is_share=[a-z]+/g, "");
    openShareUrl = openShareUrl.replace(/&is_share=/g, "");
    openShareUrl = openShareUrl.replace(/\?user_id=[0-9]+&?/g, "?");
    openShareUrl = openShareUrl.replace(/\?user_id=[0-9]+/g, "");
    openShareUrl = openShareUrl.replace(/&user_id=[0-9]+/g, "");
    openShareUrl = openShareUrl.replace(/&user_id=/g, "");
    openShareUrl = openShareUrl + "&is_share=true";
    if (!checkShareContent(shareWxCircle)) {
        shareWxCircle = shareContent;
    }
    if (!checkShareContent(shareQqTitle)) {
        shareQqTitle = shareTitle;
    }
    if (!checkShareContent(shareQqContent)) {
        shareQqContent = shareContent;
    }
    if (!checkShareContent(shareQzoneTitle)) {
        shareQzoneTitle = shareTitle;
    }
    if (!checkShareContent(shareQzoneContent)) {
        shareQzoneContent = shareContent;
    }
    if (!checkShareContent(shareWbContent)) {
        shareWbContent = shareContent;
    }
    if (!checkShareContent(openShareUrl)) {
        shareWbContent = shareWbContent + openShareUrl;
    }
    if (util.ua.isFromAndroid && window.YDJSInterface) {
        setAppShareUrl(openShareUrl);
        if (init) {
            setAppShareTitle(shareTitle);
            setAppShareContent(shareContent);
            setAppShareIcon(shareIcon);
        } else {
            if (("setMetaDataShareImgV2" in YDJSInterface) && sharePicUrl != "") {
                window.YDJSInterface.setMetaDataShareImgV2(shareQzoneTitle, shareQzoneContent, shareIcon, shareWbContent, sharePicUrl, openShareUrl);
            } else {
                if ("setMetaDataShareInfoExv2" in YDJSInterface) {
                    //新增支持定制QQ空间 title
                    window.YDJSInterface.setMetaDataShareInfoExv2(shareTitle, shareContent, shareIcon, shareWxCircle, shareQqTitle, shareQqContent, shareQzoneContent, shareWbContent, shareQzoneTitle);
                }
                if ("setMetaDataShareInfoEx" in YDJSInterface) {
                    //旧版本 不支持定制QQ空间title
                    window.YDJSInterface.setMetaDataShareInfoEx(shareTitle, shareContent, shareIcon, shareWxCircle, shareQqTitle, shareQqContent, shareQzoneContent, shareWbContent);
                }
                if ("setMetaDataShareInfo" in YDJSInterface) {
                    //旧版本
                    window.YDJSInterface.setMetaDataShareInfo(shareTitle, shareContent, shareIcon)
                }
            }
        }
    }
    var shareObj = new Object();
    shareObj["shareTitle"] = shareTitle;
    shareObj["shareContent"] = shareContent;
    shareObj["shareIcon"] = shareIcon;
    shareObj["shareUrl"] = openShareUrl;
    shareObj["sharePic"] = sharePicUrl;
    shareObj["shareWxCircle"] = shareWxCircle;
    shareObj["shareQqTitle"] = shareQqTitle;
    shareObj["shareQqContent"] = shareQqContent
    shareObj["shareQzoneTitle"] = shareQzoneTitle;
    shareObj["shareQzoneContent"] = shareQzoneContent;
    shareObj["shareWbContent"] = shareWbContent;
    shareObj["shareType"] = 0;
    if (platform === 'wx') {
        shareObj["sharePlatforom"] = 1;
    } else if (platform === 'wxline') {
        shareObj["sharePlatforom"] = 2;
    } else if (platform === 'qq') {
        shareObj["sharePlatforom"] = 4;
    } else if (platform === 'qzone') {
        shareObj["sharePlatforom"] = 5;
    } else {
        shareObj["sharePlatforom"] = -1;
    }
    var shareObj = initShareObj(shareObj);
    if (util.ua.isFromIos) {
        var strAction = 'share_params';
        if (init) {
            strAction = "share_text";
        }
        var imgBase64Url1 = "iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAIAAADZ8fBYAAADlElEQVR4AX2VA6xEVxCGv3/OuYvajdPGSRvUCGvFKsPGZuPGbsyaQW3btm27T6s70+Ttnpzcfcrd3Tl435n7z73z6+ifjnfkmGOx+V3jemmnpRIvE7LCTUY44GCCAOEgsAAAc8JwAHBhQYlRYBgKwh0MENmYDwwKmvoXNcRRWepuq0NjQdvklhQMddA1Vsk63FSWVLYJgrJTm3HhEoRgK1p41LvuoKOjW02OAM/CjSKoMLaia1y0LmgKGrrSKxse1DMDwNqYtbBU63p1ZyBl9TporNStng/hh9the9u+jiCBxeY3JGSQyqSBJeU/fPWt2VeFsJC01A2spDyL9lAdcNEel4ASKalJpKwmKSVy33o99QwzWcL20ODyf657LT5p1LcAFd0MN9zCNQ/wxuzt6RsfTz4imMVsFtPyPXNaQRvt/DLs5dH7d208NbBkFML8EmG4yU2LhUSEpk+OHpsx0SKDACD6m7kbMilhLe1VK3eObZwKpKI755S4Z+lr//yt8es9NRRoQ+6rb1KSGTaw/hPrL786e3doqUsoXCMs3KIsbAbZeGr02L/+j2ECwZ5pj6xkmKGs9G/73/Wrd6SEEQtcVEltwVJI5Uy58Eb6nZ+fHz3dKAU+tMFQA6GEmWyg3p2rD3/pX/dltiCGVCTFTaVuFrF0O31LL06e+XH2fU/Nfmkfk6XNq0fz7fSH2zfuG6Sssr9kGlXfeggddBYb+u+R9fv3SfsMNLR5slhWvmXltr/4I4sqaLkUMZfRl5sLbuUdydJP/i1EVmoR0Kj39ujdx8dPDHMDtXNWggi0zXtBmGuBJtqzhudNfRJEwkAe7Y3/3Ti1UcOwZABROoPmsazmr/pIGGFEG+Mj0pGnDs+cxHjNV5Py0IZPrT/55uy1oWWjrY+BlghR+lks9y0nepEu2OvSfdP+q6ystav7pf3/bf+5ZeX6nDACgvD6X932VvVdMoKJT88cXHDy8LRxjBr1xj6KiHtWbvvGP+/nPR1XbO8yHb+owpe4p/T79Psr/risxR21ES3+1uzNYWrA6/0t9WuVghsx37e8gL3XvjCLcNKiEcuS9bOyF4uB4jI4wqNawVzf7ZxN9JWbjp/LwXF1+nVxGTpaF7/YUakaa3c/7hJq3XZGd51tB3QnuVK3Io1sobVYfuABbbH6wFS3KTAVP55zqzTb1lfU1KSuVXff4LIpC7eAKuKOT6WqXLGTIGWb/ge7OXDlEvWZtQAAAABJRU5ErkJggg=="
        var url = "/local_call?local_action=" + strAction + "&arg0=" + encodeURIComponent(shareTitle) + "&arg1=" + encodeURIComponent(shareContent) + "&arg2=" + encodeURIComponent(shareIcon) + "&arg3=" + encodeURIComponent(openShareUrl) + "&arg4=" + encodeURIComponent(JSON.stringify(shareObj))+"&arg7=" + encodeURIComponent(imgBase64Url1);
        iosIframeLocalCall(url);
        return;
    }
    if (("setShareMetaInfo" in YDJSInterface) && window.YDJSInterface) {
        window.YDJSInterface.setShareMetaInfo(shareTitle, shareContent, shareIcon, openShareUrl, JSON.stringify(shareObj));
    }

  }
}

function initShareObj(shareObj) {
    var shareType = shareObj["shareType"];
    var sharePlatforom = shareObj["sharePlatforom"];
    var shareTitle = shareObj["shareTitle"];
    var shareContent = shareObj["shareContent"];
    var shareIcon = shareObj["shareIcon"];
    var openShareUrl = shareObj["shareUrl"];
    var sharePic = shareObj["sharePic"]
    var shareWxCircle = shareObj["shareWxCircle"];
    var shareQqTitle = shareObj["shareQqTitle"];
    var shareQqContent = shareObj["shareQqContent"]
    var shareQzoneTitle = shareObj["shareQzoneTitle"];
    var shareQzoneContent = shareObj["shareQzoneContent"];
    var shareWbContent = shareObj["shareWbContent"];
    if (shareType == 1 && sharePlatforom != 5) {
        shareIcon = sharePic;
        openShareUrl = "";
    }
    var shareObj = new Object();
    shareObj["qq"] = {}
    shareObj["qq"]["title"] = shareTitle;
    shareObj["qq"]["text"] = shareContent;
    if (shareQqTitle != "") {
        shareObj["qq"]["title"] = shareQqTitle;
    }
    if (shareQqContent != "") {
        shareObj["qq"]["text"] = shareQqContent;
    }


    shareObj["qzone"] = {}
    shareObj["qzone"]["title"] = shareTitle;
    shareObj["qzone"]["text"] = shareContent;
    if (shareQzoneTitle != "") {
        shareObj["qzone"]["title"] = shareQzoneTitle;
    }
    if (shareQzoneContent != "") {
        shareObj["qzone"]["text"] = shareQzoneContent;
    }

    shareObj["wechat_session"] = {}
    if (shareTitle != "") {
        shareObj["wechat_session"]["title"] = shareTitle;
    }
    if (shareContent != "") {
        shareObj["wechat_session"]["text"] = shareContent;
    }

    //微信朋友圈title&content只有一个
    shareObj["wechat_timeline"] = {}
    shareObj["wechat_timeline"]["title"] = shareTitle;
    shareObj["wechat_timeline"]["text"] = shareContent;
    if (shareWxCircle != "") {
        shareObj["wechat_timeline"]["title"] = shareWxCircle;
        shareObj["wechat_timeline"]["text"] = shareWxCircle;
    }

    shareObj["sina"] = {}
    shareObj["sina"]["title"] = shareTitle;
    shareObj["sina"]["text"] = shareContent;
    if (shareWbContent != "") {
        //内容后面拼接链接 微博会自动识别链接。
        shareObj["sina"]["text"] = shareWbContent + openShareUrl;
    }

    if (shareIcon != "") {
        shareObj["qq"]["image"] = shareIcon;
        shareObj["qzone"]["image"] = shareIcon;
        shareObj["wechat_session"]["image"] = shareIcon;
        shareObj["wechat_timeline"]["image"] = shareIcon;
        shareObj["sina"]["image"] = shareIcon;
    }
    if (openShareUrl != "") {
        shareObj["qq"]["url"] = openShareUrl;
        shareObj["qzone"]["url"] = openShareUrl;
        shareObj["wechat_session"]["url"] = openShareUrl;
        shareObj["wechat_timeline"]["url"] = openShareUrl;
        shareObj["sina"]["url"] = "";
    }
    return shareObj;
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
export default {ydShowShareBtn, ydHideShareBtn, getMetaShareInfoFunction};
