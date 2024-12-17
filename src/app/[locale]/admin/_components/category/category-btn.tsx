'use client'

import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "@/i18n/routing"
import { cn } from "@/lib"
import { CategoryType, FormState } from "@/types"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useActionState, useRef } from "react"
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover"
import { createArticleCategory, createJsonContentCategory } from "../../_actions/create"
import { Submit } from "@/components/ui/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FlexRow } from "@/components/ui/flexbox"

type CategoryBtnProps = {
  categoryId: number
  name: string
}

export function CategoryBtn({ categoryId, name }: CategoryBtnProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const category = searchParams.get('category')

  const handleOnClick = () => {
    const params = new URLSearchParams(searchParams)

    if (categoryId.toString() === category) {
      params.delete('category')
    } else {
      params.set('category', categoryId.toString())
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Button
      size={'sm'} variant="outline" onClick={handleOnClick}
      className={cn(
        "rounded-full px-3 h-8 text-muted-foreground bg-card",
        (category === categoryId.toString()) && "border-primary bg-primary hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground font-semibold "
      )}>
      {name}
    </Button>
  )
}


type CreateCategoryBtnProps = {
  categoryType: CategoryType
  noCategory?: boolean
}

export function CreateCategoryBtn({ categoryType, noCategory = false }: CreateCategoryBtnProps) {
  const t = useTranslations()

  const btnRef = useRef<HTMLButtonElement>(null)

  const [state, action] = useActionState<FormState, FormData>(
    async (_: FormState, payload: FormData) => {
      const name = payload.get('name')?.toString()
      if (!name) {
        return { isSuccess: false }
      }

      if (categoryType === 'article') {
        const res = await createArticleCategory({ name })
        if (res.isSuccess) {
          btnRef.current?.click()
        }
        return res
      }
      else if (categoryType === 'json') {
        const res = await createJsonContentCategory({ name })
        if (res.isSuccess) {
          btnRef.current?.click()
        }
        return res
      }
      return { isSuccess: false }
    }, { isSuccess: false }
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" size={'sm'} variant="outline" className="rounded-full px-4 h-8 text-muted-foreground">
          {noCategory ? (
            <>
              <Plus size={16} />
              {t('common.category.newBtn')}
            </>) : (
            <Plus size={16} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form action={action} className="flex flex-col gap-3">
          <Label>
            {t('common.category.form.label')}
          </Label>
          <Input name="name" placeholder={t('common.category.form.placeholder')} aria-description={t('common.category.form.description')} />

          <FlexRow gap={3} className="ml-auto mt-2">
            <PopoverClose asChild>
              <Button type="button" variant="outline" ref={btnRef}>
                {t('common.close')}
              </Button>
            </PopoverClose>
            <Submit error={state.error} className="w-fit">
              {t('common.submit')}
            </Submit>
          </FlexRow>
        </form>
      </PopoverContent>
    </Popover>
  )
}