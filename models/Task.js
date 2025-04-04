import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Fixed extra space in 'User'
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
