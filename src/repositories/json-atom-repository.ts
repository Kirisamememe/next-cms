import 'server-only'
import { prisma } from "@/prisma";
import { JsonAtom } from "@/types";
import { injectable } from "inversify";

export interface IJsonAtomRepository {
  updateSelectedAt: (atomId: number) => Promise<JsonAtom>
}

@injectable()
export class JsonAtomRepository implements IJsonAtomRepository {

  updateSelectedAt(atomId: number) {
    return prisma.jsonAtom.update({
      where: {
        id: atomId
      },
      data: {
        selectedAt: new Date(),
        jsonContent: {
          update: {
            updatedAt: new Date()
          }
        }
      }
    })
  }
}