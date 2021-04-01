function Login(props) {
  return (
    <div id="page-login">
      <input onChange={e => props.onChange(e.target.value)} value={props.value} type="text" placeholder="Seu nome" maxLength="30"/>
      <button onClick={props.onSubmit}>Entrar</button>
    </div>
  )
}

export default Login