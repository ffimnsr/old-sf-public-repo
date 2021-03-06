import mongoose from "mongoose";
import { mongoUri } from "../config";
import User from "../models/user";
import LoanPurpose from "../models/loan_purpose";
import Debtor from "../models/debtor";
import Country from "../models/country";
import CompanyRevenue from "../models/company_revenue";
import CreditRate from "../models/credit_rate";
import Industry from "../models/industry";

mongoose.connect(mongoUri);

const users = [
    {
        username: "admin",
        email: "admin@smartfunding.io",
        password: "admin42",
        role: "admin",
        status: "okay",
    },
    {
        username: "support43",
        email: "support43@yopmail.net",
        password: "support43",
    },
    {
        username: "support44",
        email: "support44@yopmail.net",
        password: "support44",
        typeset: "borrower",
    },
    {
        username: "support45",
        email: "support45@yopmail.net",
        password: "support45",
        typeset: "borrower",
    },
    {
        username: "support46",
        email: "support46@yopmail.net",
        password: "support46",
        typeset: "borrower",
    },
    {
        username: "support47",
        email: "support47@yopmail.net",
        password: "support47",
        typeset: "investor",
    },
    {
        username: "support48",
        email: "support48@yopmail.net",
        password: "support48",
        typeset: "investor",
    },
    {
        username: "support49",
        email: "support49@yopmail.net",
        password: "support49",
        typeset: "investor",
    },
    {
        username: "support50",
        email: "support50@yopmail.net",
        password: "support50",
        typeset: "investor",
    },
    {
        username: "support51",
        email: "support51@yopmail.net",
        password: "support51",
        typeset: "borrower",
    },
    {
        username: "support52",
        email: "support52@yopmail.net",
        password: "support52",
        typeset: "borrower",
    },
    {
        username: "support53",
        email: "support53@yopmail.net",
        password: "support53",
        typeset: "borrower",
    },
    {
        username: "support54",
        email: "support54@yopmail.net",
        password: "support54",
        typeset: "borrower",
    },
    {
        username: "support55",
        email: "support55@yopmail.net",
        password: "support55",
        typeset: "password"
    }
];

const loan_purposes = [
    { name: "Business Startup", status: "active" },
    { name: "Expansion", status: "active" },
    { name: "House Buying", status: "active" },
    { name: "Office Expansion", status: "active" },
];

const company_revenues = [
    { name: "0 - 100,000", status: "active" },
    { name: "100,001 - 500,000", status: "active" },
    { name: "500,001 - 1,000,000", status: "active" },
    { name: "1,000,001 - 5,000,000", status: "active" },
    { name: "5,000,001 - 100,000,000", status: "active" },
];

const credit_rates = [
    { name: "A+", status: "active" },
    { name: "A-", status: "active" },
    { name: "B+", status: "active" },
    { name: "B-", status: "active" },
    { name: "C+", status: "active" },
];

const countries = [
    { code: "SG", name: "Singapore", status: "active" },
    { code: "MY", name: "Malaysia", status: "active" },
    { code: "ID", name: "Indonesia", status: "active" },
    { code: "PH", name: "Philippines", status: "active" },
    { code: "HK", name: "Hong Kong", status: "active" },
    { code: "CN", name: "China", status: "active" },
    { code: "VN", name: "Vietnam", status: "active" },
];

const debtors = [
    { name: "Accenture Solutions Sdn. Bhd.", status: "active" },
    { name: "Boilermaster Pte. Ltd.", status: "active" },
    { name: "Caring Pharmacy Retail Management Sdn. Bhd.", status: "active" },
    { name: "Eco Special Waste Management Pte. Ltd.", status: "active" },
    { name: "Eu Yan Sang (Singapore) Pte. Ltd.", status: "active" },
    { name: "ExxonMobil Asia Pacific Pte. Ltd.", status: "active" },
    { name: "Goodrich Aerospace Pte. Ltd.", status: "active" },
    { name: "Kiddy Palace Pte. Ltd.", status: "active" },
    { name: "Marks & Spencer", status: "active" },
    { name: "Mighty Engineering & Construction Pte. Ltd.", status: "active" },
    { name: "Ministry of Education", status: "active" },
    { name: "Mohamed Mustafa & Samsuddin Co. Pte. Ltd.", status: "active" },
    { name: "OCBC PROPERTY SERVICES PTE. LTD.", status: "active" },

];

function createUsers() {
    return new Promise(function(resolve, _reject) {
        users.forEach(function(doc) {
            const d = new User();

            d.username = doc.username;

            if (doc.role !== undefined) {
                d.role = doc.role;
            }

            if (doc.status !== undefined) {
                d.status = doc.status;
            }

            d.email = doc.email;
            d.isDocumentsSubmitted = false;
            d.isMailVerified = true;
            d.typeset = doc.typeset;
            d.setPassword(doc.password);

            d.save();
        });
        resolve("creating users");
    });
}

function createLoanPurposes() {
    return new Promise(function(resolve, _reject) {
        loan_purposes.forEach(function(doc) {
            const d = new LoanPurpose();

            d.name = doc.name;
            d.status = doc.status;
            d.save();
        });
        resolve("creating loan purposes");
    });
}

function createCompanyRevenues() {
    return new Promise(function(resolve, _reject) {
        company_revenues.forEach(function(doc) {
            const d = new CompanyRevenue();

            d.revenue = doc.name;
            d.status = doc.status;
            d.save();
        });
        resolve("creating company revenues");
    });
}

function createCreditRates() {
    return new Promise(function(resolve, _reject) {
        credit_rates.forEach(function(doc) {
            const d = new CreditRate();

            d.rate = doc.name;
            d.status = doc.status;
            d.save();
        });
        resolve("creating credit rates");
    });
}

function createCountries() {
    return new Promise(function(resolve, _reject) {
        countries.forEach(function(doc) {
            const d = new Country();

            d.code = doc.code;
            d.name = doc.name;
            d.status = doc.status;
            d.save();
        });
        resolve("creating countries");
    });
}

function createDebtors() {
    return new Promise(function(resolve, _reject) {
        debtors.forEach(function(doc) {
            const d = new Debtor();

            d.name = doc.name;
            d.status = doc.status;
            d.save();
        });
        resolve("creating debtors");
    });
}

Promise.all([
    createUsers(),
    createLoanPurposes(),
    createCompanyRevenues(),
    createCreditRates(),
    createCountries(),
    createDebtors(),
]).then(function(msg) {
    msg.forEach(function(t) {
        console.log(t);
    });
});
