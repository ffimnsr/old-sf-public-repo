import m, { Vnode } from "mithril";

import "styles/app";
import "styles/icons";

import bg from "images/bg-2.jpg";
import logo from "images/sf-logo.png";
import avatar from "images/users/avatar-5.jpg";

const Store = {
    email: "",
    password: "",

    getEmail() {
        const email = localStorage.getItem("email")!;
        if (!email) {
            m.route.set("/server-error");
        }
        Store.email = email;
    },
    canSave: function() {

    },
    save: function() {

    }
};

export default {
    oninit(_vnode: Vnode) {
        // Remove only the token and retain email so user don't need
        // to re-input it.
        localStorage.removeItem("token");
        Store.getEmail();
    },
    view(_vnode: Vnode) {
        return m(".sf-root", [
            m(".accountbg", {
                style: {
                    "background": `url(${bg})`,
                    "background-size": "cover"
                }
            }),
            m(".wrapper-page.account-page-full", [
                m(".card",
                    m(".card-block",
                        m(".account-box",
                            m(".card-box.p-5", [
                                m("h2.text-uppercase.text-center.pb-4",
                                    m("a.text-success[href='/']", { oncreate: m.route.link },
                                        m("span",
                                            m("img[alt=''][height='26']", { src: logo })
                                        )
                                    )
                                ),
                                m(".text-center", [
                                    m(".mb-3",
                                        m("img.rounded-circle.img-thumbnail.thumb-lg[alt='thumbnail']", { src: avatar })
                                    ),
                                    m("p.text-muted.m-b-0.font-14", "Enter your password to access your account.")
                                ]),
                                m("form.form-horizontal", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m(".form-group.row",
                                            m(".col-12", [
                                                m("label[for='password']", "Password"),
                                                m("input.form-control[id='password'][placeholder='Enter your password'][required][type='password']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.password = v }),
                                                    value: Store.password
                                                })
                                            ])
                                        ),
                                        m(".form-group.row.text-center",
                                            m(".col-12",
                                                m("button.btn.btn-block.btn-custom[type='submit']", {
                                                    disabled: !Store.canSave()
                                                }, "Log In")
                                            )
                                        )
                                    ]),
                                m(".row.m-t-50",
                                    m(".col-sm-12.text-center",
                                        m("p.text-muted", [
                                            "Not you? return",
                                            m("a.text-dark.ml-2[href='/login']", { oncreate: m.route.link }, m("b", "Sign In"))
                                        ])
                                    )
                                )
                            ])
                        )
                    )
                ),
                m(".m-t-40.text-center",
                    m("p.account-copyright.text-muted", [
                        "2018 © SmartFunding | ",
                        m("a.text-muted[href='/privacy']", { oncreate: m.route.link }, "Privacy Policy")
                    ])
                )
            ])
        ]);
    }
} as m.Component;
