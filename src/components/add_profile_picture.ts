import { AppSettings } from "../configs";
import m, { Vnode } from "mithril";
import footer from "../widgets/footer";
import header from "../widgets/header";

const Store = {
    image: "",

    load: function() {

    },
    canSave: function() {
        return this.image != "";
    },
    save: function() {
        const data = {
            user: {
                status: "step5",
                image: this.image,
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/type", {
            method: "PUT",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
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
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {

    },
    view(_vnode: Vnode) {
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
                                        m("li.breadcrumb-item.active", "Profile Picture")
                                    ])
                                ),
                                m("h4.page-title", "Profile Picture")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "Profile Picture"),
                                m("p.text-muted.font-14.m-b-10", "Personalise Now Your Profile."),
                                m("form[role='form']", [
                                    m("div.form-row", [
                                        m("div.form-group.col-md-6", [
                                            m("label.col-form-label", "Profile Picture"),
                                            m("input.form-control[type='file']")
                                        ]),
                                    ]),
                                    m(".clearfix.text-right.mt-3",
                                        m("button.btn.btn-custom[type='submit']", {
                                            onclick: () => {
                                                localStorage.setItem("status", "step5");
                                                m.route.set("/");
                                            }
                                        }, "Submit")
                                    )
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
