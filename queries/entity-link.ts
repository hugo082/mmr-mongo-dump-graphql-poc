import { objectType } from "nexus"

import { EntityLinkArgs, EntityLinkArgsType } from "./args/entity-link-args"
import { entityResolver } from "./entity"
import { EntityReferenceArgs } from "./args/entity-reference"
import { entityReferenceUniqueResolver, entityReferenceResolver } from "./entity-reference"
import { FieldNode } from "graphql"
import { RequiredFieldsResolver } from "../plugins/required-fields/types"

export const OBJECT_NAME = "EntityLink"

export const entityLinkResolver = (parent: any, args: EntityLinkArgsType) => {
    let value = entityResolver(args)
        
    if (args.link.list === false) {
        value = value.filter(entity => entity.id === parent[args.link.field])
    } else {
        value = value.filter(entity => parent[args.link.field].includes(entity.id))
    }

    return value
}

export const entityLinkUniqueResolver = (parent: any, args: EntityLinkArgsType) => {
    const value = entityLinkResolver(parent, args)
    if (value.length === 1) {
        return value[0]
    }

    return null
}

export const getRequiredFields: RequiredFieldsResolver = (node: FieldNode) => {
    const link = node.arguments.find(arg => arg.name.value === "link")
    if (!link || link.value.kind !== "ObjectValue") { // Error ?
        return []
    }

    const field = link.value.fields.find(valueField => valueField.name.value === "field")
    if (!field || field.value.kind !== "StringValue") { // Error ? 
        return []
    }

    return [ field.value.value ]
}

export const EntityLink = objectType({
    name: OBJECT_NAME,
    definition(t) {
        t.string("id", { description: "Id of the entity" })
        t.field("_meta", { type: "EntityMeta" })
        t.field("link", {
            type: OBJECT_NAME,
            args: EntityLinkArgs,
            resolve: entityLinkUniqueResolver
        })
        t.field("EntityReference", {
            type: "EntityReference",
            args: EntityReferenceArgs,
            resolve: entityReferenceUniqueResolver,
        }),
        t.list.field("EntityReference", {
            type: "EntityReference",
            args: EntityReferenceArgs,
            resolve: entityReferenceResolver,
        })
    },
});
