import React from "react";
import { format } from "date-fns";
import { ReactComponent as RedIcon } from "../svgs/RedIcon.svg";
import { ReactComponent as GreenIcon } from "../svgs/greenfile.svg";
import { ReactComponent as YellowIcon } from "../svgs/yellowfile.svg";
import { ReactComponent as FavoriteIcon } from "../svgs/favorite.svg";
import { ReactComponent as UnFavoriteIcon } from "../svgs/unfavorite.svg";
import { ReactComponent as Downloadicon } from "../svgs/downloadicon.svg";
import { ReactComponent as Printicon } from "../svgs/printicon.svg";
import { ReactComponent as RedFileIcon } from "../svgs/redFile.svg";
import clsx from "clsx";

interface FileObjectType {
  contents: [];
  created_at: Date;
  favourite: boolean;
  id: string;
  name: string;
  src: string;
  type: string;
}

interface FileCardProps {
  fileObject: FileObjectType;
}

const FileCard: React.FC<FileCardProps> = ({ fileObject }) => {
  return (
    <div className="w-[288px] h-[294px] rounded shadow p-4">
      <div className="relative w-[264px] h-[215px] bg-[#F2F5F7] flex justify-center items-center">
        <button
          className={clsx({
            "absolute top-[10%] right-4 w-[35px] h-[35px] rounded-full  bg-gray-400 flex items-center justify-center":
              true,
            "bg-[#000] bg-opacity-40 ": fileObject.src.includes(".jpg"),
          })}
        >
          {fileObject?.favourite ? (
            <FavoriteIcon className="" />
          ) : (
            <UnFavoriteIcon className="" />
          )}
        </button>
        {!fileObject?.src.includes(".jpg") && (
          <div className="w-full flex items-center justify-center">
            {fileObject?.src.includes(".pdf") && (
              <div>
                <RedFileIcon />
              </div>
            )}
          </div>
        )}
        {!fileObject?.src.includes(".jpg") && (
          <div className="z-9999 w-full flex items-center absolute bottom-[10%] px-2">
            <div className="w-[30px] h-[30px] rounded-full bg-[#fff] border border-gray-300 flex items-center justify-center mr-2">
              <Downloadicon className="" />
            </div>
            <div className=" w-[30px] h-[30px] rounded-full bg-[#fff] border border-gray-300 flex items-center justify-center">
              <Printicon />
            </div>
          </div>
        )}
        {fileObject?.src.includes(".jpg") && (
          <img className="w-full h-full" src={fileObject?.src} alt="" />
        )}
      </div>
      <div className="flex items-center">
        {fileObject?.src.includes(".jpg") ||
          fileObject?.src.includes(".png") ||
          (fileObject?.src.includes(".svg") && (
            <div className="w-[35px] h-[35px] rounded-full bg-[#FFF7E5] flex items-center justify-center mr-2">
              <YellowIcon className="" />
            </div>
          ))}
        {fileObject?.src.includes(".pdf") && (
          <div className="w-[35px] h-[35px] rounded-full bg-[#F2F2F3] flex items-center justify-center mr-2">
            <RedIcon className="" />
          </div>
        )}
        {fileObject?.src.includes(".xlsx") && (
          <div className="w-[35px] h-[35px] rounded-full bg-[#F2F2F3] flex items-center justify-center mr-2">
            <GreenIcon className="" />
          </div>
        )}
        <div className="mt-4">
          <p className="text-[14px] text-[#2E3031] font-[500]">
            {fileObject?.name}
          </p>
          <p className="text-[12px] font-[400] text-[#6F7376]">
            {"Added " +
              format(new Date(fileObject?.created_at), "do LLLL, yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
