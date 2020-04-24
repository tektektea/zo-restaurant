import moment from "moment";

export const FAKEORDER=[
    {invoice_no: "12333",invoice_date: new Date(),items:[
            {name:"Soup",qty:12,price:120,amount:1400},
            {name:"Chana",qty:12,price:120,amount:1000},
            {name:"Chow",qty:12,price:120,amount:1600},
            {name:"Fry",qty:12,price:120,amount:1600},
        ],taxableAmount:1000,tax:100,netAmount:40000},
    {invoice_no: "23323",invoice_date: new Date(),items:[
            {name:"Soup",qty:12,price:120,amount:1400},
            {name:"Chana",qty:12,price:120,amount:1000},
            {name:"Chow",qty:12,price:120,amount:1600},
            {name:"Fry",qty:12,price:120,amount:1600},
        ],taxableAmount:1000,tax:100,netAmount:40000},
    {invoice_no: "6767",invoice_date: new Date(),items:[
            {name:"Soup",qty:12,price:120,amount:1400},
            {name:"Chana",qty:12,price:120,amount:1000},
            {name:"Chow",qty:12,price:120,amount:1600},
            {name:"Fry",qty:12,price:120,amount:1600},
        ],taxableAmount:1000,tax:100,netAmount:40000},
]

export const FAKE_TABLE = [
    {name: "1", description: "ingredient description", color: "#fff"},
    {name: "2", description: "ingredient description", color: "#fff"},
    {name: "3", description: "ingredient description", color: "#fff"},
    {name: "4", description: "ingredient description", color: "#fff"},
    {name: "5", description: "ingredient description", color: "#fff"},
    {name: "6", description: "ingredient description", color: "#fff"},
    {name: "7", description: "ingredient description", color: "#fff"},
    {name: "8", description: "ingredient description", color: "#fff"},
    {name: "9", description: "ingredient description", color: "#fff"},
];

export const FAKEITEM=[
    {name:"chana",price:2,image:""},
    {name:"kelsa",price:30},
    {name:"Chow",price:50},
    {name:"Puri",price:100},
    {name:"Sanpiau",price:60},
    {name:"Buhchiar",price:70},
]
export const FAKECUSTMERS=[
    {name:"kimi",contact:"090990",description: "item des"},
    {name:"Kunga",contact:"090990",description: "item des"},
    {name:"Khats",contact:"090990",description: "item des"},
    {name:"Khuma",contact:"090990",description: "item des"},
    {name:"khara",contact:"090990",description: "item des"},
]
export const CUSTOMER_DETAIL={
    name:"Kimi",
    contact: "989878889/12313",
    description:"description",
    orders:[
        {invoice_no:1233,invoice_date: moment.now()},
        {invoice_no:45454,invoice_date: moment.now()},
        {invoice_no:165233,invoice_date: moment.now()},
        {invoice_no:65,invoice_date: moment.now()},
        {invoice_no:65,invoice_date: moment.now()},
    ]
}
