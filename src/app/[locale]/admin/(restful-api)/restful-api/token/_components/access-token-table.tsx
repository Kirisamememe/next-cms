import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AccessTokenCell } from "./access-token-cell"
import { accessTokenService } from "@/services/access-token-service"
import { format } from "date-fns/format"
import { getLocale, getTranslations } from "next-intl/server"
import { getLocaleForFns } from "@/i18n/get-locale"
import { DeleteAccessToken } from "./delete-token"

export async function AccessTokenTable() {
  const { data, noData } = await accessTokenService.getManyWithAuthor()
  const locale = await getLocale()
  const t = await getTranslations()

  if (noData) {
    return null
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            {t('restfulApi.token.table.name')}
          </TableHead>
          <TableHead>
            {t('restfulApi.token.table.token')}
          </TableHead>
          <TableHead>
            {t('restfulApi.token.table.createdAt')}
          </TableHead>
          <TableHead>
            {t('restfulApi.token.table.expiresAt')}
          </TableHead>
          <TableHead>
            {t('restfulApi.token.table.createdBy')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((token) => (
          <TableRow key={token.token}>
            <TableCell>{token.name}</TableCell>
            <TableCell>
              <AccessTokenCell token={token.token} />
            </TableCell>
            <TableCell className="text-nowrap">
              {format(token.createdAt, "PPP p", { locale: getLocaleForFns(locale) })}
            </TableCell>
            <TableCell className="text-nowrap">
              {format(token.expiresAt, "PPP p", { locale: getLocaleForFns(locale) })}
            </TableCell>
            <TableCell className="text-nowrap">
              {token.author.nickname || token.author.name}
            </TableCell>
            <TableCell>
              <DeleteAccessToken token={token.token} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}