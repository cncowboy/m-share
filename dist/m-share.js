(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Mshare = factory());
}(this, (function () { 'use strict';

  /*
   * @Author: backtonature 
   * @Date: 2018-05-22 20:08:19 
   * @Last Modified by: backtonature
   * @Last Modified time: 2018-05-29 11:24:07
   */
  var userAgent = window.navigator.userAgent;
  var util = {
    loadScript: function loadScript(url, callback) {
      var doc = document;
      var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
      var script = doc.createElement('script');
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (/loaded|complete/i.test(script.readyState)) {
            script.onreadystatechange = null;
            callback && callback.call(this);
          }
        };
      } else {
        script.onload = function () {
          callback && callback.call(this);
        };
      }
      script.src = url;
      head.insertBefore(script, head.firstChild);
    },
    execStyle: function execStyle(cssText) {
      var document = window.document;
      var styleTag = document.createElement('style');
      styleTag.setAttribute('type', 'text/css');
      if (document.all) {
        styleTag.styleSheet.cssText = cssText;
      } else {
        styleTag.innerHTML = cssText;
      }
      document.getElementsByTagName("head").item(0).appendChild(styleTag);
    },

    ua: {
      isFromAndroid: /android/gi.test(userAgent),
      isFromIos: /iphone|ipod|ios/gi.test(userAgent),
      isFromWx: /MicroMessenger/gi.test(userAgent),
      isFromQQ: /mobile.*qq/gi.test(userAgent),
      isFromUC: /ucbrowser/gi.test(userAgent),
      isFromQQBrower: /mqqbrowser[^LightApp]/gi.test(userAgent),
      isFromQQBrowerLight: /MQQBrowserLightApp/gi.test(userAgent),
      isFromYuedong: /yuedong/gi.test(userAgent)
    }
  };

  var style = {
    cssText: "\n  .m-share-mask {\n    margin: 0;\n    padding: 0;\n    position: fixed;\n    left: 0;\n    bottom: 0;\n    z-index: 2147483646;\n    width: 100%;\n    height: 100%;\n    background: #000;\n    opacity: 0;\n    -webkit-transition: opacity .2s ease-in;\n    transition: opacity .2s ease-in;\n  }\n  #m-share-actionSheet {\n    margin: 0;\n    padding: 0;\n    font-family: \"PingFang SC\",Arial,\"\\5FAE\\8F6F\\96C5\\9ED1\",Helvetica,sans-serif;\n    position: fixed;\n    width: 100%;\n    left: 0;\n    bottom: 0;\n    z-index: 2147483647;\n    background: #fff;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    padding: 30px 20px;\n    -webkit-transform: translateY(100%);\n    transform: translateY(100%);\n    -webkit-transition: -webkit-transform .2s ease-in;\n    transition: transform .2s ease-in;\n  }\n  #m-share-actionSheet div {\n    margin: 0;\n    padding: 0;\n  }\n  #m-share-actionSheet .m-share-sheet-title {\n    font-size: 12px;\n    color: #ababab;\n    text-align: center;\n    margin:10px 0 0 0;\n  }\n  #m-share-actionSheet .m-share-flex {\n    display: -webkit-box!important;\n    display: -webkit-flex!important;\n    display: -ms-flexbox!important;\n    display: flex!important;\n    -webkit-flex-wrap: wrap;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap\n  }\n  #m-share-actionSheet .m-share-flex>.m-share-cell {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    width: 0;\n    -webkit-flex-basis: 0;\n    -ms-flex-preferred-size: 0;\n    flex-basis: 0;\n    max-width: 100%;\n    display: block;\n    padding: 0!important;\n    position: relative;\n    text-align: center;\n  }\n  #m-share-actionSheet .m-share-iconfont {\n    margin: 0;\n  }\n  .m-share-tips {\n    font-family: \"PingFang SC\",Arial,\"\\5FAE\\8F6F\\96C5\\9ED1\",Helvetica,sans-serif;\n    margin: 0;\n    padding: 0;\n    position: fixed;\n    top: 3px;\n    color: #fff;\n    right: 20px;\n    z-index: 2147483647;\n    // background-color: #000;\n  }\n  .m-share-tips .m-share-tips-w {\n    margin: 0;\n    padding: 0;\n    display: inline-block;\n    font-size: 18px;\n    position: relative;\n    right: 1px;\n    top: 7px;\n  }\n  .m-share-tips .m-share-tips-w .m-share-tips-p {\n    margin: 0;\n    padding: 0;\n    color: #fff;\n    font-size: 18px;\n  }\n  .m-share-tips-arrow {\n    margin: 0;\n    padding: 0;\n    display: inline-block;\n    width: 54px;\n    height: 55px;\n    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABuCAMAAAD1cAb0AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAC6UExURUdwTP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3HoUvYAAAA9dFJOUwDIjg4CBPr98Av39C4GghgTQOAnv6h97AjcN2dGH+gcbxAVz1WWIqGvuko0tNP+5eN42YhaUF/WmsQ8Y8we7g2hAAAEn0lEQVQYGe3AVXbjSAAF0CcuMZllZnabE6ff/rc1Lqtp5rdVOfORiy9fvnz5nxvg8wyPBT7LY++LhYtPkdw92rXcxCewjivSrnXwCaxO4ZH87uIT5Os+STtKoZ7Z6fNJLFv4BDVKfjqGereM0v0M9QaRoCRSKGflW75kF6h3Zam/MaHaZudRck5dqBZv2yy1BxbUai0mLO1rBRS7zWz+cEigVnoW/GFfv0GpXpTxl0MPKvWiGn9bdaHQ6FjjHyYB1GkNF/yDc+pAnZvu8U+TIIQq6VmQwudPezGFKmmUkdrSoSTae7IZuFBjHmXke/yNktAzkmJoQol4oTn+yWhQct5nO5v0uy5UcOsTTraD+dLn016LNZL+2YUC7ptm3+uxNV1R8jf5xCZt3YUCtbadRTmMK1/01GjYpDObo2rhuEE2jw9gc6DUfjNCvUnapzEqZm0+yMM0BYxZm1IzALoZyXqOaoXdi2+LILZgdnS+3ACkGekceqjWbdhsag88halPqXY1gDxySC0wUaXrTIj6BZKr2Xzy3+YA3K1PsrBQoWDVb0YFXo6aw6f+EE/jq0/6QxfVGUwyMe2EkPKhT0kb4cmM7iSjMSozyLJv3cSCFMY7SqJI8GQNTiTrLqpi6dl7ARMvZo2St73gJdAcOnqOyqwvBX667RyS+2bdhWTGNZucJKiOYeGHgd6k1DZQGtcdOrM1FLC6S0reOkHJ0Gx6kxgKGFe+zKYmSvOZQ0fPocCgT+m0MPBD0ia91RjVGy/7fLLbAX5aR3s6tR4q1zpubUoN/JJopKPFJqrWOXuU3hITP+WRz714oGpu2qeUdQf4xbr2yeYlQcVa75R8/YHfzM3MtrUGqtagZK+O+FNrptXqLioWTPZ88pcu/sW9dBJULH9rUxI9/FeIihnH75T8aQjVrI83vgxzC6oFHx6l1bQF1QbrPqWsMYBqYfKdkr9IoV5EyXtvQL0GJUeru1AuZWkXQ7me4IvoQTkjYymFckaNpQbUq7GkmVCuwdIkMKBaylJ/HUC1nuCLPw2g2HiesTTsWFCrtzmwFG1aUCvpTliKYEKt0a3OUg2qjRoLvrTbBhRzFwuPUraNoVartd3ZlLRtALXcje45lDK9C7VGRYOlfpFCLXdR9yiJZieAUklSu9uUTqeHAaVGRZ2l9iKAUr3edskX73DpQKlH91vTobRr53MoFI47s4ylpZ5DodC9rL8JSnb7fR1DoXFcX3oszd6SFpSxRvGxLhxKTV+fGlCmhaL4nvHF7utTI4QilpV0dU1wT9LhbtfZQJWWMS2W77Qp+X29mMOEEta8NzyfhGNTEoeoMFwoEJrjXqo3DhPalGyxPD/GIf5WksCECRMlE61Rso7P0/u7ECyJg66P5jDxt+LGbHhbB904H82D3nUzvX4s6tru4LHk+dpkuBm0TPw9a6p5XibuWW21qi9PK+/OzLYdPjmO53ur3frozlGN8NHImsJ2bDrc8zeHTbHQ9HN3MDZRmTAdfNxW2/62eRdS29aaK205e/voBrEbomKW1XI7eRFE3eijMdQ7UV4kc8NIYEKZEC6SMAxh4sv/2T8XLefQYLd95QAAAABJRU5ErkJggg==');\n    background-size: 100%;\n  }\n  .m-share-tips-bottom {\n    font-family: \"PingFang SC\",Arial,\"\\5FAE\\8F6F\\96C5\\9ED1\",Helvetica,sans-serif;\n    margin: 0;\n    padding: 0;\n    font-size: 18px;\n    position: fixed;\n    color: #fff;\n    top: 50%;\n    left: 50%;\n    width: 100%;\n    z-index: 2147483647;\n    -webkit-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n    text-align: center;\n    width: 240px;\n    line-height: 1.72;\n  }\n\n  @font-face {font-family: \"m-share-iconfont\";\n    src: url('data:application/x-font-ttf;charset=utf-8;base64,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') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/\n  }\n  .m-share-iconfont {\n    font-family:\"m-share-iconfont\" !important;\n    font-size:26px;\n    font-style:normal;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    padding: 5px;\n    margin:0 0 0 10px;\n  }\n  .m-share-iconfont:first-child {\n    margin: 0;\n  }\n  .m-share-iconfont-wx {\n    color: #7bc549;\n    border: 1px solid #7bc549;\n    border-radius: 100%;\n  }\n  .m-share-iconfont-wx:active {\n    background: #7bc549;\n    color: #fff;\n  }\n  .m-share-iconfont-wx:before {\n    content: \"\\e61e\";\n  }\n  .m-share-iconfont-sina {\n    color: #ff763b;\n    border: 1px solid #ff763b;\n    border-radius: 100%;\n  }\n  .m-share-iconfont-sina:active {\n    background: #ff763b;\n    color: #fff;\n  }\n  .m-share-iconfont-sina:before {\n    content: \"\\e641\";\n  }\n  .m-share-iconfont-qzone {\n    color: #fdbe3d;\n    border: 1px solid #fdbe3d;\n    border-radius: 100%;\n  }\n  .m-share-iconfont-qzone:active {\n    background: #fdbe3d;\n    color: #fff;\n  }\n  .m-share-iconfont-qzone:before {\n    content: \"\\e728\";\n  }\n  .m-share-iconfont-qq {\n    color: #56b6e7;\n    border: 1px solid #56b6e7;\n    border-radius: 100%;\n  }\n  .m-share-iconfont-qq:active {\n    background: #56b6e7;\n    color: #fff;\n  }\n  .m-share-iconfont-qq:before {\n    content: \"\\e630\";\n  }\n  .m-share-iconfont-wxline {\n    color: #33b045;\n    border: 1px solid #33b045;\n    border-radius: 100%;\n  }\n  .m-share-iconfont-wxline:active {\n    background: #33b045;\n    color: #fff;\n  }\n  .m-share-iconfont-wxline:before {\n    content: \"\\e6e9\";\n  }\n  .m-share-iconfont-menu {\n    font-size: 12px;\n  }\n  .m-share-iconfont-menu:before {\n    content: \"\\e67e\";\n  }\n  .m-share-iconfont-dots {\n    font-size: 25px;\n    color: #fff;\n  }\n  .m-share-iconfont-dots:before {\n    content: \"\\e656\";\n  }\n  .m-share-iconfont-share {\n    font-size: 17px;\n    color: #fff;\n    margin: 0;\n  }\n  .m-share-iconfont-share:before {\n    content: \"\\e6ae\";\n  }\n  "
  };

  /*
   * @Author: backtonature 
   * @Date: 2018-05-27 20:08:19 
   * @Last Modified by: backtonature
   * @Last Modified time: 2018-05-30 21:05:38
   */

  var isStyleLoaded = false;
  var ui = {
    initStyle: function initStyle() {
      if (!isStyleLoaded) {
        util.execStyle(style.cssText);
        isStyleLoaded = true;
      }
    },
    showActionSheet: function showActionSheet(dom) {
      this.showMask();
      var $sheet = document.createElement('div');
      $sheet.id = 'm-share-actionSheet';
      $sheet.appendChild(dom);
      document.body.appendChild($sheet);
      window.setTimeout(function () {
        $sheet.style.cssText = '-webkit-transform: translateY(0);transform: translateY(0);';
      }, 0);
    },
    hideActionSheet: function hideActionSheet() {
      var dom = document.querySelector('#m-share-actionSheet');
      if (dom) {
        // 渐变消失
        // dom.addEventListener('webkitTransitionend', () => {
        //   dom.remove();
        // });
        // dom.addEventListener('transitionend', () => {
        //   dom.remove();
        // });
        // dom.style.cssText = '-webkit-transform: translateY(100%);transform: translateY(100%);';
        dom.remove();
      }
    },
    showMask: function showMask() {
      var _this = this;

      if (document.querySelector('.m-share-mask')) {
        return;
      }
      var $div = document.createElement('div');
      $div.className = 'm-share-mask';
      $div.addEventListener('click', function () {
        _this.hideActionSheet();
        _this.hideBottomTips();
        _this.hideRightTips();
        _this.hideMask();
      });
      document.body.appendChild($div);
      window.setTimeout(function () {
        $div.style.opacity = 0.7;
      }, 0);
    },
    hideMask: function hideMask() {
      var domList = document.querySelectorAll('.m-share-mask');

      var _loop = function _loop(i) {
        var item = domList[i];
        var removeDom = function removeDom() {
          return item.remove();
        };
        // 渐变消失
        // item.addEventListener('webkitTransitionend', removeDom);
        // item.addEventListener('transitionend', removeDom);
        // item.style.cssText = 'opacity: 0';
        removeDom();
      };

      for (var i = 0; i < domList.length; i++) {
        _loop(i);
      }
    },
    showBottomTips: function showBottomTips() {
      var _this2 = this;

      this.showMask();
      var $tips = document.createElement('div');
      $tips.className = 'm-share-tips-bottom';
      $tips.innerHTML = '请打开浏览器的菜单进行分享点击“<i class="m-share-iconfont m-share-iconfont-menu"></i>”或“<i class="m-share-iconfont m-share-iconfont-share"></i>”';
      document.body.appendChild($tips);
      window.setTimeout(function () {
        _this2.hideMask();
        _this2.hideBottomTips();
      }, 1400);
    },
    hideBottomTips: function hideBottomTips() {
      var domList = document.querySelectorAll('.m-share-tips-bottom');
      for (var i = 0; i < domList.length; i++) {
        var _item = domList[i];
        _item.remove();
      }
    },
    showRightTopTips: function showRightTopTips() {
      var _this3 = this;

      this.showMask();
      var $tips = document.createElement('div');
      $tips.className = 'm-share-tips';
      $tips.innerHTML = '\n      <div class="m-share-tips-w">\n        <div class="m-share-tips-p">\u70B9\u51FB\u53F3\u4E0A\u89D2\u201C<i class="m-share-iconfont m-share-iconfont-dots"></i>\u201D</div>\n        <div class="m-share-tips-p">\u5206\u4EAB\u7ED9\u670B\u53CB\u5427\uFF01</div>\n      </div>\n      <div class="m-share-tips-arrow"></div>\n    ';
      document.body.appendChild($tips);
      window.setTimeout(function () {
        _this3.hideMask();
        _this3.hideRightTips();
      }, 1400);
    },
    hideRightTips: function hideRightTips() {
      var domList = document.querySelectorAll('.m-share-tips');
      for (var i = 0; i < domList.length; i++) {
        var _item2 = domList[i];
        _item2.remove();
      }
    }
  };

  /*
   * @Author: backToNature 
   * @Date: 2018-05-30 12:54:24 
   * @Last Modified by: backToNature
   * @Last Modified time: 2018-05-30 13:39:38
   */
  var setNormalShareInfo = (function (info) {
    if (info.desc && !document.querySelector('meta[name$="cription"]')) {
      var $meta = document.createElement('meta');
      $meta.setAttribute('description', info.desc);
    }
    // 添加隐藏的img标签在body最前面
    if (info.imgUrl) {
      var $img = document.createElement('img');
      $img.style.cssText = 'width: 0;height: 0;position: absolute;z-index: -9999;top: -99999px;left: -99999px;';
      $img.onload = function () {
        document.body.insertBefore($img, document.body.firstChild);
      };
      $img.onerror = function () {
        $img.remove();
      };
      $img.src = info.imgUrl;
    }
  });

  /*
   * @Author: backtonature 
   * @Date: 2018-05-22 21:31:32 
   * @Last Modified by: backToNature
   * @Last Modified time: 2018-05-23 20:05:09
   */
  var qqJsSdkUrl = '//open.mobile.qq.com/sdk/qqapi.js?_bid=152';

  var setShareInfo = function setShareInfo(info) {
    mqq.data.setShareInfo({
      share_url: info.link,
      title: info.title,
      desc: info.desc,
      image_url: info.imgUrl
    });
  };

  var setQQshareInfo = (function (info) {
    if (window.mqq && mqq.data && mqq.data.setShareInfo) {
      setShareInfo(info);
    } else {
      util.loadScript(qqJsSdkUrl, function () {
        setShareInfo(info);
      });
    }
  });

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
          if (!window.YDJSInterface) ; else {
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
          if (!window.YDJSInterface) ; else {
              if ("hideShareBtn" in YDJSInterface) {
                  window.YDJSInterface.hideShareBtn();
              }
          }
      } else if (util.ua.isFromIos) {
          iosIframeLocalCall('/local_call?local_action=hide_share_bnt&arg0=0');
      }
  }

  function setAppShareTitle(title) {
      if (!window.YDJSInterface) ; else {
          if ("setPageShareTitle" in YDJSInterface) {
              window.YDJSInterface.setPageShareTitle(title);
          }
      }
  }

  function setAppShareContent(content) {
      if (!window.YDJSInterface) ; else {
          if ("setPageShareContent" in YDJSInterface) {
              //                alert("info saved at app");
              window.YDJSInterface.setPageShareContent(content);
          }
      }
  }

  function setAppShareIcon(shareIcon) {
      if (!window.YDJSInterface) ; else {
          if ("setPageShareIcon" in YDJSInterface) {
              //                alert("info saved at app");
              window.YDJSInterface.setPageShareIcon(shareIcon);
          }
      }
  }

  function setAppShareUrl(url) {
      if (!window.YDJSInterface) ; else {
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
      return function (init) {
          var shareTitle = shareInfo.title;
          var shareContent = shareInfo.desc;
          var shareIcon = shareInfo.imgUrl;
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
                  if ("setMetaDataShareImgV2" in YDJSInterface && sharePicUrl != "") {
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
                          window.YDJSInterface.setMetaDataShareInfo(shareTitle, shareContent, shareIcon);
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
          shareObj["shareQqContent"] = shareQqContent;
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
              var imgBase64Url1 = "iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAIAAADZ8fBYAAADlElEQVR4AX2VA6xEVxCGv3/OuYvajdPGSRvUCGvFKsPGZuPGbsyaQW3btm27T6s70+Ttnpzcfcrd3Tl435n7z73z6+ifjnfkmGOx+V3jemmnpRIvE7LCTUY44GCCAOEgsAAAc8JwAHBhQYlRYBgKwh0MENmYDwwKmvoXNcRRWepuq0NjQdvklhQMddA1Vsk63FSWVLYJgrJTm3HhEoRgK1p41LvuoKOjW02OAM/CjSKoMLaia1y0LmgKGrrSKxse1DMDwNqYtbBU63p1ZyBl9TporNStng/hh9the9u+jiCBxeY3JGSQyqSBJeU/fPWt2VeFsJC01A2spDyL9lAdcNEel4ASKalJpKwmKSVy33o99QwzWcL20ODyf657LT5p1LcAFd0MN9zCNQ/wxuzt6RsfTz4imMVsFtPyPXNaQRvt/DLs5dH7d208NbBkFML8EmG4yU2LhUSEpk+OHpsx0SKDACD6m7kbMilhLe1VK3eObZwKpKI755S4Z+lr//yt8es9NRRoQ+6rb1KSGTaw/hPrL786e3doqUsoXCMs3KIsbAbZeGr02L/+j2ECwZ5pj6xkmKGs9G/73/Wrd6SEEQtcVEltwVJI5Uy58Eb6nZ+fHz3dKAU+tMFQA6GEmWyg3p2rD3/pX/dltiCGVCTFTaVuFrF0O31LL06e+XH2fU/Nfmkfk6XNq0fz7fSH2zfuG6Sssr9kGlXfeggddBYb+u+R9fv3SfsMNLR5slhWvmXltr/4I4sqaLkUMZfRl5sLbuUdydJP/i1EVmoR0Kj39ujdx8dPDHMDtXNWggi0zXtBmGuBJtqzhudNfRJEwkAe7Y3/3Ti1UcOwZABROoPmsazmr/pIGGFEG+Mj0pGnDs+cxHjNV5Py0IZPrT/55uy1oWWjrY+BlghR+lks9y0nepEu2OvSfdP+q6ystav7pf3/bf+5ZeX6nDACgvD6X932VvVdMoKJT88cXHDy8LRxjBr1xj6KiHtWbvvGP+/nPR1XbO8yHb+owpe4p/T79Psr/risxR21ES3+1uzNYWrA6/0t9WuVghsx37e8gL3XvjCLcNKiEcuS9bOyF4uB4jI4wqNawVzf7ZxN9JWbjp/LwXF1+nVxGTpaF7/YUakaa3c/7hJq3XZGd51tB3QnuVK3Io1sobVYfuABbbH6wFS3KTAVP55zqzTb1lfU1KSuVXff4LIpC7eAKuKOT6WqXLGTIGWb/ge7OXDlEvWZtQAAAABJRU5ErkJggg==";
              var url = "/local_call?local_action=" + strAction + "&arg0=" + encodeURIComponent(shareTitle) + "&arg1=" + encodeURIComponent(shareContent) + "&arg2=" + encodeURIComponent(shareIcon) + "&arg3=" + encodeURIComponent(openShareUrl) + "&arg4=" + encodeURIComponent(JSON.stringify(shareObj)) + "&arg7=" + encodeURIComponent(imgBase64Url1);
              iosIframeLocalCall(url);
              return;
          }
          if ("setShareMetaInfo" in YDJSInterface && window.YDJSInterface) {
              window.YDJSInterface.setShareMetaInfo(shareTitle, shareContent, shareIcon, openShareUrl, JSON.stringify(shareObj));
          }
      };
  }

  function initShareObj(shareObj) {
      var shareType = shareObj["shareType"];
      var sharePlatforom = shareObj["sharePlatforom"];
      var shareTitle = shareObj["shareTitle"];
      var shareContent = shareObj["shareContent"];
      var shareIcon = shareObj["shareIcon"];
      var openShareUrl = shareObj["shareUrl"];
      var sharePic = shareObj["sharePic"];
      var shareWxCircle = shareObj["shareWxCircle"];
      var shareQqTitle = shareObj["shareQqTitle"];
      var shareQqContent = shareObj["shareQqContent"];
      var shareQzoneTitle = shareObj["shareQzoneTitle"];
      var shareQzoneContent = shareObj["shareQzoneContent"];
      var shareWbContent = shareObj["shareWbContent"];
      if (shareType == 1 && sharePlatforom != 5) {
          shareIcon = sharePic;
          openShareUrl = "";
      }
      var shareObj = new Object();
      shareObj["qq"] = {};
      shareObj["qq"]["title"] = shareTitle;
      shareObj["qq"]["text"] = shareContent;
      if (shareQqTitle != "") {
          shareObj["qq"]["title"] = shareQqTitle;
      }
      if (shareQqContent != "") {
          shareObj["qq"]["text"] = shareQqContent;
      }

      shareObj["qzone"] = {};
      shareObj["qzone"]["title"] = shareTitle;
      shareObj["qzone"]["text"] = shareContent;
      if (shareQzoneTitle != "") {
          shareObj["qzone"]["title"] = shareQzoneTitle;
      }
      if (shareQzoneContent != "") {
          shareObj["qzone"]["text"] = shareQzoneContent;
      }

      shareObj["wechat_session"] = {};
      if (shareTitle != "") {
          shareObj["wechat_session"]["title"] = shareTitle;
      }
      if (shareContent != "") {
          shareObj["wechat_session"]["text"] = shareContent;
      }

      //微信朋友圈title&content只有一个
      shareObj["wechat_timeline"] = {};
      shareObj["wechat_timeline"]["title"] = shareTitle;
      shareObj["wechat_timeline"]["text"] = shareContent;
      if (shareWxCircle != "") {
          shareObj["wechat_timeline"]["title"] = shareWxCircle;
          shareObj["wechat_timeline"]["text"] = shareWxCircle;
      }

      shareObj["sina"] = {};
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
  var yd = { ydShowShareBtn: ydShowShareBtn, ydHideShareBtn: ydHideShareBtn, getMetaShareInfoFunction: getMetaShareInfoFunction };

  /*
   * @Author: backToNature 
   * @Date: 2018-05-22 17:23:35 
   * @Last Modified by: backToNature
   * @Last Modified time: 2018-05-30 17:39:03
   */

  var isInit = false;

  var _init = (function (config) {
    if (!isInit) {
      var info = {
        title: config.title,
        desc: config.desc,
        link: config.link,
        imgUrl: config.imgUrl
      };
      isInit = true;
      ui.initStyle(); // 加载样式

      // 配置通用分享设置
      if (config.setNormal !== false) {
        setNormalShareInfo(info);
      }
      // 配置手q分享内容
      if (util.ua.isFromQQ) {
        setQQshareInfo(config.types, info);
      }
      if (util.ua.isFromYuedong) {
        window.MetaShareInfo = yd.getMetaShareInfoFunction(info);
      }
    }
  });

  /*
   * @Author: backToNature 
   * @Date: 2018-05-22 20:12:58 
   * @Last Modified by: backToNature
   * @Last Modified time: 2018-05-31 15:16:45
   */
  var wxJsSdkUrl = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';

  var setShareInfo$1 = function setShareInfo(type, info) {
    switch (type) {
      case 'wx':
        wx.onMenuShareAppMessage(info); // 设置分享到微信好友内容
        break;
      case 'wxline':
        wx.onMenuShareTimeline(info); // 设置分享到微信朋友圈内容
        break;
      case 'qq':
        wx.onMenuShareQQ(info); // 设置分享到微信好友内容
        break;
      case 'qzone':
        wx.onMenuShareQZone(info); // 设置分享到qq空间
        break;
    }
  };

  var isConfig = false;

  var setWxShareInfo = (function (types, config) {
    var wxConfig = config.wx;
    var doSet = function doSet() {
      var _wxConfig = Object.assign({
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo']
      }, wxConfig);
      if (!isConfig) {
        wx.config(_wxConfig);
        isConfig = true;
      }
      wx.ready(function () {
        try {
          types.forEach(function (item) {
            var _info = {
              title: config.infoMap && config.infoMap[item] && config.infoMap[item].title || config.title,
              desc: config.infoMap && config.infoMap[item] && config.infoMap[item].desc || config.desc,
              link: config.infoMap && config.infoMap[item] && config.infoMap[item].link || config.link,
              imgUrl: config.infoMap && config.infoMap[item] && config.infoMap[item].imgUrl || config.imgUrl
            };
            setShareInfo$1(item, _info);
          });
        } catch (e) {}
      });
    };
    if (window.wx) {
      doSet();
    } else {
      util.loadScript(wxJsSdkUrl, function () {
        doSet();
      });
    }
  });

  /*
   * @Author: backtonature 
   * @Date: 2018-05-23 21:36:23 
   * @Last Modified by: backtonature
   * @Last Modified time: 2018-05-29 14:05:55
   */

  var qqShareJsSdk = '//jsapi.qq.com/get?api=app.setShareInfo,app.share';

  var qqBrowserShare = (function (type, info) {
    var doShare = function doShare(to_app) {
      var _doShare = function _doShare() {
        try {
          browser.app.share({
            title: info.title,
            description: info.desc,
            url: info.link,
            img_url: info.imgUrl,
            to_app: to_app
          }, function (res) {});
        } catch (e) {}
      };
      if (window.browser && browser.app && browser.app.share) {
        _doShare();
      } else {
        util.loadScript(qqShareJsSdk, _doShare);
      }
    };
    switch (type) {
      case 'wx':
        doShare(1);
        break;
      case 'wxline':
        doShare(8);
        break;
      case 'qq':
        doShare(4);
        break;
      case 'qzone':
        doShare(3);
        break;
      case 'sina':
        doShare(11);
        break;
    }
  });

  /*
   * @Author: backtonature 
   * @Date: 2018-05-23 21:20:45 
   * @Last Modified by: backtonature
   * @Last Modified time: 2018-06-01 15:07:06
   */

  var wxShare = (function (info) {
    if (util.ua.isFromWx) {
      ui.showRightTopTips();
      return;
    }

    if (util.ua.isFromQQ) {
      ui.showRightTopTips();
      return;
    }
    if (util.ua.isFromUC) {
      // uc浏览器
      ui.hideMask();
      if (util.ua.isFromIos) {
        window.ucbrowser && window.ucbrowser.web_share(info.title, info.imgUrl, info.link, 'kWeixin', '', '', '');
      } else {
        window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, info.imgUrl, info.link, 'WechatFriends', '', '']);
      }
      return;
    }
    if (util.ua.isFromYuedong) {
      yd.getMetaShareInfoFunction('wx', info)(false);
      return;
    }

    if (util.ua.isFromQQBrower) {
      // qq浏览器
      ui.hideMask();
      qqBrowserShare('wx', info);
      return;
    }

    ui.showBottomTips();
  });

  /*
   * @Author: backtonature 
   * @Date: 2018-05-24 14:17:21 
   * @Last Modified by: backtonature
   * @Last Modified time: 2018-06-01 15:05:57
   */

  var wxlineShare = (function (info) {
    if (util.ua.isFromWx) {
      // 微信客户端
      ui.showRightTopTips();
      return;
    }

    if (util.ua.isFromQQ) {
      // 手机qq
      ui.showRightTopTips();
      return;
    }

    if (util.ua.isFromUC) {
      // uc浏览器
      ui.hideMask();
      if (util.ua.isFromIos) {
        window.ucbrowser && window.ucbrowser.web_share(info.title, info.imgUrl, info.link, 'kWeixinFriend', '', '', '');
      } else {
        window.ucweb && window.ucweb.startRequest("shell.page_share", [info.title, info.imgUrl, info.link, 'WechatTimeline', '', '']);
      }
      return;
    }

    if (util.ua.isFromYuedong) {
      yd.getMetaShareInfoFunction('wxline', info)(false);
      return;
    }

    if (util.ua.isFromQQBrower) {
      // qq浏览器
      ui.hideMask();
      qqBrowserShare('wxline', info);
      return;
    }

    ui.showBottomTips();
  });

  /*
   * @Author: backtonature 
   * @Date: 2018-05-24 14:23:11 
   * @Last Modified by: backtonature
   * @Last Modified time: 2018-06-01 15:05:25
   */

  var qqShare = (function (info) {
    if (util.ua.isFromWx) {
      // 微信客户端
      ui.showRightTopTips();
      return;
    }

    if (util.ua.isFromQQ) {
      // 手机qq
      ui.showRightTopTips();
      return;
    }

    if (util.ua.isFromQQBrower) {
      // qq浏览器
      ui.hideMask();
      qqBrowserShare('qq', info);
      return;
    }

    if (util.ua.isFromYuedong) {
      yd.getMetaShareInfoFunction('qq', info)(false);
      return;
    }

    ui.showBottomTips();
  });

  /*
   * @Author: backtonature 
   * @Date: 2018-05-24 14:23:11 
   * @Last Modified by: backtonature
   * @Last Modified time: 2018-06-01 15:05:26
   */

  var qzoneShare = (function (info) {
    if (util.ua.isFromWx) {
      // 微信客户端
      ui.showRightTopTips();
      return;
    }

    if (util.ua.isFromQQ) {
      // 手机qq
      ui.showRightTopTips();
      return;
    }

    if (util.ua.isFromYuedong) {
      yd.getMetaShareInfoFunction('qzone', info)(false);
      return;
    }

    if (util.ua.isFromQQBrower) {
      // qq浏览器
      ui.hideMask();
      qqBrowserShare('qzone', info);
      return;
    }
    var query = 'url=' + encodeURIComponent(info.link) + '&title=' + encodeURIComponent(info.title) + '&desc=' + encodeURIComponent(info.desc) + '&summary=' + encodeURIComponent(info.desc) + '&site=' + encodeURIComponent(info.link);
    location.href = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + query;
  });

  /*
   * @Author: backtonature 
   * @Date: 2018-05-24 14:23:11 
   * @Last Modified by: backtonature
   * @Last Modified time: 2018-06-01 15:05:39
   */

  var sinaShare = (function (info) {
    if (util.ua.isFromQQBrower) {
      // qq浏览器
      ui.hideMask();
      qqBrowserShare('sina', info);
      return;
    }

    var query = 'url=' + encodeURIComponent(info.link) + '&title=' + encodeURIComponent(info.desc) + '&desc=' + encodeURIComponent(info.desc) + '&pic=' + encodeURIComponent(info.imgUrl);
    location.href = 'http://service.weibo.com/share/share.php?' + query;
    // 都不是则弹层二维码提示分享
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /*
   * @Author: backToNature 
   * @Date: 2018-05-22 17:23:35 
   * @Last Modified by: backToNature
   * @Last Modified time: 2018-06-01 15:00:51
   */

  var shareFuncMap = {
    wx: wxShare,
    wxline: wxlineShare,
    qq: qqShare,
    qzone: qzoneShare,
    sina: sinaShare
  };

  var typesMap = ['wx', 'wxline', 'qq', 'qzone', 'sina'];

  var getDefaultConfig = function getDefaultConfig(config) {
    config = config || {};
    var infoMapType = _typeof(config.infoMap);
    return {
      title: config && config.title || document.title,
      desc: config && config.desc || document.querySelector('meta[name$="cription"]') && document.querySelector('meta[name$="cription"]').getAttribute('content') || '',
      link: encodeURI(config && config.link || window.location.href),
      imgUrl: config && config.imgUrl || document.querySelector('img') && document.querySelector('img').getAttribute('src') || '',
      types: config && Array.isArray(config.types) && config.types || ['wx', 'wxline', 'qq', 'qzone', 'sina'],
      wx: config && config.wx || null,
      fnDoShare: config.fnDoShare,
      infoMap: infoMapType === 'function' || infoMapType === 'object' && !!config.infoMap ? config.infoMap : {}
    };
  };

  var index = {
    wxConfig: function wxConfig(config) {
      var _config = getDefaultConfig(config);
      if (util.ua.isFromWx && _config.wx && _config.wx.appId && _config.wx.timestamp && _config.wx.nonceStr && _config.wx.signature) {
        setWxShareInfo(typesMap, _config);
      }
    },
    showShareBtn: function showShareBtn(show) {
      if (util.ua.isFromYuedong) {
        if (show) {
          yd.ydShowShareBtn();
        } else {
          yd.ydHideShareBtn();
        }
      }
    },
    init: function init(config) {
      var _config = getDefaultConfig(config);
      _init(_config);
      var domList = document.querySelectorAll('.m-share');
      // 初始化
      for (var i = 0; i < domList.length; i++) {
        var item = domList[i];
        this.render(item, _config);
      }
    },

    // 渲染
    render: function render(dom, config) {
      var _this = this;

      var _config = getDefaultConfig(config);
      _init(_config);
      var getTmpl = function getTmpl(type) {
        if (typesMap.indexOf(type) >= 0) {
          return '<i class="m-share-' + type + ' m-share-iconfont m-share-iconfont-' + type + '"></i>';
        }
        return '';
      };
      var tmp = '';
      _config.types.forEach(function (item) {
        tmp += getTmpl(item);
      });
      if (typeof dom === 'string') {
        dom = document.querySelector(dom);
      }
      if (!dom) {
        return;
      }
      dom.innerHTML = tmp;
      dom.addEventListener('click', function (e) {
        var target = e.target;
        typesMap.forEach(function (item) {
          if (target.classList.contains('m-share-' + item)) {
            var shareData = {
              title: _config.infoMap && _config.infoMap[item] && _config.infoMap[item].title || _config.title,
              desc: _config.infoMap && _config.infoMap[item] && _config.infoMap[item].desc || _config.desc,
              link: _config.infoMap && _config.infoMap[item] && _config.infoMap[item].link || _config.link,
              imgUrl: _config.infoMap && _config.infoMap[item] && _config.infoMap[item].imgUrl || _config.imgUrl,
              fnDoShare: _config.fnDoShare
            };
            _this.to(item, shareData);
          }
        });
      });
    },

    // 执行分享逻辑
    to: function to(type, config) {
      var _config = getDefaultConfig(config);
      _init(_config);
      if (typesMap.indexOf(type) >= 0) {
        if (_config.fnDoShare) {
          _config.fnDoShare(type);
        }
        shareFuncMap[type](_config);
      }
    },

    // 弹层分享
    popup: function popup(config) {
      var _this2 = this;

      var _config = getDefaultConfig(config);
      _init(_config);
      var textMap = {
        wx: '微信好友',
        wxline: '朋友圈',
        qq: 'QQ好友',
        qzone: 'QQ空间',
        sina: '微博'
      };
      var dom = document.createElement('div');
      dom.className = 'm-share-flex';
      var tmp = '';
      var getTmpl = function getTmpl(type) {
        if (typesMap.indexOf(type) >= 0) {
          return '<div class="m-share-cell"><i class="m-share-' + type + ' m-share-iconfont m-share-iconfont-' + type + '"></i><div class="m-share-sheet-title">' + textMap[type] + '</div></div>';
        }
        return '';
      };
      _config.types.forEach(function (item) {
        tmp += getTmpl(item);
      });
      dom.innerHTML = tmp;
      dom.addEventListener('click', function (e) {
        var target = e.target;
        typesMap.forEach(function (item) {
          if (target.classList.contains('m-share-' + item)) {
            ui.hideActionSheet();
            var shareData = {
              title: _config.infoMap && _config.infoMap[item] && _config.infoMap[item].title || _config.title,
              desc: _config.infoMap && _config.infoMap[item] && _config.infoMap[item].desc || _config.desc,
              link: _config.infoMap && _config.infoMap[item] && _config.infoMap[item].link || _config.link,
              imgUrl: _config.infoMap && _config.infoMap[item] && _config.infoMap[item].imgUrl || _config.imgUrl,
              fnDoShare: _config.fnDoShare
            };
            _this2.to(item, shareData);
          }
        });
      });
      ui.showActionSheet(dom);
    }
  };

  return index;

})));
