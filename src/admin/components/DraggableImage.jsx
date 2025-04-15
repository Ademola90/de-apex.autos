"use client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableImage = ({ image, index, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const imageUrl =
    image instanceof File
      ? URL.createObjectURL(image)
      : image.secure_url || image;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <img
        src={imageUrl || "/placeholder.svg"}
        alt="Preview"
        className="w-full h-32 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="absolute top-0 left-0 bg-white bg-opacity-75 px-2 py-1 text-xs font-medium">
        {index === 0 ? "Main" : `#${index + 1}`}
      </div>
    </div>
  );
};

const ImageGrid = ({ images, setImages, onRemoveImage }) => {
  const sensors = useSensors(
    useSensor(PointerSensor), // Handles mouse inputs
    useSensor(TouchSensor), // Handles touch inputs
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }) // Handles keyboard inputs
  );

  // Updated handleDragEnd function with debugging
  const handleDragEnd = (event) => {
    console.log(event); // Log the event for debugging
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = Number.parseInt(active.id);
        const newIndex = Number.parseInt(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-700 mb-2">
        Images (drag to reorder)
      </p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd} // Use the updated handleDragEnd
      >
        <SortableContext items={images.map((_, i) => i.toString())}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
            {images.map((image, index) => (
              <SortableImage
                key={index}
                image={image}
                index={index}
                onRemove={onRemoveImage}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <p className="text-xs text-gray-500 mt-2">
        {images.length} of 10 images. First image will be used as the main
        display image.
      </p>
    </div>
  );
};

export default ImageGrid;

// import React from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { TouchBackend } from "react-dnd-touch-backend";

// const isTouchDevice = () => {
//   return (
//     "ontouchstart" in window ||
//     navigator.maxTouchPoints > 0 ||
//     navigator.msMaxTouchPoints > 0
//   );
// };

// const DraggableImageGrid = ({ images, setImages, onMove }) => {
//   const moveImage = (dragIndex, hoverIndex) => {
//     const updatedImages = [...images];
//     const [draggedImage] = updatedImages.splice(dragIndex, 1);
//     updatedImages.splice(hoverIndex, 0, draggedImage);
//     setImages(updatedImages);

//     // Execute the onMove callback if provided
//     if (onMove) onMove(dragIndex, hoverIndex);
//   };

//   const renderImage = (image, index) => {
//     let imageUrl = "/placeholder.svg"; // Default placeholder image

//     if (image instanceof File) {
//       imageUrl = URL.createObjectURL(image);
//     } else if (typeof image === "string") {
//       imageUrl = image.startsWith("/")
//         ? `${process.env.REACT_APP_API_URL}${image}`
//         : image;
//     } else if (image && image.secure_url) {
//       // Handle case where image is an object with a secure_url property
//       imageUrl = image.secure_url.startsWith("http")
//         ? image.secure_url
//         : `${process.env.REACT_APP_API_URL}${image.secure_url}`;
//     }

//     return (
//       <DraggableImage
//         key={index}
//         index={index}
//         image={imageUrl}
//         moveImage={moveImage}
//         onRemoveImage={() => {
//           const updatedImages = [...images];
//           updatedImages.splice(index, 1);
//           setImages(updatedImages);
//         }}
//       />
//     );
//   };

//   return (
//     <DndProvider
//       backend={isTouchDevice() ? TouchBackend : HTML5Backend}
//       options={{ enableMouseEvents: true }}
//     >
//       <div className="mt-4 grid grid-cols-5 gap-4">
//         {images.map((image, index) => renderImage(image, index))}
//       </div>
//     </DndProvider>
//   );
// };

// const DraggableImage = ({ image, index, moveImage, onRemoveImage }) => {
//   const ref = React.useRef(null);

//   const [{ isDragging }, drag] = useDrag({
//     type: "image",
//     item: () => ({ index }),
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const [, drop] = useDrop({
//     accept: "image",
//     hover: (item, monitor) => {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;

//       if (dragIndex === hoverIndex) {
//         return;
//       }

//       const hoverBoundingRect = ref.current?.getBoundingClientRect();
//       const hoverMiddleY =
//         (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       const clientOffset = monitor.getClientOffset();
//       const hoverClientY = clientOffset.y - hoverBoundingRect.top;

//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return;
//       }

//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return;
//       }

//       moveImage(dragIndex, hoverIndex);
//       item.index = hoverIndex;
//     },
//   });

//   drag(drop(ref));

//   return (
//     <div
//       ref={ref}
//       className={`relative ${isDragging ? "opacity-50" : ""}`}
//       style={{ cursor: "move" }}
//     >
//       <img
//         src={image || "/placeholder.svg"}
//         alt={`Preview ${index + 1}`}
//         className="h-24 w-24 object-cover rounded-md"
//         onError={(e) => {
//           e.target.src = "/placeholder.svg";
//         }}
//         draggable={false}
//         onTouchStart={(e) => e.preventDefault()}
//       />
//       <button
//         type="button"
//         onClick={onRemoveImage}
//         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
//       >
//         ×
//       </button>
//     </div>
//   );
// };

// export default DraggableImageGrid;
