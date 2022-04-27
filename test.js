const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/test")
  .then(() => console.log("MongoDBga ulanish hosil qilindi"))
  .catch((err) => console.error("MongoDBga ulanishda hatolik yuz berdi", err));

const SizeSchema = new mongoose.Schema({
  h: Number,
  w: Number,
  uom: String,
});

const schema = new mongoose.Schema({
  item: String,
  qty: Number,
  size: SizeSchema,
  status: String,
});

const Req = mongoose.model("collection", schema);

async function getReq() {
  return await Req.find()
    .or([{ qty: { $lte: 50 } }, { item: /.*l.*/i }])
    .select({ qty: 1, item: 1, _id: 0 })
    .sort({ qty: -1 })
}

async function render() {
  console.log(await getReq());
}
render();
