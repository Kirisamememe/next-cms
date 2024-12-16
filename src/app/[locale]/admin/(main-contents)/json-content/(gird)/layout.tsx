import { useTranslations } from "next-intl";
import { InsetLayoutWithPadding } from "../../../_components/inset-layout-with-padding";
import { NewContentBtnContainer } from "../../../_components/content/new-content-button-container";
import { JsonContentTabs } from "../_components/tabs";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const t = useTranslations()

  return (
    <>
      <JsonContentTabs />
      <NewContentBtnContainer href={'/admin/json-content/new'} label={t('jsonContent.form.newBtn')} />
      <InsetLayoutWithPadding className="@[40rem]:-mt-2">
        {children}
      </InsetLayoutWithPadding>
    </>
  )
}