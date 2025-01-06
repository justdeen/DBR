const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/relate')
.then(() => {
    console.log('CONNECTION OPEN')
})
.catch(err => {
    console.log('CONNECTION ERROR')
    console.log(err)
})

const { Schema } = mongoose

const userSchema = ({
    name: String,
    age: Number
})

const User = mongoose.model('User', userSchema)

const tweetSchema = ({
    post: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Tweet = mongoose.model('Tweet', tweetSchema)

const makeTweet = async () => {
    const tweet2 = new Tweet({ post: 'football is so much fun', likes: 74 }) 
    const user1 = await User.findOne({ name: 'pat' })
    tweet2.user = user1
    tweet2.save().then((data) => console.log(data))
}

// makeTweet()

const findTweet = async () => {
    const tweets = await Tweet.find({}).populate('user')
    console.log(tweets)
}

findTweet()