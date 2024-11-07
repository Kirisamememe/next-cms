'use client'

import { CircleSpinLoading } from '@/components/circle-spin-loading'
import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor'
import dynamic from 'next/dynamic'
import { forwardRef } from 'react'

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import('./initialized-mdx-editor'), {
  ssr: false,
  loading: () => <CircleSpinLoading />
})

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const MDXEditor = forwardRef<
  MDXEditorMethods, MDXEditorProps
>((props, ref) => (
  <Editor {...props} editorRef={ref} />
))

// TS complains without the following line
MDXEditor.displayName = 'MDXEditor'