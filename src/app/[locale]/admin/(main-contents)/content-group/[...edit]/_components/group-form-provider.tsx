"use client";

import { Form } from "@/components/ui/form";
import {
  contentGroupSchema,
  FormState,
  ContentListItem,
  ContentGroupSingleItemForClient,
  ContentType,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContext,
  use,
  useActionState,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createContentGroup } from "../_actions/create";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n";
import { updateContentGroup } from "../_actions/update";

type GroupFormContextType = {
  pending: boolean;
  state: FormState;
  form: UseFormReturn<z.infer<typeof contentGroupSchema>>;
  listMap: Record<ContentType, ContentListItem[]>;
  setListData: (data: ContentListItem[], type: ContentType) => void;
  groupValues?: ContentGroupSingleItemForClient;
};

const GroupFormContext = createContext<GroupFormContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
  groupValues?: ContentGroupSingleItemForClient;
};

export const GroupFormProvider = ({ children, groupValues }: Props) => {
  const [selectedArticles, _setSelectedArticles] = useState<ContentListItem[]>(
    groupValues?.articles || []
  );
  const [selectedJsons, _setSelectedJsons] = useState<ContentListItem[]>(
    groupValues?.jsonContents || []
  );
  const [selectedMediaFolders, _setSelectedMediaFolders] = useState<
    ContentListItem[]
  >(groupValues?.mediaFolders || []);

  const t = useTranslations();
  const router = useRouter();

  const form = useForm<z.infer<typeof contentGroupSchema>>({
    resolver: zodResolver(contentGroupSchema),
    mode: "onChange",
    defaultValues: {
      name: groupValues?.name || "",
      description: groupValues?.description || "",
      permissionLevel: groupValues?.permissionLevel || 3,
      imageId: groupValues?.imageId || null,
      articles: groupValues?.articles.map((item) => Number(item.id)) || [],
      jsonContents:
        groupValues?.jsonContents.map((item) => Number(item.id)) || [],
      mediaFolders: groupValues?.mediaFolders.map((item) => item.id) || [],
    },
  });

  const setListData = useCallback(
    (data: ContentListItem[], type: ContentType) => {
      if (type === "articles") {
        _setSelectedArticles(data);
        form.setValue(
          type,
          data.map((item) => Number(item.id))
        );
      } else if (type === "jsonContents") {
        _setSelectedJsons(data);
        form.setValue(
          type,
          data.map((item) => Number(item.id))
        );
      } else if (type === "mediaFolders") {
        _setSelectedMediaFolders(data);
        form.setValue(
          type,
          data.map((item) => item.id)
        );
      }
    },
    [form]
  );

  const [state, action, pending] = useActionState<FormState>(
    async () => {
      const validation = await form.trigger();
      if (!validation) {
        return { isSuccess: false };
      }

      const values = form.getValues();
      const data = groupValues
        ? await updateContentGroup(groupValues.id, values)
        : await createContentGroup(values);
      if (!data.isSuccess) {
        toast({
          title: "Error",
          description: t(data.error?.message ?? ""),
          variant: "destructive",
        });
        return data;
      }

      toast({
        title: t("common.form.success"),
        description: t("common.form.saved"),
      });
      router.push(`/admin/content-group`);
      return { isSuccess: true };
    },
    { isSuccess: false }
  );

  const values = useMemo(
    () => ({
      pending,
      state,
      form,
      listMap: {
        articles: selectedArticles,
        jsonContents: selectedJsons,
        mediaFolders: selectedMediaFolders,
      },
      setListData,
      groupValues,
    }),
    [
      form,
      groupValues,
      pending,
      selectedArticles,
      selectedJsons,
      selectedMediaFolders,
      setListData,
      state,
    ]
  );

  return (
    <GroupFormContext value={values}>
      <Form {...form}>
        <form
          action={action}
          className="flex flex-col @[54rem]:flex-row @[54rem]:h-[calc(100vh-4rem)]"
        >
          {children}
        </form>
      </Form>
    </GroupFormContext>
  );
};

export const useGroupFormContext = () => {
  const context = use(GroupFormContext);
  if (context === undefined) {
    throw new Error(
      "useGroupFormContext must be used within a GroupFormProvider"
    );
  }

  return context;
};
