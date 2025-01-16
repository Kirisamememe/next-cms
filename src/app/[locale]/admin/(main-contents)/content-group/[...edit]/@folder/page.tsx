import { mediaFolderService } from "@/di/services";
import { GroupFormContentContainer } from "../_components/content-container";
import { ContentSearch } from "../_components/content-search";
import { FolderSelector } from "../_components/selector-folder";
import { SelectedItem } from "../_components/selected-item";


export default function Page() {
  const folders = mediaFolderService.fetchMany()

  return (
    <GroupFormContentContainer type="mediaFolders" className="row-span-2">
      <ContentSearch placeholder="mediaFolders" query="searchFolder">
        <FolderSelector list={folders} />
      </ContentSearch>
      <SelectedItem type="mediaFolders" />
    </GroupFormContentContainer>
  )
}