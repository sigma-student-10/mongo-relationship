const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
.then(() => console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const findCustomer = async() => {
    let result = await Customer.find({}).populate("orders");
    console.log(result);
};

findCustomer();
// const addCustomers = async() => {
//     let cust1 = new Customer({
//         name: "Rahul Kumar",
//     });

//     let order1 = await Order.findOne({item: "Burger"});
//     let order2 = await Order.findOne({item: "Pizza"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result = await cust1.save();
//     console.log(result);
// };

// addCustomers();

// const addOrders = async() => {
//     let res = await Order.insertMany([
//         {item: "Somosa", price: 10},
//         {item: "Burger", price: 50},
//         {item: "Pizza", price: 100},
//     ]);
//     console.log(res);
// };

// addOrders();