namespace DesafioAPI.Dominio.Entidades
{
    public class Cliente : Entidade
    {
        public string Nome { get; set; }
        public string Sexo { get; set; }
        public DateTime DataNascimento { get; set; }

        public int CidadeId { get; set; }
        public Cidade Cidade { get; set; }

        public int Idade
        {
            get
            {
                var dataAtual = DateTime.Today;
                var idade = dataAtual.Year - DataNascimento.Year;

                return DataNascimento.Date > dataAtual.AddYears(-idade)
                    ? idade - 1 : idade;
            }
        }

        protected Cliente() { }

        public Cliente(string nome, string sexo, DateTime dataNascimento, Cidade cidade)
        {
            Nome = nome?.Trim();
            Sexo = sexo?.Trim();
            DataNascimento = dataNascimento.Date;
            CidadeId = cidade.Id;
            Cidade = cidade;
        }

        public void AlterarNome(string nome)
        {
            Nome = nome?.Trim();
        }
    }

}
