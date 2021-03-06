import m, { Vnode } from "mithril";
import { AppSettings } from "../configs";

const Store = {
    prices: [],
    btcUsd: "",
    ethUsd: "",
    xrpUsd: "",

    load() {
        const vm = this;
        m.request(AppSettings.API_BASE_URL + "/api/exchange-prices", {
            method: "GET",
            headers: {
                "Accept": "application/json",
            }
        }).then(function(res: any) {
            if (Array.isArray(res)) {
                res.forEach((element, index, array) => {
                    if (element.id === "1") {
                        vm.btcUsd = element.last_price_24h;
                    }

                    if (element.id === "27") {
                        vm.ethUsd = element.last_price_24h;
                    }

                    if (element.id === "84") {
                        vm.xrpUsd = element.last_traded_price;
                    }
                });
            } else {
                // TODO: add feedback so user would know he's been denied
                console.error("error", res);
            }
        }).catch(function(err) {
            console.error("error", err);
        });
    },
};

export default {
    oninit(_vnode: Vnode) {
        Store.load();
    },
    view(vnode: Vnode) {
        return m(".col-lg-4", [
            m(".card-box", [
                m("h4.m-t-0.header-title", "Exchange Price Ticker"),
                m("div.table-responsive", [
                    m("table.table.table-sm.table-borderless", [
                        m("tbody", [
                            m("tr", [
                                m("td.text-warning", "Bitcoin (BTC)"),
                                m("td.text-right.text-warning", Store.btcUsd, " USD"),
                            ]),
                            m("tr", [
                                m("td.text-primary", "Ethereum (ETH)"),
                                m("td.text-right.text-primary", Store.ethUsd, " USD"),
                            ]),
                            m("tr", [
                                m("td.text-muted", "Stellar (XRP)"),
                                m("td.text-right.text-muted", Store.xrpUsd, " USD"),
                            ]),
                        ]),
                    ]),
                    m("p", "")
                ]),
            ])
        ]);
    }
} as m.Component;
