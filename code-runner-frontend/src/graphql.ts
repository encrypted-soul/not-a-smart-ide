import { gql } from "@apollo/client";

export const EXECUTE_CODE_QUERY = gql`
  query ExecuteCode($code: String!) {
    executeCode(code: $code)
  }
`;

export const INSTALL_LIBRARY_MUTATION = gql`
  mutation InstallLibrary($library: String!) {
    installLibrary(library: $library)
  }
`;
