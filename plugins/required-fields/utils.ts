import { GraphQLResolveInfo, SelectionNode, FieldNode } from "graphql"

import { RequiredFieldsConfig } from "./types"

export const getRequiredFields = (config: RequiredFieldsConfig, info: GraphQLResolveInfo) => {
    return info.fieldNodes
        .reduce((accumulator, node) => [
            ...accumulator,
            ...fromSelections(config, node.selectionSet?.selections ?? []),
        ], [] as string[])
}

const fromSelections = (config: RequiredFieldsConfig, selections: readonly SelectionNode[]) => {
    return selections.reduce((accumulator, node) => {
        if (node.kind !== "Field") {
            return accumulator
        }

        return [
            ...accumulator,
            ...fromField(config, node)
        ]
    }, [] as string[])
}

const fromField = (config: RequiredFieldsConfig, node: FieldNode) => {
    const resolver = config.resolvers[node.name.value]
    if (resolver === undefined) {
        return []
    }

    const result = resolver(node)
    if (result === undefined) {
        return []
    }

    if (typeof result === "string") {
        return [ result ]
    }

    return result
}
