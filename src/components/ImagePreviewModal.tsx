import React from "react";
import { format } from "date-fns";
import ModalPortal from "./ModalPortal";
import { ReactComponent as Downloadicon } from "../svgs/downloadicon.svg";
import { ReactComponent as YellowIcon } from "../svgs/yellowfile.svg";
import { ReactComponent as FavoriteIcon } from "../svgs/favorite.svg";
import { ReactComponent as UnFavoriteIcon } from "../svgs/unfavorite.svg";

interface ItemObjectType {
  contents: [];
  created_at: Date;
  favourite: boolean;
  id: string;
  name: string;
  src: string;
  type: string;
}

interface IProps {
  closeModal: () => void;
  isVisible: boolean;
  itemObject: ItemObjectType;
}

const ImagePreviewModal: React.FC<IProps> = ({
  closeModal,
  isVisible = false,
  itemObject,
}) => {
  return isVisible ? (
    <ModalPortal>
      <div className="w-screen h-screen fixed bg-[#000000] flex justify-center items-center top-0 bg-opacity-50 z-9999">
        <div className="bg-white h-[553px] w-[691px] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="w-[30px] h-[30px] rounded-full bg-[#fff] border border-gray-300 flex items-center justify-center mr-2">
                <Downloadicon className="" />
              </div>
            </div>
            <button
              onClick={() => {
                closeModal();
              }}
              className="bg-gray-300 h-[30px] w-[72px] cursor-pointer rounded"
            >
              X Close
            </button>
          </div>

          <div className="w-full h-fit">
            <img src={itemObject.src} alt="" />
          </div>

          <button className="absolute top-[30%] right-[30%] w-[35px] h-[35px] rounded-full bg-[#000] bg-opacity-20 flex items-center justify-center">
            {itemObject?.favourite ? (
              <FavoriteIcon className="" />
            ) : (
              <UnFavoriteIcon className="" />
            )}
          </button>

          <div className="flex items-center">
            {itemObject?.src.includes(".jpg") && (
              <div className="w-[35px] h-[35px] rounded-full bg-[#FFF7E5] flex items-center justify-center mr-2">
                <YellowIcon className="" />
              </div>
            )}
            <div className="mt-2">
              <p className="text-[14px] text-[#2E3031] font-[500]">
                {itemObject?.name}
              </p>
              <p className="text-[12px] font-[400] text-[#6F7376]">
                {"Added " +
                  format(new Date(itemObject?.created_at), "do LLLL, yyyy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  ) : null;
};

export default ImagePreviewModal;
