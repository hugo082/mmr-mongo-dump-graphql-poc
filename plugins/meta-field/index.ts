import { plugin, extendType } from "nexus"
import { isArray } from "util"

import { EntityMeta } from "./meta-object"
import { DynamicIdArg, defaultValues } from "./dynamic-id-arg"
import { Args, MetaFieldConfig, MetaType } from "./types"
import { NexusGenObjectNames } from "../../generated/typings"

const resolveMeta = (args: Partial<Args>): MetaType => {
    if (!args.collection) {
        throw new Error("Entity collection is required")
    }

    return {
        database: args.db ?? "default_db",
        collection: args.collection,
        id: args.id ?? defaultValues,
    }
}

export default (config: MetaFieldConfig) => plugin({
    name: "MetaField",
    description: "Implement schema metadata field from query arguments",
    onBeforeBuild: (builder) => {
        builder.addType(DynamicIdArg)
        builder.addType(EntityMeta)

        config.fields.forEach(fieldName => {
            const extension: any = extendType({
                type: fieldName,
                definition(t) {
                    t.string("id", { description: "Id value" })
                    t.string("name", { description: "Custom name field", nullable: true })
                }
            })

            builder.addType(extension)
        })

    },
    onCreateFieldResolver: () => {
        return async (root, args: Partial<Args>, ctx, info, next) => {
            if (config.fields.includes(info.fieldName as NexusGenObjectNames) === false) {
                return await next(root, args, ctx, info)
            }

            const meta = resolveMeta(args)
            const data = await next(root, args, { ...ctx, meta }, info)

            const resolve = (item: any) => ({
                _meta: meta,
                data: item,
                id: item[meta.id.field],
                name: item[args.name]
            })

            return isArray(data) ? data.map(resolve) : resolve(data)
        }
    }
})

export { Args as MetaArgsType, MetaType, DynamicIdType } from "./types"
export { MetaArgs } from "./meta-args"
