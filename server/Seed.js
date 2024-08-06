const {seedUser} = require('./Seed/User')
const {seedAdmin} = require('./Seed/Admin')
const {seedProduct} = require('./Seed/Products')
const {connectToDB}=require("./connectDB")

const seedData=async()=>{
    try {
        await connectToDB()
        console.log('Seed [started] please wait..');
        await seedAdmin()
        await seedUser()
        await seedProduct()

        console.log('Seed completed..');
    } catch (error) {
        console.log(error);
    }
}

seedData()