import { stringArg, arg } from "nexus/dist/core"

import { buildArgs } from "../../helpers"
import { DynamicIdArg } from "./dynamic-id-arg"

export const MetaArgs = buildArgs({
    id: arg({ type: DynamicIdArg, nullable: true, description: "Define custom id field" }),
    name: stringArg({ nullable: true, description: "Custom field mapped to name property", default: "name" }),
    db: stringArg({ nullable: true, description: "Entity database" }),
    collection: stringArg({ nullable: false, description: "Entity collection" }),
})
