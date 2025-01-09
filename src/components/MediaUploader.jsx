import { DragAndPasteUpload } from "./DragAndPasteUpload";
import { FileSelector } from "./FileSelector";

export const MediaUploader = ({ onUpload }) => {
  return (
    <div className="flex flex-grow">
      <DragAndPasteUpload uploadHandler={onUpload} />
      <FileSelector uploadHandler={onUpload} />
    </div>
  );
};
