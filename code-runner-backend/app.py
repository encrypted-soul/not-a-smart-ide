from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView
import graphene
import subprocess


class Query(graphene.ObjectType):
    execute_code = graphene.String(code=graphene.String(required=True))

    def resolve_execute_code(self, info, code):
        try:
            output = subprocess.check_output(
                ["python", "-c", code],
                stderr=subprocess.STDOUT,
                universal_newlines=True,
            )
            return output
        except subprocess.CalledProcessError as e:
            return e.output


class Mutation(graphene.ObjectType):
    install_library = graphene.Boolean(library=graphene.String(required=True))

    def resolve_install_library(self, info, library):
        try:
            subprocess.check_call(["pip", "install", library])
            return True
        except subprocess.CalledProcessError:
            return False


schema = graphene.Schema(query=Query, mutation=Mutation)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins
app.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)

if __name__ == "__main__":
    app.run(debug=True)
