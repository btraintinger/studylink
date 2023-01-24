import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/api/graphql',
  documents: './src/**/*.{gql,graphql}',
  generates: {
    './generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
  config: {
    scalars: {
      ID: 'number',
    },
  },
};
export default config;
