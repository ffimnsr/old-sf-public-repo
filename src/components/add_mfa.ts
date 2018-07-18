import m, { Vnode } from "mithril";
import $ from "jquery";
import AWS from "aws-sdk";

import header from "widgets/header";
import footer from "widgets/footer";

import { AppSettings } from "configs";
import avatar from "images/users/avatar-2.jpg";

const MFADetails = {
  secretKey: "",
  otpUrl: "",

  tokenInput: "",

  reload: function() {
    const data = {
      user: {
        status: "step6",
      }
    };

    const token = localStorage.getItem("token")!;

    // TODO: save status to mongoose
    m.request(AppSettings.API_BASE_URL + "/api/user/mfa", {
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
    m.request(AppSettings.API_BASE_URL + "/api/user/mfa", {
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
                m("img.mx-auto.d-block[alt='mfa-key']", { src: avatar }),
                m("div.form-group.col-md-6", [
                  m("label.col-form-label", "Annual Salary / Annual Sales of Profit / Value of Inheritance / Value of Gift / Value of Assets"),
                  m("input.form-control[type='text'][placeholder='Details']", {
                    onclick: m.withAttr("value", (v: string) => { MFADetails.tokenInput = v }),
                    value: MFADetails.tokenInput
                  })
                ]),
                m(".clearfix.text-right.mt-3", [
                  m("button.btn.btn-custom.waves-effect.waves-light[type='button']", {
                    onclick: MFADetails.reload,
                  }, "Generate 2-Factor Authentication Key")
                ]),
                m(".clearfix.text-right.mt-3", [
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
