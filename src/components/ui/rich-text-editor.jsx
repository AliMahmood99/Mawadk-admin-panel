"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] border rounded-md bg-muted/20 flex items-center justify-center">
      <span className="text-muted-foreground text-sm">Loading editor...</span>
    </div>
  ),
});

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "",
  className = "",
  dir = "ltr",
}) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  // Note: "bullet" is not a separate format - "list" handles both ordered and bullet
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "align",
    "link",
  ];

  return (
    <div className={`rich-text-editor ${className}`} dir={dir}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-background rounded-md"
      />
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 150px;
          font-size: 14px;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background: hsl(var(--muted) / 0.3);
        }
        .rich-text-editor .ql-editor {
          min-height: 150px;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          font-style: normal;
          color: hsl(var(--muted-foreground));
        }
        .rich-text-editor[dir="rtl"] .ql-editor {
          text-align: right;
          direction: rtl;
        }
      `}</style>
    </div>
  );
}
