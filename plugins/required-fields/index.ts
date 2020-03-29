import { plugin } from "nexus"

import { RequiredFieldsConfig } from "./types"
import { getRequiredFields } from "./utils"

export default (config: RequiredFieldsConfig) => plugin({
    name: "RequiredFields",
    description: "Resolve required field by sub-relations.",
    onCreateFieldResolver: () => {
        return async (root, args, ctx, info, next) => {
            const fields = getRequiredFields(config, info)
            return await next(
                root,
                args,
                {
                    ...ctx,
                    requiredField: fields,
                },
                info,
            )
        }
    }
})
