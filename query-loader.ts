import { parse, print, DocumentNode, OperationDefinitionNode, FieldNode, SelectionSetNode } from "graphql"

/** Force each nodes to have id field */
export const loadQuery = (query: string): string => {
    const document = parse(query)

    return print(validateDocument(document))
}

const forceIdField = (selectionSet: SelectionSetNode): SelectionSetNode => {
    if (selectionSet.selections.find(s => s.kind !== "Field")) {
        throw new Error("Fragment are not supported")
    }

    const selections = selectionSet.selections as FieldNode[]

    if (selections.find(s => s.name.value === "id") === undefined) {
        selections.push({
            kind: 'Field',
            alias: undefined,
            name: { kind: 'Name', value: 'id' },
            arguments: [],
            directives: [],
            selectionSet: undefined
        })
    }

    return {
        ...selectionSet,
        selections: selections.map(s => {
            if (s.name.value.startsWith("_")) {
                return s
            }

            return {
                ...s,
                selectionSet: s.selectionSet ? forceIdField(s.selectionSet) : undefined
            }
        })
    }
}

const validateOperation = (operation: OperationDefinitionNode): OperationDefinitionNode => ({
    ...operation,
    selectionSet: {
        ...operation.selectionSet,
        selections: operation.selectionSet.selections.map(selection => {
            if (selection.kind !== "Field") {
                throw new Error("Fragment are not supported")
            }
            
            return {
                ...selection,
                selectionSet: forceIdField(selection.selectionSet)
            }
        })
    }
})

const validateDocument = (document: DocumentNode): DocumentNode => ({
    ...document,
    definitions: document.definitions.filter(
        def => def.kind === "OperationDefinition" && def.operation === "query"
    ).map(validateOperation)
})
