import React from "react";
import { ReactComponent as FolderIcon } from "../svgs/folderIcon.svg";

interface FolderObjectType {
  contents: [];
  created_at: Date;
  favourite: boolean;
  id: string;
  name: string;
  src: string;
  type: string;
}

interface FolderCardProps {
  folderObject: FolderObjectType;
}

const FolderCard: React.FC<FolderCardProps> = ({ folderObject }) => {
  return (
    <div className="h-[55px] w-[288px] border border-[#EFF0F0] p-4 rounded-[5px] flex items-center cursor-pointer">
      <div className="flex items-center">
        <div className="w-[35px] h-[35px] rounded-full bg-[#F2F2F3] flex items-center justify-center mr-2">
          <FolderIcon className="" />
        </div>
        <div className="">
          <p className="text-[14px] text-[#2E3031] font-[500]">
            {folderObject.name}
          </p>
          {folderObject.type === "folder" && folderObject.contents.length ? (
            <p className="text-[12px] font-[400] text-[#6F7376]">
              {`${folderObject.contents.length} items`}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
