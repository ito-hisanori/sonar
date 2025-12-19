import React from "react";

function InfoMessages({ message }: { message: string }) {
  return (
    <div className="p-5 border bg-gray-100 text-sm border-gray-400 rounded">
      {message}
    </div>
  );
}

export default InfoMessages;
