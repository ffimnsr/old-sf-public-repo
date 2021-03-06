import logo from "images/sf-logo.png";
import avatar from "images/users/avatar-1.png";
import jwtDecode from "jwt-decode";
import m, { Vnode } from "mithril";
import { Auth } from "../auth";

const Store = {
    getEmail() {
        let email = localStorage.getItem("email")!;
        return email;
    },
    getUsername(): string {
        let token = localStorage.getItem("token")!;
        let data = jwtDecode<any>(token);
        return data.username;
    }
};

export default {
    oninit(_vnode: Vnode) {
        $('.navbar-toggle')
            .on('click', function(_e: Event) {
                $(this).toggleClass('open');
                $('#navigation').slideToggle(400);
            });

        $('.navigation-menu>li').slice(-2).addClass('last-elements');

        $('.navigation-menu li.has-submenu a[href="javascript:;"]')
            .on('click', function(e: Event) {
                if ($(window).width()! < 992) {
                    e.preventDefault();
                    $(this).parent('li').toggleClass('open')
                        .find('.submenu:first').toggleClass('open');
                }
            });
    },
    view(_vnode: Vnode) {
        return m("header[id='topnav']", [
            m(".topbar-main",
                m(".container-fluid", [
                    m(".logo",
                        m("a.logo[href='/']", { oncreate: m.route.link }, [
                            m("img.logo-large[alt=''][height='22']", { src: logo })
                        ])
                    ),
                    m(".menu-extras.topbar-custom",
                        m("ul.list-unstyled.topbar-right-menu.float-right.mb-0", [
                            m("li.menu-item",
                                m("a.navbar-toggle.nav-link",
                                    m(".lines", [m("span"), m("span"), m("span")])
                                )
                            ),
                            m("li.dropdown.notification-list", [
                                m("a.nav-link.dropdown-toggle.arrow-none[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='javascript:;'][role='button']", [
                                    m("i.fi-bell.noti-icon"),
                                ]),
                                m(".dropdown-menu.dropdown-menu-right.dropdown-lg", [
                                    m(".dropdown-item.noti-title",
                                        m("h6.m-0", [
                                            m("span.float-right",
                                                m("a.text-dark[href='']",
                                                    m("small", "Clear All")
                                                )
                                            ),
                                            "Notification"
                                        ])
                                    ),
                                    m("a.dropdown-item.text-center.text-primary.notify-item.notify-all[href='javascript:;']", [
                                        "View all",
                                        m("i.fi-arrow-right")
                                    ])
                                ])
                            ]),

                            m("li.dropdown.notification-list", [
                                m("a.nav-link.dropdown-toggle.nav-user[aria-expanded='false'][aria-haspopup='false'][data-toggle='dropdown'][href='javascript:;'][role='button']", [
                                    m("img.rounded-circle[alt='user']", { src: avatar }),
                                    m("span.ml-1.pro-user-name", [
                                        "  ",
                                        Store.getUsername(),
                                        m("i.mdi.mdi-chevron-down")
                                    ])
                                ]),

                                m(".dropdown-menu.dropdown-menu-right.profile-dropdown.", [
                                    m(".dropdown-item.noti-title",
                                        m("h6.text-overflow.m-0", `Welcome ${Store.getUsername()}!`)
                                    ),
                                    !Auth.checkIsRoleAdmin() && Auth.checkIsAccountOkay() ? m("a.dropdown-item.notify-item[href='/profile']", { oncreate: m.route.link }, [
                                        m("i.fi-head"),
                                        m("span", "My Account")
                                    ]) : null,
                                    Auth.checkIsAccountOkay() ? m("a.dropdown-item.notify-item[href='/settings']", { oncreate: m.route.link }, [
                                        m("i.fi-cog"),
                                        m("span", "Change Password")
                                    ]) : null,
                                    !Auth.checkIsRoleAdmin() && Auth.checkIsAccountOkay() ? m("a.dropdown-item.notify-item[href='/frequently-ask']", { oncreate: m.route.link }, [
                                        m("i.fi-help"),
                                        m("span", "Support")
                                    ]) : null,
                                    m("a.dropdown-item.notify-item[href='/lock-screen']", { oncreate: m.route.link }, [
                                        m("i.fi-lock"),
                                        m("span", "Lock Screen")
                                    ]),
                                    m("a.dropdown-item.notify-item[href='/logout']", { oncreate: m.route.link }, [
                                        m("i.fi-power"),
                                        m("span", "Logout")
                                    ])
                                ])
                            ])
                        ])
                    ),
                    m(".clearfix")
                ])
            ),
            m(".navbar-custom",
                m(".container-fluid",
                    m("[id='navigation']",
                        m("ul.navigation-menu", [
                            m("li.has-submenu",
                                m("a[href='/']", { oncreate: m.route.link }, [
                                    Auth.checkIsAccountOkay() ? "Dashboard" : "Account Setup",
                                ])
                            ),

                            !Auth.checkIsRoleAdmin() && Auth.checkIsAccountOkay() ? m("li.has-submenu",
                                m("a[href='/my-wallet']", { oncreate: m.route.link }, [
                                    "My Wallet"
                                ])
                            ) : null,

                            !Auth.checkIsRoleAdmin() && Auth.checkIsAccountOkay() ? m("li.has-submenu",
                                m("a[href='/portfolio']", { oncreate: m.route.link }, [
                                    "Portfolio"
                                ])
                            ) : null,

                            !Auth.checkIsRoleAdmin() && Auth.checkIsAccountOkay() ? m("li.has-submenu",
                                m("a[href='/deals']", { oncreate: m.route.link }, [
                                    "Deals"
                                ])
                            ) : null,


                            !Auth.checkIsRoleAdmin() && Auth.checkIsAccountOkay() ? m("li.has-submenu",
                                m("a[href='/top-up']", { oncreate: m.route.link }, [
                                    "Top-up"
                                ])
                            ) : null,

                            Auth.checkIsRoleAdmin() ? m("li.has-submenu", [
                                m("a[href='javascript:;']", [
                                    "Investors"
                                ]),
                                m("ul.submenu", [
                                    m("li", m("a[href='/admin/investors/new']", { oncreate: m.route.link }, "New")),
                                    m("li", m("a[href='/admin/investors/pending']", { oncreate: m.route.link }, "Pending")),
                                    m("li", m("a[href='/admin/investors/active']", { oncreate: m.route.link }, "Active")),
                                    m("li", m("a[href='/admin/investors/locked']", { oncreate: m.route.link }, "Locked")),
                                    m("li", m("a[href='/admin/investors/rejected']", { oncreate: m.route.link }, "Rejected")),
                                ])
                            ]) : null,

                            Auth.checkIsRoleAdmin() ? m("li.has-submenu", [
                                m("a[href='javascript:;']", [
                                    "Borrowers"
                                ]),
                                m("ul.submenu", [
                                    m("li", m("a[href='/admin/borrowers/new']", { oncreate: m.route.link }, "New")),
                                    m("li", m("a[href='/admin/borrowers/pending']", { oncreate: m.route.link }, "Pending")),
                                    m("li", m("a[href='/admin/borrowers/active']", { oncreate: m.route.link }, "Active")),
                                    m("li", m("a[href='/admin/borrowers/locked']", { oncreate: m.route.link }, "Locked")),
                                    m("li", m("a[href='/admin/borrowers/rejected']", { oncreate: m.route.link }, "Rejected")),
                                    m("li", m("a[href='/admin/debtors']", { oncreate: m.route.link }, "Debtor List")),
                                ])
                            ]) : null,

                            Auth.checkIsRoleAdmin() ? m("li.has-submenu", [
                                m("a[href='javascript:;']", [
                                    "Investments & Collections"
                                ]),
                                m("ul.submenu", [
                                    m("li", m("a[href='/admin/investments']", { oncreate: m.route.link }, "Investments")),
                                    m("li", m("a[href='/admin/loans']", { oncreate: m.route.link }, "Loans")),
                                    m("li", m("a[href='/admin/collections']", { oncreate: m.route.link }, "Collections")),
                                ])
                            ]) : null,

                            Auth.checkIsRoleAdmin() ? m("li.has-submenu", [
                                m("a[href='javascript:;']", [
                                    "Inquiries"
                                ]),
                                m("ul.submenu", [
                                    m("li", m("a[href='/admin/inquiries/new']", { oncreate: m.route.link }, "New")),
                                    m("li", m("a[href='/admin/inquiries/closed']", { oncreate: m.route.link }, "Closed")),
                                ])
                            ]) : null,

                            Auth.checkIsRoleAdmin() ? m("li.has-submenu", [
                                m("a[href='javascript:;']", [
                                    "Control Panel"
                                ]),
                                m("ul.submenu", [
                                    m("li", m("a[href='/admin/power-users']", { oncreate: m.route.link }, "Power Users")),
                                    m("li", m("a[href='/admin/view-log']", { oncreate: m.route.link }, "View Log")),
                                    m("li", m("a[href='/admin/wallet-configurations']", { oncreate: m.route.link }, "Wallet Configurations")),
                                    m("li", m("a[href='/admin/view-loan-purpose-list']", { oncreate: m.route.link }, "Loan Purpose List")),
                                    m("li", m("a[href='/admin/view-country-list']", { oncreate: m.route.link }, "Country List")),
                                    m("li", m("a[href='/admin/view-company-revenue-list']", { oncreate: m.route.link }, "Company Revenue Option List")),
                                    m("li", m("a[href='/admin/view-credit-rate-list']", { oncreate: m.route.link }, "Credit Rate Option List")),
                                    m("li", m("a[href='/admin/view-frequently-ask-questions']", { oncreate: m.route.link }, "Frequently Ask Questions")),
                                ])
                            ]) : null,
                        ])
                    )
                )
            )
        ])
    }
} as m.Component;
