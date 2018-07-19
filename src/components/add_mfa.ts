import m, { Vnode } from "mithril";
import QRCode from "qrcode";
import $ from "jquery";
import AWS from "aws-sdk";

import header from "widgets/header";
import footer from "widgets/footer";

import { AppSettings } from "configs";
import avatar from "images/users/avatar-2.jpg";

const MFADetails = {
  secretKey: "",
  otpUrl: "",
  otpImage: "",

  tokenInput: "",

  reload: function() {
    const vm = this;
    const token = localStorage.getItem("token")!;

    // TODO: save status to mongoose
    m.request(AppSettings.API_BASE_URL + "/api/user/generate-mfa", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Token ${token}`,
      }
    }).then(function(res: any) {
      if (res.success) {
        vm.secretKey = res.secretKey;
        vm.otpUrl = res.otpUrl;

        console.log(vm.otpUrl);

        QRCode.toDataURL(vm.otpUrl, {
          errorCorrectionLevel: "H",
          version: 12,
        }, function(err, url) {
          vm.otpImage = url;
          m.redraw();
        });
      } else {
        // TODO: add feedback so user would know he's been denied
        console.error("error", res);
        m.route.set("/server-error");
      }
    }).catch(function(err) {
      console.error("error", err);
      m.route.set("/server-error");
    });
  },
  load: function() {

  },
  canSave: function() {
    return this.secretKey !== "";
  },
  save: function() {
    const data = {
      user: {
        status: "step6",
        secretKey: this.secretKey,
      }
    };

    const token = localStorage.getItem("token")!;

    // TODO: save status to mongoose
    m.request(AppSettings.API_BASE_URL + "/api/user/validate-mfa", {
      method: "PUT",
      data: data,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Token ${token}`,
      }
    }).then(function(res: any) {
      if (res.success) {
        localStorage.setItem("status", "okay");
        m.route.set("/");
      } else {
        // TODO: add feedback so user would know he's been denied
        console.error("error", res);
        m.route.set("/server-error");
      }
    }).catch(function(err) {
      console.error("error", err);
      m.route.set("/server-error");
    });
  }
};

export default {
  oninit(vnode: Vnode) {
    MFADetails.load();
  },
  oncreate(vnode: Vnode) {

  },
  view(vnode: Vnode) {
    return m(".sf-root", [
      m(header),
      m(".wrapper",
        m(".container-fluid", [
          m(".row",
            m(".col-sm-12",
              m(".page-title-box", [
                m(".btn-group.pull-right",
                  m("ol.breadcrumb.hide-phone.p-0.m-0", [
                    m("li.breadcrumb-item",
                      m("a[href='/']", { oncreate: m.route.link }, "SmartFunding")
                    ),
                    m("li.breadcrumb-item.active", "Additional Security Settings")
                  ])
                ),
                m("h4.page-title", "Additional Security Settings")
              ])
            )
          ),
          m(".row",
            m(".col-12",
              m(".card-box", [
                m("h4.header-title.m-t-0", "Multi-factor Authentication"),
                m("div.row", [
                  m("div.col-md-6", [
                    m("p", "To enable additional security multi-factor authentication:"),
                    m("ol", [
                      m("li", "Download and install a multi-factor authentication app (e.g. Google Authenticator, Microsoft Authenticator, YaKey, Auth0, etc.)."),
                      m("li", "Open and scan the qrcode that you see on the right side."),
                      m("li", "Then, enter the 6 digit code generated on the input box."),
                    ]),
                  ]),
                  m("div.col-md-6", [
                    m("img.mx-auto.d-block[alt='mfa-key']", { src: MFADetails.otpImage }),
                    m(".clearfix.text-center.mt-3", [
                      m("button.btn.btn-custom.waves-effect.waves-light[type='button']", {
                        onclick: MFADetails.reload,
                      }, "Generate 2-Factor Authentication Key")
                    ]),
                    m("div.form-group.col-md-12.mt-4", [
                      m("label.col-form-label", "Enter 6 digit token"),
                      m("input.form-control[type='text'][placeholder='Token']", {
                        onclick: m.withAttr("value", (v: string) => { MFADetails.tokenInput = v }),
                        value: MFADetails.tokenInput
                      })
                    ]),
                  ]),
                ]),
                m(".col-md-12.clearfix.text-right.mt-3", [
                  m("button.btn.btn-custom.waves-effect.waves-light.mr-2[type='button']", {
                    onclick: MFADetails.save,
                  }, "Skip"),
                  m("button.btn.btn-custom.waves-effect.waves-light[type='button']", {
                    onclick: MFADetails.save,
                  }, "Submit")
                ])
              ])
            )
          )
        ])
      ),
      m(footer),
      m("div#snackbar"),
    ]);
  }
} as m.Component;