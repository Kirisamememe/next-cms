import { redirect } from "@/i18n/routing";


// This page only renders when the app is built statically (output: 'export')
export default function LocaleWrapperPage() {

  redirect({ href: '/', locale: 'en' });
}