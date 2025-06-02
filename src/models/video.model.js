import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new Schema(
    {

    videoFile:{
        type:String,//clodinary url
        required:true
    },
    thumbnail:{
        type:String,//clodinary url
        required:true
    },
    title:{
        type:String,//clodinary url
        required:true
    },
    description:{//clodinary url
        type:String,
        required:true

    },
       time:{//clodinary url
        type:String,
        required:true
    },
         duration:{//clodinary url
        type:String,
        required:true
    },
    view:{
        type:Number,
        default:0

    },
    isPublished:{
        type:Boolean,
        default:TRUE
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggretaePaginate)





export const Video = mongoose.model("Video",videoSchema)