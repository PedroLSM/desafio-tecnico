using DesafioAPI.Dominio.Entidades;
using DesafioAPI.Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DesafioAPI.Infraestrutura.Repositorios
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly DbSet<Cliente> dbSet;
        private readonly DesafioDbContext context;

        public ClienteRepository(DesafioDbContext context)
        {
            this.context = context;
            dbSet = context.Set<Cliente>();
        }

        public void Alterar(Cliente cliente)
        {
            dbSet.Update(cliente);
        }

        public async Task Cadastrar(Cliente cidade)
        {
            await dbSet.AddAsync(cidade);
        }

        public async Task<Cliente> ConsultarPorId(int id)
        {
            return await dbSet.FromSqlRaw("SELECT TOP 1 * FROM Clientes WHERE Id = {0}", id)
                .Include(c => c.Cidade)
                .FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<Cliente>> ConsultarPorNome(string nome)
        {
            return await dbSet
                .FromSqlRaw("SELECT * FROM Clientes WHERE Nome LIKE {0}", $"%{nome}%")
                .Include(c => c.Cidade)
                .AsNoTracking()
                .ToArrayAsync();
        }

        public void Remover(Cliente cliente)
        {
            dbSet.Remove(cliente);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
