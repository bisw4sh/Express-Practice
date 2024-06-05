import ffmpegpath from "@ffmpeg-installer/ffmpeg";
import ffprobepath from "@ffprobe-installer/ffprobe";
import ffmpeg from "fluent-ffmpeg";
import path from "node:path";
import { __dirname } from "../server";

const ffmpegPath = ffmpegpath.path;
const ffprobePath = ffprobepath.path;

ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);

export async function generateThumbnail(videoPath: string, filename: string) {
  return ffmpeg(videoPath).thumbnail({
    timestamps: ["50%"],
    filename: path.join(
      __dirname,
      "uploads",
      "thumbnails",
      `${filename.substring(
        filename.lastIndexOf("/"),
        filename.lastIndexOf(".") + 1
      )}png`
    ),
    size: "320x240",
  });
}
