import Realm from 'realm'
// let MyClassSchema = {
//     name: 'MyClass',
//     primaryKey: 'pk',
//     properties: {
//         pk: 'int',
//         optionalFloatValue: 'float?' // or {type: 'float', optional: true}
//         listOfStrings: 'string[]',
//         listOfOptionalDates: 'date?[]',
//         indexedInt: {type: 'int', indexed: true}
//
//         linkToObject: 'MyClass',
//         listOfObjects: 'MyClass[]', // or {type: 'list', objectType: 'MyClass'}
//         objectsLinkingToThisObject: {type: 'linkingObjects', objectType: 'MyClass', property: 'linkToObject'}
//     }
// };

class LineItem extends Realm.Object{
    static schema={
        name: "LineItem",
        properties:{
            item: "string",
            qty: "int",
            price: "float",
            amount:"float"
        }
    }
}
class Order extends Realm.Object {
    static schema={
        name: "Order",
        primaryKey: "invoice_no",
        properties:{
            invoice_no: "string",
            invoice_date: "date",
            taxableAmount: "double",
            taxAmount: "double",
            netAmount: "double",

            table:"string?",
            customer:'Customer',
            taxes:{type:"list", objectType: "Tax"},
            orders:{type:"list",objectType:"LineItem"},

            status:"string"
        }
    }

}

class Customer extends Realm.Object{
    static schema={
        name: "Customer",
        primaryKey: "id",
        properties:{
            id: "string",
            name: "string",
            contact: "string?",
            description: "string?"
        }
    }
}
class Item extends Realm.Object{
    static schema={
        name: "Item",
        primaryKey: "id",
        properties: {
            id: "string",
            name: "string",
            price: "float",
            description: "string?"
        }
    }
}
class Table extends Realm.Object {
}

Table.schema = {
    name: "Table",
    primaryKey: "id",
    properties: {
        id: "string",
        name: "string",
        description: "string?"
    }
};

class Tax extends Realm.Object {
}

Tax.schema = {
    name: "Tax",
    primaryKey: "id",
    properties: {
        id: "string",
        name: "string",
        percent: "float"
    }
};


const realmInstance = new Realm({schema: [Table, Tax,Item,Customer,Order,LineItem]});
export default realmInstance
