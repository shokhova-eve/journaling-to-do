"use client";

import { useEffect, useRef, useState } from "react";

interface InlineEditableTextProps {
  value: string;
  onSave: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
}

export function InlineEditableText({
  value,
  onSave,
  placeholder,
  multiline = false,
  className = "",
}: InlineEditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!editing) return;
    if (multiline) {
      // Place the cursor at the end instead of selecting everything, so
      // resuming a longer entry doesn't wipe it out on the next keystroke.
      const el = textareaRef.current;
      el?.focus();
      el?.setSelectionRange(el.value.length, el.value.length);
    } else {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing, multiline]);

  function startEditing() {
    setDraft(value);
    setEditing(true);
  }

  function commit() {
    setEditing(false);
    if (draft !== value) onSave(draft);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  if (editing) {
    const commonProps = {
      value: draft,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setDraft(e.target.value),
      onBlur: commit,
      placeholder,
      className: `w-full resize-none rounded border-none bg-transparent outline-none ${className}`,
    };

    if (multiline) {
      return (
        <textarea
          ref={textareaRef}
          {...commonProps}
          onKeyDown={(e) => {
            if (e.key === "Escape") cancel();
          }}
          rows={3}
        />
      );
    }

    return (
      <input
        ref={inputRef}
        {...commonProps}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") cancel();
        }}
      />
    );
  }

  return (
    <div
      onClick={startEditing}
      className={`cursor-text whitespace-pre-wrap ${value ? "" : "text-ink-soft/60"} ${className}`}
    >
      {value || placeholder}
    </div>
  );
}
