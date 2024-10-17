// /models/ChequeMaster.js
import mongoose from 'mongoose';

const chequeMasterSchema = new mongoose.Schema({
  bankCode: String,
  BPMethod: { type: String, ref: 'BPMethod' },  // Reference to BPMethod
  chequeNo: String,
  status: String,
});

const ChequeMaster = mongoose.model('ChequeMaster', chequeMasterSchema);

export default ChequeMaster;
