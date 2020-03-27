import { stringArg } from "nexus/dist/core";

import { buildArgs } from "../../helpers";

export const EntityArgs = buildArgs({
    name: stringArg({ nullable: false, description: "Entity collection name" }),
    database: stringArg({ nullable: true, description: "Entity database"}),
    ids: stringArg({ list: true, nullable: true }),
})

export interface EntityArgsType {
    name: string
    database?: string
    ids?: string[]
}
