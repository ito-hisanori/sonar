import React from "react";

interface DivelogFormImageProps {
  image: string;
  index: number;
  handleDelete: (index: number) => void;
}

function DivelogFormImage({
  image,
  index,
  handleDelete,
}: DivelogFormImageProps) {
  return (
    <div key={index} className="flex flex-col items-center border p-2 ">
      <img
        src={image}
        alt={`Selected ${index}`}
        className="w-20 h-20 object-cover rounded-md"
      />
      <h1
        className="text-sm cursor-pointer  underline mt-2 rounded"
        onClick={() => handleDelete(index)}
      >
        Delete
      </h1>
    </div>
  );
}

export default DivelogFormImage;
