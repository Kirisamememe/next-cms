import { Button } from "@/components/ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bot, Redo2, Sparkles, Undo2 } from "lucide-react"
import { AIModelSelector } from "../../../_components/content/ai-model-selector"
import { Heading } from "@/components/ui/typography"
import { Textarea } from "@/components/ui/textarea"
import { useLocale, useTranslations } from "next-intl"
import { useForm, UseFormReturn } from "react-hook-form"
import { articleSubmitFormSchema } from "@/types"
import type { AIModel } from "@/types"
import { useEffect, useState } from "react"
import { aiArticleRequestSchema, aiArticleResponseSchema } from "@/types/schema-ai"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormError } from "../../../_components/content/form-error"
import { experimental_useObject as useObject } from 'ai/react';
import { MDXEditorMethods } from "@mdxeditor/editor"
import { FlexRow } from "@/components/ui/flexbox"
import { useScrollState } from "../../../_components/scroll-state-provider"
import { cn } from "@/lib"
import { LanguageSelector } from "../../../_components/content/language-selector"
import { Locale } from "@/i18n"
import Cookies from "js-cookie";
import { z } from "zod"

type Props = {
  form: UseFormReturn<z.infer<typeof articleSubmitFormSchema>, any, undefined>
  mdxRef: React.RefObject<MDXEditorMethods | null>
}

export const AIAssistant = ({ form, mdxRef }: Props) => {
  const t = useTranslations()
  const { isGoingUp } = useScrollState()
  const locale = useLocale() as Locale

  const [prevValues, setPrevValues] = useState<z.infer<typeof articleSubmitFormSchema>>()
  const [undone, setUndone] = useState(false)

  const { object, submit, error, isLoading, stop } = useObject({
    api: '/api/generate-article',
    schema: aiArticleResponseSchema,
    onFinish: ({ object }) => {
      form.setValue('body', object?.body || '')
    }
  })

  const aiForm = useForm<z.infer<typeof aiArticleRequestSchema>>({
    resolver: zodResolver(aiArticleRequestSchema),
    mode: "onChange",
    defaultValues: {
      model: (Cookies.get('AI_MODEL') || 'gpt-4o') as AIModel,
      language: locale,
      prompt: '',
      context: ''
    }
  })

  const handleSubmit = () => {
    if (!aiForm.trigger()) return
    const values = form.watch()
    setPrevValues(values)
    const contextObj = {
      ...(values.title && {
        title: values.title
      }),
      ...(values.slug && {
        slug: values.slug
      }),
      ...(values.summary && {
        summary: values.summary
      }),
      ...(values.body && {
        body: values.body
      })
    }
    if (Object.entries(contextObj).length) {
      aiForm.setValue('context', JSON.stringify(contextObj))
    }
    submit(aiForm.getValues())
  }

  const handleUndo = () => {
    form.setValue('slug', prevValues?.slug || '')
    form.setValue('title', prevValues?.title)
    form.setValue('summary', prevValues?.summary)
    mdxRef.current?.setMarkdown(prevValues?.body || '')
    form.setValue('body', prevValues?.body || '')
    setUndone(true)
  }

  const handleRedo = () => {
    form.setValue('slug', object?.slug || '')
    form.setValue('title', object?.title)
    form.setValue('summary', object?.summary)
    mdxRef.current?.setMarkdown(object?.body || '')
    form.setValue('body', object?.body || '')
    setUndone(false)
  }

  useEffect(() => {
    if (!object || !isLoading) return
    form.setValue('slug', object?.slug || '')
    form.setValue('title', object?.title)
    form.setValue('summary', object?.summary)
    mdxRef.current?.setMarkdown(object?.body || '')
  }, [form, isLoading, mdxRef, object])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button" size={'icon'} variant={'secondary'}
          className={cn(
            "sticky mt-auto ml-auto mr-2 bottom-4 w-fit rounded-full size-14 bg-muted/30 outline outline-1 outline-foreground/15 transition-all duration-300",
            "@[80rem]:backdrop-blur-md @[80rem]:opacity-100",
            isGoingUp ? "backdrop-blur-md opacity-100" : "opacity-30"
          )}>
          <Bot />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end" alignOffset={-8} sideOffset={16}
        onInteractOutside={(e) => e.preventDefault()}
        className="w-[22.5rem] @[80rem]:w-96 border-none outline outline-1 outline-foreground/5 dark:outline-foreground/15 shadow-2xl shadow-black/40 dark:shadow-primary/20 rounded-xl">
        <form className="flex flex-col gap-4">
          <Heading>
            {t('article.aiAssistant.title')}
          </Heading>
          <AIModelSelector
            {...aiForm.register('model')}
            defaultValue={aiForm.formState.defaultValues?.model}
            disabled={isLoading}
            onValueChange={(value: AIModel) => {
              aiForm.setValue('model', value)
              Cookies.set('AI_MODEL', value)
            }}
          />
          <LanguageSelector
            {...aiForm.register('language')}
            defaultValue={locale}
            onValueChange={(value: Locale) => aiForm.setValue('language', value)}
          />
          <Textarea
            disabled={isLoading} className="resize-none"
            placeholder={t('article.aiAssistant.prompt.placeholder')}
            {...aiForm.register('prompt')}
          />
          <FormError message={error?.message} />
          <FlexRow gap={3}>
            {isLoading && (
              <Button type="button" onClick={stop} variant={'destructive'}>
                {t('common.stop')}
              </Button>
            )}
            {!isLoading && prevValues && (
              <Button type="button" size={'icon'} variant={'outline'} onClick={undone ? handleRedo : handleUndo}>
                {undone ? (<Redo2 size={16} />) : (<Undo2 size={16} />)}
              </Button>
            )}
            <PopoverClose asChild>
              <Button variant={'outline'} className="ml-auto">
                {t('common.close')}
              </Button>
            </PopoverClose>
            <Button type="button" onClick={handleSubmit} isPending={isLoading} className="w-fit pl-5 pr-6">
              <Sparkles size={16} />
              {t('common.generate')}
            </Button>
          </FlexRow>
        </form>
      </PopoverContent>
    </Popover>
  )
}