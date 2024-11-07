'use client'

// import '@mdxeditor/editor/style.css';
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
  sandpackPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  markdownShortcutPlugin,
  SandpackConfig,
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
  InsertSandpack,
  InsertAdmonition,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
} from '@mdxeditor/editor'


const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const reactSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent,
    },
  ],
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
  codeBlockPlugin({ defaultCodeBlockLanguage: 'txt',}),
  sandpackPlugin({ sandpackConfig: reactSandpackConfig }),
  codeMirrorPlugin({ codeBlockLanguages: { 
    '': '',
    txt: 'text',
    terminal: 'Terminal',
    js: 'JavaScript',
    ts: 'TypeScript',
    jsx: 'JSX',
    tsx: 'TSX',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    python: 'Python',
    java: 'Java',
    kotlin: 'Kotlin',
    swift: 'Swift',
    c: 'C',
    cpp: 'C++',
    csharp: 'C#',
    go: 'Go',
    rust: 'Rust',
    php: 'PHP',
    ruby: 'Ruby',
    scala: 'Scala',
    haskell: 'Haskell',
    perl: 'Perl',
    sql: 'SQL',
    shell: 'Shell',
    powershell: 'PowerShell',
    dart: 'Dart',
    groovy: 'Groovy',
    julia: 'Julia',
    lisp: 'Lisp',
    matlab: 'MATLAB',
    objectivec: 'Objective-C',
    pascal: 'Pascal',
    vb: 'Visual Basic',
    xml: 'XML',
    yaml: 'YAML',
    json: 'JSON',
    markdown: 'Markdown',
    latex: 'LaTeX',
    graphql: 'GraphQL',
    cobol: 'COBOL',
  }}),
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown }),
  directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
  markdownShortcutPlugin(),
]


export default function InitializedMDXEditor({
  editorRef,
  markdown,
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
      className=""
      contentEditableClassName="prose dark:prose-invert max-w-full font-sans prose-li:aria-[checked=false]:pl-6"
      plugins={allPlugins(markdown)}
      toMarkdownOptions={{
        
      }}
    />
  )
}



function ToolBar() {
  return (
    <div className='flex flex-wrap'>
      <DiffSourceToggleWrapper options={["source"]}>
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
        <InsertSandpack />
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
    </div>
    
  )
}


function whenInAdmonition(editorInFocus: EditorInFocus | null) {
  const node = editorInFocus?.rootNode
  if (!node || node.getType() !== 'directive') {
    return false
  }

  return ['note', 'tip', 'danger', 'info', 'caution'].includes((node as DirectiveNode).getMdastNode().name)
}