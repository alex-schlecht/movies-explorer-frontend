import { MOVIES_API_URI } from "../constants/apiURI";

export const formatImageUrl = (imageUrl) => `${MOVIES_API_URI}/${imageUrl}`;