type Props = {
  addHeading: (level: 1 | 2 | 3) => void;
};

export const EditorMenu = (props: Props) => {
  const { addHeading } = props;

  return (
    <div className="bg-white border border-gray-300 shadow-lg p-2 rounded-lg mt-2">
      <button
        onClick={() => addHeading(1)}
        className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
      >
        見出し 1
      </button>
      <button
        onClick={() => addHeading(2)}
        className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
      >
        見出し 2
      </button>
      <button
        onClick={() => addHeading(3)}
        className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
      >
        見出し 3
      </button>
    </div>
  );
};
