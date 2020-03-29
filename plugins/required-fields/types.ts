import { FieldNode } from "graphql";

type ObjectName = string

export type RequiredFieldsResolver = (node: FieldNode) => undefined | string | string[]

export interface RequiredFieldsConfig {
    resolvers: Record<ObjectName, RequiredFieldsResolver>
}
