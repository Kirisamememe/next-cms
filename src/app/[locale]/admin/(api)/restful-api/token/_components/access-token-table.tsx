import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AccessTokenCell } from "./access-token-cell"
import { format } from "date-fns/format"
import { getLocale, getTranslations } from "next-intl/server"
import { getLocaleForFns } from "@/i18n"
import { DeleteAccessToken } from "./delete-token"
import { accessTokenService } from "@/di/services"

export async function AccessTokenTable() {
  const data = await accessTokenService.getManyWithAuthor()
  const locale = await getLocale()
  const t = await getTranslations()

  if (!data) {
    return null
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            {t('api.token.table.name')}
          </TableHead>
          <TableHead>
            {t('api.token.table.token')}
          </TableHead>
          <TableHead>
            {t('api.token.table.createdAt')}
          </TableHead>
          <TableHead>
            {t('api.token.table.expiresAt')}
          </TableHead>
          <TableHead>
            {t('api.token.table.createdBy')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((token) => (
          <TableRow key={token.token}>
            <TableCell>{token.name}</TableCell>
            <TableCell>
              <AccessTokenCell token={token.token.slice(0, 5) + '*'.repeat(32)} />
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