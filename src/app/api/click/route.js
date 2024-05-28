import { Event } from '@/models/Event';
import mongoose from 'mongoose';

export const POST = async (req) => {
  await mongoose.connect(process.env.MONGODB_URI);

  const url = new URL(req.url);

  const clickedLink = url.searchParams.get('url');

  const page = url.searchParams.get('page');

  //   console.log(clickedLink);

  await Event.create({ type: 'click', uri: clickedLink, page });

  return Response.json(true);
};
