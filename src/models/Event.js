import { Schema, model, models } from 'mongoose';

const EventSchema = new Schema(
  {
    type: String, // click or view
    page: String, //e.g chuksss
    uri: String, //e.g /chuksss for view | https://... for clicks
  },
  { timestamps: true }
);

export const Event = models?.Event || model('Event', EventSchema);
