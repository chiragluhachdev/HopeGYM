import type { Schema } from 'mongoose';

/**
 * Normalises documents to JSON: expose `id` (string), drop `_id`/`__v`.
 * Keeps API shapes aligned with the web/app TypeScript types.
 *
 * Generic so the schema's inferred document type is preserved (otherwise model
 * fields would all collapse to `unknown`).
 */
export function withJsonId<T extends Schema>(schema: T): T {
  schema.set('timestamps', true);
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, any>) => {
      ret.id = ret._id?.toString();
      delete ret._id;
      return ret;
    },
  });
  return schema;
}
