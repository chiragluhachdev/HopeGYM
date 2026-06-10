import { Schema, model } from 'mongoose';
import { withJsonId } from './base';

const adminSchema = withJsonId(
  new Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: 'Administrator' },
    role: { type: String, default: 'admin' },
  })
);

// Never leak the hash via toJSON.
adminSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: Record<string, any>) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.passwordHash;
    return ret;
  },
});

export const Admin = model('Admin', adminSchema);
