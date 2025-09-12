const anyidAdaptor = function (_cfg) {
  const router = useRouter(); // 반드시 setup 안에서!

  class AnyidAdaptor {
    constructor(cfg) {
      this.mt = !cfg.mt ? '' : cfg.mt;
      this.portalJoinUri = !cfg.portalJoinUri ? '' : cfg.portalJoinUri;
      this.certData = !cfg.certData ? '' : cfg.certData;
      this.ssoByPass = !cfg.ssoByPass ? 0 : cfg.ssoByPass;
      this.niRegYn = !cfg.niRegYn ? '' : cfg.niRegYn;
      this.orgAgreeYn = !cfg.orgAgreeYn ? '' : cfg.orgAgreeYn;
      this.agencyContextPath = !cfg.agencyContextPath
        ? ''
        : cfg.agencyContextPath;
    }

    orgLogin() {
      alert('이용기관 자체 로그인!!!');
      //정부 통합인증SDK_연계가이드 4.4.1.3 이용기관 로그인(토글 off) 참조
      //제공되는 라이브러리 메소드로 인증데이터 decrypt 이후 자체 로그인 로직 개발
    }

    JoinConfirm(portalJoinUri, memberData) {
      if (!confirm('Any-ID 사용자등록 하시겠습니까?')) {
        this.orgLogin();
        return;
      } else {
        this.receiveAnyIdJoin(portalJoinUri, memberData);
      }
    }

    success(data) {
      if (this.ssoByPass == 0) {
        this.certData = data;
        this.userCheck();
      } else {
        this.orgLogin();
      }
    }

    userCheck() {
      var target = this;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', this.agencyContextPath + '/oidc/userCheck', true);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.success) {
            target.ssoLogin();
          } else {
            if (response.niRegYn == 'Y') {
              setTimeout(function () {
                target.receiveAnyIdJoin(response.uri, response.data);
              }, 100);
            } else {
              setTimeout(function () {
                target.JoinConfirm(response.uri, response.data);
              }, 100);
            }
          }
        }
      };

      let jsonObject = new Object();
      jsonObject.txId = this.certData.txId;
      jsonObject.ssob = this.certData.ssob;
      jsonObject.userSeCd = this.certData.userSeCd;

      let jsonStr = JSON.stringify(jsonObject);
      let encodedString = btoa(jsonStr);

      var data = 'data=' + encodedString + '&txId=' + this.certData.txId;
      xhr.send(data);
    }

    receiveAnyIdJoin(portalJoinUri, memberData) {
      var url = portalJoinUri + encodeURIComponent(memberData);
      this.popup(url, 'openAnyIdRegistUserIdv', 700, 740);

      window.addEventListener(
        'message',
        function (event) {
          var result;
          try {
            result = JSON.parse(event.data);
          } catch (error) {
            console.error('Received message is not valid JSON:', error);
            return;
          }

          if (
            !result.funcName ||
            (result.funcName !== 'trmsAgreComplete' &&
              result.funcName !== 'registUserComplete')
          ) {
            return;
          }

          if (result.status === 'success') {
            if (result.trmsAgreYn == 'Y') {
              if (this.mt && this.mt !== 'null') {
                var baseUrl =
                  window.location.origin +
                  this.agencyContextPath +
                  '/oidc/auth?mt=' +
                  this.mt;
                window.location.href = baseUrl;
              } else {
                this.ssoLogin();
              }
            } else {
              this.orgLogin();
            }
          } else {
            this.orgLogin();
          }
        },
        false
      );
    }

    popup(url, name, width, height) {
      let left = screen.width ? (screen.width - width) / 2 : 0;
      let top = screen.height ? (screen.height - height) / 2 : 0;
      let popup = window.open(
        url,
        name,
        'resizable=yes,toolbar=no,scrollbars=yes,location=no,top=' +
          top +
          'px,left=' +
          left +
          'px,width=' +
          width +
          'px,height=' +
          height +
          'px'
      );
      if (popup) {
        popup.focus();
      }
    }

    ssoLogin() {
      let jsonObject = new Object();
      jsonObject.txId = this.certData.txId;
      jsonObject.ssob = this.certData.ssob;
      jsonObject.userSeCd = this.certData.userSeCd;
      let jsonStr = JSON.stringify(jsonObject);
      let encodedString = btoa(jsonStr);
      var baseUrl =
        window.location.origin + this.agencyContextPath + '/oidc/ssoLogin';
      var urlWithParams = baseUrl + '?data=' + encodedString;
      window.location.href = urlWithParams;
    }

    ssoLoginPageSub(baseUrl, endPoint, acrValues) {
      var subUrl = '';

      if (endPoint && endPoint.trim() !== '') {
        subUrl = '?endPoint=' + encodeURIComponent(endPoint);
      }

      if (
        typeof acrValues === 'string' &&
        !acrValues &&
        acrValues.trim() === ''
      ) {
        acrValues = '3';
      }

      if (acrValues) {
        if (subUrl === '') {
          subUrl = '?';
        } else {
          subUrl = subUrl + '&';
        }
        subUrl = subUrl + 'acrValues=' + acrValues;
      }

      window.location.replace(baseUrl + subUrl);
    }

    /*ssoLogout*/
    ssoLogout(endPoint) {
      endPoint =
        typeof endPoint !== 'undefined'
          ? this.agencyContextPath + endPoint
          : this.agencyContextPath;
      var baseUrl =
        window.location.origin + this.agencyContextPath + '/oidc/ssoLogout';
      baseUrl = baseUrl + '?endPoint=' + encodeURIComponent(endPoint);
      window.location.replace(baseUrl);
    }

    /*reAuthLevel*/
    reAuthLevel(endPoint, acrValues) {
      endPoint =
        typeof endPoint !== 'undefined'
          ? this.agencyContextPath + endPoint
          : this.agencyContextPath;
      var baseUrl =
        window.location.origin + this.agencyContextPath + '/oidc/reAuthLevel';
      this.ssoLoginPageSub(baseUrl, endPoint, acrValues);
    }

    /*ssoLoginPage*/
    ssoLoginPage(endPoint, acrValues) {
      endPoint =
        typeof endPoint !== 'undefined'
          ? this.agencyContextPath + endPoint
          : this.agencyContextPath;
      var baseUrl =
        window.location.origin + this.agencyContextPath + '/oidc/auth';
      this.ssoLoginPageSub(baseUrl, endPoint, acrValues);
    }
  }

  return new AnyidAdaptor(_cfg);
  //return (_inst = new AnyidAdaptor(_cfg));
};

export { anyidAdaptor };
