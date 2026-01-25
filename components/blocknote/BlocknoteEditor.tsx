'use client';

import dynamic from 'next/dynamic';

const BlocknoteClient = dynamic(() => import('./BlocknoteClient'), {
  ssr: false,
});

export default function BlocknoteEditor() {
  return <BlocknoteClient />;
}
