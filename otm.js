const mongoose = require('mongoose')



const { Schema } = mongoose

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
})

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = mongoose.model('Product', productSchema)
const Farm = mongoose.model('Farm', farmSchema)

const makeFarm = async () => {
    const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA' });
    const melon = await Product.findOne({ name: 'Goddess Melon' })
    farm.products.push(melon)
    farm.save()
    console.log(farm)
}

// makeFarm()

const updateFarm = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' })
    const melon = await Product.findOne({ name: 'Asparagus' })
    farm.products.push(melon)
    farm.save()
    console.log(farm)
}

// updateFarm()

Farm.findOne({ name: 'Full Belly Farms' })
.populate('products')
.then((data) => console.log(data))



// Product.insertMany([
//     {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
//     {name: 'Sugar Baby watermelon', price: 4.99, season: 'Summer'},
//     {name: 'Asparagus', price: 3.99, season: 'Spring'}
// ]).then((data) => console.log(data))

