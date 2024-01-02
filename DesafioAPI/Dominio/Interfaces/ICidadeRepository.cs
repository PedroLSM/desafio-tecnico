using DesafioAPI.Dominio.Entidades;

namespace DesafioAPI.Dominio.Interfaces
{
    public interface ICidadeRepository
    {
        Task Cadastrar(Cidade cidade);

        Task<bool> Existe(Cidade cidade);

        Task<IReadOnlyList<Cidade>> ConsultarPorNome(string nome);
        Task<IReadOnlyList<Cidade>> ConsultarPorEstado(string estado);
        Task<Cidade> ConsultarPorId(int cidadeId);

        Task SaveChangesAsync();
    }
}
