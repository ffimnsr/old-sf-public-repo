import { AppSettings } from "configs";
import moment from "moment";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-bs4/css/dataTables.bootstrap4.css";
import m, { Vnode } from "mithril";
import footer from "widgets/footer";
import header from "widgets/header";

const Store = {
    save() {

    },
};

function statusConvert(stat: string) {
    switch (stat) {
        case "active":
            return `<span class="badge badge-success">Active</span>`;
        case "inactive":
            return `<span class="badge badge-warning">Inactive</span>`;
        case "deleted":
            return `<span class="badge badge-warning">Deleted</span>`;
    }
}

export default {
    oncreate(_vnode: Vnode) {
        const token = localStorage.getItem("token")!;

        $(document).ready(function() {
            $("#datatable").DataTable({
                ajax: {
                    url: AppSettings.API_BASE_URL + "/api/country/list",
                    type: "GET",
                    beforeSend: function(request: any) {
                        request.setRequestHeader("Authorization", `Token ${token}`);
                    },
                    dataSrc: function(json: any) {
                        m.redraw();
                        json.countries.map(function(v) {
                            v._id = v._id.toUpperCase();
                            v.uid = v._id.slice(-6);
                            v.status = statusConvert(v.status);
                        });

                        return json.countries;
                    }
                },
                dom: "Bfrtip",
                buttons: [
                    {
                        text: "New Country",
                        action: function(e: any, dt: any, node: any, config: any) {
                            m.route.set("/admin/new-country");
                        }
                    },
                ],
                columns: [
                    { data: "uid", width: "5%" },
                    { data: "code", width: "5%" },
                    { data: "name" },
                    { data: "status", width: "7%" },
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
                                        m("li.breadcrumb-item.active", "Control Panel"),
                                        m("li.breadcrumb-item.active", "Country List"),
                                    ])
                                ),
                                m("h4.page-title", "Country List"),
                            ])
                        )
                    ),
                    m(".row",
                        m(".col-12",
                            m(".card-box.table-responsive", [
                                m("h4.m-t-0.header-title", "Country List"),
                                m("p.text-muted.font-14.m-b-30", [
                                    "List of countries allowed to create account."
                                ]),
                                m("table.table.table-hover.table-actions-bar.no-wrap.m-0[id='datatable']", [
                                    m("thead",
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Code"),
                                            m("th", "Country Name"),
                                            m("th", "Status"),
                                        ])
                                    ),
                                    m("tfoot", [
                                        m("tr", [
                                            m("th", "ID"),
                                            m("th", "Code"),
                                            m("th", "Country Name"),
                                            m("th", "Status"),
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
