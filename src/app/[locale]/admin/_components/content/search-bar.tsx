'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname } from "@/i18n"
import { TextSearch, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce';
import { ComponentProps, useRef } from "react"

type Props = {
  query: string
  placeholder?: string
} & ComponentProps<"input">

export const SearchBar = ({ query, placeholder, ...props }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchStr = searchParams.get(query)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)

    if (e.target?.value) {
      params.set(query, e.target.value)
    } else {
      params.delete(query)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  const clear = () => {
    const params = new URLSearchParams(searchParams)
    params.delete(query)
    router.replace(`${pathname}?${params.toString()}`)

    if (!inputRef.current) return
    inputRef.current.value = ''
  }

  return (
    <div className="relative w-full">
      <TextSearch size={16} className="absolute left-3 top-3" />
      <Input
        ref={inputRef}
        className="flex-grow pl-10 rounded-lg hover:border-foreground/30 transition-colors"
        placeholder={placeholder}
        onChange={handleOnChange}
        defaultValue={searchStr?.toString()}
        {...props}
      />
      {searchStr &&
        <Button variant={'ghost'} size={'icon'} className="absolute right-1 size-8 top-1 rounded-md hover:bg-foreground/10" onClick={clear}>
          <X size={16} />
        </Button>
      }
    </div>
  )
}