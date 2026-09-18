const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
.then(() => console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    username: String,
    email: String,
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const getData = async() => {
    let result = await Post.findOne({}).populate("user", "username");
    console.log(result);
};
    

getData();

// const del = async() => {
//     await Post.findByIdAndDelete("6aace3821d7d64cd3fbdd8f1");
//     await User.findByIdAndDelete("6aace1e76f3a51b0b1130209");
// };

// del();
