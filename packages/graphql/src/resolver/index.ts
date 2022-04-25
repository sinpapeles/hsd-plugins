import { printSchemaWithDirectives } from '@graphql-tools/utils';
import { GraphQLSchema, lexicographicSortSchema } from 'graphql';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { outputFile } from 'type-graphql/dist/helpers/filesystem';
import { AuthMiddleware } from '../middleware/authChecker';
import { WalletsResolver } from './wallet';
import { RPCResolver } from './rpc';

const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
  resolvers: [RPCResolver, WalletsResolver],
  globalMiddlewares: [AuthMiddleware],
});

export { typeDefs, resolvers };

export async function emitSchemaDefinitionWithDirectivesFile(
  schemaFilePath: string,
  schema: GraphQLSchema
): Promise<void> {
  const schemaFileContent = printSchemaWithDirectives(
    lexicographicSortSchema(schema)
  );
  await outputFile(schemaFilePath, schemaFileContent);
}
