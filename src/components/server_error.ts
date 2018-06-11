import m from "mithril";

import "styles/app";
import "styles/icons";

import bg from "images/bg-2.jpg";

export default {
  view(vnode) {
    return m("sf-root", [
      m(".wrapper-page.account-page-full",
      [
        m(".card",
          m(".card-block",
            m(".account-box",
              m(".card-box.p-5",
                [
                  m("h2.text-uppercase.text-center.pb-4",
                    m("a.text-success[href='index.html']",
                      m("span",
                        m("img[alt=''][height='26'][src='assets/images/logo.png']")
                      )
                    )
                  ),
                  m(".text-center",
                    [
                      m("h1.text-error",
                        "500"
                      ),
                      m("h4.text-uppercase.text-danger.mt-3",
                        "Internal Server Error"
                      ),
                      m("p.text-muted.mt-3",
                        [
                          "Why not try refreshing your page? or you can contact",
                          m("a.text-dark[href='']",
                            m("b",
                              "Support"
                            )
                          )
                        ]
                      ),
                      m("a.btn.btn-md.btn-block.btn-custom.waves-effect.waves-light.mt-3[href='index.html']",
                        "Return Home"
                      )
                    ]
                  )
                ]
              )
            )
          )
        ),
        m(".m-t-40.text-center", m("p.account-copyright", "2018 © SmartFunding"))
      ]
    )
    ]);
  }
} as m.Component;