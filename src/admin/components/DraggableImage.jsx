import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DraggableImageGrid = ({ images, setImages, onMove }) => {
  const moveImage = (dragIndex, hoverIndex) => {
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);
    setImages(updatedImages);
  };

  const renderImage = (image, index) => {
    const imageUrl =
      image instanceof File
        ? URL.createObjectURL(image)
        : image.startsWith("/")
        ? `${process.env.REACT_APP_API_URL}${image}`
        : image;

    return (
      <DraggableImage
        key={index}
        index={index}
        image={imageUrl}
        moveImage={moveImage}
        onMove={onMove} // Pass onMove to DraggableImage
      />
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-4 grid grid-cols-5 gap-4">
        {images.map((image, index) => renderImage(image, index))}
      </div>
    </DndProvider>
  );
};

const DraggableImage = ({ image, index, moveImage, onRemoveImage, onMove }) => {
  const ref = React.useRef(null);

  const [, drag] = useDrag({
    type: "image",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "image",
    hover: (item) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
    drop: (item) => {
      // Only call onMove when the item is dropped
      if (item.index !== index) {
        onMove(item.index, index);
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="relative">
      <img
        src={image || "/placeholder.svg"}
        alt={`Preview ${index + 1}`}
        className="h-24 w-24 object-cover rounded-md"
        onError={(e) => {
          e.target.src = "/placeholder.svg";
        }}
      />
      <button
        type="button"
        onClick={() => onRemoveImage(index)}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
      >
        ×
      </button>
    </div>
  );
};
export default DraggableImageGrid;
