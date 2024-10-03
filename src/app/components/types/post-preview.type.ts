import { post } from "./post.type";

export type PostPreview = Pick<post, 'title' | 'subtitle' | 'slug' | 'author' | 'publicationdate'>
