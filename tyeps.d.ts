import { Connection } from "mongoose"
// connection returns a special type of string from mongoDB

declare global {
    var mongoose: {
        conn: Connection | null // if already connected then the already connected connection string
        promise: Promise<Connection> | null // either Promise that connection is in proocess. otherwise null obj
    }
}

export {}; 