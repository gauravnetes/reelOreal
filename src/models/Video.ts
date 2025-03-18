import mongoose, {Schema, model, models} from "mongoose";
import { minify } from "next/dist/build/swc/generated-native";


// as we're only uploading reels in our website so 
// we're giving the video dimension of only reel type 
// videos
export const VIDEO_DIMENSIONS = {
    width: 1080, 
    height: 1920,
} as const 
// if we define the video dimensions as const then we 
// can't change it later on 
export interface IVideo {
    _id?: mongoose.Types.ObjectId; 
    title: string; 
    description: string;  
    videoUrl: string;
    thumbnailUrl: string; 
    controls?: boolean; 
    transformation?: {
        height: number
        width: number
        quality?: number
    }; 
    createdAt?: Date; 
    updatedAt?: Date; 
}

const videoSchema = new Schema<IVideo> ({
    title: {type: String, required: true}, 
    description: {type: String, required: true}, 
    videoUrl: {type: String, required: true}, 
    thumbnailUrl: {type: String, required: true}, 
    controls: {type: Boolean, default: true}, 
    transformation: {
        height: {type: Number, default: VIDEO_DIMENSIONS.height}, 
        width: {type: Number, default: VIDEO_DIMENSIONS.width}, 
        quality: {type: Number, min: 1, max: 100}
    }
}, {timestamps: true})

const Video = models?.Video || model<IVideo>("Video", videoSchema); 

export default Video