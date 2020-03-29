import { NexusGenFieldTypes, NexusGenEnums, NexusGenObjectNames } from "../../generated/typings";

export type Args = {
    collection: string
    name: string
    db?: string
    id?: DynamicIdArgType
}

export type MetaType = NexusGenFieldTypes["EntityMeta"]
export type DynamicIdType = NexusGenEnums['DynamicIdType']
export interface DynamicIdArgType {
    field: string
    type: DynamicIdType
}

export interface MetaFieldConfig {
    fields: NexusGenObjectNames[]
}
