import { AppSettings } from "configs";
import moment from "moment";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import "datatables.net-buttons";
import "datatables.net-buttons-bs4";
import "datatables.net-buttons-bs4/css/buttons.bootstrap4.css";

import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";

const Store = {
    load() {

    },
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;

        $("#datatable").DataTable({
            ajax: {
                url: AppSettings.API_BASE_URL + "/api/log/list",
                type: "GET",
                beforeSend: function(request: any) {
                    request.setRequestHeader("Authorization", `Token ${token}`);
                },
                dataSrc: function(json: any) {
                    m.redraw();

                    json.logs.map((v: any) => {
                        v.date = moment(v.createdAt).format('MMMM Do YYYY, h:mm:ss a');
                        v.menu = v.menu ? v.menu : "None";
                        v.action = v.action ? v.action : "None";
                        v.record = v.record ? v.record : "None";
                        v.user = v.user ? v.user : "None";
                        return v;
                    });

                    return json.logs;
                }
            },
            dom: "Bfrtip",
            buttons: [
                {
                    text: "Export to Excel",
                    action: function(e: any, dt: any, node: any, config: any) {
                    }
                },
            ],
            columns: [
                { data: "date", width: "20%" },
                { data: "menu" },
                { data: "action" },
                { data: "record" },
                { data: "message" },
                { data: "user" },
            ]
        });
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
                                        m("li.breadcrumb-item",
                                            m("a[href='/']", { oncreate: m.route.link }, "Control Panel")
                                        ),
                                        m("li.breadcrumb-item.active", "Logs Overview")
                                    ])
                                ),
                                m("h4.page-title", "Logs Overview")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Logs Overview"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "Logs generated from different transactions."
                                ]),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "Date"),
                                            m("th", "Menu"),
                                            m("th", "Action"),
                                            m("th", "Record"),
                                            m("th", "Message"),
                                            m("th", "User"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "Date"),
                                            m("th", "Menu"),
                                            m("th", "Action"),
                                            m("th", "Record"),
                                            m("th", "Message"),
                                            m("th", "User"),
                                        ]),
                                    ])
                                ])
                            ])
                        )
                    )
                ])
            ),
            m(footer),
        ]);
    }
}
