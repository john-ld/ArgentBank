import DocumentTitle from "../../components/DocumentTitle";

function Login() {
  const title = "Sign in";
  return (
    <>
      <DocumentTitle title={title} />
      <main className="main bg-dark">
        <section className="sign-in-content"></section>
      </main>
    </>
  );
}
export default Login;
