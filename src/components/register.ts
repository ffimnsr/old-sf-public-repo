import { AppSettings } from "../configs";
import bg from "images/bg-1.jpg";
import logo from "images/sf-logo.png";
import m, { Vnode } from "mithril";
import Swal from "sweetalert2";
// import { Utils } from "../utils";


const Store = {
    username: "",
    email: "",
    password: "",

    canSave: function() {
        return this.username !== "" &&
            this.email !== "" &&
            this.password !== "";
    },
    save: function() {
        const account = {
            user: {
                username: this.username,
                email: this.email,
                password: this.password,
            }
        };

        const vm = this;
        m.request(AppSettings.API_BASE_URL + "/api/session/register", {
            method: "POST",
            data: account,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(function(res: any) {
                if (res.success) {
                    sessionStorage.setItem("verify_email", vm.email);
                    m.route.set("/confirm-mail/register");
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
    },
};

export default {
    view(_vnode: Vnode) {
        return m(".sf-root", [
            m(".accountbg", {
                style: {
                    "background-image": `url(${bg})`,
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
                                        m("span", m("img[alt='logo'][height='26']", { src: logo }))
                                    )
                                ),
                                m("form.form-horizontal[method='post']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m(".form-group.row.m-b-20",
                                            m(".col-12", [
                                                m("label[for='username']", "Username"),
                                                m("input.form-control[id='username'][placeholder='e.g. jrizal'][required][type='text']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.username = v }),
                                                    value: Store.username
                                                })
                                            ])
                                        ),
                                        m(".form-group.row.m-b-20",
                                            m(".col-12", [
                                                m("label[for='email']", "Email address"),
                                                m("input.form-control[id='email'][placeholder='e.g. jose@smartfunding.io'][required][type='email']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.email = v }),
                                                    value: Store.email
                                                })
                                            ])
                                        ),
                                        m(".form-group.row.m-b-20",
                                            m(".col-12", [
                                                m("label[for='password']", "Password"),
                                                m("input.form-control[id='password'][placeholder='Enter your password'][required][type='password']", {
                                                    oninput: m.withAttr("value", (v: string) => { Store.password = v }),
                                                    value: Store.password
                                                })
                                            ])
                                        ),
                                        m(".form-group.row.m-b-20",
                                            m(".col-12",
                                                m(".checkbox.checkbox-custom", [
                                                    m("input[checked][id='remember'][type='checkbox'][required]"),
                                                    m("label[for='remember']", [
                                                        "I accept ",
                                                        m("a.text-custom[href='/terms-and-conditions']", { oncreate: m.route.link }, "Terms and Conditions")
                                                    ])
                                                ])
                                            )
                                        ),
                                        m(".form-group.row.text-center.m-t-10",
                                            m(".col-12",
                                                m("button.btn.btn-block.btn-custom[type='submit']", {
                                                    disabled: !Store.canSave()
                                                }, "Sign Up Free")
                                            )
                                        )
                                    ]),
                                m(".row.m-t-50",
                                    m(".col-sm-12.text-center",
                                        m("p.text-muted", [
                                            "Already have an account? ",
                                            m("a.text-dark.m-l-5[href='/login']", { oncreate: m.route.link }, m("b", "Sign In"))
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
