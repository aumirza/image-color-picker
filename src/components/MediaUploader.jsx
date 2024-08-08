import { DragAndPasteUpload } from "./DragAndPasteUpload";
import { FileSelector } from "./FileSelector";

export const MediaUploader = ({ onUpload }) => {
  return (
    <div>
      <DragAndPasteUpload uploadHandler={onUpload} />
      <FileSelector uploadHandler={onUpload} />
    </div>
  );
};
