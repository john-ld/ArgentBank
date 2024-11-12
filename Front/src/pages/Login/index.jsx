import DocumentTitle from "../../components/DocumentTitle";
import Form from "../../components/Form/Form";

function Login() {
  const title = "Sign in";
  return (
    <>
      <DocumentTitle title={title} />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>{title}</h1>
          <Form />
        </section>
      </main>
    </>
  );
}
export default Login;
