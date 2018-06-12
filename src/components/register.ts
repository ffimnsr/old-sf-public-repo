import m from "mithril";

import "styles/app";
import "styles/icons";

import bg from "images/bg-2.jpg";
import logo from "images/sf-logo.png";

export default {
  view(vnode) {
    return m("sf-root", [
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
                  m("a.text-success[href='/#!/']",
                    m("span", m("img[alt='logo'][height='26']", { src: logo }))
                  )
                ),
                m("form.form-horizontal[action='javascript:;']", [
                  m(".form-group.row.m-b-20",
                    m(".col-12", [
                      m("label[for='username']", "Full Name"),
                      m("input.form-control[id='username'][placeholder='e.g. Jose Rizal'][required][type='text']")
                    ])
                  ),
                  m(".form-group.row.m-b-20",
                    m(".col-12", [
                      m("label[for='email']", "Email address"),
                      m("input.form-control[id='email'][placeholder='e.g. jose@rizal.com'][required][type='email']")
                    ])
                  ),
                  m(".form-group.row.m-b-20",
                    m(".col-12", [
                      m("label[for='password']", "Password"),
                      m("input.form-control[id='password'][placeholder='Enter your password'][required][type='password']")
                    ])
                  ),
                  m(".form-group.row.m-b-20",
                    m(".col-12",
                      m(".checkbox.checkbox-custom", [
                        m("input[checked=''][id='remember'][type='checkbox']"),
                        m("label[for='remember']", [
                          "I accept ",
                          m("a.text-custom[href='/#!/terms-and-conditions']", "Terms and Conditions")
                        ])
                      ])
                    )
                  ),
                  m(".form-group.row.text-center.m-t-10",
                    m(".col-12",
                      m("button.btn.btn-block.btn-custom.waves-effect.waves-light[type='submit']", "Sign Up Free")
                    )
                  )
                ]),
                m(".row.m-t-50",
                  m(".col-sm-12.text-center",
                    m("p.text-muted", [
                      "Already have an account? ",
                      m("a.text-dark.m-l-5[href='/#!/login']", m("b", "Sign In"))
                    ])
                  )
                )
              ])
            )
          )
        ),
        m(".m-t-40.text-center", m("p.account-copyright", "2018 © Smartfunding"))
      ])
    ]);
  }
} as m.Component;
