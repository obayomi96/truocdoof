import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { ReactComponent as SearchIcon } from "./svgs/search-icon.svg";
import FolderCard from "./components/FolderCard";
import FileCard from "./components/FileCard";
import ImagePreviewModal from "./components/ImagePreviewModal";
import MOCK_API_DATA from "./data/MOCK_DATA.json";

const API_URL: string = process.env.REACT_APP_API_URL || "";
interface MyObject {
  created_at: string;
}

interface Item {
  name: string;
}

function App() {
  const [foldersList, setFoldersList] = useState<any[]>([]);
  const [filesList, setFilesList] = useState<any[]>([]);
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [showFolderPreviewModal, setShowFolderPreviewModal] = useState(false);
  const [singleFile, setSingleFile] = useState<any | null>(null);
  const [singleFolder, setSingleFolder] = useState<any | null>(null);
  const [innerContents, setInnerContents] = useState<any | null>(null);
  const [showInnerContentsView, setShowInnerContentsView] = useState(false);

  const handleFetchData = async () => {
    // DUE TO API CORS ISSUES YOU MAY USE MOCK_DATA FOR TEST AS SEEN
    const { data } = await axios.get(API_URL);
    const files = MOCK_API_DATA?.filter(
      (item: any, index: number) => item.type === "file"
    );
    const folders = MOCK_API_DATA?.filter(
      (item: any, index: number) => item.type === "folder"
    );

    setFilesList(files);
    setFoldersList(folders);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFolderClick = (itemObject: any) => {
    setSingleFolder(itemObject);
    if (itemObject.contents.length) {
      setInnerContents(itemObject.contents);
      setShowInnerContentsView(true);
    }
  };

  function sortArrayByName(arr: Item[]): Item[] {
    return arr.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  const sortByCreatedAt = (arr: MyObject[]): MyObject[] => {
    return arr
      .slice()
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
  };

  const handleFileClicks = (itemObject: any) => {
    setSingleFile(itemObject);
    if (itemObject.src.includes(".jpg")) {
      setShowImagePreviewModal(true);
    } else {
      const link = document.createElement("a");
      link.download = "file_pdf_file";
      link.href = itemObject.src;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const sortList: { name: string; value: string }[] = [
    { name: "Name", value: "name" },
    { name: "Created at", value: "created_at" },
  ];

  return (
    <div className="w-full h-full p-14">
      <div className="w-full h-full ">
        <div className="w-full flex justify-between items-center">
          <div className="w-[114px] h-[36px]">
            <select
              className="w-full py-3 px-4 text-[#6E8877] rounded border border-gray-200 font-[500] focus:outline-none text-sm rounded style-none"
              placeholder="Sort"
              name="sort"
              value=""
              onChange={(event: any) => {
                if (event.target.value === "name") {
                  setFilesList(sortArrayByName(filesList));
                  setFoldersList(sortArrayByName(foldersList));
                } else {
                  setFilesList(sortByCreatedAt(filesList));
                  setFoldersList(sortByCreatedAt(foldersList));
                }
              }}
            >
              <option value="" disabled>
                Sort
              </option>
              {sortList.map((list, index) => {
                return (
                  <option key={index} value={list.value} id={list.value}>
                    {list.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="h-[36px] w-[256px] flex items-center justify-between border border-[#949589] text-[#103C1B] rounded py-3 px-4 pl-2 leading-tight focus:outline-none focus:bg-none focus:border-gray-500 hover:border-black">
            <SearchIcon className="flex justify-left ml-0 mr-2" />
            <input
              className="w-full appearance-none bg-transparent border border-none focus:outline-none text-sm"
              type="text"
              placeholder="search"
            />
          </div>
        </div>

        <div className="w-full my-4">
          <p className="font-semibold py-4">Folders</p>
          {showInnerContentsView && (
            <button
              className="my-2 text-[12px] font-[500]"
              onClick={() => {
                setInnerContents([]);
              }}
            >
              Back to folders
            </button>
          )}

          <div className="w-full flex item-center justify-start flex-wrap">
            {innerContents && innerContents?.length ? (
              innerContents?.map((item: any, index: number) => {
                return (
                  <div
                    key={item.id}
                    className="mr-4 my-2 "
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleFolderClick(item);
                    }}
                  >
                    <FolderCard folderObject={item} />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>

          <div className="w-full flex item-center justify-start flex-wrap">
            {!innerContents || (!innerContents.length && foldersList.length) ? (
              foldersList?.map((item: any, index: number) => {
                return (
                  <div
                    key={item.id}
                    className="mr-4 my-2 "
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleFolderClick(item);
                    }}
                  >
                    <FolderCard folderObject={item} />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="w-full my-4">
          <p className="font-semibold py4">Files</p>
          <div className="w-full flex item-center justify-start flex-wrap">
            {filesList.length ? (
              filesList?.map((item: any, index: number) => {
                return (
                  <div
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleFileClicks(item);
                    }}
                    key={item.id}
                    className="mr-4 my-2 cursor-pointer"
                  >
                    <FileCard fileObject={item} />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <ImagePreviewModal
        itemObject={singleFile}
        closeModal={() => setShowImagePreviewModal(false)}
        isVisible={showImagePreviewModal}
      />
      <ImagePreviewModal
        itemObject={singleFolder}
        closeModal={() => setShowFolderPreviewModal(false)}
        isVisible={showFolderPreviewModal}
      />
    </div>
  );
}

export default App;
