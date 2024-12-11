import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { hashSync, genSaltSync } from 'bcrypt-ts';
import { MediaFolder } from "@/types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function saltAndHashPassword(password: string): string {
  const salt = genSaltSync(12);
  const hashedPassword = hashSync(password, salt);

  return hashedPassword;
}

export function extractFirstNCharacters(text: string, n: number = 80): string {
  const lines = text.split('\n');
  const contentLines = lines.filter(line => !line.trim().startsWith('#'));
  const content = contentLines.join(' ').replace(/\s+/g, ' ').trim();
  return content.length > n ? content.slice(0, n) + '...' : content;
};

export function extractTitleFromMarkdown(markdown: string): string {
  const lines = markdown.split('\n');
  for (const line of lines) {
    if (line.startsWith('# ')) return line.slice(2).trim();
    if (line.startsWith('## ')) return line.slice(3).trim();
    if (line.startsWith('### ')) return line.slice(4).trim();
  }
  return markdown.slice(0, 15) + '...';
};


export const getTimeString = (date?: Date | null) => {
  if (!date) return "10:30:00"
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
}

export const combineDateAndTime = (date: Date | undefined, timeString: string) => {
  if (!date) return null
  const [hours, minutes, seconds] = timeString.split(':').map(Number)
  const newDate = new Date(date)
  newDate.setHours(hours, minutes, seconds)
  return newDate
}



export const removeNull = <T extends Record<string, any>>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj || {}).filter(([_, value]) => {
      if (typeof value === 'object') {
        return !!value.length
      }
      return value !== null
    })
  ) as Partial<T>
}



export const buildFolderTree = (folders: MediaFolder[], parentPath: string = '.'): MediaFolder[] => {
  return folders
    .filter(folder => folder.parentPath === parentPath)
    .map(folder => ({
      ...folder,
      children: buildFolderTree(folders, folder.path)
    }))
}


export function byteToMB(size: number) {
  return Math.floor(size / 1024 / 1024 * 100) / 100
}

export function checkOversize(size: number) {
  return size >= 1024 * 1024 * Number(process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE)
}


export function animateElement(
  element: HTMLElement | SVGElement,
  keyframes: PropertyIndexedKeyframes | Keyframe[] | null,
  options?: number | KeyframeAnimationOptions | undefined
) {
  return new Promise<{ finish: boolean }>((resolve, reject) => {
    if (!element) {
      reject({ finish: false })
    }
    const animation = element.animate(keyframes, options)

    animation.onfinish = () => {
      resolve({ finish: true })
    }
    animation.oncancel = () => {
      resolve({ finish: false })
    }
    animation.onremove = () => {
      resolve({ finish: false })
    }
  })
}