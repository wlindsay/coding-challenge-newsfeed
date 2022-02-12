import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Layout from 'components/Layout';
import ProjectCard, { Project } from 'components/ProjectCard';

const PROJECT_QUERY = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      description
      icon_url
      created_ts
      users {
        id
        name
        avatar_url
      }
    }
  }
`;

type QueryData = {
  project: Project;
};

type QueryVars = {
  id: number;
};

export default function ProjectPage() {
  const { query } = useRouter();

  const { data, error, loading } = useQuery<QueryData, QueryVars>(
    PROJECT_QUERY,
    {
      skip: !query.id,
      variables: { id: Number(query.id) }
    }
  );
  const project = data?.project;

  if (!project || loading || error) {
    return null;
  }

  return (
    <Layout>
      <ProjectCard project={project} />
    </Layout>
  );
}
