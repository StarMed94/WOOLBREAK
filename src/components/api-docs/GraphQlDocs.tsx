import React from 'react';
import { motion } from 'framer-motion';
import CodeBlock from './CodeBlock';

const schemaExample = `
type User {
  id: ID!
  username: String!
  role: String!
  projects: [Project!]
}

type Project {
  id: ID!
  name: String!
  last_updated: String!
}

type Query {
  user(id: ID!): User
  allUsers: [User!]
}

type Mutation {
  createProject(name: String!): Project
}
`;

const queryExample = `
query GetUserAndProjects {
  user(id: "usr_1") {
    id
    username
    projects {
      id
      name
    }
  }
}
`;

const responseExample = JSON.stringify({
  "data": {
    "user": {
      "id": "usr_1",
      "username": "alice",
      "projects": [
        { "id": "proj_a", "name": "Mon Site E-commerce" },
        { "id": "proj_b", "name": "Portfolio Personnel" }
      ]
    }
  }
}, null, 2);

const GraphQlDocs: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Schéma de base</h3>
        <p className="text-gray-600 mb-4">
          Voici un aperçu de notre schéma GraphQL. Il inclut les types de base, les requêtes et les mutations disponibles.
        </p>
        <CodeBlock code={schemaExample.trim()} language="graphql" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Exemple de requête</h3>
        <p className="text-gray-600 mb-4">
          Utilisez des requêtes pour récupérer précisément les données dont vous avez besoin.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Requête</h4>
            <CodeBlock code={queryExample.trim()} language="graphql" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Réponse</h4>
            <CodeBlock code={responseExample} language="json" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GraphQlDocs;
