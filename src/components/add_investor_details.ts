import m, { Vnode } from "mithril";
import { AppSettings } from "../configs";
import footer from "../widgets/footer";
import header from "../widgets/header";
import { Utils } from "../utils";

const Store = {
    q: Array(11).fill(0),
    qs: Array(6).fill(""),
    sourceOfWealth: [
        { name: "Employment", code: 0 },
        { name: "Business Income", code: 1 },
        { name: "Inheritance", code: 2 },
        { name: "Gift", code: 3 },
        { name: "Monies from sale of property / Other assets", code: 4 },
        { name: "Others", code: 5 }
    ],
    canSave: function() {
        return this.q.length !== 0 && this.qs.length !== 0;
    },
    save: function() {
        const data = {
            user: {
                status: "step3-1",
                typeset: "investor",
                questionBool: this.q,
                questionString: this.qs,
            }
        };

        const token = localStorage.getItem("token")!;

        m.request(AppSettings.API_BASE_URL + "/api/user/type-i", {
            method: "PUT",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Token ${token}`,
            }
        }).then(function(res: any) {
            if (res.success) {
                localStorage.setItem("status", "step4");
                m.route.set("/");
            } else {
                Utils.showSnackbar(res.message);
            }
        }).catch(function(err) {
            Utils.showSnackbar(err);
        });
    }
};

export default {
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
                                        m("li.breadcrumb-item", m("a[href='/']", { oncreate: m.route.link }, "Account Setup")),
                                        m("li.breadcrumb-item.active", "Investor Details")
                                    ])
                                ),
                                m("h4.page-title", "Investor Details")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box", [
                                m("h4.header-title.m-t-0", "Investor Details"),
                                m("p.text-muted.font-14.m-b-10", "All fields are required to be filled up."),

                                m("form[role='form']", {
                                    onsubmit: (e: Event) => {
                                        e.preventDefault();
                                        Store.save();
                                    }
                                }, [
                                        m("label.col-form-label", "Are you a Politically Exposed Person ('PEP') or a close associate of a PEP?"),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q0'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[0] = v }),
                                                    value: 1,
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q0'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[0] = v }),
                                                    value: 0,
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("label.col-form-label", "Investor is aware of Singapore’s commitment to safeguarding its financial system from being used to harbor or launder tax evasion monies or proceeds from serious tax offences."),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q1'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[1] = v }),
                                                    value: 1
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q1'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[1] = v }),
                                                    value: 0
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("label.col-form-label", "Investor shall be responsible for his/her/its own tax affairs and hereby declare that you have never been convicted of any serious tax crimes, whether in Singapore or elsewhere."),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q2'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[2] = v }),
                                                    value: 1
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q2'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[2] = v }),
                                                    value: 0
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("label.col-form-label", "Monies which Investor shall use in investing on our Platform are from legitimate sources and will not be considered as proceeds of serious tax crimes in Singapore or elsewhere."),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q3'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[3] = v }),
                                                    value: 1
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q3'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[3] = v }),
                                                    value: 0
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("label.col-form-label", "Investor shall be solely responsible for any tax reporting obligation imposed by the any relevant tax authority."),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q4'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[4] = v }),
                                                    value: 1
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q4'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[4] = v }),
                                                    value: 0
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("label.col-form-label", "Investor is not a U.S. person and does not intend to be one."),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q5'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[5] = v }),
                                                    value: 1
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q5'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[5] = v }),
                                                    value: 0
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("label.col-form-label", "Has the Investor at any time pleaded guilty or have been found guilty of a criminal offence, or is currently a subject of any criminal investigation or inquiry in Singapore or elsewhere, in connection with financial transactions or investments of any kind?"),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q6'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[6] = v }),
                                                    value: 1
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q6'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[6] = v }),
                                                    value: 0
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("label.col-form-label", "Has the Investor ever been subject to any inquiry or investigation by any relevant authority in Singapore or elsewhere? (Excluding routine regulatory inquiry or audit)"),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q7'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[7] = v }),
                                                    value: 1
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q7'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[7] = v }),
                                                    value: 0
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("label.col-form-label", "Has the Investor been made subject of a court order in Singapore or elsewhere?"),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q8'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[8] = v }),
                                                    value: 1
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q8'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[8] = v }),
                                                    value: 0
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("label.col-form-label", "Has the Investor been subject to any bankruptcy order or has been served with a bankruptcy petition in Singapore or elsewhere?"),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q9'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[9] = v }),
                                                    value: 1
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q9'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[9] = v }),
                                                    value: 0
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("label.col-form-label", "Is the Investor currently involved in any legal proceedings in Singapore or elsewhere which would affect the investment?"),
                                        m("div.form-group.col-md-6", [
                                            m("div.radio", [
                                                m("input.form-check-input[name='q10'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[10] = v }),
                                                    value: 1
                                                }),
                                                m("label.form-check-label", "Yes")
                                            ]),
                                            m("div.radio", [
                                                m("input.form-check-input[name='q10'][type='radio']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.q[10] = v }),
                                                    value: 0
                                                }),
                                                m("label.form-check-label", "No")
                                            ]),
                                        ]),
                                        m("div.form-row.col-md-12", [
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Primary Tax Residency"),
                                                m("input.form-control[name='qs0'][type='text'][placeholder='Residency (e.g. Singapore)']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.qs[0] = v }),
                                                    value: Store.qs[0]
                                                })
                                            ]),
                                            m("div.form-group.col-md-6", [
                                                m("label.col-form-label", "Other Tax Residency"),
                                                m("input.form-control[name='qs1'][type='text'][placeholder='Residency (e.g. Singapore)']", {
                                                    onclick: m.withAttr("value", (v: string) => { Store.qs[1] = v }),
                                                    value: Store.qs[1]
                                                })
                                            ]),
                                        ]),
                                        m("div.form-group.col-md-6", [
                                            m("label.col-form-label", "Source of Wealth:"),
                                            m("select.form-control", { onchange: m.withAttr("value", (v: string) => { Store.q[10] = v }) },
                                                Store.sourceOfWealth.map((data: any) => { return m("option", { value: data.code }, data.name) }))
                                        ]),
                                        m("div.form-group.col-md-6", [
                                            m("label.col-form-label", "Employer Name / Business Name / Inheritance Lineage / Donor / Desciption of Assets"),
                                            m("input.form-control[name='qs2'][type='text'][placeholder='Details']", {
                                                onclick: m.withAttr("value", (v: string) => { Store.qs[2] = v }),
                                                value: Store.qs[2]
                                            })
                                        ]),
                                        m("div.form-group.col-md-6", [
                                            m("label.col-form-label", "Occupation / Nature of Business / Relationship to donor"),
                                            m("input.form-control[name='qs3'][type='text'][placeholder='Details']", {
                                                onclick: m.withAttr("value", (v: string) => { Store.qs[3] = v }),
                                                value: Store.qs[3]
                                            })
                                        ]),
                                        m("div.form-group.col-md-6", [
                                            m("label.col-form-label", "Annual Salary / Annual Sales of Profit / Value of Inheritance / Value of Gift / Value of Assets"),
                                            m("input.form-control[name='qs4'][type='text'][placeholder='Details']", {
                                                onclick: m.withAttr("value", (v: string) => { Store.qs[4] = v }),
                                                value: Store.qs[4]
                                            })
                                        ]),
                                        m("div.form-group.col-md-6", [
                                            m("label.col-form-label", "Additional Detailed Source of Wealth / Other Information"),
                                            m("input.form-control[name='qs5'][type='text'][placeholder='Details']", {
                                                onclick: m.withAttr("value", (v: string) => { Store.qs[5] = v }),
                                                value: Store.qs[5]
                                            })
                                        ]),
                                        m("div.form-group.col-md-6", [
                                            m("label.col-form-label", "I confirm that the information provided in the above is true and accurate, and agree to promptly inform of any material changes or inaccuracies in the information or documents provided."),
                                        ]),
                                        m(".clearfix.text-right.mt-3",
                                            m("button.btn.btn-custom.mr-3[type='button']", {
                                                onclick: () => {
                                                    localStorage.setItem("status", "step2");
                                                    m.route.set("/");
                                                },
                                            }, "Go Back"),
                                            m("button.btn.btn-custom[type='submit']", {
                                                disabled: !Store.canSave()
                                            }, "Submit")
                                        )
                                    ]),
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
