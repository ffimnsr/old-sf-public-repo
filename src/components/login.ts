import m, { Vnode } from "mithril";
import Swal from "sweetalert2";
import { AppSettings } from "../configs";
// import { Utils } from "../utils";

import bg1 from "images/bg-1.jpg";
import bg2 from "images/bg-1.jpg";

import logo from "images/sf-logo.png";

const Store = {
    email: "",
    password: "",

    canSave: function() {
        return this.email !== "" &&
            this.password !== "";
    },
    save: function() {
        const account = {
            user: {
                email: this.email,
                password: this.password,
            }
        };

        localStorage.removeItem("status");

        m.request(AppSettings.API_BASE_URL + "/api/session/login", {
            method: "POST",
            data: account,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
            }
        }).then(function(res: any) {
            if (res.success && res.user.token) {
                console.log(res.user);
                localStorage.setItem("email", res.user.email);
                localStorage.setItem("token", res.user.token);
                localStorage.setItem("status", res.user.status);
                m.route.set("/");
            } else {
                Swal({
                    title: "Error Occurred!",
                    type: "error",
                    text: res.message,
                });
            }
        }).catch(function(err) {
            Swal({
                title: "Error Occurred!",
                type: "error",
                text: err,
            });
        });
    }
};

let background = bg1;

export default {
    oninit(_vnode: Vnode) {
        let bgs = [bg1, bg2];
        background = bgs[Math.random() * bgs.length | 0];
    },
    view(_vnode: Vnode) {
        return m(".sf-root", [
            m(".accountbg", {
                style: {
                    "background": `url(${background})`,
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
                                        m("span", m("img[alt=''][height='26']", { src: logo }))
                                    )
                                ),
                                m("form[method='post']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m(".form-group.m-b-20.row",
                                            m(".col-12", [
                                                m("label[for='emailaddress']", "Email address"),
                                                m("input.form-control[id='emailaddress'][placeholder='Enter your email'][required=''][type='email']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.email = v }),
                                                    value: Store.email
                                                })
                                            ])
                                        ),
                                        m(".form-group.row.m-b-20",
                                            m(".col-12", [
                                                m("a.text-muted.pull-right[href='/recover-password']", { oncreate: m.route.link },
                                                    m("small", "Forgot your password?")
                                                ),
                                                m("label[for='password']", "Password"),
                                                m("input.form-control[id='password'][placeholder='Enter your password'][required=''][type='password']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.password = v }),
                                                    value: Store.password
                                                })
                                            ])
                                        ),
                                        m(".form-group.row.m-b-20",
                                            m(".col-12",
                                                m(".checkbox.checkbox-custom", [
                                                    m("input[checked=''][id='remember'][type='checkbox']"),
                                                    m("label[for='remember']", "Remember me")
                                                ])
                                            )
                                        ),
                                        m(".form-group.row.text-center.m-t-10",
                                            m(".col-12",
                                                m("button.btn.btn-block.btn-custom[type='submit']", {
                                                    disabled: !Store.canSave()
                                                }, "Sign In")
                                            )
                                        )
                                    ]),
                                m(".row.m-t-50",
                                    m(".col-sm-12.text-center",
                                        m("p.text-muted", [
                                            "Don't have an account? ",
                                            m("a.text-dark.m-l-5[href='/register']", { oncreate: m.route.link }, m("b", "Sign Up"))
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
            ]),
            m("div#snackbar"),
        ]);
    }
} as m.Component;
