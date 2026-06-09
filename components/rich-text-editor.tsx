"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ImageExtension from "@tiptap/extension-image"
import LinkExtension from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { useCallback, useRef, useState } from "react"
import {
  Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote, Code2,
  Undo, Redo, Image as ImageIcon, Link as LinkIcon, Heading1, Heading2, Heading3,
} from "lucide-react"

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const initialContentRef = useRef(content)
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      ImageExtension.configure({
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-teal-400 underline" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: initialContentRef.current,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[300px] p-4 focus:outline-none text-foreground/80",
      },
    },
    immediatelyRender: false,
  })

  const uploadImage = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      editor?.chain().focus().setImage({ src: reader.result as string }).run()
    }
    reader.readAsDataURL(file)
  }, [editor])

  const handleImageUpload = useCallback(() => {
    const input = fileInputRef.current
    if (!input || !editor) return
    input.onchange = () => {
      const file = input.files?.[0]
      if (file) uploadImage(file)
      input.value = ""
    }
    input.click()
  }, [editor, uploadImage])

  const addLink = useCallback(() => {
    if (!editor || !linkUrl) return
    if (linkUrl) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
    }
    setLinkUrl("")
    setShowLinkInput(false)
  }, [editor, linkUrl])

  if (!editor) {
    return <div className="h-[300px] bg-slate-900 rounded-lg animate-pulse" />
  }

  const ToolbarButton = ({ onClick, active, children, title }: {
    onClick: () => void; active?: boolean; children: React.ReactNode; title: string
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded hover:bg-secondary transition-colors ${active ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
    >
      {children}
    </button>
  )

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-0.5 pr-2 border-r border-border">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
            <Strikethrough size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code">
            <Code size={16} />
          </ToolbarButton>
        </div>
        <div className="flex items-center gap-0.5 px-2 border-r border-border">
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
            <Heading1 size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
            <Heading2 size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
            <Heading3 size={16} />
          </ToolbarButton>
        </div>
        <div className="flex items-center gap-0.5 px-2 border-r border-border">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List">
            <ListOrdered size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
            <Quote size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block">
            <Code2 size={16} />
          </ToolbarButton>
        </div>
        <div className="flex items-center gap-0.5 px-2 border-r border-border">
          <ToolbarButton onClick={handleImageUpload} title="Insert Image">
            <ImageIcon size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => setShowLinkInput(!showLinkInput)} active={editor.isActive("link")} title="Insert Link">
            <LinkIcon size={16} />
          </ToolbarButton>
        </div>
        <div className="flex items-center gap-0.5 px-2">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
            <Undo size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
            <Redo size={16} />
          </ToolbarButton>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className="flex items-center gap-2 p-2 bg-secondary/50 border-b border-border">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Paste URL..."
            className="flex-1 bg-background border border-border rounded px-2 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/20"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLink() } }}
          />
          <button onClick={addLink} className="px-3 py-1 bg-foreground text-background text-sm rounded hover:bg-foreground/90 transition-colors">
            Add
          </button>
        </div>
      )}

      {/* Editor content */}
      <EditorContent editor={editor} />
    </div>
  )
}
