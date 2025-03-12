import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

const DraggableImageGrid = ({ images, setImages, onMove }) => {
  const moveImage = (dragIndex, hoverIndex) => {
    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);
    setImages(updatedImages);

    // Execute the onMove callback if provided
    if (onMove) onMove(dragIndex, hoverIndex);
  };

  const renderImage = (image, index) => {
    let imageUrl = "/placeholder.svg"; // Default placeholder image

    if (image instanceof File) {
      imageUrl = URL.createObjectURL(image);
    } else if (typeof image === "string") {
      imageUrl = image.startsWith("/")
        ? `${process.env.REACT_APP_API_URL}${image}`
        : image;
    } else if (image && image.secure_url) {
      // Handle case where image is an object with a secure_url property
      imageUrl = image.secure_url.startsWith("http")
        ? image.secure_url
        : `${process.env.REACT_APP_API_URL}${image.secure_url}`;
    }

    return (
      <DraggableImage
        key={index}
        index={index}
        image={imageUrl}
        moveImage={moveImage}
        onRemoveImage={() => {
          const updatedImages = [...images];
          updatedImages.splice(index, 1);
          setImages(updatedImages);
        }}
      />
    );
  };

  return (
    <DndProvider
      backend={isTouchDevice() ? TouchBackend : HTML5Backend}
      options={{ enableMouseEvents: true }}
    >
      <div className="mt-4 grid grid-cols-5 gap-4">
        {images.map((image, index) => renderImage(image, index))}
      </div>
    </DndProvider>
  );
};

const DraggableImage = ({ image, index, moveImage, onRemoveImage }) => {
  const ref = React.useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`relative ${isDragging ? "opacity-50" : ""}`}
      style={{ cursor: "move" }}
    >
      <img
        src={image || "/placeholder.svg"}
        alt={`Preview ${index + 1}`}
        className="h-24 w-24 object-cover rounded-md"
        onError={(e) => {
          e.target.src = "/placeholder.svg";
        }}
        draggable={false}
        onTouchStart={(e) => e.preventDefault()}
      />
      <button
        type="button"
        onClick={onRemoveImage}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
      >
        ×
      </button>
    </div>
  );
};

export default DraggableImageGrid;

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
//     const imageUrl =
//       image instanceof File
//         ? URL.createObjectURL(image)
//         : image.startsWith("/")
//         ? `${process.env.REACT_APP_API_URL}${image}`
//         : image;

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

// import React from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// const DraggableImageGrid = ({ images, setImages, onMove }) => {
//   const moveImage = (dragIndex, hoverIndex) => {
//     const updatedImages = [...images];
//     const [draggedImage] = updatedImages.splice(dragIndex, 1);
//     updatedImages.splice(hoverIndex, 0, draggedImage);
//     setImages(updatedImages);
//   };

//   const renderImage = (image, index) => {
//     const imageUrl =
//       image instanceof File
//         ? URL.createObjectURL(image)
//         : image.startsWith("/")
//         ? `${process.env.REACT_APP_API_URL}${image}`
//         : image;

//     return (
//       <DraggableImage
//         key={index}
//         index={index}
//         image={imageUrl}
//         moveImage={moveImage}
//         onMove={onMove} // Pass onMove to DraggableImage
//       />
//     );
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="mt-4 grid grid-cols-5 gap-4">
//         {images.map((image, index) => renderImage(image, index))}
//       </div>
//     </DndProvider>
//   );
// };

// const DraggableImage = ({ image, index, moveImage, onRemoveImage, onMove }) => {
//   const ref = React.useRef(null);

//   const [, drag] = useDrag({
//     type: "image",
//     item: { index },
//   });

//   const [, drop] = useDrop({
//     accept: "image",
//     hover: (item) => {
//       if (item.index !== index) {
//         moveImage(item.index, index);
//         item.index = index;
//       }
//     },
//     drop: (item) => {
//       // Only call onMove when the item is dropped
//       if (item.index !== index) {
//         onMove(item.index, index);
//       }
//     },
//   });

//   drag(drop(ref));

//   return (
//     <div ref={ref} className="relative">
//       <img
//         src={image || "/placeholder.svg"}
//         alt={`Preview ${index + 1}`}
//         className="h-24 w-24 object-cover rounded-md"
//         onError={(e) => {
//           e.target.src = "/placeholder.svg";
//         }}
//       />
//       <button
//         type="button"
//         onClick={() => onRemoveImage(index)}
//         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
//       >
//         ×
//       </button>
//     </div>
//   );
// };
// export default DraggableImageGrid;
