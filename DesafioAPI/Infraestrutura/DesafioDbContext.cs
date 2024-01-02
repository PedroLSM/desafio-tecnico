using DesafioAPI.Dominio.Entidades;
using DesafioAPI.Infraestrutura.ConfiguracoesEF;
using Microsoft.EntityFrameworkCore;

namespace DesafioAPI.Infraestrutura
{
    public class DesafioDbContext : DbContext
    {
        public DesafioDbContext(DbContextOptions<DesafioDbContext> options)
            : base(options)
        {
        }

        public DbSet<Cidade> Cidades;
        public DbSet<Cliente> Clientes;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CidadeConfiguration());
            modelBuilder.ApplyConfiguration(new ClienteConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }


}
