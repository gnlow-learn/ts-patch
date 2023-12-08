import type ts from "typescript"
import type {
    TransformerExtras,
    PluginConfig,
} from "ts-patch"

export default
(
    program: ts.Program,
    pluginConfig: PluginConfig,
    { ts: tsInstance }: TransformerExtras,
) =>
(ctx: ts.TransformationContext) =>
(sourceFile: ts.SourceFile) => {
    const { factory } = ctx
    function visit(node: ts.Node): ts.Node {
        if (tsInstance.isStringLiteral(node) && node.text == "before") {
            return factory.createStringLiteral("after")
        }
        return tsInstance.visitEachChild(node, visit, ctx)
    }
    return tsInstance.visitNode(sourceFile, visit)
}