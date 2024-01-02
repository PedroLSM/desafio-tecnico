using DesafioAPI.Dominio.Entidades;

namespace DesafioAPI.Dominio.Interfaces
{
    public interface IClienteRepository
    {
        Task Cadastrar(Cliente cidade);

        Task<IReadOnlyList<Cliente>> ConsultarPorNome(string nome);
        Task<Cliente> ConsultarPorId(int id);

        void Alterar(Cliente cliente);
        void Remover(Cliente cliente);

        Task SaveChangesAsync();
    }
}
