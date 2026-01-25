'use client';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

import type { BlockNoteContent } from '@/lib/mock-data';

interface BlocknoteRendererProps {
  content: BlockNoteContent;
  className?: string;
}

export default function BlocknoteRenderer({ content, className }: BlocknoteRendererProps) {
  const editor = useCreateBlockNote({
    initialContent: content,
  });

  return <BlockNoteView editor={editor} editable={false} className={className} />;
}
