import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'c7a56c9af7c786fac999a1d518676ec6df85f8d7', queries,  });
export default client;
  