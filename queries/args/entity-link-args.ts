import { inputObjectType, arg } from "nexus/dist/core"

import { EntityArgs, EntityArgsType } from "./entity-args"
import { buildArgs } from "../../helpers"

export const LinkArg = inputObjectType({
    name: "LinkArg",
    definition(t) {
        t.string("field", { description: "Field name od the link", nullable: false })
        t.boolean("list", { default: false })
    },
});

export const EntityLinkArgs = buildArgs({
    ...EntityArgs,
    link: arg({ type: LinkArg, nullable: false })
})

export interface EntityLinkArgsType extends EntityArgsType {
    link: {
        field: string
        list: boolean
    }
}
