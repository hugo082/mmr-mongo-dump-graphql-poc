import { stringArg } from "nexus/dist/core";

import { buildArgs } from "../../helpers";
import { MetaArgs, MetaArgsType } from "../../plugins/meta-field";

export const EntityArgs = buildArgs({
    ...MetaArgs,
    ids: stringArg({ list: true, nullable: true }),
})

export interface EntityArgsType extends MetaArgsType {
    ids?: string[]
}
