// all frontend api calls handled here

import { IVideo } from "@/models/Video";
import { ifError } from "assert";
export type VideoFormData = Omit<IVideo, "_id"> 

type FetchOptions = {
    method? : "GET" | "POST" | "PUT" | "DELETE"; 
    body?: any; 
    headers?: Record<string, string> 
}
class ApiClient {
    private async fetch<T>(
        endpoint: string, 
        options: FetchOptions = {}

    ) : Promise<T> {
        const {method = "GET", body, headers = {} } = options
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers, 
        }

        const res = await fetch(`api${endpoint}`, {
            method, 
            headers: defaultHeaders, 
            body: body ? JSON.stringify(body) : undefined
        })

        if(!res.ok) {
            throw new Error(await res.text()); 
        }
        return res.json(); 
    }

    async getVideos() {
        return this.fetch<IVideo[]>("/videos")
    }

    async getAVideo(id: string) {
        return this.fetch<IVideo>(`/videos/${id}`)
    }

    async createVideo(videoData: VideoFormData) {
        return this.fetch("/videos", {
            method: "POST", 
            body: videoData
        })
    }
}

export const apiClient = new ApiClient()