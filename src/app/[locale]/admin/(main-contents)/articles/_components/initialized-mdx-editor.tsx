'use client'


import type { ForwardedRef } from 'react'
import React from "react";
import {
  toolbarPlugin,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  codeBlockPlugin,
  // sandpackPlugin,
  // codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  markdownShortcutPlugin,
  // SandpackConfig,
  MDXEditorMethods,
  MDXEditor,
  MDXEditorProps,
  ConditionalContents,
  Separator,
  // BoldItalicUnderlineToggles,
  StrikeThroughSupSubToggles,
  ListsToggle,
  EditorInFocus,
  DirectiveNode,
  ChangeAdmonitionType,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  // InsertSandpack,
  InsertAdmonition,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  CodeBlockEditorDescriptor,
  useCodeBlockEditorContext,
} from '@mdxeditor/editor'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';


// const defaultSnippetContent = `
// export default function App() {
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }
// `.trim()

// const reactSandpackConfig: SandpackConfig = {
//   defaultPreset: 'react',
//   presets: [
//     {
//       label: 'React',
//       name: 'react',
//       meta: 'live',
//       sandpackTemplate: 'react',
//       sandpackTheme: 'light',
//       snippetFileName: '/App.js',
//       snippetLanguage: 'jsx',
//       initialSnippetContent: defaultSnippetContent,
//     },
//   ],
// }


const PlainTextCodeEditorDescriptor: CodeBlockEditorDescriptor = {
  // always use the editor, no matter the language or the meta of the code block
  match: (
    // language, meta
  ) => true,
  // You can have multiple editors with different priorities, so that there's a "catch-all" editor (with the lowest priority)
  priority: 0,
  // The Editor is a React component
  Editor: (props) => {
    const cb = useCodeBlockEditorContext()
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      cb.parentEditor.update(() => {
        cb.lexicalNode.remove()
      })
    }
    // stops the proppagation so that the parent lexical editor does not handle certain events.
    return (
      <div onKeyDown={(e) => {
        e.preventDefault()
        e.nativeEvent.stopImmediatePropagation()
      }}
        className='relative'
      >
        <Textarea
          lang='en'
          cols={20}
          defaultValue={props.code}
          className='resize-none font-mono field-sizing-content bg-muted/50'
          onChange={(e) => cb.setCode(e.target.value)}
        />
        <Button
          type='button' size={'icon'} variant={'outline'}
          className='absolute top-1 right-1 size-8 rounded-sm'
          onClick={handleDelete}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    )
  }
}


const allPlugins = (diffMarkdown: string) => [
  toolbarPlugin({ toolbarContents: () => <ToolBar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({ imageUploadHandler: async () => '/sample-image.png' }),
  tablePlugin(),
  thematicBreakPlugin(),
  codeBlockPlugin({ codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor] }),
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  markdownShortcutPlugin(),
]


export default function InitializedMDXEditor({
  editorRef,
  markdown,
  className,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      {...props}
      placeholder={
        <span className='text-xl text-muted-foreground/50'>
          Hello world!
        </span>
      }
      ref={editorRef}
      markdown={markdown}
      className={className}
      contentEditableClassName="prose dark:prose-invert max-w-full font-sans prose-li:aria-[checked=false]:pl-6 leading-loose"
      plugins={allPlugins(markdown)}
      toMarkdownOptions={{

      }}
    />
  )
}



function ToolBar() {
  return (
    <DiffSourceToggleWrapper options={["diff", "source"]}>
      <ConditionalContents
        options={[{ when: whenInAdmonition, contents: () => <ChangeAdmonitionType /> }, { fallback: () => <BlockTypeSelect /> }]}
      />

      {/* <BoldItalicUnderlineToggles />
        <Separator /> */}

      <StrikeThroughSupSubToggles />
      <Separator />

      <ListsToggle />
      <Separator />

      <CreateLink />
      <InsertImage />
      <Separator />

      <InsertTable />
      <InsertThematicBreak />
      <Separator />

      <InsertCodeBlock />
      {/* <InsertSandpack /> */}
      <ConditionalContents
        options={[
          {
            when: (editorInFocus) => !whenInAdmonition(editorInFocus),
            contents: () => (
              <>
                <Separator />
                <InsertAdmonition />
              </>
            )
          }
        ]}
      />
    </DiffSourceToggleWrapper>
  )
}


function whenInAdmonition(editorInFocus: EditorInFocus | null) {
  const node = editorInFocus?.rootNode
  if (!node || node.getType() !== 'directive') {
    return false
  }

  return ['note', 'tip', 'danger', 'info', 'caution'].includes((node as DirectiveNode).getMdastNode().name)
}