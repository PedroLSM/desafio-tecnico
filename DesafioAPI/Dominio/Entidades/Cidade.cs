namespace DesafioAPI.Dominio.Entidades
{
    public class Cidade : Entidade
    {
        public string Nome { get; private set; }
        public string Estado { get; private set; }

        protected Cidade() { }

        public Cidade(string nome, string estado)
        {
            Nome = nome.Trim();
            Estado = estado.Trim();
        }
    }
}
