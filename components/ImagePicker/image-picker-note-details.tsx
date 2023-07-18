import React, { useState, ChangeEvent } from "react";
import { FiUpload } from "react-icons/fi";

interface ImagePickerProps {
  defaultImage?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ defaultImage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    defaultImage || null
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file ? URL.createObjectURL(file) : null);
  };

  const renderPreview = () => {
    if (selectedImage) {
      return (
        <img
          src={selectedImage}
          alt="Selected"
          className="h-full w-full object-cover rounded-lg"
        />
      );
    } else if (defaultImage) {
      return (
        <img
          src={defaultImage}
          alt="Default"
          className="h-full w-full object-cover rounded-lg"
        />
      );
    } else {
      return (
        <div className="text-gray-500 flex items-center gap-2">
          <FiUpload className="w-8 h-8" />
          <p>Add Cover Image</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <label htmlFor="image-upload" className="relative w-full cursor-pointer">
        <input
          type="file"
          accept="image/*"
          className="hidden w-full"
          onChange={handleImageChange}
          ref={(input) => input && input.setAttribute("multiple", "false")}
          id="image-upload" // Add id attribute
        />
        <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
          {renderPreview()}
        </div>
      </label>
    </div>
  );
};

export default ImagePicker;
