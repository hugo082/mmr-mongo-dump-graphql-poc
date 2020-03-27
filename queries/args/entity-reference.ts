import { inputObjectType, arg } from "nexus/dist/core"

import { EntityArgs, EntityArgsType } from "./entity-args"
import { buildArgs } from "../../helpers"

export const ReferenceArg = inputObjectType({
    name: "ReferenceArg",
    definition(t) {
        t.string("field", { description: "Field name od the link", nullable: false })
        t.boolean("list", { default: false })
    },
});

export const EntityReferenceArgs = buildArgs({
    ...EntityArgs,
    ref: arg({ type: ReferenceArg, nullable: false })
})

export interface EntityReferenceArgsType extends EntityArgsType {
    ref: {
        field: string
        list: boolean
    }
}
