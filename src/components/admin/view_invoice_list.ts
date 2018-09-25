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

        $(document).ready(function() {
            $("#datatable").DataTable({
                ajax: {
                    url: AppSettings.API_BASE_URL + "/api/invoice/list",
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();
                        json.data.map(function(v: any) {
                            v._id = v._id.toUpperCase();
                            v.uid = v._id.slice(-6);
                            v.info = `
APR: ${v.aprPercent}<br>
EIR: ${v.eirPercent}`;
                            v.button = "None";
                        });
                        return json.data;
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
                    { data: "uid", width: "8%" },
                    { data: "period" },
                    { data: "amount" },
                    { data: "info" },
                    { data: "createdAt" },
                    { data: "closingDate" },
                ]
            });
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
                                        m("li.breadcrumb-item.active", "Invoices")
                                    ])
                                ),
                                m("h4.page-title", "Invoices")
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Invoices"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "List of all active and inactive invoices."
                                ]),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Period"),
                                            m("th", "Amount"),
                                            m("th", "Info"),
                                            m("th", "Created Date"),
                                            m("th", "Closing Date"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Invoice Seller"),
                                            m("th", "Amount"),
                                            m("th", "Info"),
                                            m("th", "Created Date"),
                                            m("th", "Closing Date"),
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
