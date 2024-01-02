using DesafioAPI.Dominio.Entidades;
using DesafioAPI.Dominio.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DesafioAPI.Infraestrutura.Repositorios
{
    public class CidadeRepository : ICidadeRepository
    {
        private readonly DesafioDbContext context;
        private readonly DbSet<Cidade> dbSet;

        public CidadeRepository(DesafioDbContext context)
        {
            this.context = context;
            dbSet = context.Set<Cidade>();
        }

        public async Task Cadastrar(Cidade cidade)
        {
            await dbSet.AddAsync(cidade);
        }

        public async Task<IReadOnlyList<Cidade>> ConsultarPorEstado(string estado)
        {
            return await dbSet
                .FromSqlRaw("SELECT * FROM Cidades WHERE Estado LIKE {0}", $"%{estado}%")
                .AsNoTracking()
                .ToArrayAsync();
        }

        public async Task<IReadOnlyList<Cidade>> ConsultarPorNome(string nome)
        {
            return await dbSet
                .FromSqlRaw("SELECT * FROM Cidades WHERE Nome LIKE {0}", $"%{nome}%")
                .AsNoTracking()
                .ToArrayAsync();
        }

        public async Task<Cidade> ConsultarPorId(int id)
        {
            return await dbSet
                .FromSqlRaw("SELECT * FROM Cidades WHERE Id = {0}", id)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> Existe(Cidade cidade)
        {
            var cidadeEntity = await dbSet
                .FromSqlRaw("SELECT * FROM Cidades WHERE Nome = {0} AND Estado = {1}", cidade.Nome, cidade.Estado)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            return cidadeEntity is not null;
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
