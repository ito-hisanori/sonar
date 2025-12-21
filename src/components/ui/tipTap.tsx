"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useEffect, useState } from "react";

import { EditorMenu } from "./editorMenu";
import Heading from "@tiptap/extension-heading";

interface TiptapProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const Tiptap = ({ value, onChange, placeholder }: TiptapProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Placeholder.configure({ placeholder: "Type / to browse options" }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);

      const currentLine = editor.state.doc.textBetween(
        editor.state.selection.$anchor.start(),
        editor.state.selection.$anchor.end(),
        "\n"
      );

      if (currentLine.trim() === "/") {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }

      setTimeout(() => {
        if (editor.isEmpty) {
          editor.commands.clearNodes();
        }
      }, 0);
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  const addHeading = useCallback(
    (level: 1 | 2 | 3) => {
      if (!editor) return;
      const { from } = editor.state.selection;

      editor
        .chain()
        .focus()
        .deleteRange({ from: from - 1, to: from })
        .insertContent(" ")
        .setNode("paragraph")
        .toggleHeading({ level })
        .run();

      setShowMenu(false);
    },
    [editor]
  );

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-300 rounded-lg">
      <EditorContent editor={editor} className="w-full h-full pl-4 pt-2" />
      {showMenu && <EditorMenu addHeading={addHeading} />}
    </div>
  );
};

export default Tiptap;
